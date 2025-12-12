'use client';

import { useState } from 'react';

interface Ticket {
  id: number;
  title: string;
  ticketId: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Closed';
}

export default function Support() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const tickets: Ticket[] = [
    {
      id: 1,
      title: 'Analysis page is not getting loaded.',
      ticketId: 'TKT-001-A06',
      date: '2025-11-09 ( 11:03 AM )',
      priority: 'Low',
      status: 'Open',
    },
    {
      id: 2,
      title: 'Analysis page is not getting loaded.',
      ticketId: 'TKT-001-A06',
      date: '2025-11-09 ( 11:03 AM )',
      priority: 'Low',
      status: 'Open',
    },
  ];

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Support Ticket</h1>
        <p className="text-gray-600">
          Got some issues? Just let us know via support ticket , we here to resolve it
        </p>
        <svg width="450" height="12" className="mt-2">
          <path
            d="M 0 6 Q 20 2, 40 6 T 80 6 T 120 6 T 160 6 T 200 6 T 240 6 T 280 6 T 320 6 T 360 6 T 400 6 T 450 6"
            stroke="#000"
            strokeWidth="2"
            fill="none"
          />
        </svg>
      </div>

      <div className="flex justify-end mb-6">
        <button className="bg-blue-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
          <span>➕</span>
          New Ticket
        </button>
      </div>

      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Search Ticket Title or Ticket Id ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
          </div>
          <button className="px-6 py-3 border border-gray-300 rounded-xl flex items-center gap-2 hover:bg-gray-50">
            <span>📅</span>
            Sort By Date
            <span>▼</span>
          </button>
        </div>

        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="p-4 bg-gray-50 rounded-xl flex items-center justify-between"
            >
              <div className="flex-1">
                <h4 className="font-bold text-lg mb-2">{ticket.title}</h4>
                <p className="text-sm text-gray-600 mb-1">
                  <span className="font-medium">{ticket.ticketId}</span>
                  <span className="mx-2">•</span>
                  {ticket.date}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium">
                  {ticket.priority}
                </span>
                <span className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium">
                  {ticket.status}
                </span>
                <button className="bg-orange-400 text-white px-6 py-2 rounded-xl font-medium hover:bg-orange-500 transition-colors">
                  Ticket Details
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center gap-2 mt-8">
          <button className="px-4 py-2 bg-blue-100 text-gray-700 rounded-lg hover:bg-blue-200 transition-colors">
            Prev
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-blue-100 text-gray-700 hover:bg-blue-200'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-2 bg-blue-100 text-gray-700 rounded-lg hover:bg-blue-200 transition-colors">
            Next
          </button>
        </div>
      </div>
    </>
  );
}