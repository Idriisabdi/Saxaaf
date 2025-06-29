"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Send, Loader2, CheckCircle, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import { submitContactFormAction } from "./actions";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const formSchema = z.object({
  name: z.string().min(2, "Name is required.").max(50),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(2, "Subject is required.").max(100),
  message: z.string().min(10, "Message must be at least 10 characters.").max(2000),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    setLoading(true);
    try {
      const result = await submitContactFormAction(data);
      if (result.success) {
        setSubmitted(true);
      } else {
        throw new Error(result.message || "An unexpected error occurred.");
      }
    } catch (e) {
      toast({
        variant: "destructive",
        title: "Submission Failed",
        description: e instanceof Error ? e.message : "An unknown error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
        <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center text-center animate-in fade-in duration-500">
            <CheckCircle className="h-24 w-24 text-green-500 mb-6" />
            <h1 className="text-4xl font-extrabold tracking-tight">Thank You!</h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
                Your message has been sent successfully. Our team will review it and get back to you as soon as possible.
            </p>
        </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16 sm:py-24 animate-in fade-in duration-500">
        <div className="text-center animate-in fade-in zoom-in-95 duration-500">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight md:text-5xl uppercase flex items-center justify-center gap-4">
            <Sparkles className="h-10 w-10 text-primary animate-pulse" />
                Contact Us
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-foreground/80">
                Have a question or a project in mind? We'd love to hear from you.
            </p>
        </div>

        <Card className="mt-16 w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Mail className="h-6 w-6"/> Send Us a Message</CardTitle>
                <CardDescription>Fill out the form below and we'll get back to you shortly.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email Address</FormLabel>
                                    <FormControl>
                                    <Input placeholder="you@example.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                        <FormField
                            control={form.control}
                            name="subject"
                            render={({ field }) => (
                            <FormItem>
                                <FormLabel>Subject</FormLabel>
                                <FormControl>
                                <Input placeholder="Regarding a new project..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Your Message</FormLabel>
                                <FormControl>
                                    <Textarea
                                    placeholder="Tell us about your project, goals, and any questions you have."
                                    className="min-h-[150px]"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex justify-end">
                            <Button type="submit" disabled={loading} size="lg">
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                        Sending...
                                    </>
                                ) : (
                                    <>
                                        <Send className="mr-2 h-5 w-5" />
                                        Send Message
                                    </>
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    </div>
  );
}