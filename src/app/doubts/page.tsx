'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import Doubt from '../mycomponents/doubt';

interface Doubt {
  doubtid: number;
  title: string;
  doubt: string;
  upvote: number;
}

const Home = () => {
  const [doubts, setDoubts] = useState<Doubt[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchDoubts = async () => {
      try {
        const response = await fetch('/api/users/listDoubt');
        const data = await response.json();
        console.dir(data);
        console.log(data.body.Doubtlist);
        const list = data.body.Doubtlist;

        setDoubts(
          list.map((doubt: any, index: number) => ({
            doubtid: index + 1,
            title: doubt.head,
            doubt: doubt.doubt,
            upvote: doubt.upVote,
          }))
        );
      } catch (error) {
        console.error('Failed to fetch doubts:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoubts();
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDoubts = doubts.filter((doubt) =>
    doubt.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4 bg-white text-black">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Doubt List</h1>
      </div>
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
