'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const WhiteDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  // Deck content from executive summary
  const slides = [
    {
      type: 'title',
      content: (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-24 h-[3px] bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#60A5FA] rounded-full mx-auto shadow-xl mb-12" />
          <h1 className="text-7xl xl:text-8xl font-bold mb-6 print:text-6xl text-[#F8FAFC]">ZERKER</h1>
          <p className="text-xl xl:text-2xl text-[#D1D5DB] max-w-4xl leading-relaxed print:text-lg">
            Authenticity Infrastructure for the Enterprise
          </p>
          <p className="text-lg text-[#9CA3AF] mt-6 print:text-base">
            Enterprise-grade media verification for newsrooms under deadline pressure
          </p>
          <div className="mt-8 text-[#6B7280] text-sm print:text-xs">
            Pre-Seed Deck • October 2025
          </div>
        </div>
      )
    },
    {
      type: 'problem',
      content: (
        <div className="h-full flex flex-col justify-center print:py-12">
          <h2 className="text-4xl xl:text-5xl font-bold mb-8 xl:mb-12 print:text-3xl print:mb-6 text-[#F8FAFC]">The Problem</h2>
          <div className="space-y-6 xl:space-y-8 text-lg xl:text-xl text-[#D1D5DB] max-w-5xl print:text-base print:space-y-4">
            <div>
              <h3 className="font-semibold text-[#F87171] mb-2">Explainability Crisis</h3>
              <p>Newsrooms need human-readable reasons and highlighted evidence. Video upscaling or benign edits must be distinguished from deceptive manipulation. Policy and desk editors can't act on binary "AI-generated" scores.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#F87171] mb-2">Privacy & Deployment Constraints</h3>
              <p>Secure handling of sensitive newsroom media is non-negotiable. CNN, ABC, CBS, NBC, and NYT require VPC or on-premises options with zero data egress outside approved environments.</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#F87171] mb-2">Scale & Speed Under Deadline Pressure</h3>
              <p>Wire services face the heaviest loads. Manual review cannot keep up with volume and velocity of breaking news. Current tools focus on "is it generated?" instead of "is it malicious and why?"</p>
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'solution',
      content: (
        <div className="h-full flex flex-col justify-center print:py-12">
          <h2 className="text-4xl xl:text-5xl font-bold mb-8 xl:mb-12 print:text-3xl print:mb-6 text-[#F8FAFC]">Multi-Modal Maliciousness Detection</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 max-w-6xl print:gap-6">
            <div>
              <h3 className="text-xl xl:text-2xl font-semibold mb-4 xl:mb-6 text-[#60A5FA] print:text-lg print:mb-3">Beyond "Is it AI-Generated?"</h3>
              <p className="text-[#D1D5DB] mb-6 print:text-sm print:mb-4">
                Maliciousness score with human-readable rationale combining video, audio, and contextual signals. Distinguishes benign edits from deceptive manipulation.
              </p>
              <ul className="space-y-2 xl:space-y-3 text-[#D1D5DB] print:text-sm print:space-y-1">
                <li>• Explainable evidence snippets</li>
                <li>• Reverse search for derivatives</li>
                <li>• Policy-ready report exports</li>
                <li>• Workflow hooks for rapid action</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl xl:text-2xl font-semibold mb-4 xl:mb-6 text-[#60A5FA] print:text-lg print:mb-3">Newsroom-Ready Deployment</h3>
              <p className="text-[#D1D5DB] mb-6 print:text-sm print:mb-4">
                VPC or on-premises options with zero data egress. Built for deadline pressure with agentic workflows and human-in-the-loop design.
              </p>
              <ul className="space-y-2 xl:space-y-3 text-[#D1D5DB] print:text-sm print:space-y-1">
                <li>• API and MCP adapters</li>
                <li>• Forward Deployed Engineers</li>
                <li>• SSO, audit logs, auto-delete</li>
                <li>• CNN design-partner pilot</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 xl:mt-12 p-4 xl:p-6 bg-[#34D399]/10 border border-[#34D399]/20 rounded-lg max-w-6xl print:mt-6 print:p-3">
            <p className="text-green-700 font-semibold text-lg xl:text-xl print:text-base">
              Mission: Fast, explainable verification for breaking news workflows.
            </p>
          </div>
        </div>
      )
    },
    {
      type: 'market',
      content: (
        <div className="h-full flex flex-col justify-center print:py-12">
          <h2 className="text-4xl xl:text-5xl font-bold mb-8 xl:mb-12 print:text-3xl print:mb-6 text-[#F8FAFC]">News Media Beachhead Strategy</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 max-w-5xl mb-8 xl:mb-12 print:gap-4 print:mb-6">
            <div className="text-center bg-white/5 border border-white/10 p-6 rounded-lg print:p-4">
              <div className="text-3xl xl:text-4xl font-bold text-[#60A5FA] mb-2 print:text-2xl">CNN</div>
              <div className="text-base xl:text-lg text-[#9CA3AF] print:text-sm">Design-Partner Pilot</div>
            </div>
            <div className="text-center bg-white/5 border border-white/10 p-6 rounded-lg print:p-4">
              <div className="text-3xl xl:text-4xl font-bold text-[#60A5FA] mb-2 print:text-2xl">40-60%</div>
              <div className="text-base xl:text-lg text-[#9CA3AF] print:text-sm">Time-to-Decision Reduction</div>
            </div>
            <div className="text-center bg-white/5 border border-white/10 p-6 rounded-lg print:p-4">
              <div className="text-3xl xl:text-4xl font-bold text-[#60A5FA] mb-2 print:text-2xl">Wire</div>
              <div className="text-base xl:text-lg text-[#9CA3AF] print:text-sm">Services Next Phase</div>
            </div>
          </div>
          <div className="space-y-3 xl:space-y-4 max-w-5xl print:space-y-2">
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg print:p-3">
              <span className="font-semibold text-lg xl:text-xl print:text-base">Phase 1: CNN Verification Desk</span>
              <span className="text-[#60A5FA] font-bold text-lg xl:text-xl print:text-base">4-6 weeks</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg print:p-3">
              <span className="font-semibold text-lg xl:text-xl print:text-base">Phase 2: Wire Services (AP/Reuters)</span>
              <span className="text-[#60A5FA] font-bold text-lg xl:text-xl print:text-base">High volume</span>
            </div>
            <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg print:p-3">
              <span className="font-semibold text-lg xl:text-xl print:text-base">Phase 3: National & Regional Broadcasters</span>
              <span className="text-[#60A5FA] font-bold text-lg xl:text-xl print:text-base">Scale out</span>
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'traction',
      content: (
        <div className="h-full flex flex-col justify-center print:py-12">
          <h2 className="text-4xl xl:text-5xl font-bold mb-8 xl:mb-12 print:text-3xl print:mb-6 text-[#F8FAFC]">CNN Design-Partner Pilot</h2>
          
          {/* CNN Data Commitment - Hero Stat */}
          <div className="mb-10 text-center">
            <div className="inline-block p-8 bg-gradient-to-br from-[#EF4444]/20 to-[#DC2626]/10 border border-[#EF4444]/30 rounded-2xl">
              <div className="text-6xl xl:text-7xl font-black text-[#F87171] mb-3">2M+</div>
              <div className="text-xl xl:text-2xl text-white font-semibold mb-2">Hours of Unseen Footage</div>
              <div className="text-sm text-[#9CA3AF]">CNN archive data for training & validation</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 xl:gap-12 max-w-6xl print:gap-6">
            <div>
              <h3 className="text-xl xl:text-2xl font-semibold mb-6 print:text-lg print:mb-4 text-[#F8FAFC]">Pilot Scope & Target Metrics</h3>
              <div className="space-y-4 xl:space-y-5 print:space-y-3">
                <div className="p-4 xl:p-5 bg-[#34D399]/10 border border-[#34D399]/20 rounded-lg border-l-4 border-[#34D399] print:p-4">
                  <div className="font-bold text-lg xl:text-xl print:text-base text-white">Verification Desk Integration</div>
                  <div className="text-[#9CA3AF] print:text-sm">Real-time image & video verification in breaking news workflows</div>
                </div>
                <div className="p-4 xl:p-5 bg-white/5 border border-white/10 rounded-lg border-l-4 border-[#60A5FA] print:p-4">
                  <div className="font-bold text-lg xl:text-xl print:text-base text-white">40-60% Time Reduction Goal</div>
                  <div className="text-[#9CA3AF] print:text-sm">≥4.3/5 explanation quality ratings from desk editors</div>
                </div>
                <div className="p-4 xl:p-5 bg-[#A78BFA]/10 border border-[#A78BFA]/20 rounded-lg border-l-4 border-[#A78BFA] print:p-4">
                  <div className="font-bold text-lg xl:text-xl print:text-base text-white">VPC Deployment</div>
                  <div className="text-[#9CA3AF] print:text-sm">Zero data egress, enterprise-grade security & compliance</div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl xl:text-2xl font-semibold mb-6 print:text-lg print:mb-4 text-[#F8FAFC]">Customer Discovery & Validation</h3>
              <div className="space-y-3 xl:space-y-4 print:space-y-2">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#34D399]/10 border border-[#34D399]/20 rounded-full flex items-center justify-center print:w-4 print:h-4 flex-shrink-0 mt-0.5">
                    <span className="text-[#34D399] text-sm print:text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">CNN Digital Verification Team</div>
                    <div className="text-[#9CA3AF] text-sm">Direct interviews with editors & verification desk leads</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#34D399]/10 border border-[#34D399]/20 rounded-full flex items-center justify-center print:w-4 print:h-4 flex-shrink-0 mt-0.5">
                    <span className="text-[#34D399] text-sm print:text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Tier-1 Newsroom Validation</div>
                    <div className="text-[#9CA3AF] text-sm">ABC, CBS, NBC, NYT confirm explainability & privacy needs</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#34D399]/10 border border-[#34D399]/20 rounded-full flex items-center justify-center print:w-4 print:h-4 flex-shrink-0 mt-0.5">
                    <span className="text-[#34D399] text-sm print:text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Production Data Access</div>
                    <div className="text-[#9CA3AF] text-sm">2M+ hours CNN archive for model training & testing</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#34D399]/10 border border-[#34D399]/20 rounded-full flex items-center justify-center print:w-4 print:h-4 flex-shrink-0 mt-0.5">
                    <span className="text-[#34D399] text-sm print:text-xs font-bold">✓</span>
                  </div>
                  <div>
                    <div className="text-white font-semibold">Workflow Integration Validated</div>
                    <div className="text-[#9CA3AF] text-sm">VPC deployment & zero data egress requirements confirmed</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'roadmap',
      content: (
        <div className="h-full flex flex-col justify-center print:py-12">
          <h2 className="text-4xl xl:text-5xl font-bold mb-8 xl:mb-12 print:text-3xl print:mb-6 text-[#F8FAFC]">Go-to-Market Roadmap</h2>
          <div className="space-y-6 xl:space-y-8 max-w-5xl print:space-y-4">
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-[#34D399]/10 border border-[#34D399]/200 rounded-full mt-2 print:w-3 print:h-3 print:mt-1"></div>
              <div>
                <h3 className="text-xl xl:text-2xl font-bold text-[#34D399] mb-2 print:text-lg print:mb-1">Next 3 Months — CNN Pilot</h3>
                <p className="text-[#9CA3AF] mb-3 print:text-sm print:mb-2">Verification desk deployment:</p>
                <ul className="text-[#D1D5DB] space-y-1 print:text-sm">
                  <li>• 4-6 week pilot with verification desk & editors</li>
                  <li>• 40-60% time-to-decision reduction target</li>
                  <li>• VPC deployment with zero data egress</li>
                  <li>• ≥4.3/5 explanation quality ratings</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-white/5 border border-white/100 rounded-full mt-2 print:w-3 print:h-3 print:mt-1"></div>
              <div>
                <h3 className="text-xl xl:text-2xl font-bold text-[#60A5FA] mb-2 print:text-lg print:mb-1">6 Months — Wire Services</h3>
                <p className="text-[#9CA3AF] mb-3 print:text-sm print:mb-2">High-volume verification:</p>
                <ul className="text-[#D1D5DB] space-y-1 print:text-sm">
                  <li>• Target AP/Reuters with batch & API flows</li>
                  <li>• Cross-platform reverse search at scale</li>
                  <li>• Policy explainability v2 with takedown exports</li>
                  <li>• Forward Deployed Engineers for integration</li>
                </ul>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="w-4 h-4 bg-purple-500 rounded-full mt-2 print:w-3 print:h-3 print:mt-1"></div>
              <div>
                <h3 className="text-xl xl:text-2xl font-bold text-[#A78BFA] mb-2 print:text-lg print:mb-1">12 Months — Platform Scale</h3>
                <p className="text-[#9CA3AF] mb-3 print:text-sm print:mb-2">Multi-vertical expansion:</p>
                <ul className="text-[#D1D5DB] space-y-1 print:text-sm">
                  <li>• National & regional broadcasters</li>
                  <li>• Platform partnerships (YouTube, TikTok)</li>
                  <li>• Rights-holder track (talent agencies, studios)</li>
                  <li>• Live deployments across multiple platforms</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      type: 'ask',
      content: (
        <div className="h-full flex flex-col justify-center items-center print:py-16">
          <h2 className="text-4xl xl:text-5xl font-bold mb-8 xl:mb-12 text-center print:text-3xl print:mb-8 text-[#F8FAFC]">The Ask</h2>
          <div className="bg-white/5 border border-white/10 p-8 xl:p-12 rounded-xl max-w-4xl print:p-6">
            <div className="text-center mb-8 xl:mb-12 print:mb-6">
              <p className="text-lg xl:text-xl text-[#D1D5DB] mb-6 xl:mb-8 print:text-base print:mb-4">
                Zerker is raising a seed extension to accelerate platform integrations and reverse-search scaling after validating newsroom demand through CNN design-partner pilot.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 xl:gap-8 mb-8 xl:mb-12 print:gap-4 print:mb-6">
              <div className="text-center">
                <div className="text-3xl xl:text-4xl font-bold text-[#60A5FA] mb-2 print:text-2xl">Seed</div>
                <div className="text-base xl:text-lg text-[#9CA3AF] print:text-sm">Extension Round</div>
              </div>
              <div className="text-center">
                <div className="text-3xl xl:text-4xl font-bold text-[#60A5FA] mb-2 print:text-2xl">CNN</div>
                <div className="text-base xl:text-lg text-[#9CA3AF] print:text-sm">Design Partner</div>
              </div>
              <div className="text-center">
                <div className="text-3xl xl:text-4xl font-bold text-[#60A5FA] mb-2 print:text-2xl">Wire</div>
                <div className="text-base xl:text-lg text-[#9CA3AF] print:text-sm">Services Next</div>
              </div>
            </div>
            <div className="text-center">
              <p className="text-lg xl:text-xl text-[#9CA3AF] print:text-base">
                Fast, explainable media verification for breaking news workflows
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];


  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        prevSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] antialiased">
      {/* Premium background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0A0A0A]" />
      <div className="fixed inset-0 bg-gradient-to-tr from-[#374151]/20 via-transparent to-[#1F2937]/30" />
      
      {/* Subtle grid */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(209, 213, 219, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(209, 213, 219, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      {/* Sleek Header */}
      <div className="fixed top-0 left-0 right-0 bg-[#0F0F0F]/80 border-b border-white/10 z-50 relative">
        <div className="flex items-center justify-between px-8 py-4">
          <Link href="/" className="text-[#9CA3AF] hover:text-white flex items-center gap-2 transition-colors duration-150">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Portal
          </Link>
          
          <div className="flex items-center gap-6">
            <span className="text-sm text-[#9CA3AF]">
              {currentSlide + 1} / {slides.length}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 hover:border-white/20 transition-all duration-150 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print
              </button>
              <button
                onClick={prevSlide}
                disabled={currentSlide === 0}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={nextSlide}
                disabled={currentSlide === slides.length - 1}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-150"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Content */}
      <div className="pt-20 px-20 h-screen print:pt-0 print:px-4 print:h-auto relative z-10" ref={slideRef}>
        <div className="print:hidden h-full flex flex-col justify-center">
          <div>
            {slides[currentSlide].content}
          </div>
        </div>
        
        {/* Print version - all slides */}
        <div className="hidden print:block">
          {slides.map((slide, index) => (
            <div 
              key={index}
              className={`min-h-screen flex flex-col justify-center print:py-8 ${index < slides.length - 1 ? 'print:page-break-after' : ''}`}
              style={{ pageBreakAfter: index < slides.length - 1 ? 'always' : 'auto' }}
            >
              {slide.content}
            </div>
          ))}
        </div>
      </div>

      {/* Sleek Progress Bar */}
      <div className="fixed bottom-0 left-0 right-0 h-1 bg-white/5 print:hidden z-50">
        <div 
          className="h-full bg-gradient-to-r from-[#60A5FA] to-[#3B82F6] transition-all duration-300"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0.5in;
          }
          
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          
          /* Hide header and progress bar when printing */
          .fixed {
            display: none !important;
          }
          
          /* Show all slides when printing */
          .min-h-screen {
            min-height: auto !important;
          }
          
          .pt-20 {
            padding-top: 0 !important;
          }
          
          .px-20 {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
          
          .h-screen {
            height: auto !important;
          }
          
          .print\\:page-break-after {
            page-break-after: always;
          }
          
          .print\\:page-break-inside-avoid {
            page-break-inside: avoid;
          }
          
          .print\\:text-black {
            color: black !important;
          }
          
          .print\\:bg-white {
            background-color: white !important;
          }
          
          .print\\:border-gray-300 {
            border-color: #d1d5db !important;
          }
          
          /* Hide interactive elements */
          .print\\:hidden {
            display: none !important;
          }
        }
        
        @media screen {
          .slide-content {
            min-height: calc(100vh - 80px);
          }
        }
      `}</style>
    </div>
  );
};

export default WhiteDeck;