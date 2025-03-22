
import React from 'react';
import data from '../assets/data.json'; 

const BookContent = () => {
  return (
    <div className="p-6 bg-gray-100">

      {data.weeks.map((week) => (
        <div key={week.week} className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4">Week {week.week}: {week.title}</h2>
          <p className="text-gray-700 mb-4">{week.introduction}</p>
          <p className="text-gray-600 italic mb-4">{week.memoryVerse}</p>
          {week.days.map((day) => (
            <div key={day.day} className="mb-6">
              <h3 className="text-xl font-semibold mb-2">Day {day.day}: {day.title}</h3>
              {day.content && <p className="text-gray-700 mb-4">{day.content}</p>}
              {day.questions && (
                <ul className="list-disc pl-6">
                  {day.questions.map((question, index) => (
                    <li key={index} className="mb-2">
                      <p className="text-gray-700">{question.question}</p>
                      {question.reference && (
                        <p className="text-sm text-gray-500">Reference: {question.reference}</p>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default BookContent;

