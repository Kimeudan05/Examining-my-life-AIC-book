import React, { useState, useEffect } from 'react';

const Question = ({ question, dayId, weekId, questionId }) => {
  const [answer, setAnswer] = useState('');
  const [savedAnswer, setSavedAnswer] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Unique key for local storage
  const storageKey = `week-${weekId}-day-${dayId}-question-${questionId}`;

  // Load saved answer from local storage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      setSavedAnswer(saved);
      setAnswer(saved);
    }
  }, [storageKey]);

  const handleSave = () => {
    localStorage.setItem(storageKey, answer);
    setSavedAnswer(answer);
    setIsEditing(false);
  };

  const handleDelete = () => {
    localStorage.removeItem(storageKey);
    setSavedAnswer('');
    setAnswer('');
  };

  return (
    <div className="mt-4 bg-green-100 p-4 rounded-lg">
      {savedAnswer && !isEditing ? (
        <div className="mb-4">
          <p className="text-gray-700 bg-gray-100 p-4 rounded-lg">{savedAnswer}</p>
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => setIsEditing(true)}
              className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
            >
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <div>
          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your answer here..."
            maxLength={150}
            rows={4}
          />
          <p className="text-sm text-gray-500 mt-1">{answer.length}/150 characters</p>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-2"
          >
            Save
          </button>
        </div>
      )}
    </div>
  );
};

export default Question;