"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Reply {
  satisfied: boolean;
  _id: string;
  doubtId: string;
  userId: string;
  isAnonymous: boolean;
  answer: string;
  createdAt: string;
  updatedAt: string;
}

interface Doubt {
  _id: string;
  userId: string;
  head: string;
  doubt: string;
  image: string;
  seniorOnly: boolean;
  isAnonymous: boolean;
  isSolved: boolean;
  upVote: number;
  year: number;
  skillsRequired: string[];
  createdAt: string;
  updatedAt: string;
}

export default function MyDoubt() {
  const params = useParams();
  const { toast } = useToast();
  const [doubt, setDoubt] = useState<Doubt | null>(null);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState<string | null>(null);

  useEffect(() => {
    fetchDoubt();
    fetchReplies();
  }, []);

  const fetchDoubt = async () => {
    try {
      const res = await fetch("/api/users/FetchDoubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doubtId: params.mydoubt }),
      });
      const data = await res.json();
      if (data.body.success) {
        setDoubt(data.body.doubt);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const fetchReplies = async () => {
    try {
      const res = await fetch("/api/users/fetchReply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doubtId: params.mydoubt }),
      });
      const data = await res.json();
      if (data.body.success) {
        setReplies(data.body.reply);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const markSatisfied = async (replyId: string) => {
    setMarking(replyId);
    console.log("reply id is whofevhshuosvs", replyId);
    try {
      const res = await fetch("/api/users/satisfiedreply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ replyid: replyId }),
      });
      const data = await res.json();
      if (data.body.success) {
        toast({
          title: "Success",
          description: "Reply marked as satisfied!",
        });
        fetchReplies();
      } else {
        toast({
          title: "Failed",
          description: "Unable to mark reply as satisfied.",
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
      setMarking(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 dark:bg-gray-900 dark:text-white">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </div>
      ) : (
        <div className="max-w-3xl w-full bg-white dark:bg-gray-800 p-6 shadow-lg rounded-lg transition-shadow hover:shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-blue-600">{doubt?.head}</h1>
          <p className="text-lg mb-2 text-gray-700 dark:text-gray-300">{doubt?.doubt}</p>
          <div className="flex items-center mb-4">
            <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">Upvotes: {doubt?.upVote}</span>
          </div>
          <div className="space-y-4">
            {replies.map((reply) => (
              <div
                key={reply._id}
                className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md shadow-md transition-transform transform hover:-translate-y-1"
              >
                <p className="text-gray-800 dark:text-gray-200">{reply.answer}</p>
                <div className="flex items-center justify-between mt-2">
                  <Button
                   disabled={marking === reply._id || reply.satisfied}
                    onClick={() => markSatisfied(reply._id)}
                    className="bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                  >
                    {marking === reply._id ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      "Mark as Satisfied"
                    )}
                  </Button>
                  {reply.satisfied && (
                    <span className="text-green-500 font-semibold">Satisfied</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
