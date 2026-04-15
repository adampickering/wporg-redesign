#!/usr/bin/env bash
#
# scripts/deslop-audit.sh
#
# Grep-based de-slopify audit. Fails the build on any AI-slop pattern from
# RULES.md / the de-slopify-audit skill (17-point check). Wired into
# `bun run check`, so every commit downstream of Task 7 runs through it.
#
# Scope:
#   - Scans src/**, EXCLUDING src/components/ui/ (vendored shadcn primitives).
#     Policy: shadcn primitives are vendored; we patch them when we pull them
#     (e.g. the Lucide → Phosphor swap in Task 2). They are not audited for
#     slop in-place because their stock code legitimately uses utilities
#     (transition-all, rounded-lg, ...) that would otherwise false-positive.
#   - Skips node_modules, .next, out/. Scans only .tsx / .ts / .css.
#
# Adding new checks: each `check` call is one line. Patterns are extended
# regex (grep -E). Keep them tight — false positives erode trust faster than
# false negatives let slop through.

set -u
cd "$(dirname "$0")/.."

FAIL=0
SCAN_ROOT="src"
EXCLUDES=(--exclude-dir=node_modules --exclude-dir=.next --exclude-dir=out --exclude-dir=ui)
INCLUDES=(--include="*.tsx" --include="*.ts" --include="*.css")

# check LABEL PATTERN
#   Greps the source tree for PATTERN. If anything matches, prints the hits
#   and flips FAIL=1. We deliberately do not `set -e`: grep returns 1 on no
#   match, which is the success path here.
check() {
	local label="$1" pattern="$2"
	local hits
	hits=$(grep -rnE "$pattern" "${EXCLUDES[@]}" "${INCLUDES[@]}" "$SCAN_ROOT" 2>/dev/null || true)
	if [ -n "$hits" ]; then
		echo "FAIL: $label"
		echo "$hits" | sed 's/^/  /'
		echo
		FAIL=1
	fi
}

echo "Running de-slopify audit on $SCAN_ROOT (excluding components/ui shadcn primitives)..."
echo

# 1. Pure-white backgrounds. Our tokens use `hsl(0 0% 100%)` for the card
#    surface, so neither #fff nor bg-white should appear in authored code.
check "pure-white background (#fff / #ffffff / bg-white)" \
	'#(fff|ffffff)\b|\bbg-white\b'

# 2. rounded-md monotone. Our radius architecture is pill / card (14-16px) /
#    chip (4-6px). `rounded-md` is the AI default; flag it.
check "rounded-md monotone radius" \
	'\brounded-md\b'

# 3. transition: all / transition-all. Specific transitions only.
check "transition: all / transition-all" \
	'transition:\s*all\b|\btransition-all\b'

# 4. ease-in-out + duration-300 stock easing. Use the named cubic-beziers
#    (ease-reveal / ease-ui) and per-interaction durations.
check "ease-in-out / duration-300 stock easing" \
	'\bease-in-out\b|\bduration-300\b'

# 5. Neutral black shadows. All our shadows are tinted with the foreground
#    HSL (#1A1B25). rgba(0,0,0,...) is the slop tell.
check "neutral black shadow (rgba(0,0,0,...))" \
	'rgba\(\s*0\s*,\s*0\s*,\s*0\s*,'

# 6. Purple→blue v0/SaaS gradient.
check "purple->blue slop gradient (#667eea / #764ba2 / from-purple…to-blue)" \
	'#667eea|#764ba2|from-purple[-a-z0-9]*\s+to-blue|from-blue[-a-z0-9]*\s+to-purple'

# 7. translateY hover on cards. Card hover should grow the shadow ring,
#    not lift the card.
check "translateY hover (hover:translate-y / hover:-translate)" \
	'hover:-?translate-y|hover:.*-translate-y'

# 8. py-12 / py-16 default section padding. Sections want
#    clamp(96px, 10vw, 160px) ≈ py-24 minimum.
check "py-12 / py-16 default section padding" \
	'\bpy-1[26]\b'

# 9. Lucide imports. The project uses Phosphor (see Task 2).
check "lucide-react import (use Phosphor instead)" \
	'from\s+["'"'"']lucide-react["'"'"']'

# 10. Single-layer shadow-md / shadow-lg. Our shadow tokens are
#     `shadow-card`, `shadow-card-hover`, `shadow-button` — multi-layer,
#     tinted. Tailwind's stock `shadow-md`/`shadow-lg` is the slop tell.
check "single-layer shadow-md / shadow-lg (use shadow-card token)" \
	'\bshadow-(md|lg|xl|2xl)\b'

# 11. text-xs uppercase eyebrow without mono. Eyebrows must use the .eyebrow
#     class (mono + 0.14em tracking). This is conservative: only flag when
#     `text-xs` and `uppercase` both appear in the same className token list.
check "text-xs uppercase eyebrow (use .eyebrow / font-mono)" \
	'\btext-xs\b[^"'"'"'>]*\buppercase\b|\buppercase\b[^"'"'"'>]*\btext-xs\b'

if [ "$FAIL" -eq 1 ]; then
	echo "De-slopify audit failed. Fix the issues above before shipping."
	exit 1
fi

echo "De-slopify audit passed."
