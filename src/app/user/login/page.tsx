// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function UserLoginPage() {
//   const router = useRouter();

//   const [emailOrUser, setEmailOrUser] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

 
//   const ADMIN_USER = "user";
//   const ADMIN_PASS = "user123";

//   function handleLogin(e: React.FormEvent) {
//     e.preventDefault();

//     if (emailOrUser === ADMIN_USER && password === ADMIN_PASS) {
//         sessionStorage.setItem("userToken", "userisloggedin");
//       router.push("/user"); 
//     } else {
//       setError("Invalid credentials");
//     }
//   }

//   return (
//     <div
//       style={{
//         width: "350px",
//         padding: "30px",
//         background: "white",
//         borderRadius: "8px",
//         boxShadow: "0 0 10px rgba(0,0,0,0.1)",
//       }}
//     >
//       <h2 style={{ textAlign: "center" }}>User Dashboard Login</h2>

//       <form onSubmit={handleLogin}>
//         <div style={{ marginBottom: "15px" }}>
//           <label>Email / Username</label>
//           <input
//             type="text"
//             value={emailOrUser}
//             onChange={(e) => setEmailOrUser(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginTop: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>

//         <div style={{ marginBottom: "15px" }}>
//           <label>Password</label>
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             style={{
//               width: "100%",
//               padding: "10px",
//               marginTop: "5px",
//               borderRadius: "5px",
//               border: "1px solid #ccc",
//             }}
//           />
//         </div>

//         {error && (
//           <p style={{ color: "red", textAlign: "center", marginBottom: "10px" }}>
//             {error}
//           </p>
//         )}

//         <button
//           type="submit"
//           style={{
//             width: "100%",
//             padding: "10px",
//             background: "#0070f3",
//             color: "white",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }
// src/app/login/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const userToken = sessionStorage.getItem('userToken');
    if (userToken) {
      router.push('/user');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      if (email === 'admin@cvsaathi.com' && password === 'admin123') {
        const token = 'demo-user-token-' + Date.now();
        sessionStorage.setItem('userToken', token);
        router.push('/user');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">📄</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">CV Saathi Admin</h1>
          <p className="text-sm text-gray-500">Together We Grow, Together We Improve</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="admin@cvsaathi.com"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter your password"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 text-white rounded-xl py-3 px-4 font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Demo: admin@cvsaathi.com / admin123
          </div>
        </form>
      </div>
    </div>
  );
}