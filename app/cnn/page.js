'use client';

import Link from 'next/link';

export default function CNNMaterialsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter']">
      <div className="max-w-5xl mx-auto px-6 py-16">
        <div className="mb-10">
          <Link href="/" className="text-sm text-gray-400 hover:text-gray-200">← Back to Portal</Link>
        </div>

        <h1 className="text-3xl font-bold mb-4">CNN × ZERKER</h1>
        <p className="text-gray-300 mb-10">Phase I materials: newsroom UI demo and one-pager.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <a
            href="https://v0-cnn-demo-original.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="mb-4 text-lg font-semibold">CNN UI Demo</div>
            <p className="text-gray-300 mb-6">Interactive newsroom workflow prototype.</p>
            <div className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-[#EF4444] to-[#B91C1C] text-white font-semibold">
              Open Demo
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>

          <a
            href="/docs/cnn-x-zerker-phase-I.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition"
          >
            <div className="mb-4 text-lg font-semibold">Phase I One-Pager (PDF)</div>
            <p className="text-gray-300 mb-6">Overview of the collaboration and scope.</p>
            <div className="inline-flex items-center px-4 py-2 rounded-md bg-gradient-to-r from-[#6B7280] to-[#4B5563] text-white font-semibold">
              Open PDF
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}


