// 'use client';

// import { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import api from '@/lib/baseapi';
// import { toast } from 'react-toastify';

// export default function CreateInterviewAssessment() {
//   const router = useRouter();
//   const [loading, setLoading] = useState(false);
//   const [students, setStudents] = useState([]);
//   const [loadingStudents, setLoadingStudents] = useState(true);

//   const [formData, setFormData] = useState({
//     studentId: '',
//     title: '',
//     description: '',
//     assessmentType: 'both',
//     timeLimit: 45,
//     expiryDays: 7,
//     questions: []
//   });

//   useEffect(() => {
//     fetchStudents();
//   }, []);

//   const fetchStudents = async () => {
//     try {
//       const { data } = await api.get('/coach/students');
//       setStudents(data.data);
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       toast.error('Failed to load students');
//     } finally {
//       setLoadingStudents(false);
//     }
//   };

//   const addQuestion = (type) => {
//     const newQuestion = {
//       id: Date.now(),
//       type,
//       question: '',
//       options: type === 'mcq' ? ['', '', '', ''] : [],
//       correctAnswer: type === 'mcq' ? 'A' : '',
//       expectedLength: type === 'written' ? 200 : 0,
//       points: 1
//     };

//     setFormData({
//       ...formData,
//       questions: [...formData.questions, newQuestion]
//     });
//   };

//   const updateQuestion = (id, field, value) => {
//     setFormData({
//       ...formData,
//       questions: formData.questions.map(q =>
//         q.id === id ? { ...q, [field]: value } : q
//       )
//     });
//   };

//   const updateOption = (questionId, optionIndex, value) => {
//     setFormData({
//       ...formData,
//       questions: formData.questions.map(q =>
//         q.id === questionId
//           ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
//           : q
//       )
//     });
//   };

