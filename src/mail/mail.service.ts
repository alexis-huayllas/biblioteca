import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.example.com', // Reemplaza con tu host SMTP
      port: 587, // Puerto SMTP
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: 'user@example.com', // Reemplaza con tu usuario SMTP
        pass: 'password', // Reemplaza con tu contraseña SMTP
      },
    });
  }

  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: '"NestJS Mailer" <noreply@example.com>', // Reemplaza con el remitente
      to,
      subject,
      text,
      html,
    };

    return this.transporter.sendMail(mailOptions);
  }
}