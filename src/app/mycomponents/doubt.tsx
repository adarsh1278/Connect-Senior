import { useState } from 'react';

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

  return (
    <div className="border p-6 my-4 rounded-lg shadow-lg flex justify-between items-start bg-white">
      <div>
        <h2 className="text-xl font-bold mb-2">{doubt.title}</h2>
        <p className="text-sm text-gray-700 mb-4">{doubt.doubt}</p>
        <div className="flex space-x-4">
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-300">Reply</button>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">Show Replies</button>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <p className="text-sm text-gray-600 mb-2">Upvotes: {upvoteCount}</p>
        <button onClick={handleUpvote} className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-300">Upvote</button>
      </div>
    </div>
  );
};

export default Doubt;
