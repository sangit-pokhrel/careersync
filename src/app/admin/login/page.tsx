'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

const MAX_ATTEMPTS = 3;
const BLOCK_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);
  const [isBlocked, setIsBlocked] = useState(false);
  const [blockTimeRemaining, setBlockTimeRemaining] = useState('');

  useEffect(() => {
    // Check if already logged in
    const adminToken = sessionStorage.getItem('adminToken');
    if (adminToken === 'adminisloggedin') {
      router.push('/admin');
      return;
    }

    // Check if IP is blocked
    const blockData = localStorage.getItem('adminLoginBlock');
    if (blockData) {
      const { blockedUntil, attempts } = JSON.parse(blockData);
      const now = Date.now();
      
      if (now < blockedUntil) {
        setIsBlocked(true);
        updateBlockTimer(blockedUntil);
      } else {
        // Block expired, reset
        localStorage.removeItem('adminLoginBlock');
        setAttemptsLeft(MAX_ATTEMPTS);
      }
    }
  }, [router]);

  const updateBlockTimer = (blockedUntil: number) => {
    const interval = setInterval(() => {
      const now = Date.now();
      const timeLeft = blockedUntil - now;
      
      if (timeLeft <= 0) {
        setIsBlocked(false);
        localStorage.removeItem('adminLoginBlock');
        setAttemptsLeft(MAX_ATTEMPTS);
        clearInterval(interval);
      } else {
        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        setBlockTimeRemaining(`${hours}h ${minutes}m`);
      }
    }, 1000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isBlocked) {
      setError(`Access blocked. Try again in ${blockTimeRemaining}`);
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Demo credentials
      if (email === 'admin@cvsaathi.com' && password === 'admin123') {
        sessionStorage.setItem('adminToken', 'adminisloggedin');
        localStorage.removeItem('adminLoginBlock');
        router.push('/admin');
      } else {
        // Failed attempt
        const blockData = localStorage.getItem('adminLoginBlock');
        let attempts = blockData ? JSON.parse(blockData).attempts : 0;
        attempts++;

        if (attempts >= MAX_ATTEMPTS) {
          const blockedUntil = Date.now() + BLOCK_DURATION;
          localStorage.setItem('adminLoginBlock', JSON.stringify({
            attempts,
            blockedUntil
          }));
          setIsBlocked(true);
          updateBlockTimer(blockedUntil);
          setError('Too many failed attempts. Admin access blocked for 24 hours.');
        } else {
          localStorage.setItem('adminLoginBlock', JSON.stringify({
            attempts,
            blockedUntil: 0
          }));
          const remaining = MAX_ATTEMPTS - attempts;
          setAttemptsLeft(remaining);
          setError(`Invalid credentials. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`);
        }
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isBlocked) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🚫</span>
          </div>
          <h1 className="text-2xl font-bold mb-2 text-red-600">Access Blocked</h1>
          <p className="text-gray-600 mb-4">
            Too many failed login attempts. Admin access has been temporarily blocked.
          </p>
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
            <p className="text-red-600 font-bold">
              Time Remaining: {blockTimeRemaining}
            </p>
          </div>
          <p className="text-sm text-gray-500">
            Please contact system administrator if you need immediate access.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl text-white">👨‍💼</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">Admin Login</h1>
          <p className="text-sm text-gray-500">CV Saathi Administration</p>
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="admin@cvsaathi.com"
              required
              disabled={isBlocked}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500"
              placeholder="Enter your password"
              required
              disabled={isBlocked}
            />
          </div>

          {error && (
            <div className={`border rounded-xl px-4 py-3 text-sm ${
              isBlocked 
                ? 'bg-red-50 border-red-200 text-red-600' 
                : 'bg-orange-50 border-orange-200 text-orange-600'
            }`}>
              {error}
            </div>
          )}

          {!isBlocked && attemptsLeft < MAX_ATTEMPTS && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3">
              <p className="text-yellow-700 text-sm font-medium">
                ⚠️ Warning: {attemptsLeft} attempt{attemptsLeft !== 1 ? 's' : ''} remaining before account lockout
              </p>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || isBlocked}
            className="w-full bg-teal-600 text-white rounded-xl py-3 px-4 font-bold hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Logging in...' : 'Login as Admin'}
          </button>

          <div className="text-center text-sm text-gray-500 mt-4">
            Demo: admin@cvsaathi.com / admin123
          </div>
        </form>
      </div>
    </div>
  );
}