//   const removeQuestion = (id) => {
//     setFormData({
//       ...formData,
//       questions: formData.questions.filter(q => q.id !== id)
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (!formData.studentId) {
//       toast.error('Please select a student');
//       return;
//     }

//     if (!formData.title) {
//       toast.error('Please enter assessment title');
//       return;
//     }

//     if (formData.questions.length === 0) {
//       toast.error('Please add at least one question');
//       return;
//     }

//     // Validate questions
//     for (const q of formData.questions) {
//       if (!q.question.trim()) {
//         toast.error('All questions must have text');
//         return;
//       }

//       if (q.type === 'mcq') {
//         if (q.options.some(opt => !opt.trim())) {
//           toast.error('All MCQ options must be filled');
//           return;
//         }
//         if (!q.correctAnswer) {
//           toast.error('Please select correct answer for all MCQ questions');
//           return;
//         }
//       }
//     }

//     try {
//       setLoading(true);

//       const payload = {
//         studentId: formData.studentId,
//         title: formData.title,
//         description: formData.description,
//         assessmentType: formData.assessmentType,
//         timeLimit: parseInt(formData.timeLimit),
//         expiryDays: parseInt(formData.expiryDays),
//         questions: formData.questions.map(q => ({
//           type: q.type,
//           question: q.question,
//           options: q.type === 'mcq' ? q.options : undefined,
//           correctAnswer: q.type === 'mcq' ? q.correctAnswer : undefined,
//           expectedLength: q.type === 'written' ? q.expectedLength : undefined,
//           points: q.points
//         }))
//       };

//       await api.post('/coach/interviews/create', payload);

//       toast.success('Assessment created and sent to student!');
//       router.push('/coach/interviews');

//     } catch (error) {
//       console.error('Error:', error);
//       toast.error(error.response?.data?.error || 'Failed to create assessment');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold mb-2">Create Interview Assessment</h1>
//         <p className="text-gray-600">Send MCQ and written questions to students</p>
//       </div>

//       <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
        
//         {/* Student Selection */}
//         <div className="mb-6">
//           <label className="block text-sm font-bold mb-2">Select Student *</label>
//           {loadingStudents ? (
//             <p className="text-gray-500">Loading students...</p>
//           ) : (
//             <select
//               className="w-full border border-gray-300 rounded-xl p-3"
//               value={formData.studentId}
//               onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
//               required
//             >
//               <option value="">Choose a student...</option>
//               {students.map(student => (
//                 <option key={student._id} value={student._id}>
//                   {student.firstName} {student.lastName} ({student.email})
//                 </option>
//               ))}
//             </select>
//           )}
//         </div>

//         {/* Assessment Details */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <div>
//             <label className="block text-sm font-bold mb-2">Assessment Title *</label>
//             <input
//               type="text"
//               className="w-full border border-gray-300 rounded-xl p-3"
//               placeholder="e.g., Frontend Developer Assessment"
//               value={formData.title}
//               onChange={(e) => setFormData({ ...formData, title: e.target.value })}
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold mb-2">Assessment Type *</label>
//             <select
//               className="w-full border border-gray-300 rounded-xl p-3"
//               value={formData.assessmentType}
//               onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
//             >
//               <option value="mcq">MCQ Only</option>
//               <option value="written">Written Only</option>
//               <option value="both">Both MCQ & Written</option>
//             </select>
//           </div>

//           <div>
//             <label className="block text-sm font-bold mb-2">Time Limit (minutes) *</label>
//             <input
//               type="number"
//               className="w-full border border-gray-300 rounded-xl p-3"
//               value={formData.timeLimit}
//               onChange={(e) => setFormData({ ...formData, timeLimit: e.target.value })}
//               min="15"
//               max="180"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-bold mb-2">Link Expiry (days) *</label>
//             <input
//               type="number"
//               className="w-full border border-gray-300 rounded-xl p-3"
//               value={formData.expiryDays}
//               onChange={(e) => setFormData({ ...formData, expiryDays: e.target.value })}
//               min="1"
//               max="30"
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block text-sm font-bold mb-2">Description</label>
//           <textarea
//             className="w-full border border-gray-300 rounded-xl p-3"
//             rows="3"
//             placeholder="Additional instructions for the student..."
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           />
//         </div>

//         {/* Questions Section */}
//         <div className="mb-6">
//           <div className="flex items-center justify-between mb-4">
//             <h3 className="text-lg font-bold">Questions ({formData.questions.length})</h3>
//             <div className="flex gap-2">
//               {(formData.assessmentType === 'mcq' || formData.assessmentType === 'both') && (
//                 <button
//                   type="button"
//                   onClick={() => addQuestion('mcq')}
//                   className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
//                 >
//                   + Add MCQ
//                 </button>
//               )}
//               {(formData.assessmentType === 'written' || formData.assessmentType === 'both') && (
//                 <button
//                   type="button"
//                   onClick={() => addQuestion('written')}
//                   className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm"
//                 >
//                   + Add Written
//                 </button>
//               )}
//             </div>
//           </div>

//           {formData.questions.length === 0 ? (
//             <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
//               <p className="text-gray-500 mb-4">No questions added yet</p>
//               <p className="text-sm text-gray-400">Click "Add MCQ" or "Add Written" to create questions</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {formData.questions.map((question, index) => (
//                 <div key={question.id} className="border border-gray-300 rounded-xl p-6 bg-gray-50">
//                   <div className="flex items-center justify-between mb-4">
//                     <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
//                       Question {index + 1} - {question.type === 'mcq' ? 'MCQ' : 'Written'}
//                     </span>
//                     <button
//                       type="button"
//                       onClick={() => removeQuestion(question.id)}
//                       className="text-red-500 hover:text-red-600 text-sm"
//                     >
//                       ✕ Remove
//                     </button>
//                   </div>

//                   <div className="mb-4">
//                     <label className="block text-sm font-bold mb-2">Question Text *</label>
//                     <textarea
//                       className="w-full border border-gray-300 rounded-lg p-3"
//                       rows="2"
//                       placeholder="Enter your question..."
//                       value={question.question}
//                       onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
//                       required
//                     />
//                   </div>

//                   {question.type === 'mcq' && (
//                     <>
//                       <div className="mb-4 grid grid-cols-2 gap-3">
//                         {question.options.map((option, idx) => (
//                           <div key={idx}>
//                             <label className="block text-xs font-bold mb-1">Option {String.fromCharCode(65 + idx)}</label>
//                             <input
//                               type="text"
//                               className="w-full border border-gray-300 rounded-lg p-2"
//                               placeholder={`Option ${String.fromCharCode(65 + idx)}`}
//                               value={option}
//                               onChange={(e) => updateOption(question.id, idx, e.target.value)}
//                               required
//                             />
//                           </div>
//                         ))}
//                       </div>

//                       <div className="flex items-center gap-4">
//                         <label className="text-sm font-bold">Correct Answer:</label>
//                         <select
//                           className="border border-gray-300 rounded-lg p-2"
//                           value={question.correctAnswer}
//                           onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
//                         >
//                           <option value="A">A</option>
//                           <option value="B">B</option>
//                           <option value="C">C</option>
//                           <option value="D">D</option>
//                         </select>
//                       </div>
//                     </>
//                   )}

//                   {question.type === 'written' && (
//                     <div>
//                       <label className="block text-sm font-bold mb-2">Expected Length (words)</label>
//                       <input
//                         type="number"
//                         className="w-40 border border-gray-300 rounded-lg p-2"
//                         value={question.expectedLength}
//                         onChange={(e) => updateQuestion(question.id, 'expectedLength', parseInt(e.target.value))}
//                         min="50"
//                         max="1000"
//                       />
//                     </div>
//                   )}

//                   <div className="mt-4">
//                     <label className="block text-sm font-bold mb-2">Points</label>
//                     <input
//                       type="number"
//                       className="w-24 border border-gray-300 rounded-lg p-2"
//                       value={question.points}
//                       onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value))}
//                       min="1"
//                       max="10"
//                     />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Submit Buttons */}
//         <div className="flex gap-4">
//           <button
//             type="button"
//             onClick={() => router.back()}
//             className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50"
//             disabled={loading}
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
//             disabled={loading || formData.questions.length === 0}
//           >
//             {loading ? 'Creating...' : 'Create & Send Assessment'}
//           </button>
//         </div>

//         {formData.questions.length > 0 && (
//           <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//             <p className="text-sm text-blue-600">
//               <strong>📧 Email will be sent to student with:</strong>
//               <br />• One-time assessment link (expires in {formData.expiryDays} days)
//               <br />• {formData.questions.length} questions ({formData.questions.filter(q => q.type === 'mcq').length} MCQ, {formData.questions.filter(q => q.type === 'written').length} Written)
//               <br />• {formData.timeLimit} minutes time limit
//               <br />• ⚠️ Link can only be opened once for security
//             </p>
//           </div>
//         )}
//       </form>
//     </>
//   );
// }

'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/baseapi';
import { toast } from 'react-toastify';

interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isPremium: boolean;
}

