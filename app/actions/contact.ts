'use server';

import { z } from 'zod';
import nodemailer from 'nodemailer';

const ContactSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }),
});

export type ContactState = {
  errors?: {
    name?: string[];
    email?: string[];
    message?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function sendEmail(prevState: ContactState, formData: FormData): Promise<ContactState> {
  const validatedFields = ContactSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    message: formData.get('message'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to send message.',
      success: false,
    };
  }

  const { name, email, message } = validatedFields.data;

  // Use environment variables for sensitive data
  const recipientEmail = process.env.CONTACT_EMAIL || 'samarthrawat18@gmail.com';
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;

  // If SMTP credentials are not configured, log the message (for development/demo purposes)
  if (!smtpUser || !smtpPass) {
    console.log('--- Email Simulation ---');
    console.log(`To: ${recipientEmail}`);
    console.log(`From: ${name} <${email}>`);
    console.log(`Message: ${message}`);
    console.log('------------------------');
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return {
      message: 'Message sent successfully! (Simulation Mode: Check console logs)',
      success: true,
    };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // Or use host/port for other providers
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${smtpUser}>`, // Sender address (must be authenticated user for Gmail)
      replyTo: email, // Reply to the user's email
      to: recipientEmail, // List of receivers
      subject: `New Contact Form Submission from ${name}`, // Subject line
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`, // plain text body
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <br/>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; background: #f4f4f4; padding: 15px; border-radius: 5px;">${message}</p>
        </div>
      `, // html body
    });

    return {
      message: 'Message sent successfully!',
      success: true,
    };
  } catch (error) {
    console.error('Failed to send email:', error);
    return {
      message: 'Failed to send message. Please try again later.',
      success: false,
    };
  }
}
