"use client";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  Title: z.string().min(10, {
    message: "Title must be at least 10 characters.",
  }),
  Doubt: z.string().min(30, {
    message: "Doubt must be at least 30 characters.",
  }),
});

export default function Askdoubt() {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
 
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
   console.log(values)
  }

  function showErrorToast(message: string) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: message,
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }

  function showSuccessToast(message: string) {
    toast({
      title: "Successful",
      description: message,
      action: (
        <ToastAction altText="Go to dashboard"><Link href={"/user/dashboard"}>Go to Dashboard</Link></ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="Title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input className="bg-blue-100 border-blue-500 border-2 " placeholder="Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="Doubt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Doubt</FormLabel>
              <FormControl>
                <Textarea className="bg-blue-100 border-blue-500 border-2 w-[5`50px] h-[250px]" placeholder="Doubts" {...field} />
              </FormControl>
              <FormDescription>
                Doubts must be at least 30 characters.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size={"lg"} disabled={disabled} className="w-full bg-blue-600">
          Submit
        </Button>
      </form>
    </Form>
  );
}
