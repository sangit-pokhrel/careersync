'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/baseapi';
import { toast } from 'react-toastify';

export default function UserInterviews() {
  const router = useRouter();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInterviews();
  }, []);

  const fetchInterviews = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/user/interviews');
      setInterviews(data.data?.interviews || data.interviews || []);
    } catch (error: any) {
      toast.error('Failed to load interviews');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">My Interviews</h1>

      {interviews.length > 0 ? (
        <div className="grid gap-4">
          {interviews.map((interview: any) => (
            <div key={interview._id} className="bg-white rounded-2xl p-6 shadow-sm border">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold mb-2">{interview.title}</h3>
                  <p className="text-gray-600">{interview.description}</p>
                  <div className="mt-4 flex gap-4">
                    <span className="text-sm text-gray-500">Type: {interview.assessmentType}</span>
                    <span className="text-sm text-gray-500">Time Limit: {interview.timeLimit} mins</span>
                  </div>
                </div>
                <button
                  onClick={() => router.push(`/user/interviews/${interview.accessToken}`)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
                >
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-gray-500">No interviews available</p>
        </div>
      )}
    </div>
  );
}
