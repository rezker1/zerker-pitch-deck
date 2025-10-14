'use client';

import React from 'react';
import Link from 'next/link';

const Legal = () => {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-['Inter'] antialiased">
      {/* Premium background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F1419] via-[#1A1F2E] to-[#161B22]" />
      <div className="fixed inset-0 bg-gradient-to-tr from-[#1e293b]/20 via-transparent to-[#0f172a]/30" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-2xl mx-auto">
          <div className="mb-8">
            <div className="w-24 h-[3px] bg-gradient-to-r from-[#C084FC] via-[#DDD6FE] to-[#E5E7EB] rounded-full mx-auto shadow-lg mb-8" />
          </div>
          
          <h1 className="text-[clamp(48px,8vw,72px)] font-black text-[#F8FAFC] leading-none tracking-[-0.04em] mb-6">
            Legal Documents
          </h1>
          
          <p className="text-[clamp(18px,2.5vw,24px)] font-light text-[#E2E8F0] leading-relaxed mb-12">
            Term sheets, cap table, and investment documentation. Coming soon with comprehensive legal materials for due diligence.
          </p>
          
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#C084FC] to-[#DDD6FE] text-[#1F2937] font-semibold rounded-lg hover:from-[#B794F6] hover:to-[#C7D2FE] transition-all duration-300 shadow-lg"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Portal</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Legal;