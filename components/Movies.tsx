'use client';

import { motion } from 'motion/react';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import Image from 'next/image';
import { Movie } from '@/lib/types';

interface MoviesProps {
  movies: Movie[];
}

export function Movies({ movies }: MoviesProps) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <section id="movies" className="py-12 md:py-20 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-white">Recent Movies</h2>
          <a
            href={`https://letterboxd.com/${process.env.NEXT_PUBLIC_LETTERBOXD_USERNAME || 'samarthrawat18'}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-[var(--color-primary)] hover:underline"
          >
            View Letterboxd Profile →
          </a>
        </div>

        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
          {movies.map((movie, index) => (
            <motion.a
              key={movie.link}
              href={movie.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative aspect-[2/3] overflow-hidden rounded-lg bg-gray-900 shadow-lg hover:shadow-[var(--color-primary)]/20 transition-all duration-300 hover:-translate-y-2"
            >
              <Image
                src={movie.image}
                alt={movie.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 16vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-sm font-bold text-white line-clamp-2 leading-tight">
                  {movie.title}
                </h3>
                <div className="flex items-center gap-1 mt-1 text-[var(--color-primary)]">
                  <Star size={12} fill="currentColor" />
                  <span className="text-xs font-medium">{movie.rating}</span>
                </div>
                <span className="text-[10px] text-gray-400 mt-1">{movie.year}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
