import React, { useState } from 'react';

const Home = () => {
  const [formData, setFormData] = useState({ name: '', church: '', region: '', area: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">
          Welcome {formData.name}, from {formData.church}, {formData.region}, {formData.area}
        </h1>
        <p className="text-gray-700">
          This book is designed to help you grow spiritually by exploring key themes such as resisting temptation, forgiveness, and more. Each week is divided into days with questions and Bible verses to guide your study.

        </p>
        <h2 className='text-center text-blue-700 font-bold text-3xl'>Introduction Letter</h2>
    
           <h3>Dear Youth, <br /></h3> 
            <p>Greetings in the Saviour’s name! I am pleased to introduce you to this Youth Bible Study book entitled <strong className='text-blue-600'>“Examining My Life.”</strong>,
               which is part of a new Scholastic Series for Christian youth groups.
                The series has been named “Scholastic Series” because each book will help you study God’s Word.
                 Each lesson will challenge you to think, and that thinking will make you see how God’s 
                 Word can affect your life.
            </p>
            <p>As you go through this book, you will notice it is written differently than most books. For example: </p>
            <ol>
              <li> This book is a workbook. Your textbook is the Bible. As you search the Bible, the Holy Spirit will teach you the truth.</li>
              <li> Each lesson is broken up into 6 days or parts. This will encourage you to study the Bible systematically each day.</li>
              <li>The seventh day or part is missing. This is the day you will come together with other young people and an adult believer to study the lesson.</li>
            </ol>
           <p>You have already studied the lesson for six days, so the discussion will be meaningful for the whole group.</p>
            
           <p>Search the Scripture as you faithfully examine specimens for Biology. What you learn will be of the greatest benefit to your life.</p> 
           <p>I wish you enlightenment and joy from God as you study this book: <strong className='text-blue-600'>“Examining My Life.”</strong> </p> 

      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Study Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Church"
          value={formData.church}
          onChange={(e) => setFormData({ ...formData, church: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Region"
          value={formData.region}
          onChange={(e) => setFormData({ ...formData, region: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Area"
          value={formData.area}
          onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Home;