interface Question {
  id: number;
  type: 'mcq' | 'written';
  question: string;
  options: string[];
  correctAnswer: string;
  expectedLength: number;
  points: number;
}

export default function CreateInterviewAssessment() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [students, setStudents] = useState<Student[]>([]);
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [selectedStudentsData, setSelectedStudentsData] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showStudentList, setShowStudentList] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assessmentType: 'both',
    timeLimit: 45,
    expiryDays: 7,
    questions: [] as Question[]
  });

  // Fetch students when search query changes (with debounce)
  useEffect(() => {
    if (searchQuery.trim().length >= 2) {
      const timer = setTimeout(() => {
        fetchStudents();
      }, 300);
      
      return () => clearTimeout(timer);
    } else {
      setStudents([]);
      setShowStudentList(false);
    }
  }, [searchQuery]);

  const fetchStudents = async () => {
    try {
      setLoadingStudents(true);
      setShowStudentList(true);
      
      const { data } = await api.get('/users', {
        params: {
          role: 'job_seeker',
          isPremium: true,
          search: searchQuery,
          status: 'active'
        }
      });
      
      const studentList = data.data?.users || data.users || data.data || data || [];
      const premiumStudents = studentList.filter((student: Student) => student.isPremium === true);
      
      setStudents(premiumStudents);
      
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students');
    } finally {
      setLoadingStudents(false);
    }
  };

  const toggleStudentSelection = (student: Student) => {
    setSelectedStudents(prev => {
      if (prev.includes(student._id)) {
        // Remove from selection
        setSelectedStudentsData(prevData => prevData.filter(s => s._id !== student._id));
        return prev.filter(id => id !== student._id);
      } else {
        // Add to selection - store full student object
        setSelectedStudentsData(prevData => [...prevData, student]);
        return [...prev, student._id];
      }
    });
  };

  const toggleSelectAll = () => {
    if (selectedStudents.length === students.length) {
      setSelectedStudents([]);
      setSelectedStudentsData([]);
    } else {
      setSelectedStudents(students.map(s => s._id));
      setSelectedStudentsData(students);
    }
  };

  const removeSelectedStudent = (studentId: string) => {
    setSelectedStudents(prev => prev.filter(id => id !== studentId));
    setSelectedStudentsData(prev => prev.filter(s => s._id !== studentId));
  };

  const addQuestion = (type: 'mcq' | 'written') => {
    const newQuestion: Question = {
      id: Date.now(),
      type,
      question: '',
      options: type === 'mcq' ? ['', '', '', ''] : [],
      correctAnswer: type === 'mcq' ? 'A' : '',
      expectedLength: type === 'written' ? 200 : 0,
      points: 1
    };

    setFormData({
      ...formData,
      questions: [...formData.questions, newQuestion]
    });
  };

  const updateQuestion = (id: number, field: keyof Question, value: string | number) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q =>
        q.id === id ? { ...q, [field]: value } : q
      )
    });
  };

  const updateOption = (questionId: number, optionIndex: number, value: string) => {
    setFormData({
      ...formData,
      questions: formData.questions.map(q =>
        q.id === questionId
          ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
          : q
      )
    });
  };

  const removeQuestion = (id: number) => {
    setFormData({
      ...formData,
      questions: formData.questions.filter(q => q.id !== id)
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validation
    if (selectedStudents.length === 0) {
      toast.error('Please select at least one student');
      return;
    }

    if (!formData.title.trim()) {
      toast.error('Please enter assessment title');
      return;
    }

    if (formData.questions.length === 0) {
      toast.error('Please add at least one question');
      return;
    }

    // Validate questions
    for (const q of formData.questions) {
      if (!q.question.trim()) {
        toast.error('All questions must have text');
        return;
      }

      if (q.type === 'mcq') {
        if (q.options.some(opt => !opt.trim())) {
          toast.error('All MCQ options must be filled');
          return;
        }
        if (!q.correctAnswer) {
          toast.error('Please select correct answer for all MCQ questions');
          return;
        }
      }
    }

    try {
      setLoading(true);

      // Prepare base payload (without studentId)
      const basePayload = {
        title: formData.title,
        description: formData.description,
        assessmentType: formData.assessmentType,
        timeLimit: parseInt(formData.timeLimit.toString()),
        expiryDays: parseInt(formData.expiryDays.toString()),
        questions: formData.questions.map(q => ({
          type: q.type,
          question: q.question,
          options: q.type === 'mcq' ? q.options : undefined,
          correctAnswer: q.type === 'mcq' ? q.correctAnswer : undefined,
          expectedLength: q.type === 'written' ? parseInt(q.expectedLength.toString()) : undefined,
          points: parseInt(q.points.toString())
        }))
      };

      // Send individual requests for each student
      let successCount = 0;
      let failCount = 0;
      const failedStudents: string[] = [];

      for (const studentData of selectedStudentsData) {
        try {
          // Validate studentId exists and is valid
          if (!studentData._id) {
            console.error('Invalid student data:', studentData);
            failCount++;
            failedStudents.push(`${studentData.firstName} ${studentData.lastName} (Invalid ID)`);
            continue;
          }

          // Create payload with specific studentId
          const payload = {
            studentId: studentData._id,
            ...basePayload
          };

          console.log('Sending assessment to:', studentData.email, 'with ID:', studentData._id);
          
          await api.post('/coach/interviews/create', payload);
          successCount++;
          
        } catch (error) {
          console.error(`Failed for student ${studentData._id}:`, error);
          failCount++;
          
          const studentName = `${studentData.firstName} ${studentData.lastName}`;
          failedStudents.push(studentName);
        }
      }

      // Show results
      if (successCount > 0 && failCount === 0) {
        toast.success(`✅ Assessment sent successfully to all ${successCount} student(s)!`);
        router.push('/coach/submissions');
      } else if (successCount > 0 && failCount > 0) {
        toast.warning(`⚠️ Sent to ${successCount} student(s), but failed for ${failCount}: ${failedStudents.join(', ')}`);
        setTimeout(() => router.push('/coach/submissions'), 2000);
      } else {
        toast.error(`❌ Failed to send assessment to all students: ${failedStudents.join(', ')}`);
      }

    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create assessments');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">Create Interview Assessment</h1>
        <p className="text-gray-600">Send MCQ and written questions to premium students</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Student Selection Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Select Students *</h3>
            <span className="text-sm text-gray-600">
              {selectedStudents.length} selected
            </span>
          </div>

          {/* Search Bar */}
          <div className="mb-4 relative">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-xl p-3 pr-10"
              placeholder="🔍 Search premium students by name or email (min 2 characters)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => searchQuery.length >= 2 && setShowStudentList(true)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  setShowStudentList(false);
                }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            )}
          </div>

          {/* Search Hint */}
          {searchQuery.length > 0 && searchQuery.length < 2 && (
            <p className="text-sm text-gray-500 mb-4">Type at least 2 characters to search...</p>
          )}

          {/* Loading State */}
          {loadingStudents && (
            <div className="text-center py-8">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-500">Searching premium students...</p>
            </div>
          )}

          {/* Search Results */}
          {showStudentList && !loadingStudents && searchQuery.length >= 2 && (
            <div className="mb-4">
              {students.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                  <p className="text-gray-500">No premium students found matching &quot;{searchQuery}&quot;</p>
                  <p className="text-sm text-gray-400 mt-2">Only premium job seekers can receive assessments</p>
                </div>
              ) : (
                <>
                  {/* Select All */}
                  <div className="mb-3 pb-3 border-b border-gray-200">
                    <label className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 p-2 rounded-lg">
                      <input
                        type="checkbox"
                        className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        checked={students.length > 0 && selectedStudents.length === students.length}
                        onChange={toggleSelectAll}
                      />
                      <span className="font-bold text-gray-700">Select All ({students.length})</span>
                    </label>
                  </div>

                  {/* Students List */}
                  <div className="max-h-80 overflow-y-auto space-y-2 border border-gray-200 rounded-xl p-3 bg-gray-50">
                    {students.map((student) => (
                      <label
                        key={student._id}
                        className="flex items-center gap-3 p-3 rounded-xl hover:bg-white cursor-pointer border border-transparent hover:border-green-200 transition-all"
                      >
                        <input
                          type="checkbox"
                          className="w-5 h-5 text-green-600 border-gray-300 rounded focus:ring-green-500"
                          checked={selectedStudents.includes(student._id)}
                          onChange={() => toggleStudentSelection(student)}
                        />
                        <div className="flex-1">
                          <p className="font-bold text-gray-800">
                            {student.firstName} {student.lastName}
                          </p>
                          <p className="text-sm text-gray-500">{student.email}</p>
                          <p className="text-xs text-gray-400 mt-1">ID: {student._id}</p>
                        </div>
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                          ⭐ PRO
                        </span>
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}

          {/* Selected Students Display */}
          {selectedStudents.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm font-bold text-green-800 mb-3">
                Selected Students ({selectedStudents.length}):
              </p>
              <div className="flex flex-wrap gap-2">
                {selectedStudentsData.map((student) => (
                  <div
                    key={student._id}
                    className="flex items-center gap-2 bg-white border border-green-300 rounded-lg px-3 py-2"
                  >
                    <span className="text-sm font-medium">
                      {student.firstName} {student.lastName}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeSelectedStudent(student._id)}
                      className="text-red-500 hover:text-red-700 text-sm"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Info Note */}
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-xl">
            <p className="text-xs text-blue-700">
              <strong>ℹ️ Note:</strong> Only premium job seekers with active subscriptions can receive assessments. Search to find and select students.
            </p>
          </div>
        </div>

        {/* Assessment Details */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <h3 className="text-lg font-bold mb-6">Assessment Details</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-bold mb-2">Assessment Title *</label>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-xl p-3"
                placeholder="e.g., Frontend Developer Assessment"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Assessment Type *</label>
              <select
                className="w-full border border-gray-300 rounded-xl p-3"
                value={formData.assessmentType}
                onChange={(e) => setFormData({ ...formData, assessmentType: e.target.value })}
              >
                <option value="mcq">MCQ Only</option>
                <option value="written">Written Only</option>
                <option value="both">Both MCQ & Written</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Time Limit (minutes) *</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl p-3"
                value={formData.timeLimit}
                onChange={(e) => setFormData({ ...formData, timeLimit: parseInt(e.target.value) })}
                min={15}
                max={180}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-bold mb-2">Link Expiry (days) *</label>
              <input
                type="number"
                className="w-full border border-gray-300 rounded-xl p-3"
                value={formData.expiryDays}
                onChange={(e) => setFormData({ ...formData, expiryDays: parseInt(e.target.value) })}
                min={1}
                max={30}
                required
              />
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-bold mb-2">Description</label>
            <textarea
              className="w-full border border-gray-300 rounded-xl p-3"
              rows={3}
              placeholder="Additional instructions for the students..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        {/* Questions Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Questions ({formData.questions.length})</h3>
            <div className="flex gap-2">
              {(formData.assessmentType === 'mcq' || formData.assessmentType === 'both') && (
                <button
                  type="button"
                  onClick={() => addQuestion('mcq')}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 text-sm"
                >
                  + Add MCQ
                </button>
              )}
              {(formData.assessmentType === 'written' || formData.assessmentType === 'both') && (
                <button
                  type="button"
                  onClick={() => addQuestion('written')}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 text-sm"
                >
                  + Add Written
                </button>
              )}
            </div>
          </div>

          {formData.questions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
              <p className="text-gray-500 mb-4">No questions added yet</p>
              <p className="text-sm text-gray-400">Click &quot;Add MCQ&quot; or &quot;Add Written&quot; to create questions</p>
            </div>
          ) : (
            <div className="space-y-4">
              {formData.questions.map((question, index) => (
                <div key={question.id} className="border border-gray-300 rounded-xl p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded-full text-sm font-bold">
                      Question {index + 1} - {question.type === 'mcq' ? 'MCQ' : 'Written'}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeQuestion(question.id)}
                      className="text-red-500 hover:text-red-600 text-sm font-bold"
                    >
                      ✕ Remove
                    </button>
                  </div>

                  <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Question Text *</label>
                    <textarea
                      className="w-full border border-gray-300 rounded-lg p-3"
                      rows={2}
                      placeholder="Enter your question..."
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                      required
                    />
                  </div>

                  {question.type === 'mcq' && (
                    <>
                      <div className="mb-4 grid grid-cols-2 gap-3">
                        {question.options.map((option, idx) => (
                          <div key={idx}>
                            <label className="block text-xs font-bold mb-1">Option {String.fromCharCode(65 + idx)}</label>
                            <input
                              type="text"
                              className="w-full border border-gray-300 rounded-lg p-2"
                              placeholder={`Option ${String.fromCharCode(65 + idx)}`}
                              value={option}
                              onChange={(e) => updateOption(question.id, idx, e.target.value)}
                              required
                            />
                          </div>
                        ))}
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="text-sm font-bold">Correct Answer:</label>
                        <select
                          className="border border-gray-300 rounded-lg p-2"
                          value={question.correctAnswer}
                          onChange={(e) => updateQuestion(question.id, 'correctAnswer', e.target.value)}
                        >
                          <option value="A">A</option>
                          <option value="B">B</option>
                          <option value="C">C</option>
                          <option value="D">D</option>
                        </select>
                      </div>
                    </>
                  )}

                  {question.type === 'written' && (
                    <div>
                      <label className="block text-sm font-bold mb-2">Expected Length (words)</label>
                      <input
                        type="number"
                        className="w-40 border border-gray-300 rounded-lg p-2"
                        value={question.expectedLength}
                        onChange={(e) => updateQuestion(question.id, 'expectedLength', parseInt(e.target.value) || 200)}
                        min={50}
                        max={1000}
                      />
                    </div>
                  )}

                  <div className="mt-4">
                    <label className="block text-sm font-bold mb-2">Points</label>
                    <input
                      type="number"
                      className="w-24 border border-gray-300 rounded-lg p-2"
                      value={question.points}
                      onChange={(e) => updateQuestion(question.id, 'points', parseInt(e.target.value) || 1)}
                      min={1}
                      max={10}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-bold hover:bg-gray-50"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading || formData.questions.length === 0 || selectedStudents.length === 0}
            >
              {loading ? 'Creating...' : `Create & Send to ${selectedStudents.length} Student(s)`}
            </button>
          </div>

          {selectedStudents.length > 0 && formData.questions.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
              <p className="text-sm text-green-700">
                <strong>📧 Assessment will be sent to {selectedStudents.length} premium student(s):</strong>
                <br />• {formData.questions.length} questions ({formData.questions.filter(q => q.type === 'mcq').length} MCQ, {formData.questions.filter(q => q.type === 'written').length} Written)
                <br />• {formData.timeLimit} minutes time limit
                <br />• Link expires in {formData.expiryDays} days
                <br />• ⚠️ Each link can only be opened once for security
              </p>
            </div>
          )}
        </div>
      </form>
    </>
  );
}