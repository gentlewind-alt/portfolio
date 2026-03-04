'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cpu, Film, Hand, Code } from 'lucide-react';
import { PortfolioData } from '@/lib/data';

export function FeaturedProjects({ projects }: { projects: PortfolioData['projects'] }) {
  const getIcon = (title: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('movie')) return Film;
    if (lower.includes('iot') || lower.includes('hardware')) return Cpu;
    if (lower.includes('gesture') || lower.includes('recognition')) return Hand;
    return Code;
  };

  return (
    <section id="featured-projects" className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-12 text-3xl font-bold text-white">
          Featured Projects
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => {
            const Icon = getIcon(project.title);
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full bg-[var(--color-surface)]/50 backdrop-blur-sm border-white/5 hover:border-[var(--color-primary)]/30 group">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-colors">
                        <Icon size={20} />
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-[var(--color-primary)] transition-colors">
                      {project.title}
                    </CardTitle>
                    <p className="text-xs font-medium text-[var(--color-primary)] mt-1">
                      {project.tech}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.description.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--color-text-muted)] leading-relaxed">
                          <span className="mt-1.5 h-1 w-1 rounded-full bg-[var(--color-text-muted)] shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
