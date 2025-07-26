"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
////
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  //   FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { contactFormSchema, ContactFormValues } from "@/lib/zodSchemas";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { sendEmail } from "@/lib/server-actions/email";

export default function ContactForm() {
  // 1. Define your form.
  const contactForm = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    // defaultValues: {
    //   email: "",
    //   password: "",
    // },
  });
  // 2. Define a submit handler.
  const submit = async (values: ContactFormValues) => {
    // Do something with the form values.
    // const loginResult = await login(values);
    console.log("values", values);
    const res = await sendEmail(values);
    if (res?.success) toast.success("Your message was sent successfully");
    else toast.error("Something went wrong while sending your message");
  };
  return (
    <Card>
      <CardHeader className="mb-6">
        <CardTitle className="text-2xl font-bold text-slate-800">
          Send us a Message
        </CardTitle>
        <p className="text-slate-600">
          Tell us about your marine service requirements and we&apos;ll get back
          to you promptly.
        </p>
      </CardHeader>
      <CardContent>
        <Form {...contactForm}>
          <form
            onSubmit={contactForm.handleSubmit(submit)}
            className="space-y-8"
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={contactForm.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your first name" {...field} />
                    </FormControl>
                    {/* <FormDescription>This is your email.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={contactForm.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your last name" {...field} />
                    </FormControl>
                    {/* <FormDescription>This is your email.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={contactForm.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="your.email@company.com"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your email.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={contactForm.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company/Organization</FormLabel>
                  <FormControl>
                    <Input placeholder="Your company name" {...field} />
                  </FormControl>
                  {/* <FormDescription>This is your email.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={contactForm.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+XX XXX XXX XXXX"
                      type="tel"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your email.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={contactForm.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="The subject of your message"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your email.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={contactForm.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Please describe your requirements, vessel details, or any specific questions you have..."
                      rows={5}
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>This is your password.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-brand-light hover:bg-brand-dark"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
