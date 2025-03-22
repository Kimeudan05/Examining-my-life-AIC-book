import React from 'react';
import { useParams } from 'react-router-dom';
import data from '../data.json';

const WeekList = () => {
  const { weekId } = useParams();
  const week = data.weeks.find((w) => w.week === parseInt(weekId));

  if (!week) return <div>Week not found</div>;

  return (
    <div className='bg-green'>
      <h1 className="text-2xl font-bold mb-4">Week {week.week}: {week.title}</h1>
      <p className="mb-4">{week.introduction}</p>
      <p className="italic mb-4">{week.memoryVerse}</p>
    </div>
  );
};

export default WeekList;