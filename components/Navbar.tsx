'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Terminal, Home, User, Github, GraduationCap, Zap, Film, Mail, Instagram, Copy, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const navItems = [
  { name: 'Home', icon: Home },
  { name: 'About Me', icon: User },
  { name: 'Git', icon: Github },
  { name: 'Academics', icon: GraduationCap },
  { name: 'Strengths', icon: Zap },
  { name: 'Movies', icon: Film },
];

export function Navbar({ isScrolled }: { isScrolled: boolean }) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.header
      layout
      className={cn(
        "z-50 backdrop-blur-md transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
        isScrolled
          ? "fixed top-0 left-0 h-screen w-20 hover:w-64 border-r border-white/5 bg-[var(--color-background)]/95 flex flex-col items-start py-8 px-4 gap-8 group/sidebar overflow-hidden"
          : "fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl h-16 rounded-full border border-white/10 bg-[var(--color-background)]/80 flex items-center justify-between px-6 shadow-lg shadow-black/20"
      )}
    >
      {/* Logo */}
      <Link href="#home" className={cn("flex items-center gap-3 group shrink-0", isScrolled ? "px-2" : "")}>
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--color-primary)]/10 text-[var(--color-primary)] group-hover:bg-[var(--color-primary)]/20 transition-colors shrink-0">
          <Terminal size={20} />
        </div>
        <span 
          className={cn(
            "text-lg font-bold tracking-tight text-white group-hover:text-[var(--color-primary)] transition-colors whitespace-nowrap",
            isScrolled ? "opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300" : ""
          )}
        >
          Portfolio
        </span>
      </Link>

      {/* Nav Links */}
      <nav className={cn(
        "transition-all duration-500",
        isScrolled 
          ? "flex flex-col gap-2 w-full mt-4" 
          : "hidden md:flex items-center gap-8"
      )}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={`#${item.name.toLowerCase().replace(' ', '-')}`}
            className={cn(
              "text-sm font-medium text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors whitespace-nowrap flex items-center gap-4",
              isScrolled ? "p-2 rounded-md hover:bg-white/5 w-full justify-start" : ""
            )}
          >
            {isScrolled && (
                <item.icon size={20} className="shrink-0" />
            )}
            
            <span className={cn(isScrolled ? "opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300 delay-75" : "")}>
              {item.name}
            </span>
          </Link>
        ))}
      </nav>

      {/* CTA Button */}
      <div className={cn(
        isScrolled ? "mt-auto w-full opacity-0 group-hover/sidebar:opacity-100 transition-opacity duration-300" : "block"
      )}>
        <Dialog>
          <DialogTrigger asChild>
            <Button className={cn(
                "bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90 font-bold rounded-full",
                isScrolled ? "w-full rounded-md" : ""
            )}>
              <Mail className={cn("mr-2 h-4 w-4", isScrolled ? "" : "hidden md:inline-block")} />
              <span className={isScrolled ? "" : ""}>Contact Me</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md bg-[var(--color-surface)] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Get in Touch</DialogTitle>
              <DialogDescription className="text-[var(--color-text-muted)]">
                Feel free to reach out for collaborations or just a friendly hello!
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
              
              {/* Email */}
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[var(--color-primary)]/30 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-[var(--color-primary)]/10 text-[var(--color-primary)]">
                    <Mail size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[var(--color-text-muted)]">Email</span>
                    <span className="text-sm font-medium">samarthrawat18@email.com</span>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-[var(--color-text-muted)] hover:text-white" onClick={() => copyToClipboard('samarthrawat18@email.com')}>
                  {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                </Button>
              </div>

              {/* Instagram */}
              <a href="https://instagram.com/samarthrawat18" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[var(--color-primary)]/30 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-pink-500/10 text-pink-500">
                    <Instagram size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[var(--color-text-muted)]">Instagram</span>
                    <span className="text-sm font-medium">@samarthrawat18</span>
                  </div>
                </div>
                <div className="text-xs text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit →
                </div>
              </a>

              {/* GitHub */}
              <a href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'samarthrawat18'}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-3 rounded-lg bg-white/5 border border-white/5 hover:border-[var(--color-primary)]/30 transition-colors group">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-white/10 text-white">
                    <Github size={18} />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs text-[var(--color-text-muted)]">GitHub</span>
                    <span className="text-sm font-medium">@{process.env.NEXT_PUBLIC_GITHUB_USERNAME || 'samarthrawat18'}</span>
                  </div>
                </div>
                <div className="text-xs text-[var(--color-primary)] opacity-0 group-hover:opacity-100 transition-opacity">
                  Visit →
                </div>
              </a>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    </motion.header>
  );
}
