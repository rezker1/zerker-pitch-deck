'use client';

import React from 'react';
import Link from 'next/link';
import SourcesUsesReport from '../../../components/SourcesUsesReport';

const FinancialModel = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] antialiased">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0A0A0A]" />
      <div className="fixed inset-0 bg-gradient-to-tr from-[#374151]/20 via-transparent to-[#1F2937]/30" />
      
      {/* Header */}
      <header className="relative z-10 px-8 py-6 border-b border-[#D1D5DB]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-3 text-[#E5E7EB] hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-medium">Back to Portal</span>
          </Link>
          
          <div className="text-right">
            <h1 className="text-2xl font-black text-transparent bg-gradient-to-r from-[#E5E7EB] via-[#F9FAFB] to-[#D1D5DB] bg-clip-text">ZERKER</h1>
            <p className="text-xs text-[#9CA3AF] font-medium tracking-wider uppercase">Financial Model</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        <SourcesUsesReport />
      </main>
    </div>
  );
};

export default FinancialModel;
