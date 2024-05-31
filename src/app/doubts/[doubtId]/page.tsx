'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Doubt {
    seniorOnly: boolean;
    _id: string;
    userId: string;
    head: string;
    doubt: string;
    image: string;
    isAnonymous: boolean;
    isSolved: boolean;
    upVote: number;
    year: number;
    skillsRequired: string[];
    createdAt: string;
    updatedAt: string;
}

interface Reply {
    _id: string;
    doubtId: string;
    userId: string;
    isAnonymous: boolean;
    answer: string;
    createdAt: string;
    updatedAt: string;
}

export default function UserProfile() {
    const params = useParams();
    const [doubtLoading, setDoubtLoading] = useState(true);
    const [replyLoading, setReplyLoading] = useState(true);
    const [doubt, setDoubt] = useState<Doubt | null>(null);
    const [replies, setReplies] = useState<Reply[]>([]);

    async function fetchDoubt() {
        try {
            const response = await fetch("/api/users/FetchDoubt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ doubtId: params.doubtId }),
            });
            const data = await response.json();
            if (data.status === 200) {
                setDoubt(data.body.doubt);
            } else {
                console.error("Doubt not found");
            }
        } catch (error) {
            console.error("Error fetching doubt:", error);
        } finally {
            setDoubtLoading(false);
        }
    }

    async function fetchReply() {
        try {
            const response = await fetch("/api/users/fetchReply", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ doubtId: params.doubtId }),
            });
            const data = await response.json();
            console.log(data.status)
            if (data.status == 200) {
                setReplies(data.body.reply);
            } else {
                console.error("Replies not found");
            }
        } catch (error) {
            console.error("Error fetching replies:", error);
        } finally {
            setReplyLoading(false);
        }
    }

    useEffect(() => {
        fetchDoubt();
        fetchReply();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-4 bg-gray-50 dark:bg-gray-900">
  <h1 className="text-5xl font-bold mb-8 text-blue-600 dark:text-blue-400">Doubt</h1>
  {doubtLoading ? (
    <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 animate-pulse">Loading doubt...</p>
  ) : (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 mb-6 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">{doubt?.head}</h2>
        <div className="text-lg font-medium text-gray-600 dark:text-gray-400">Upvotes: {doubt?.upVote}</div>
      </div>
      <p className="text-gray-600 dark:text-gray-400 text-lg mb-4">{doubt?.doubt}</p>
    </div>
  )}
  {replyLoading ? (
    <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 animate-pulse">Loading replies...</p>
  ) : (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg p-6 w-full max-w-4xl">
      <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Replies</h3>
      {replies.length > 0 ? (
        replies.map((reply) => (
          <div key={reply._id} className="bg-gray-100 dark:bg-gray-700 p-4 mb-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition">
            <p className="text-gray-800 dark:text-gray-200 text-lg">{reply.answer}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Posted at: {new Date(reply.createdAt).toLocaleString()}</p>
          </div>
        ))
      ) : (
        <p className="text-xl font-bold text-gray-700 dark:text-gray-300">No solutions found</p>
      )}
    </div>
  )}
</div>

    );
}
