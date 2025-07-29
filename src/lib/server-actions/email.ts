"use server";

import { Resend } from "resend";
import { contactFormSchema, ContactFormValues } from "../zodSchemas";
import { EmailTemplate } from "@/app/(main)/contact/_components/EmailTemplate";

const myEmail = "fardinkashef1397@gmail.com";
const aradEmail = "oceanarktech@gmail.com";
const myOtherEmail = "fardinkashef1398@gmail.com";

export async function sendEmail(data: ContactFormValues) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    const { firstName, lastName, email, subject, message } = result.data;
    try {
      const data = await resend.emails.send({
        // For development, Resend provides a specific from address that you can use without needing to verify your own domain.
        from: `onboarding@resend.dev`,
        // You can only send testing emails to your own email address (the one you signed up in Resend with) (fardinkashef1397@gmail.com). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain.'
        to: [myEmail],
        subject,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`,
        react: EmailTemplate({ firstName, lastName, email, message }),
      });
      console.log("resend res data", data);

      return { success: true, data };
    } catch (error) {
      return { success: false, error };
    }
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }
}
