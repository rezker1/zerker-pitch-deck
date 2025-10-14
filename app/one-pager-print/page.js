'use client';

import React, { useEffect } from 'react';

export default function CompanyOnePager() {
  useEffect(() => {
    // Auto-trigger print dialog after page loads
    const timer = setTimeout(() => {
      window.print();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.4in;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .no-print {
            display: none !important;
          }
          * {
            page-break-inside: avoid;
          }
        }
        
        body {
          margin: 0;
          padding: 0;
          background: white;
        }
      `}</style>

      <div className="w-full bg-white p-4 font-['Inter']" style={{ pageBreakAfter: 'avoid', height: '100vh', maxHeight: '8.5in' }}>
        {/* Header */}
        <div className="flex justify-between items-start mb-3 pb-1.5 border-b-2 border-gray-900">
          <div>
            <h1 className="text-3xl font-black text-gray-900 mb-0.5">ZERKER</h1>
            <p className="text-sm text-gray-700 font-medium">The Media Verification Operating System</p>
          </div>
          <div className="text-right text-xs text-gray-600">
            <div className="font-semibold">Revaz Tsivtsivadze, CEO</div>
            <div>revaz@zerker.ai</div>
            <div className="font-bold text-gray-900">October 2025</div>
          </div>
        </div>

        {/* Main Content - 3 Columns */}
        <div className="grid grid-cols-3 gap-3">
          
          {/* Column 1 */}
          <div className="space-y-2">
            {/* Problem */}
            <div className="bg-red-50 p-2.5 rounded-lg border-l-4 border-red-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-red-600">⚠️</span> Problem
              </h2>
              <p className="text-[9px] text-gray-700 leading-tight">
                <strong>Deepfakes cost $15 to create</strong>, fueling misinformation, fraud, and reputational attacks at scale. Current tools are reactive, slow, and lack explainability.
              </p>
            </div>

            {/* Solution */}
            <div className="bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-blue-600">✓</span> Solution
              </h2>
              <p className="text-[9px] text-gray-700 leading-tight mb-1">
                <strong>ZERKER is the authenticity infrastructure OS</strong> that integrates best-in-class detection algorithms into enterprise workflows.
              </p>
              <div className="text-[9px] text-gray-600 space-y-0.5">
                <div>• API, MCP, Agentic Systems</div>
                <div>• Defense-grade intel for commercial use</div>
              </div>
            </div>

            {/* Market */}
            <div className="bg-emerald-50 p-2.5 rounded-lg border-l-4 border-emerald-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-emerald-600">📊</span> Market
              </h2>
              <div className="space-y-0.5 text-[10px]">
                <div className="flex justify-between">
                  <span className="text-gray-700">News Media:</span>
                  <span className="text-gray-900 font-bold">7,900+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Insurance/Talent:</span>
                  <span className="text-gray-900 font-bold">5,900+</span>
                </div>
                <div className="flex justify-between pt-0.5 border-t border-emerald-200">
                  <span className="text-gray-700 font-semibold">Immediate TAM:</span>
                  <span className="text-emerald-600 font-bold">$167M+</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className="space-y-2">
            {/* Business Model */}
            <div className="bg-purple-50 p-2.5 rounded-lg border-l-4 border-purple-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-purple-600">💼</span> Business Model
              </h2>
              <div className="space-y-0.5 text-[10px]">
                <div className="text-gray-700 space-y-0.5">
                  <div>Small: $10K • Medium: $75K • Large: $150K+/yr</div>
                  <div className="flex justify-between border-t border-purple-200 pt-0.5">
                    <span>Impl. Fee: 20% • Gross Margin:</span>
                    <span className="text-purple-600 font-bold">87%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Competitive Advantage */}
            <div className="bg-amber-50 p-2.5 rounded-lg border-l-4 border-amber-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-amber-600">🛡️</span> Our Moat
              </h2>
              <div className="text-[10px] text-gray-700 space-y-0.5">
                <div><strong>DARPA Heritage:</strong> US govt media forensics team</div>
                <div><strong>Exclusive Data:</strong> 2M+ hrs annotated media</div>
                <div><strong>Ecosystem:</strong> DARPA SemaFor partners (Purdue, SRI)</div>
                <div><strong>First-Mover:</strong> Only OS-level infrastructure</div>
              </div>
            </div>

            {/* Traction */}
            <div className="bg-green-50 p-2.5 rounded-lg border-l-4 border-green-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-green-600">🚀</span> Traction
              </h2>
              <div className="text-[10px] text-gray-700 space-y-0.5">
                <div>✓ Active pilots with global media + talent agencies</div>
                <div>✓ Exclusive partnership: 2M+ hrs broadcast data</div>
                <div>✓ $66K raised from strategic angels</div>
                <div>✓ ZERKER CORE platform in beta</div>
              </div>
            </div>
          </div>

          {/* Column 3 */}
          <div className="space-y-2">
            {/* Team */}
            <div className="bg-indigo-50 p-2.5 rounded-lg border-l-4 border-indigo-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-indigo-600">👥</span> Team
              </h2>
              <div className="text-[10px] text-gray-700 space-y-0.5">
                <div><strong>Revaz Tsivtsivadze, CEO:</strong> Ex-Shutterstock API/CV lead</div>
                <div><strong>Core:</strong> DARPA SemaFor architects, media forensics experts</div>
                <div><strong>Advisors:</strong> SRI International (OPERA partnership)</div>
              </div>
            </div>

            {/* Financial Projections */}
            <div className="bg-blue-50 p-2.5 rounded-lg border-l-4 border-blue-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-blue-600">📈</span> Projections
              </h2>
              <div className="grid grid-cols-2 gap-1.5 text-[10px]">
                <div className="bg-white p-1.5 rounded border border-blue-200">
                  <div className="text-gray-600 text-[8px]">Y5</div>
                  <div className="text-sm font-bold text-blue-600">$11.8M</div>
                  <div className="text-gray-500 text-[8px]">625 cust</div>
                </div>
                <div className="bg-white p-1.5 rounded border border-blue-200">
                  <div className="text-gray-600 text-[8px]">Y10</div>
                  <div className="text-sm font-bold text-blue-600">$131.8M</div>
                  <div className="text-gray-500 text-[8px]">3,765 cust</div>
                </div>
              </div>
            </div>

            {/* The Ask */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-2.5 rounded-lg text-white">
              <h2 className="text-sm font-bold mb-1 flex items-center gap-1">
                💰 The Ask
              </h2>
              <div className="space-y-0.5 text-[10px]">
                <div className="flex justify-between items-center">
                  <span>Raising:</span>
                  <span className="text-base font-bold text-emerald-400">$2.0M</span>
                </div>
                <div className="flex justify-between">
                  <span>Valuation:</span>
                  <span className="font-bold">$15M post</span>
                </div>
                <div className="flex justify-between">
                  <span>Runway:</span>
                  <span className="font-bold text-emerald-400">24 mo</span>
                </div>
                <div className="pt-0.5 border-t border-gray-600 text-[9px] text-gray-300 leading-tight">
                  Convert pilots, deliver CORE, GTM playbook → Series A
                </div>
              </div>
            </div>

            {/* Roadmap */}
            <div className="bg-purple-50 p-2.5 rounded-lg border-l-4 border-purple-600">
              <h2 className="text-sm font-bold text-gray-900 mb-1 flex items-center gap-1">
                <span className="text-purple-600">🗓️</span> 18-Month Roadmap
              </h2>
              <div className="text-[9px] text-gray-700 space-y-0.5">
                <div><strong>Q1-Q2 '26:</strong> Convert pilots, $300K ARR, 6-person team</div>
                <div><strong>Q3-Q4 '26:</strong> Scale GTM, $600K ARR, 8-person team</div>
                <div><strong>Q1-Q2 '27:</strong> Expand verticals, $1M ARR, Series A ready</div>
              </div>
            </div>

            {/* Contact */}
            <div className="bg-gray-100 p-2 rounded-lg border border-gray-300">
              <div className="text-[9px] text-gray-900 space-y-0.5">
                <div className="font-bold text-[10px]">Contact</div>
                <div>Revaz Tsivtsivadze, CEO</div>
                <div className="text-blue-600 font-semibold">revaz@zerker.ai</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Why Now */}
        <div className="mt-2 pt-1.5 border-t-2 border-gray-900">
          <div className="grid grid-cols-3 gap-2.5 text-[9px]">
            <div>
              <h3 className="font-bold text-gray-900 mb-0.5 text-[10px]">🔥 Why Now</h3>
              <p className="text-gray-700 text-[8px] leading-tight">Gen AI democratized deepfakes. Enterprises face regulatory pressure & P&L impact from synthetic media fraud.</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-0.5 text-[10px]">🎯 GTM</h3>
              <p className="text-gray-700 text-[8px] leading-tight">Lighthouse accounts → Enterprise sales (top 100 per vertical) → Productized workflows for scale</p>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-0.5 text-[10px]">💎 Edge</h3>
              <p className="text-gray-700 text-[8px] leading-tight">We're the OS, not a feature. Partners, not competitors. Open architecture solves arms race.</p>
            </div>
          </div>
          
          {/* Copyright */}
          <div className="mt-2 text-center text-[8px] text-gray-500">
            © 2025 Zerker AI. All rights reserved. Confidential. Authenticity Infrastructure for the AI Era.
          </div>
        </div>

        {/* Print Button - Hidden on Print */}
        <div className="no-print fixed bottom-4 right-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-3 bg-gray-900 text-white font-bold rounded-lg shadow-lg hover:bg-gray-800 transition-all"
          >
            🖨️ Print to PDF
          </button>
        </div>
      </div>
    </>
  );
}

