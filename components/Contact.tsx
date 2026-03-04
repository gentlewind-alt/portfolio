'use client';

import { useActionState } from 'react';
import { motion } from 'motion/react';
import { sendEmail, ContactState } from '@/app/actions/contact';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

const initialState: ContactState = {
  message: '',
  errors: {},
  success: false,
};

export function Contact() {
  const [state, formAction, isPending] = useActionState(sendEmail, initialState);

  return (
    <section id="contact" className="py-12 md:py-24 border-t border-white/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[var(--color-primary)]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Get in <span className="text-[var(--color-primary)]">Touch</span>
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            Have a project in mind or just want to say hi? I&apos;d love to hear from you.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-[var(--color-surface)]/50 backdrop-blur-md border-white/10 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-white">Send a Message</CardTitle>
              <CardDescription className="text-[var(--color-text-muted)]">
                Fill out the form below and I&apos;ll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {state.success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center space-y-4"
                >
                  <div className="h-16 w-16 bg-green-500/10 rounded-full flex items-center justify-center text-green-500">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
                  <p className="text-[var(--color-text-muted)] max-w-md">
                    Thank you for reaching out. I&apos;ve received your message and will respond shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => window.location.reload()}
                    className="mt-4 border-white/10 hover:bg-white/5"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form action={formAction} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white">Name</Label>
                      <Input
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/20 focus:border-[var(--color-primary)]/50 focus:ring-[var(--color-primary)]/20"
                        aria-describedby="name-error"
                      />
                      {state.errors?.name && (
                        <p id="name-error" className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {state.errors.name[0]}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-white">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        className="bg-black/20 border-white/10 text-white placeholder:text-white/20 focus:border-[var(--color-primary)]/50 focus:ring-[var(--color-primary)]/20"
                        aria-describedby="email-error"
                      />
                      {state.errors?.email && (
                        <p id="email-error" className="text-sm text-red-400 flex items-center gap-1">
                          <AlertCircle size={12} /> {state.errors.email[0]}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-white">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your project..."
                      rows={5}
                      className="bg-black/20 border-white/10 text-white placeholder:text-white/20 focus:border-[var(--color-primary)]/50 focus:ring-[var(--color-primary)]/20 resize-none"
                      aria-describedby="message-error"
                    />
                    {state.errors?.message && (
                      <p id="message-error" className="text-sm text-red-400 flex items-center gap-1">
                        <AlertCircle size={12} /> {state.errors.message[0]}
                      </p>
                    )}
                  </div>

                  {state.message && !state.success && (
                    <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                      <AlertCircle size={16} />
                      {state.message}
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isPending}
                    className="w-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:bg-[var(--color-primary)]/90 font-bold h-12 text-base transition-all duration-300"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-5 w-5" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
