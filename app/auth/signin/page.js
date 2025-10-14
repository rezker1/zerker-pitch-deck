'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [authMode, setAuthMode] = useState('password'); // 'password' or 'magic-link'
  const router = useRouter();

  const handlePasswordSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting password sign in for:', email);
      const result = await signIn('credentials', {
        email: email.toLowerCase().trim(),
        password,
        redirect: false,
      });

      console.log('Sign in result:', result);

      if (result?.error) {
        console.error('Sign in error:', result.error);
        setError(result.error);
      } else if (result?.ok) {
        console.log('✅ Sign in successful, redirecting...');
        router.push('/');
      }
    } catch (error) {
      console.error('Sign in exception:', error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMagicLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      console.log('Attempting magic link sign in for:', email);
      const result = await signIn('email', {
        email,
        redirect: false,
      });

      console.log('Magic link result:', result);

      if (result?.error) {
        console.error('Magic link error:', result.error);
        setError(`Error: ${result.error}. This email may not be authorized.`);
      } else {
        setMagicLinkSent(true);
      }
    } catch (error) {
      console.error('Magic link exception:', error);
      setError(`An error occurred: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] flex items-center justify-center">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0A0A0A]" />
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative z-10 w-full max-w-md p-8">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-[#E5E7EB] via-[#F9FAFB] to-[#D1D5DB] bg-clip-text tracking-[-0.02em] mb-2">ZERKER</h1>
          <p className="text-sm text-[#9CA3AF] font-medium tracking-wide uppercase">Investor Portal</p>
        </div>

        {/* Sign In Form */}
        <div className="relative p-8 bg-gradient-to-br from-[#F9FAFB]/[0.12] via-[#F3F4F6]/[0.08] to-[#E5E7EB]/[0.05] backdrop-blur-2xl border border-[#D1D5DB]/25 rounded-2xl shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-[#D1D5DB] via-[#F3F4F6] to-[#E5E7EB] rounded-b-full opacity-60" />
          
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-2 text-center">Sign In</h2>
          <p className="text-center text-[#9CA3AF] mb-6 text-sm">
            Enter your authorized email to access the portal
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {magicLinkSent && (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm">
              ✅ Magic link sent! Check your email and click the link to sign in.
            </div>
          )}

          {/* Auth Mode Switcher */}
          <div className="flex bg-[#1A1A1A]/50 rounded-lg p-1 mb-6">
            <button
              type="button"
              onClick={() => {
                setAuthMode('password');
                setError('');
                setMagicLinkSent(false);
              }}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                authMode === 'password'
                  ? 'bg-[#7C3AED] text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Password
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('magic-link');
                setError('');
                setPassword('');
              }}
              className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                authMode === 'magic-link'
                  ? 'bg-[#7C3AED] text-white'
                  : 'text-[#9CA3AF] hover:text-white'
              }`}
            >
              Magic Link
            </button>
          </div>

          {/* Password Sign In Form */}
          {authMode === 'password' && (
            <form onSubmit={handlePasswordSignIn} className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-[#D1D5DB]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  placeholder="your@email.com"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-[#D1D5DB]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  placeholder="Enter your password"
                  required
                  disabled={loading}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white font-semibold rounded-lg hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          )}

          {/* Magic Link Form */}
          {authMode === 'magic-link' && (
            <form onSubmit={handleMagicLink} className="space-y-4">
              <div>
                <label htmlFor="email-magic" className="block text-sm font-medium text-[#D1D5DB] mb-2">
                  Email Address
                </label>
                <input
                  id="email-magic"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-[#D1D5DB]/20 rounded-lg text-white placeholder-[#9CA3AF] focus:outline-none focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] transition-colors"
                  placeholder="your@email.com"
                  required
                  disabled={loading || magicLinkSent}
                />
              </div>

              <button
                type="submit"
                disabled={loading || magicLinkSent}
                className="w-full px-6 py-3 bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] text-white font-semibold rounded-lg hover:from-[#8B5CF6] hover:to-[#7C3AED] transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : magicLinkSent ? '✓ Magic Link Sent!' : 'Send Magic Link'}
              </button>
            </form>
          )}

          <p className="mt-4 text-center text-sm text-[#9CA3AF]">
            Only authorized emails can access this portal
          </p>
        </div>
      </div>
    </div>
  );
}