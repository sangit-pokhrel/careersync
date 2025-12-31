'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/baseapi';
import { toast } from 'react-toastify';

export default function ScheduledInterviews() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchScheduled();
  }, []);

  const fetchScheduled = async () => {
    try {
      const { data } = await api.get('/user/interviews/scheduled');
      setInterviews(data.data?.interviews || data.interviews || []);
    } catch (error: any) {
      toast.error('Failed to load scheduled interviews');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold mb-6">Scheduled Interviews</h1>
      
      {interviews.length > 0 ? (
        <div className="grid gap-4">
          {interviews.map((interview: any) => (
            <div key={interview._id} className="bg-white rounded-2xl p-6 shadow-sm border">
              <h3 className="text-xl font-bold mb-2">Video Interview</h3>
              <p className="text-gray-600 mb-4">
                {new Date(interview.scheduledDate).toLocaleDateString()} at {interview.scheduledTime}
              </p>
              {interview.meetingLink && (
                <a
                  href={interview.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700"
                >
                  Join Meeting
                </a>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center">
          <p className="text-gray-500">No scheduled interviews</p>
        </div>
      )}
    </div>
  );
}
