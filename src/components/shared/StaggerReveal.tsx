"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function StaggerReveal({
	children,
	delay = 0,
}: {
	children: ReactNode;
	delay?: number;
}) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return <>{children}</>;
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
			animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
			transition={{
				duration: 0.6,
				delay,
				ease: [0.215, 0.61, 0.355, 1],
			}}
		>
			{children}
		</motion.div>
	);
}
