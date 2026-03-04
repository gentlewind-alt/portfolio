'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MapPin, Mail, Calendar, User } from 'lucide-react';
import { PortfolioData } from '@/lib/data';

export function Hero({ personalInfo }: { personalInfo: PortfolioData['personalInfo'] }) {
  // Split name for styling
  const nameParts = personalInfo.name.split(' ');
  const lastName = nameParts.pop();
  const firstName = nameParts.join(' ');

  return (
    <section id="home" className="py-12 md:py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/5 lg:w-1/2 shadow-2xl shadow-[var(--color-primary)]/5"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary)]/10 to-transparent z-10 pointer-events-none" />
            <Image
              src="https://picsum.photos/seed/workspace/1920/1080"
              alt="Creative Workspace"
              fill
              className="object-cover transition-transform duration-700 hover:scale-105"
              priority
            />
          </motion.div>

          {/* Text Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
            className="flex flex-col gap-6 lg:w-1/2"
          >
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-block rounded-full bg-[var(--color-primary)]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[var(--color-primary)]"
              >
                Available for Projects
              </motion.span>
              <h1 className="text-4xl font-black leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl">
                {firstName} <br />
                <span className="text-[var(--color-primary)]">{lastName}</span>
              </h1>
              <p className="text-lg text-[var(--color-text-muted)] max-w-lg leading-relaxed">
                {personalInfo.bio}
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Button asChild size="lg" className="font-bold text-base px-8">
                <Link href="#featured-projects">
                  View Projects
                </Link>
              </Button>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="lg"
                    className="font-bold text-base px-8 border-[var(--color-primary)]/20 text-[var(--color-primary)] hover:bg-[var(--color-primary)]/10"
                  >
                    Read Bio
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-[var(--color-surface)] border-white/10 text-white">
                  <DialogHeader>
                    <DialogTitle>About Me</DialogTitle>
                  </DialogHeader>
                  <div className="flex flex-col items-center gap-6 py-6">
                    <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-[var(--color-primary)]/20 shadow-xl">
                      <Image
                        src="https://picsum.photos/seed/samarth/400/400"
                        alt={personalInfo.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    
                    <div className="text-center space-y-1">
                      <h3 className="text-2xl font-bold text-white">{personalInfo.name}</h3>
                      <p className="text-[var(--color-primary)] font-medium">{personalInfo.title}</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4 w-full mt-2">
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <User className="text-[var(--color-primary)] h-5 w-5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-[var(--color-text-muted)]">Age</span>
                          <span className="text-sm font-medium">{personalInfo.age} Years Old</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <MapPin className="text-[var(--color-primary)] h-5 w-5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-[var(--color-text-muted)]">Location</span>
                          <span className="text-sm font-medium">{personalInfo.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                        <Mail className="text-[var(--color-primary)] h-5 w-5" />
                        <div className="flex flex-col">
                          <span className="text-xs text-[var(--color-text-muted)]">Email</span>
                          <span className="text-sm font-medium">{personalInfo.email}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
