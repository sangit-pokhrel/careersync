'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import api from '@/lib/baseapi';
import { toast } from 'react-toastify';

export default function TakeAssessment() {
  const router = useRouter();
  const params = useParams();
  const [interview, setInterview] = useState<any>(null);
  const [answers, setAnswers] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (params.token) {
      fetchInterview(params.token as string);
    }
  }, [params.token]);

  const fetchInterview = async (token: string) => {
    try {
      const { data } = await api.get(`/user/interviews/${token}`);
      setInterview(data.data || data.interview);
    } catch (error: any) {
      toast.error('Failed to load assessment');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      await api.post(`/user/interviews/${params.token}/submit`, { answers });
      toast.success('Assessment submitted successfully!');
      router.push('/user/interviews');
    } catch (error: any) {
      toast.error('Failed to submit assessment');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading || !interview) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">{interview.title}</h1>
      
      <div className="space-y-6">
        {interview.questions?.map((q: any, idx: number) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border">
            <p className="font-bold mb-4">{idx + 1}. {q.question}</p>
            {q.type === 'mcq' ? (
              <div className="space-y-2">
                {q.options?.map((opt: string, i: number) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      value={opt}
                      onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                      className="w-4 h-4"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            ) : (
              <textarea
                className="w-full border rounded-xl p-3"
                rows={4}
                onChange={(e) => setAnswers({ ...answers, [idx]: e.target.value })}
                placeholder="Enter your answer..."
              />
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        disabled={submitting}
        className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Assessment'}
      </button>
    </div>
  );
}
