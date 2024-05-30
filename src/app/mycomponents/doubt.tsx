"use client"
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import DrawerDialogDemo from './reply/opendrawer';

interface DoubtProps {
  doubt: {
    doubtid: number;
    title: string;
    doubt: string;
    upvote: number;
  };
}

const Doubt = ({ doubt }: DoubtProps) => {
  const [upvoteCount, setUpvoteCount] = useState(doubt.upvote);

  const handleUpvote = () => {
    setUpvoteCount(upvoteCount + 1);
  };
 const router = useRouter();
  return (
    <div className="border p-6 my-4 rounded-lg shadow-lg flex justify-between items-start bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 ease-in-out">
      <div className="w-full">
        <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-100">{doubt.title}</h2>
        <p className="text-sm text-gray-700 mb-4 dark:text-gray-300">{doubt.doubt}</p>
        <div className="flex space-x-4">
          <button  onClick={()=>{
            router.push(`/doubts/${doubt.doubtid}`)
          }} className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300 w-full sm:w-auto mb-4 sm:mb-0">Show Reply</button>
          <DrawerDialogDemo doubtid={doubt.doubtid}/>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600 mb-2">Upvotes: {upvoteCount}</p>
        <button onClick={handleUpvote} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 dark:hover:bg-green-600 transition-colors duration-300">Upvote</button>
      </div>
    </div>
  );
};

export default Doubt;