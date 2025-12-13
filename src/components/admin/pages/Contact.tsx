'use client';

import { useState } from 'react';

interface ContactQuery {
  id: number;
  message: string;
  contactId: string;
  date: string;
  priority: 'Low' | 'Medium' | 'High';
  status: 'Open' | 'Closed';
}

export default function Contact() {
  const [searchContactId, setSearchContactId] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const queries: ContactQuery[] = [
    {
      id: 1,
      message: 'Analysis page is not getting loaded.',
      contactId: 'TKT-001-A06',
      date: '2025-11-09 ( 11:03 AM )',
      priority: 'Low',
      status: 'Open',
    },
    {
      id: 2,
      message: 'Analysis page is not getting loaded.',
      contactId: 'TKT-001-A06',
      date: '2025-11-09 ( 11:03 AM )',
      priority: 'Low',
      status: 'Open',
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-2">
        Contact Queries ({' '}
        <span className="text-orange-500">568</span> |{' '}
        <span className="text-blue-500">30</span> |{' '}
        <span className="text-red-500">90</span> )
      </h1>
      <p className="text-gray-600 mb-6">Manage The contact queries by responding to them.</p>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Contact Id
          </label>
          <input
            type="text"
            placeholder="Enter contact Id"
            value={searchContactId}
            onChange={(e) => setSearchContactId(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date
          </label>
          <div className="relative">
            <input
              type="text"
              placeholder="Select Date"
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              📅
            </span>
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              User Email
            </label>
            <input
              type="text"
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button className="bg-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center gap-2">
            <span>➕</span>
            New Ticket
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {queries.map((query) => (
          <div
            key={query.id}
            className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{query.message}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{query.contactId}</span>
                  <span className="mx-2">•</span>
                  {query.date}
                </p>
                <div className="flex gap-2 mt-3">
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    ✏️
                  </button>
                  <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                    🗑️
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="px-4 py-2 bg-green-500 text-white rounded-xl text-sm font-medium">
                  {query.priority}
                </span>
                <span className="px-4 py-2 bg-blue-500 text-white rounded-xl text-sm font-medium">
                  {query.status}
                </span>
                <button className="bg-orange-400 text-white px-6 py-2 rounded-xl font-medium hover:bg-orange-500 transition-colors">
                  Issue Details
                </button>
              </div>
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
  );
}