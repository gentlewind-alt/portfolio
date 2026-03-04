'use client';

import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Code, Database, Cpu, PenTool } from 'lucide-react';
import { PortfolioData } from '@/lib/data';

export function Strengths({ skills }: { skills: PortfolioData['skills'] }) {
  const getIcon = (category: string) => {
    const lower = category.toLowerCase();
    if (lower.includes('language')) return Code;
    if (lower.includes('framework') || lower.includes('library')) return Zap;
    if (lower.includes('database')) return Database;
    if (lower.includes('platform') || lower.includes('iot')) return Cpu;
    return PenTool;
  };

  const strengths = [
    'Quick learner with strong analytical and problem-solving abilities.',
    'Proactive and adaptable, eager to learn emerging technologies.',
  ];

  return (
    <section id="strengths" className="py-12 md:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-3xl font-bold text-white">
          Skills & Strengths
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-6 text-xl font-bold text-[var(--color-primary)]">
              Technical Skills
            </h3>
            <div className="grid gap-4">
              {skills.map((skill, index) => {
                const Icon = getIcon(skill.category);
                return (
                  <Card
                    key={skill.category}
                    className="bg-[var(--color-surface)]/30 border-white/5"
                  >
                    <CardContent className="flex items-center gap-4 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">
                          {skill.category}
                        </h4>
                        <p className="text-sm text-[var(--color-text-muted)]">
                          {skill.items}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </motion.div>

          {/* Strengths & Interests */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="mb-6 text-xl font-bold text-[var(--color-primary)]">
                Strengths
              </h3>
              <ul className="space-y-4">
                {strengths.map((strength, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-primary)] shrink-0" />
                    <p className="text-[var(--color-text-muted)] leading-relaxed">
                      {strength}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-6 text-xl font-bold text-[var(--color-primary)]">
                Fields of Interest
              </h3>
              <div className="flex flex-wrap gap-2">
                {[
                  'Machine Learning',
                  'IoT Systems',
                  'Embedded Systems',
                  'Blockchain Development',
                  'Human-Computer Interaction',
                  'Data Analysis',
                  'Web Designing',
                ].map((interest) => (
                  <span
                    key={interest}
                    className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white border border-white/10"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
