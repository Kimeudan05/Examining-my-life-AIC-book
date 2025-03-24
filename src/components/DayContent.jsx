import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import data from '../data.json';
import Question from './Question';

const DayContent = () => {
  const { weekId, dayId } = useParams();
  const week = data.weeks.find((w) => w.week === parseInt(weekId));
  const day = week?.days.find((d) => d.day === parseInt(dayId));

  const [verses, setVerses] = useState({}); // Stores fetched verses for each reference
  const [error, setError] = useState('');

  const fetchVerse = async (reference, questionId) => {
    const verseKey = `${questionId}-${reference}`;

    // Toggle visibility: If the verse is already displayed, hide it
    if (verses[verseKey]) {
      setVerses((prev) => {
        const updatedVerses = { ...prev };
        delete updatedVerses[verseKey]; // Remove the verse from the state
        return updatedVerses;
      });
      return;
    }

    // Fetch the verse if it's not already displayed
    setError('');
    try {
      const response = await axios.get(`https://bible-api.com/${reference}`);
      if (response.data && response.data.text) {
        setVerses((prev) => ({
          ...prev,
          [verseKey]: {
            reference,
            text: response.data.text,
          },
        }));
      } else {
        throw new Error('No verse found');
      }
    } catch (err) {
      setError('Failed to fetch verse. Please try again.');
    }
  };

  if (!week || !day) return <div>Day not found</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Display Week Introduction Before the First Day */}
      {day.day === 1 && (
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-4 text-gray-800 uppercase">Week {week.week}: {week.title}</h1>
          <p className="mb-4 text-gray-600">{week.introduction}</p>
          <p className="italic text-gray-600">{week.memoryVerse}</p>
        </div>
      )}

      <h2 className="text-2xl font-bold mb-4 text-gray-800 uppercase">Day {day.day}: {day.title}</h2>
      <p className="mb-6 text-gray-600">{day.content}</p>
      {day.questions && (
        <ul className="space-y-6">
          {day.questions.map((question, index) => (
            <li key={index} className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-lg font-semibold text-gray-800 mb-4">{question.question}</p>
              {question.reference && (
                <div className="mb-4">
                  <button
                    onClick={() => fetchVerse(question.reference, index)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    {question.reference}
                  </button>
                  {verses[`${index}-${question.reference}`] && (
                    <div className="mt-2 bg-blue-50 p-4 rounded-lg">
                      <p className="text-blue-800 font-semibold">{verses[`${index}-${question.reference}`].reference}</p>
                      <p className="text-blue-700 italic mt-2">{verses[`${index}-${question.reference}`].text}</p>
                    </div>
                  )}
                </div>
              )}
              {question.references && (
                <div className="mb-4">
                  {question.references.map((reference, refIndex) => (
                    <div key={refIndex} className="mb-2">
                      <button
                        onClick={() => fetchVerse(reference, index)}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {reference}
                      </button>
                      {verses[`${index}-${reference}`] && (
                        <div className="mt-2 bg-blue-50 p-4 rounded-lg">
                          <p className="text-blue-800 font-semibold">{verses[`${index}-${reference}`].reference}</p>
                          <p className="text-blue-700 italic mt-2">{verses[`${index}-${reference}`].text}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {/* Main Question Textbox */}
              <Question
                question={question.question}
                dayId={dayId}
                weekId={weekId}
                questionId={`main-${index}`}
              />
              {/* Sub-Questions */}
              {question.subQuestions && (
                <div className="mt-4">
                  {question.subQuestions.map((subQuestion, subIndex) => (
                    <div key={subIndex} className="mt-4">
                      <p className="text-gray-700 font-medium">
                        {String.fromCharCode(97 + subIndex)}. {subQuestion.question}
                      </p>
                      <Question
                        question={subQuestion.question}
                        dayId={dayId}
                        weekId={weekId}
                        questionId={`sub-${index}-${subIndex}`}
                      />
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default DayContent;