import React, { useState, useEffect } from 'react';

const AnswerForm = ({ dayId }) => {
  const [answer, setAnswer] = useState('');
  const [savedAnswer, setSavedAnswer] = useState('');

  useEffect(() => {
    const storedAnswer = localStorage.getItem(`day-${dayId}-answer`);
    if (storedAnswer) setSavedAnswer(storedAnswer);
  }, [dayId]);

  const handleSave = () => {
    localStorage.setItem(`day-${dayId}-answer`, answer);
    setSavedAnswer(answer);
  };

  const handleDelete = () => {
    localStorage.removeItem(`day-${dayId}-answer`);
    setSavedAnswer('');
    setAnswer('');
  };

  return (
    <div className="mt-6">
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-blue"
        placeholder="Type your answer here..."
      />
      <div className="flex space-x-2">
        <button onClick={handleSave} className="bg-green-500 text-white px-4 py-2 rounded">
          Save
        </button>
        <button onClick={handleDelete} className="bg-red-500 text-white px-4 py-2 rounded">
          Delete
        </button>
      </div>
      {savedAnswer && (
        <div className="mt-4">
          <h3 className="font-bold">Your Answer:</h3>
          <p>{savedAnswer}</p>
        </div>
      )}
    </div>
  );
};

export default AnswerForm;