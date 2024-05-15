"use client"
import React, { useState, useEffect } from 'react';

function DoubtsList() {
    const [loading, setLoading] = useState(true);
    const [doubts, setDoubts] = useState([null]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('/api/users/myDoubt'); // Assuming your API route is '/api/doubts'
                const data = await response.json();
                console.log(data)
                if (data.body.success) {
                    setDoubts(data.body.doubts);
                } else {
                    setError(data.body.message);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError("error happend");
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
        <div className=' flex flex-col justify-center items-center  p-5 w-full bg-slate-600'>
            <h1 className=' text-3xl  text-blue-600 p-5  '>My Doubts</h1>
            <ul className=' w-full'>
            {doubts.map(doubt => (
    <li key={doubt._id} >
        {doubt && ( // Check if doubt is not null
            <div>
                <div className="canvas-paper"></div>
                <div className="canvas-paper">
                    <div>
                        <div className="bg-white text-gray-900 rounded-lg shadow-lg dark:bg-gray-900 dark:text-gray-100 p-6">
                            <div className="items-center justify-between flex">
                                <p className="text-2xl xl:text-4xl font-bold mb-4 glow">{doubt.head || "no"}</p> {/* Accessing doubt.head only if doubt is not null */}
                                <div className="text-xl xl:text-3xl items-center glow flex">
                                    <span>Status: <strong>{doubt.isSolved}</strong></span>
                                    <button type="submit" className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:bg-indigo-700 ml-4 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm">Upvote {doubt.upVote}</button>
                                </div>
                            </div>
                            <p className="text-lg xl:text-xl mb-6">{doubt.doubt}</p>
                            <button type="submit" onClick={() => toggleReplies()} className="focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all hover:bg-indigo-700 py-2 px-4 bg-indigo-600 text-white rounded-md shadow-sm">Show Replies</button>
                            <div className="mt-4 pt-4 hidden border-t border-gray-300" id="replies">
                                <div className="bg-gray-50 rounded-lg shadow-lg dark:bg-gray-800 p-4">
                                    <p className="text-lg xl:text-xl font-semibold glow">Reply 1</p>
                                    <p className="text-md xl:text-lg">You can use JWT for authentication. It's secure and widely used. Here is an example...</p>
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
            </div>
        )}
    </li>
))}

            </ul>
        </div>
    );
}

export default DoubtsList;
