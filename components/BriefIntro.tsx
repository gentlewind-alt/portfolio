'use client';

import { motion } from 'motion/react';

export function BriefIntro() {
  return (
    <section id="about-me" className="py-12 md:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="md:w-1/3"
          >
            <h2 className="text-3xl font-bold text-white">Brief Intro</h2>
            <div className="mt-4 h-1 w-16 rounded-full bg-[var(--color-primary)]" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:w-2/3"
          >
            <p className="text-lg leading-relaxed text-[var(--color-text-muted)]">
              Detail-oriented and motivated B.Tech IT student at KIIT Bhubaneswar with hands-on experience in Machine
              Learning, IoT Systems and Data Structures. Passionate about creating efficient, data-driven, and scalable solutions
              that merge AI, embedded technology, and web systems.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
