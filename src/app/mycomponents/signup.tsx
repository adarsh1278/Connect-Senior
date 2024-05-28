"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
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
import { Loader2 } from "lucide-react";

const emailSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address format." })
    .refine((val) => val.endsWith("@kiet.edu"), {
      message: "Email must be a kiet.edu domain",
    }),
});

const formSchema = z.object({
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address format." })
    .refine((val) => val.endsWith("@kiet.edu"), {
      message: "Email must be a kiet.edu domain",
    }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  otp: z.string().min(1, { message: "OTP is required." }),
});

export default function SignUp() {
  const { toast } = useToast();
  const router = useRouter();
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      otp: "",
    },
  });

  const sendMail = async (email: string) => {
    try {
      setLoading(true);
      const response = await fetch("/api/users/sendOtp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      const responseData = await response.json(); // Store the response data once
  console.log(responseData)
  console.log(responseData.status)
      if (responseData.status==200) {
        setOtpSent(true);
        form.setValue("email", email);
        toast({
          title: "Success",
          description: "OTP sent successfully!",
        });
      } else {
        // console.error(responseData);
        toast({
          title: "Failed to send OTP",
          description: "Please try again.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
        setOtpSent(false);
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Please try again.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setOtpSent(false);
    } finally {
      setLoading(false);
    }
  };
  

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true);
      const response = await fetch("/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      
      const responseData = await response.json();
      console.dir(responseData)
      console.log("response status")
      console.log(responseData.status)
      if (responseData.status=="200") {
        console.log("success")
       
        toast({
          title: "Successful",
          description:"User created Succefully",
          // variant: "success",
          action: <ToastAction altText="Goto login">Goto login</ToastAction>,
        });
       
      } else {
       
        
        toast({
          title: responseData.error||"Database error",
          description: "Please try again.",
          variant: "destructive",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "An error occurred",
        description: "Please try again.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center dark:bg-gray-900 dark:text-white p-4 h-fit">
      <div className="max-w-md w-full p-6  dark:bg-gray-900 shadow-md rounded-md">
     
        {!otpSent ? (
          <Form {...emailForm}>
            <form
              onSubmit={emailForm.handleSubmit((data) => sendMail(data.email))}
              className="space-y-4"
            >
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your kiet.edu email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"lg"} disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </div>
                ) : (
                  "Send OTP"
                )}
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OTP</FormLabel>
                    <FormControl>
                      <Input placeholder="OTP" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" size={"lg"} disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing Up...
                  </div>
                ) : (
                  "Sign Up"
                )}
              </Button>
            </form>
          </Form>
        )}
      </div>
    </div>
  );
}
