"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
interface Doubt {
    _id: string;
    head: string;
    doubt: string;
    isSolved: boolean;
    upVote: number;
}

function DoubtsList() {
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);
    const [doubts, setDoubts] = useState<Doubt[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try { console.log("inside clling detch doubt my")
                const response = await fetch('/api/users/myDoubt'); // Assuming your API route is '/api/doubts'
                const data = await response.json();4
                console.log("above the data")
                console.log(data);
                console.log("below the data")
                if (data.status==200) {
                    setDoubts(data.body.doubts);
                } else {
                    setError(data.body.message);
                }
            } catch (error) {
                console.log("errorr")
                console.error('Error fetching data:', error);
                setError("Error happened");
            } finally {
                console.log("error occured finally")
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex flex-col justify-center items-center p-5 w-full bg-yellow-50 dark:bg-slate-500 ">
            <h1 className="text-3xl text-blue-600 p-5">My Doubts</h1>
            <ul className="w-full">
                {doubts.length === 0 ? (
                    <li>No doubts found</li>
                ) : (
                    doubts.map(doubt => (
                        <li key={doubt._id}>
                            <div>
                                <div className="canvas-paper"></div>
                                <div className="canvas-paper">
                                    <div className="bg-white text-gray-900 rounded-lg shadow-lg dark:bg-gray-700 dark:text-gray-100 p-6">
                                        <div className="items-center justify-between flex">
                                            <p className="text-2xl xl:text-4xl font-bold mb-4 glow">{doubt.head || "No title"}</p>
                                            <div className="text-xl xl:text-3xl items-center glow flex">
                                                <span>Status: <strong>{doubt.isSolved ? "Solved" : "Unsolved"}</strong></span>
                                                <button type="button" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:bg-indigo-700 ml-4 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm">Upvote {doubt.upVote}</button>
                                            </div>
                                        </div>
                                        <p className="text-lg xl:text-xl mb-6">{doubt.doubt}</p>
                                        <button type="button" onClick={() => 
                                     router.push(`/user/dashboard/${doubt._id}`)


                                        } className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:bg-indigo-700 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm">Show Replies</button>
                                        <div className="mt-4 pt-4 hidden border-t border-gray-300" id={`replies-${doubt._id}`}>
                                            <div className="bg-gray-50 rounded-lg shadow-lg dark:bg-gray-800 p-4">
                                                <p className="text-lg xl:text-xl font-semibold glow">Reply 1</p>
                                                <p className="text-md xl:text-lg">You can use JWT for authentication. It&apos;s secure and widely used. Here is an example...</p>
                                            </div>
                                            <div className="bg-gray-50 rounded-lg shadow-lg mt-4 dark:bg-gray-800 p-4">
                                                <p className="text-lg xl:text-xl font-semibold glow">Reply 2</p>
                                                <p className="text-md xl:text-lg">Consider using OAuth for third-party authentication. It simplifies the process...</p>
                                            </div>
                                        </div>
                                    </div>
                                    <span>:::::::</span>
                                </div>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );

    function toggleReplies(id: string) {
        const repliesElement = document.getElementById(`replies-${id}`);
        if (repliesElement) {
            repliesElement.classList.toggle('hidden');
        }
    }
}

export default DoubtsList;
