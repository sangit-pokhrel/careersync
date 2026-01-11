'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import api from '@/lib/baseapi';
import { toast } from 'react-toastify';

export default function InterviewResult() {
  const params = useParams();
  const router = useRouter();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      fetchResult(params.id as string);
    }
  }, [params.id]);

  const fetchResult = async (id: string) => {
    try {
      const { data } = await api.get(`/user/interviews/results/${id}`);
      setResult(data.data || data.result);
    } catch (error: any) {
      toast.error('Failed to load result');
      router.back();
    } finally {
      setLoading(false);
    }
  };

  if (loading || !result) {
    return <div className="flex items-center justify-center min-h-screen"><div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => router.back()} className="mb-6 text-blue-600 hover:underline">← Back</button>
      
      <h1 className="text-3xl font-bold mb-6">Interview Result</h1>
      
      <div className="bg-white rounded-2xl p-8 shadow-sm border">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="text-center">
            <p className="text-gray-600 mb-2">MCQ Score</p>
            <p className="text-3xl font-bold text-blue-600">{result.mcqScore || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Written Score</p>
            <p className="text-3xl font-bold text-green-600">{result.writtenScore || 0}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-600 mb-2">Total %</p>
            <p className="text-3xl font-bold text-purple-600">{result.percentage || 0}%</p>
          </div>
        </div>

        <div className="border-t pt-6">
          <p className="text-sm text-gray-600">Status</p>
          <p className={`text-lg font-bold capitalize ${
            result.reviewStatus === 'approved' ? 'text-green-600' : 
            result.reviewStatus === 'rejected' ? 'text-red-600' : 'text-yellow-600'
          }`}>
            {result.reviewStatus || 'Pending'}
          </p>
        </div>
      </div>
    </div>
  );
}
