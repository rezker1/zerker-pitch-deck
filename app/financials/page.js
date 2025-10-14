'use client';

import Link from 'next/link';

export default function FinancialsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter']">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-200">← Back to Portal</Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">ZERKER Financial Model</h1>
        <p className="text-gray-300 mb-10">5 & 10 year projections with detailed Excel model and interactive view.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="/docs/zerker-financial-model.xlsx"
            download
            className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="mb-4 text-lg font-semibold">Excel Financial Model (Download)</div>
            <p className="text-gray-300 mb-6">Complete 5 & 10 year projections with detailed assumptions and calculations.</p>
            <div className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-[#10B981] to-[#059669] text-white font-semibold">
              Download Excel
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
          </a>

          <Link
            href="/financials/model"
            className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="mb-4 text-lg font-semibold">Use of Funds</div>
            <p className="text-gray-300 mb-6">Detailed breakdown of $2M pre-seed allocation across 24 months.</p>
            <div className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-[#6B7280] to-[#4B5563] text-white font-semibold">
              View Use of Funds
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

