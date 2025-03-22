import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import data from '../data.json';

const Sidebar = ({ onClose }) => {
  const [expandedWeek, setExpandedWeek] = useState(null);

  const toggleWeek = (weekId) => {
    setExpandedWeek(expandedWeek === weekId ? null : weekId);
  };

  return (
    <div className="w-48 bg-gray-700 text-white p-2 h-full overflow-y-auto text-center">
      <h2 className="text-xl font-bold mb-4">Weeks</h2>
      <ul>
        {data.weeks.map((week) => (
          <li key={week.week} className="mb-2">
            <div
              onClick={() => toggleWeek(week.week)}
              className="cursor-pointer hover:text-gray-400"
            >
              Week {week.week}
            </div>
            {expandedWeek === week.week && (
              <ul className="pl-4">
                {week.days.map((day) => (
                  <li key={day.day}>
                    <Link
                      to={`/week/${week.week}/day/${day.day}`}
                      className="hover:text-gray-400"
                      onClick={onClose}
                    >
                      Day {day.day}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;