'use client';

import Link from 'next/link';

export default function Unauthorized() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] flex items-center justify-center">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0A0A0A]" />
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
      }} />
      
      <div className="relative z-10 text-center max-w-md p-8">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-4xl font-black text-transparent bg-gradient-to-r from-[#E5E7EB] via-[#F9FAFB] to-[#D1D5DB] bg-clip-text tracking-[-0.02em] mb-2">ZERKER</h1>
          <p className="text-sm text-[#9CA3AF] font-medium tracking-wide uppercase">Investor Portal</p>
        </div>

        {/* Unauthorized Message */}
        <div className="relative p-8 bg-gradient-to-br from-[#F9FAFB]/[0.12] via-[#F3F4F6]/[0.08] to-[#E5E7EB]/[0.05] backdrop-blur-2xl border border-[#D1D5DB]/25 rounded-2xl shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-[#DC2626] via-[#EF4444] to-[#DC2626] rounded-b-full opacity-60" />
          
          <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-[#DC2626] to-[#B91C1C] rounded-xl flex items-center justify-center">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.314 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-[#F8FAFC] mb-4">Access Denied</h2>
          
          <p className="text-[#94A3B8] mb-6 leading-relaxed">
            You don't have permission to access this resource. This content may be restricted to specific user roles or require additional authorization.
          </p>

          <div className="space-y-4">
            <Link 
              href="/"
              className="block w-full px-6 py-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] text-white font-semibold rounded-lg hover:from-[#60A5FA] hover:to-[#3B82F6] transition-all duration-300 shadow-lg"
            >
              Return to Portal
            </Link>
            
            <p className="text-sm text-[#9CA3AF]">
              Need access? Contact your administrator or{' '}
              <a href="mailto:revaz@zerker.ai" className="text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors">
                reach out to us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}