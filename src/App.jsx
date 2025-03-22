import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import Home from './components/Home';
import WeekList from './components/WeekList';
import DayContent from './components/DayContent';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Fixed Navbar */}
        <Navbar />

        {/* Main Content with Sidebar */}
        <div className="flex flex-1 overflow-hidden" >
          {/* Bar Icon for Smaller Screens */}
          <div
            className="fixed left-0 top-20 z-40 p-2 md:hidden"
            onMouseEnter={() => setIsSidebarOpen(true)}
          >
            <svg className="w-6 h-6 text-gray-800 cursor-pointer" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </div>

          {/* Fixed Sidebar (visible on larger screens) */}
          <div
            className={` fixed inset-0 z-30 opacity-100 transform ${
              isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
            } md:translate-x-0 md:relative md:z-0 transition-transform duration-300 ease-in-out`}
            onMouseLeave={() => setIsSidebarOpen(false)}
          >
            <Sidebar onClose={() => setIsSidebarOpen(false)} />
          </div>

          {/* Scrollable Main Content */}
          <main className="flex-1 p-6 overflow-y-auto mt-16 mb-16 md:ml-0"> 
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/week/:weekId" element={<WeekList />} />
              <Route path="/week/:weekId/day/:dayId" element={<DayContent />} />
            </Routes>
          </main>
        </div>

        {/* Fixed Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;