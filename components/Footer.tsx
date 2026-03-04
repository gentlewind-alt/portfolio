'use client';

import { Globe, AtSign, Code } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-[var(--color-surface)]/30 py-12">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <div className="flex justify-center gap-8 mb-8">
          {[Globe, AtSign, Code].map((Icon, i) => (
            <a
              key={i}
              href="#"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors p-2 hover:bg-white/5 rounded-full"
            >
              <Icon size={24} />
            </a>
          ))}
        </div>
        <p className="text-sm text-[var(--color-text-muted)]">
          © {new Date().getFullYear()} Portfolio Space. Built with passion and
          code.
        </p>
      </div>
    </footer>
  );
}
