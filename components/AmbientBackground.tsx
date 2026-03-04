'use client';

import { motion } from 'motion/react';

export function AmbientBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[var(--color-background)]">
      <motion.div
        animate={{
          transform: [
            "translate(0px, 0px) scale(1)",
            "translate(20px, -20px) scale(1.1)",
            "translate(0px, 0px) scale(1)"
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: 'transform' }}
        className="absolute top-[-10%] left-[-10%] h-[50vh] w-[50vw] rounded-full bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] opacity-20 blur-3xl"
      />
      <motion.div
        animate={{
          transform: [
            "translate(0px, 0px) scale(1)",
            "translate(-30px, 30px) scale(1.2)",
            "translate(0px, 0px) scale(1)"
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: 'transform' }}
        className="absolute top-[20%] right-[-10%] h-[60vh] w-[60vw] rounded-full bg-[radial-gradient(circle_at_center,#1e3a8a_0%,transparent_70%)] opacity-20 blur-3xl"
      />
    </div>
  );
}
