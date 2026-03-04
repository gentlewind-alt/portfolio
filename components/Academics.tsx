'use client';

import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { GraduationCap, FileText } from 'lucide-react';
import { PortfolioData } from '@/lib/data';

export function Academics({ education }: { education: PortfolioData['education'] }) {
  return (
    <section id="academics" className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-3xl font-bold text-white">
          Education
        </h2>

        <div className="space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-[var(--color-surface)]/30 border-white/5 hover:bg-[var(--color-surface)]/50 transition-colors">
                <CardContent className="flex flex-col md:flex-row gap-6 p-8 items-start">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    {index === 0 ? <GraduationCap size={28} /> : <FileText size={28} />}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {edu.institution}
                    </h3>
                    <p className="text-[var(--color-primary)] font-medium mt-1">
                      {edu.degree} • {edu.year}
                    </p>
                    <p className="mt-3 text-[var(--color-text-muted)] leading-relaxed max-w-2xl">
                      {edu.details}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
