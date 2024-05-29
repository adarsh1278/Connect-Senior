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

   const onSubmit = async (data: any) => {
    try {
      console.log(data)
      setDisabled(true);
      const response = await fetch('/api/users/askDoubt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseData: any = await response.json(); 
      console.log(responseData)
      if (responseData.status !=200) {
        throw new Error(responseData.body.message);
      }

      toast({
        title: 'Success',
        description: 'Doubt submitted successfully',
        action: (
          <ToastAction altText="Go to dashboard">
            <Link href="/user/dashboard">Go to Dashboard</Link>
          </ToastAction>
        ),
      });
    } catch (error) {
      if (error instanceof Error) { // Check if error is an instance of Error
        toast({
          variant: 'destructive',
          title: 'Error',
          description: `Error: ${error.message}`,
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      } else {
        // Handle other types of errors
        toast({
          variant: 'destructive',
          title: 'Unknown Error',
          description: 'An unknown error occurred.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
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
                <Textarea className="bg-blue-100 border-blue-500 border-2 w-[550px] h-[250px]" placeholder="Doubts" {...field} />
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
