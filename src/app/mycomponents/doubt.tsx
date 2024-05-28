// components/Doubt.tsx
import { useState } from 'react';

interface DoubtProps {
  doubt: {
    doubtid: number;
    title: string;
    doubt: string;
    year: number;
    upvote: number;
  };
}

const Doubt = ({ doubt }: DoubtProps) => {
  const [upvoteCount, setUpvoteCount] = useState(doubt.upvote);

  const handleUpvote = () => {
    setUpvoteCount(upvoteCount + 1);
  };

  return (
    <div className="border p-4 my-2 rounded shadow flex justify-between items-start">
      <div>
        <h2 className="text-xl font-bold">{doubt.title}</h2>
        <p>{doubt.doubt}</p>
        <div className="flex justify-between mt-4">
          <p className="text-sm text-gray-600">Year: {doubt.year}</p>
        </div>
        <div className="flex justify-between mt-2">
          <button className="bg-blue-500 text-white py-1 px-2 rounded">Reply</button>
          <button className="bg-gray-500 text-white py-1 px-2 rounded ml-4">Show Replies</button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600 mb-1">Upvotes: {upvoteCount}</p>
        <button onClick={handleUpvote} className="bg-green-500 text-white py-1 px-2 rounded">Upvote</button>
      </div>
    </div>
  );
};

export default Doubt;
