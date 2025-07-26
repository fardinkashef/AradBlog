"use server";

import { Resend } from "resend";
import { contactFormSchema, ContactFormValues } from "../zodSchemas";
import { EmailTemplate } from "@/app/(main)/contact/_components/EmailTemplate";

const myEmail = "fardinkashef1397@gmail.com";
const aradEmail = "oceanarktech@gmail.com";

export async function sendEmail(data: ContactFormValues) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const result = contactFormSchema.safeParse(data);

  if (result.success) {
    const { firstName, lastName, email, subject, message } = result.data;
    try {
      const data = await resend.emails.send({
        from: `onboarding@resend.dev`,
        to: [myEmail, aradEmail],
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
