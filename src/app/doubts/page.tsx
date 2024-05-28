"use client"


import { useState, useEffect, ChangeEvent } from 'react';
import Doubt from '../mycomponents/doubt';

interface Doubt {
  doubtid: number;
  title: string;
  doubt: string;
  userid: string;
  year: number;
  upvote: number;
}

const Home = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
  
setDoubts([ { doubtid: 1, title: 'How to use React?', doubt: 'I am confused about useState and useEffect...', userid: 'user1', year: 2022, upvote: 5 },
{ doubtid: 2, title: 'What is Next.js?', doubt: 'Can someone explain the benefits of Next.js?', userid: 'user2', year: 2022, upvote: 3 },
{ doubtid: 3, title: 'Difference between var, let, and const?', doubt: 'Can someone explain the difference between var, let, and const in JavaScript?', userid: 'user3', year: 2022, upvote: 7 },
{ doubtid: 4, title: 'How to fetch data in React?', doubt: 'What are the different ways to fetch data in a React application?', userid: 'user4', year: 2022, upvote: 2 },
{ doubtid: 5, title: 'CSS Grid vs Flexbox?', doubt: 'When should I use CSS Grid and when should I use Flexbox?', userid: 'user5', year: 2022, upvote: 8 },
{ doubtid: 6, title: 'What is TypeScript?', doubt: 'How is TypeScript different from JavaScript?', userid: 'user6', year: 2022, upvote: 4 },
{ doubtid: 7, title: 'What is REST API?', doubt: 'Can someone explain what REST API is and how it works?', userid: 'user7', year: 2022, upvote: 6 },
{ doubtid: 8, title: 'State Management in React?', doubt: 'What are the different state management solutions available for React?', userid: 'user8', year: 2022, upvote: 5 },
{ doubtid: 9, title: 'Deploying Next.js App?', doubt: 'How can I deploy a Next.js application?', userid: 'user9', year: 2022, upvote: 3 },
{ doubtid: 10, title: 'What is GraphQL?', doubt: 'Can someone explain what GraphQL is and how it is different from REST?', userid: 'user10', year: 2022, upvote: 9 },])
    setLoading(false)
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoubts = doubts.filter(doubt =>
    doubt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Doubt List</h1>
      <input
        type="text"
        className="border p-2 mb-4 w-full"
        placeholder="Search doubts by title..."
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="loader"></div>
          <span className="text-xl font-bold ml-2">Loading...</span>
        </div>
      ) : (
        filteredDoubts.map((doubt) => <Doubt key={doubt.doubtid} doubt={doubt} />)
      )}
    </div>
  );
};

export default Home;
