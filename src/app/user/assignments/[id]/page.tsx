'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/baseapi';
import { toast } from 'react-toastify';

export default function AssignmentDetail() {
  const params = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<any>(null);
  const [submission, setSubmission] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchAssignment(params.id as string);
    }
  }, [params.id]);

  const fetchAssignment = async (id: string) => {
    try {
      const { data } = await api.get(`/user/assignments/${id}`);
      setAssignment(data.data || data.assignment);
    } catch (error: any) {
      toast.error('Failed to load assignment');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!submission.trim()) {
      toast.error('Please enter your submission');
      return;
    }

    try {
      setSubmitting(true);
      await api.post(`/user/assignments/${params.id}/submit`, { submission });
      toast.success('Assignment submitted successfully!');
      router.push('/user/assignments');
    } catch (error: any) {
      toast.error('Failed to submit assignment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !assignment) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="mb-6 text-blue-600 hover:underline">← Back</button>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border">
        <h1 className="text-3xl font-bold mb-4">{assignment.title}</h1>
        <p className="text-gray-600 mb-6">{assignment.description}</p>

        <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-gray-50 rounded-xl">
          <div>
            <p className="text-sm text-gray-600">Type</p>
            <p className="font-bold capitalize">{assignment.type}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Due Date</p>
            <p className="font-bold">{new Date(assignment.dueDate).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Points</p>
            <p className="font-bold">{assignment.points}</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="block font-bold mb-2">Your Submission</label>
          <textarea
            value={submission}
            onChange={(e) => setSubmission(e.target.value)}
            className="w-full border rounded-xl p-4 h-40"
            placeholder="Enter your assignment submission here..."
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={submitting}
          className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Submitting...' : 'Submit Assignment'}
        </button>
      </div>
    </div>
  );
}
