'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { BriefIntro } from '@/components/BriefIntro';
import { Projects } from '@/components/Projects';
import { FeaturedProjects } from '@/components/FeaturedProjects';
import { Academics } from '@/components/Academics';
import { Strengths } from '@/components/Strengths';
import { Footer } from '@/components/Footer';
import { AmbientBackground } from '@/components/AmbientBackground';
import { cn } from '@/lib/utils';
import { Repo, Movie } from '@/lib/types';
import { Movies } from '@/components/Movies';
import { PortfolioData } from '@/lib/data';

interface HomeClientProps {
  repos: Repo[];
  movies: Movie[];
  portfolioData: PortfolioData;
}

export function HomeClient({ repos, movies, portfolioData }: HomeClientProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <AmbientBackground />
      <Navbar isScrolled={isScrolled} />
      
      <motion.div 
        layout
        transition={{ type: 'spring', damping: 20, stiffness: 100 }}
        className={cn(
          isScrolled ? "md:pl-20" : ""
        )}
      >
        <Hero personalInfo={portfolioData.personalInfo} />
        <BriefIntro />
        <FeaturedProjects projects={portfolioData.projects} />
        <Projects repos={repos} />
        <Academics education={portfolioData.education} />
        <Strengths skills={portfolioData.skills} />
        <Movies movies={movies} />
        <Footer />
      </motion.div>
    </main>
  );
}
