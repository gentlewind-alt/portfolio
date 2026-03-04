'use client';

import { motion } from 'motion/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, Star, GitFork, Clock } from 'lucide-react';
import { Repo } from '@/lib/types';

interface ProjectsProps {
  repos: Repo[];
}

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-400',
  Python: 'bg-green-500',
  Rust: 'bg-orange-500',
  Go: 'bg-cyan-500',
  Java: 'bg-red-500',
  HTML: 'bg-orange-600',
  CSS: 'bg-blue-600',
  Vue: 'bg-green-400',
  React: 'bg-blue-400',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-500',
  Dart: 'bg-blue-300',
  Ruby: 'bg-red-600',
  PHP: 'bg-indigo-400',
  'C++': 'bg-pink-500',
  C: 'bg-gray-500',
  'C#': 'bg-green-600',
  Shell: 'bg-gray-400',
};

export function Projects({ repos }: ProjectsProps) {
  if (!repos || repos.length === 0) {
    return null; // Or render a fallback/loading state
  }

  return (
    <section id="git" className="py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Latest Git Projects</h2>
          <a
            href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'samarthrawat18'}?tab=repositories`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            View All Repositories →
          </a>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, index) => (
            <motion.div
              key={repo.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="block h-full">
                <Card className="h-full bg-[var(--color-surface)]/50 backdrop-blur-sm border-white/5 hover:border-[var(--color-primary)]/30 group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--color-primary)]/5">
                  <CardHeader className="pb-4">
                    <div className="flex items-center justify-between mb-4">
                      <Folder className="text-[var(--color-primary)] h-8 w-8 transition-transform duration-300 group-hover:scale-110" />
                      <div className="flex gap-3 text-[var(--color-text-muted)]">
                        <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group/icon">
                          <Star size={16} className="transition-transform duration-200 group-hover/icon:scale-110 group-hover/icon:text-[var(--color-primary)]" />
                          <span className="text-xs">{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer group/icon">
                          <GitFork size={16} className="transition-transform duration-200 group-hover/icon:scale-110 group-hover/icon:text-[var(--color-primary)]" />
                          <span className="text-xs">{repo.forks_count}</span>
                        </div>
                      </div>
                    </div>
                    <CardTitle className="text-xl group-hover:text-[var(--color-primary)] transition-colors line-clamp-1">
                      {repo.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-[var(--color-text-muted)] mb-6 leading-relaxed line-clamp-3 h-[4.5em]">
                      {repo.description || 'No description provided.'}
                    </p>
                    <div className="flex items-center justify-between text-xs font-medium text-[var(--color-text-muted)] mt-auto">
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-2.5 w-2.5 rounded-full ${languageColors[repo.language] || 'bg-gray-400'}`}
                        />
                        {repo.language || 'Unknown'}
                      </div>
                      <div className="flex items-center gap-1 group/clock">
                        <Clock size={14} className="transition-transform duration-200 group-hover/clock:scale-110 group-hover/clock:text-[var(--color-primary)]" />
                        {new Date(repo.updated_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
