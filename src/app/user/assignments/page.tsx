'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/baseapi';
import { toast } from 'react-toastify';

export default function UserAssignments() {
  const router = useRouter();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data } = await api.get('/user/assignments');
      setAssignments(data.data?.assignments || data.assignments || []);
    } catch (error: any) {
      toast.error('Failed to load assignments');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">My Assignments</h1>

      {assignments.length > 0 ? (
        <div className="grid gap-4">
          {assignments.map((assignment: any) => (
            <div key={assignment._id} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{assignment.title}</h3>
                  <p className="text-gray-600 mb-4">{assignment.description}</p>
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>Type: {assignment.type}</span>
                    <span>Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                    <span>Points: {assignment.points}</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/user/assignments/${assignment._id}`)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-gray-500">No assignments yet</p>
        </div>
      )}
    </div>
  );
}
