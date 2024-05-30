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
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  reply: z.string().min(30, {
    message: "Reply must be at least 30 characters.",
  }),
  doubtid: z.string().min(6, {
    message: "Doubt ID must be at least 6 characters.",
  }),
});

export default function ReplyForm({ doubtid }: { doubtid: string }) {
  const { toast } = useToast();
  const [disabled, setDisabled] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      doubtid,
      reply: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setDisabled(true);
      const response = await fetch("/api/users/replyDoubt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseData = await response.json();
      if (responseData.status !== 200) {
        throw new Error(responseData.body.message);
      }

      showSuccessToast("Reply submitted successfully");
    } catch (error) {
      if (error instanceof Error) {
        showErrorToast(`Error: ${error.message}`);
      } else {
        showErrorToast("An unknown error occurred.");
      }
    } finally {
      setDisabled(false);
    }
  };

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
        <ToastAction altText="Go to dashboard">
          <Link href="/doubts">Go to doubts</Link>
        </ToastAction>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="reply"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reply</FormLabel>
              <FormControl>
                <Textarea
                  className="bg-blue-100 text-lg border-blue-500 border-2 h-[250px] max-w-full"
                  placeholder="Reply"
                  {...field}
                />
              </FormControl>
              <FormDescription>Reply must be at least 30 characters.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <DialogClose><Button type="submit" size="lg" disabled={disabled} className="w-full bg-blue-600">
          Submit
        </Button></DialogClose>
      </form>
    </Form>
  );
}
