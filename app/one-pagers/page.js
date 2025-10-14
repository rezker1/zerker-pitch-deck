'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const ExecutiveSummary = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [hoveredSection, setHoveredSection] = useState(null);
  const [showTOC, setShowTOC] = useState(false);
  const [activeSection, setActiveSection] = useState('executive-summary');

  useEffect(() => {
    setIsLoaded(true);
    
    // Remove preload class after mount
    setTimeout(() => {
      document.body.classList.remove('preload');
    }, 100);

    // Keyboard shortcuts for navigation
    const handleKeyPress = (e) => {
      if (e.ctrlKey || e.metaKey) {
        const keyNum = parseInt(e.key);
        if (keyNum >= 1 && keyNum <= allSections.length) {
          e.preventDefault();
          scrollToSection(allSections[keyNum - 1].id);
        }
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    const handleSectionIntersection = () => {
      const sectionIds = allSections.map(section => section.id);
      let currentSection = '';
      
      sectionIds.forEach(sectionId => {
        const element = document.getElementById(sectionId);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom > 150) {
            currentSection = sectionId;
          }
        }
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    const handleScrollAndSection = () => {
      handleScroll();
      handleSectionIntersection();
    };

    window.addEventListener('scroll', handleScrollAndSection);
    return () => window.removeEventListener('scroll', handleScrollAndSection);
  }, []);

  const generatePDF = async () => {
    const printWindow = window.open('/one-pagers/print', '_blank');
    printWindow.onload = () => {
      printWindow.print();
    }
  };

  const coreSections = [
    { id: 'executive-summary', title: 'Executive Summary', number: '1' },
    { id: 'problem', title: 'Problem', number: '2' },
    { id: 'solution', title: 'Solution', number: '3' },
    { id: 'market-opportunity', title: 'Market Opportunity', number: '4' },
    { id: 'funding-roadmap', title: 'Funding & Growth', number: '5' },
    { id: 'the-ask', title: 'The Ask', number: '6' }
  ];

  const appendixSections = [
    { id: 'financial-modeling', title: 'Financial Modeling', number: 'A1' },
    { id: 'technical-architecture', title: 'Technical Architecture', number: 'A2' },
    { id: 'product-features', title: 'Product Features', number: 'A3' }
  ];

  const allSections = [...coreSections, ...appendixSections];

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] antialiased noise-bg relative">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-[60] bg-black/20">
        <div 
          className="h-full bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#10B981] transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Table of Contents */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:block">
        <button
          onClick={() => setShowTOC(!showTOC)}
          className="w-12 h-12 bg-gradient-to-br from-blue-600/90 to-indigo-600/90 backdrop-blur-xl border border-blue-500/30 rounded-full flex items-center justify-center text-white hover:from-blue-500/90 hover:to-indigo-500/90 transition-all duration-300 shadow-lg group mb-4"
          title="Table of Contents"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        {showTOC && (
          <div className="bg-black/90 backdrop-blur-xl border border-white/10 rounded-xl p-4 min-w-[300px] shadow-2xl max-h-[80vh] overflow-y-auto">
            <h3 className="text-sm font-bold text-white mb-3 pb-2 border-b border-white/10">Table of Contents</h3>
            
            {/* Core Sections */}
            <div className="mb-4">
              <h4 className="text-xs font-semibold text-blue-300 mb-2 uppercase tracking-wide">Core Presentation</h4>
              <div className="space-y-1">
                {coreSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group ${
                      activeSection === section.id
                        ? 'bg-blue-600/30 text-blue-300 border border-blue-500/30'
                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center transition-colors ${
                      activeSection === section.id
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-600 group-hover:bg-gray-500'
                    }`}>
                      {section.number}
                    </div>
                    <span className="flex-1">{section.title}</span>
                    {activeSection === section.id && (
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Appendix */}
            <div className="border-t border-white/10 pt-3">
              <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">Appendix</h4>
              <div className="space-y-1">
                {appendixSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 flex items-center gap-3 group ${
                      activeSection === section.id
                        ? 'bg-green-600/30 text-green-300 border border-green-500/30'
                        : 'text-gray-400 hover:bg-white/5 hover:text-gray-300'
                    }`}
                  >
                    <div className={`w-6 h-6 rounded text-xs font-bold flex items-center justify-center transition-colors ${
                      activeSection === section.id
                        ? 'bg-green-500 text-white'
                        : 'bg-gray-700 group-hover:bg-gray-600'
                    }`}>
                      {section.number}
                    </div>
                    <span className="flex-1">{section.title}</span>
                    {activeSection === section.id && (
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    )}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-white/10 space-y-2">
              <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="w-full text-xs text-gray-400 hover:text-gray-200 transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Back to Top
              </button>
              <div className="text-xs text-gray-500 text-center px-2">
                <p className="mb-1">⚡ Quick Navigation:</p>
                <p>Cmd/Ctrl + 1-6 (Core) + 7-9 (Appendix)</p>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Enhanced Enterprise Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0A0A0A]" />
      <div className="fixed inset-0 bg-gradient-to-tr from-[#374151]/20 via-transparent to-[#1F2937]/30" />
      
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#10B981]/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#8B5CF6]/3 rounded-full blur-3xl animate-pulse" />
      </div>
      
      {/* Sleek Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-3 glass border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Logo and Page Title */}
            <div className="flex items-center gap-8">
              <Link href="/" className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h1 className="text-2xl font-black text-white tracking-tight">ZERKER</h1>
                  <p className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase">Investor Portal</p>
                </div>
              </Link>
              
              <div className="h-8 w-px bg-white/10" />
              
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full" />
                <span className="text-sm font-medium text-gray-300">Pre-Seed Investment Memo</span>
              </div>
            </div>
            
            {/* Actions */}
            <div className="flex items-center gap-4">
              <Link href="/" className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200">
                ← Back to Portal
              </Link>
              
              <div className="w-px h-8 bg-white/10" />
              
              <button 
                onClick={generatePDF}
                disabled={isGeneratingPDF}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-500 hover:to-emerald-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm"
              >
                {isGeneratingPDF ? (
                  <>
                    <div className="w-4 h-4 spinner" />
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <span>Export PDF</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-8 py-12 pt-32">
        <div id="executive-brief-content" className="max-w-5xl mx-auto">
          
          {/* Title Section */}
          <div className="text-center mb-16 animate-fadeIn">
            <div className="relative mb-8">
              <div className="w-32 h-[4px] bg-gradient-to-r from-[#D1D5DB] via-[#F3F4F6] to-[#E5E7EB] rounded-full mx-auto" />
            </div>
            <h1 className="text-[clamp(40px,6vw,56px)] font-black text-white mb-4 leading-tight">
              ZERKER
            </h1>
            <h2 className="text-[clamp(24px,4vw,32px)] font-bold text-gray-300 mb-6">
              Pre-Seed Investment Memo
            </h2>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
              <div>Date: <span className="text-white font-medium">October 2025</span></div>
              <div>Stage: <span className="text-white font-medium">Pre-Seed</span></div>
              <div>Ask: <span className="text-green-400 font-bold">$1.8M SAFE @ $18M post-money</span></div>
            </div>
          </div>


          {/* Content Sections */}
          <div className="space-y-12">
            
            {/* Executive Summary */}
            <section id="executive-summary" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-blue-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">1</span>
                  </div>
                  Executive Summary
                </h2>
                <div className="space-y-4 text-gray-200 leading-relaxed">
                  <p className="text-lg">
                    <strong className="text-white">Zerker is building the authenticity infrastructure layer for synthetic media.</strong>
                  </p>
                  <p>
                    Forged from SRI International's DARPA-funded OPERA and SemaFor programs, Zerker connects the world's leading detection labs directly to enterprise workflows through a multi-model orchestration platform that evolves continuously.
                  </p>
                  <p>
                    Unlike static detection tools, Zerker delivers the infrastructure layer that connects the world's best detection labs to commercial enterprises — a continuously updated, explainable verification system already proven with CNN Digital.
                  </p>
                  <div className="p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg mt-6">
                    <p className="text-green-400 font-bold text-lg">Mission: Make truth verifiable and actionable at scale.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Problem */}
            <section id="problem" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-red-500/20 to-rose-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-red-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">2</span>
                  </div>
                  Problem
                </h2>
                <div className="space-y-6 text-gray-200 leading-relaxed">
                  <div>
                    <p className="text-lg font-semibold text-red-300 mb-3">
                      Enterprises face an impossible integration and maintenance burden.
                    </p>
                    <p>
                      Organizations must continuously evaluate, integrate, and manage dozens of point-solution detectors across image, video, audio, and text — each with different APIs, update cycles, and performance characteristics. This creates operational complexity that scales exponentially with threat sophistication.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-lg font-semibold text-red-300 mb-3">
                      Point solutions can't keep pace with the adversarial arms race.
                    </p>
                    <p>
                      Each new generative model requires custom detection development, validation, and deployment. Enterprises need infrastructure that evolves automatically, not tools that become obsolete with each AI advancement.
                    </p>
                  </div>
                  
                  <div>
                    <p className="text-lg font-semibold text-red-300 mb-3">
                      Mission-critical decisions require defense-grade explainability.
                    </p>
                    <p>
                      Binary confidence scores and black-box outputs are insufficient for legal proceedings, regulatory compliance, and high-stakes editorial decisions. Enterprises need forensic-grade evidence with full audit trails and cross-validated results.
                    </p>
                  </div>
                  
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
                    <p className="text-red-300 font-semibold mb-2">The infrastructure gap:</p>
                    <p className="text-gray-200 text-sm">
                      No standardized layer exists between cutting-edge research labs and enterprise workflows — leaving organizations to build and maintain complex detection orchestration systems themselves.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Solution */}
            <section id="solution" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-green-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">3</span>
                  </div>
                  Solution — Authenticity Infrastructure for the Enterprise
                </h2>
                
                <div className="space-y-8">
                  {/* Defense-Grade Foundation */}
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-3">Defense-Grade Foundation</h3>
                    <p className="text-gray-200 leading-relaxed mb-4">
                      Zerker inherits OPERA's open-architecture middleware, designed to connect multiple detector families and data developers with downstream users via secure APIs — the same architecture proven in DARPA's information-integrity programs.
                    </p>
                  </div>

                  {/* Continuous Detector Network */}
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-3">Continuous Detector Network</h3>
                    <p className="text-gray-200 leading-relaxed mb-4">
                      Through SRI's trusted-developer network (Syracuse U., STR, Purdue, Drexel, Kitware), Zerker integrates top-performing synthetic-media detectors and data generators, updated continuously to stay ahead of adversarial models.
                    </p>
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                      <p className="text-green-300 italic">
                        "Continuous updates are needed to address the arms-race problem… Trusted developers will create new synthetic data and updated detectors."
                      </p>
                    </div>
                  </div>

                  {/* Multi-Model Orchestration */}
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-3">Multi-Model Orchestration</h3>
                    <p className="text-gray-200 leading-relaxed mb-4">
                      Zerker unifies detectors across image, video, audio, and text into one inference layer with shared explainability metrics.
                    </p>
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg mb-4">
                      <p className="text-blue-300 italic">
                        "Any one vector is deeply flawed… these tools together give you a means of understanding maliciousness and characterization of the threat."
                      </p>
                    </div>
                    <p className="text-gray-200 leading-relaxed">
                      This multi-model orchestration delivers cross-validated, explainable results — not just detection, but actionable forensic intelligence.
                    </p>
                  </div>

                  {/* Commercial Validation */}
                  <div>
                    <h3 className="text-xl font-bold text-green-400 mb-3">Commercial Validation — CNN Digital</h3>
                    <p className="text-gray-200 leading-relaxed">
                      CNN Digital has integrated early OPERA detectors into its production workflow, validating Zerker's system under live newsroom conditions. This pilot demonstrates real-world scalability, accuracy, and enterprise readiness — a clear proof of commercial traction.
                    </p>
                  </div>
                </div>
                
                {/* Architecture Diagram */}
                <div className="mt-12 p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/40 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">ZERKER Infrastructure Architecture</h3>
                  
                  <div className="flex flex-col lg:flex-row items-center justify-between gap-8 relative">
                    {/* Trusted Developers */}
                    <div className="flex-1 text-center">
                      <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-xl">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-blue-400 mb-3">Trusted Developers</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-center font-semibold">SRI International</div>
                          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-center">Syracuse University</div>
                          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-center">STR Research</div>
                          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-center">Purdue University</div>
                          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-center">Drexel University</div>
                          <div className="p-2 bg-blue-500/10 border border-blue-500/20 rounded text-center">Kitware</div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow 1 */}
                    <div className="hidden lg:flex items-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-8 h-8 text-green-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-xs text-green-400 font-medium">Detectors & Models</span>
                      </div>
                    </div>

                    {/* ZERKER Platform */}
                    <div className="flex-1 text-center">
                      <div className="mb-6">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-xl ring-4 ring-green-500/20">
                          <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                          </svg>
                        </div>
                        <h4 className="text-xl font-bold text-green-400 mb-3">ZERKER</h4>
                        <p className="text-sm text-gray-300 mb-4">Infrastructure Layer</p>
                        <div className="space-y-2 text-xs text-gray-300">
                          <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">Multi-Model Orchestration</div>
                          <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">Standardized APIs</div>
                          <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">Continuous Updates</div>
                          <div className="p-2 bg-green-500/10 border border-green-500/20 rounded">Forensic Explainability</div>
                        </div>
                      </div>
                    </div>

                    {/* Arrow 2 */}
                    <div className="hidden lg:flex items-center">
                      <div className="flex flex-col items-center">
                        <svg className="w-8 h-8 text-purple-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                        <span className="text-xs text-purple-400 font-medium">Enterprise APIs</span>
                      </div>
                    </div>

                    {/* Commercial Enterprises */}
                    <div className="flex-1 text-center">
                      <div className="mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl mx-auto flex items-center justify-center mb-4 shadow-xl">
                          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <h4 className="text-lg font-bold text-purple-400 mb-3">Commercial Enterprises</h4>
                        <div className="space-y-2 text-sm text-gray-300">
                          <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-center font-semibold">CNN Digital</div>
                          <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-center">News Organizations</div>
                          <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-center">Legal Firms</div>
                          <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-center">Financial Services</div>
                          <div className="p-2 bg-purple-500/10 border border-purple-500/20 rounded text-center">Government Agencies</div>
                        </div>
                      </div>
                    </div>

                    {/* Mobile Arrows */}
                    <div className="lg:hidden flex flex-col items-center py-4">
                      <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg text-center">
                    <p className="text-green-300 font-semibold text-sm">
                      Standardized Interface: Connecting world-class detection R&D to enterprise workflows
                    </p>
                  </div>
                </div>
                
                {/* ZERKER OPERA Architecture */}
                <div className="mt-12 p-8 bg-gradient-to-br from-blue-900/30 to-indigo-900/20 border border-blue-500/30 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">ZERKER OPERA Architecture</h3>
                  
                  {/* Users Layer */}
                  <div className="mb-8">
                    <div className="text-sm font-semibold text-blue-300 mb-4 uppercase tracking-wider">USERS</div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white/10 border border-blue-400/30 rounded-lg text-center">
                        <div className="text-blue-200 font-semibold">Media Verification</div>
                      </div>
                      <div className="p-4 bg-white/10 border border-blue-400/30 rounded-lg text-center">
                        <div className="text-blue-200 font-semibold">Talent Protection & Takedown Management</div>
                      </div>
                      <div className="p-4 bg-white/10 border border-blue-400/30 rounded-lg text-center">
                        <div className="text-blue-200 font-semibold">Content Monitoring</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* OPERA Platform */}
                  <div className="mb-8">
                    <div className="bg-pink-500/20 border border-pink-400/30 rounded-lg p-3 mb-4 inline-block">
                      <div className="text-pink-200 font-semibold text-sm">OPERA PLATFORM</div>
                    </div>
                    
                    {/* Dashboards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                        <div className="text-white font-bold mb-2">News Media Dashboard</div>
                        <div className="text-blue-200 text-sm">Content Verification & Analysis</div>
                      </div>
                      <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                        <div className="text-white font-bold mb-2">Talent Agency Dashboard</div>
                        <div className="text-blue-200 text-sm">Asset Protection & Takedown</div>
                      </div>
                    </div>
                    
                    {/* Customer API */}
                    <div className="p-4 bg-blue-600/50 border border-blue-400/40 rounded-lg mb-4">
                      <div className="text-white font-bold text-center">Customer API</div>
                    </div>
                    
                    {/* Open Architecture Platform */}
                    <div className="p-4 bg-black/50 border border-gray-400/40 rounded-lg mb-6">
                      <div className="text-white font-bold text-center">OPEN ARCHITECTURE PLATFORM</div>
                    </div>
                  </div>
                  
                  {/* Core Components */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="p-4 bg-blue-600/40 border border-blue-400/40 rounded-lg">
                      <div className="text-white font-bold mb-3">WORKFLOWS</div>
                      <div className="space-y-1 text-blue-200 text-sm">
                        <div>- Content Processing</div>
                        <div>- Automation Engine</div>
                        <div>- Custom Pipelines</div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-600/40 border border-blue-400/40 rounded-lg">
                      <div className="text-white font-bold mb-3">ALGORITHM/MODEL API</div>
                      <div className="space-y-1 text-blue-200 text-sm">
                        <div>- Multi-modal Detection</div>
                        <div>- Real-time Analysis</div>
                        <div>- Batch Processing</div>
                      </div>
                    </div>
                    <div className="p-4 bg-blue-600/40 border border-blue-400/40 rounded-lg">
                      <div className="text-white font-bold mb-3">TEST AND EVAL</div>
                      <div className="space-y-1 text-blue-200 text-sm">
                        <div>- Model Validation</div>
                        <div>- Performance Metrics</div>
                        <div>- Quality Assurance</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Provider Layer */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-white/10 border border-gray-400/30 rounded-lg text-center">
                      <div className="text-gray-200 font-semibold">Algorithm/Model Providers</div>
                    </div>
                    <div className="p-4 bg-white/10 border border-gray-400/30 rounded-lg text-center">
                      <div className="text-gray-200 font-semibold">Data Providers</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-lg text-center">
                    <p className="text-blue-300 font-semibold text-sm">
                      Enterprise-grade platform architecture enabling multi-modal detection and real-time content verification
                    </p>
                  </div>
                </div>
                
                {/* Persona-Driven Features */}
                <div className="mt-12 p-8 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/40 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center">Persona-Driven ZERKER MVP Features</h3>
                  
                  {/* News Media Users */}
                  <div className="mb-10">
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg mb-4">
                        PERSONA: NEWS MEDIA USERS
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Upload & Analyze Media</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Upload images or videos for analysis of synthetic media detection. The platform will display elements such as confidence scores and detailed explanations.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Collaborative Verification Workflows</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Share and annotate results for team collaboration.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Customizable Detection Parameters</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Adjust detection sensitivity based on use case, either on a per-artifact level or on a user level.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Bulk Analysis</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Enable simultaneous verification of multiple files.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">API Integration</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Scalable APIs for automated media verification workflows.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Algorithm and Data Providers */}
                  <div className="mb-10">
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg mb-4">
                        PERSONA: ALGORITHM AND DATA PROVIDERS
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Algorithm/Model Submission and Management</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Upload and manage detection algorithm/models with performance benchmarks.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Dataset Submission and Feedback</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Contribute datasets with insights on their impact.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Performance Analytics</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Evaluate algorithm/model and data effectiveness through metrics. Provide feedback to the contributors on an ongoing basis.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">API & Other Integration with OPERA</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Modularity and compatibility guidance and features.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* OPERA Support Engineer */}
                  <div className="mb-6">
                    <div className="mb-6">
                      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg font-bold text-lg mb-4">
                        PERSONA: OPERA SUPPORT ENGINEER
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">User Management & Role-Based Access</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Secure and customizable access levels. This should be a routine SAAS feature.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Audit Logs and Compliance</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Comprehensive tracking for accountability and regulatory needs.</div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="p-4 bg-blue-800/50 border border-blue-400/40 rounded-lg">
                          <div className="text-blue-200 font-semibold mb-2">Analytics Dashboard</div>
                        </div>
                        <div className="lg:col-span-2 p-4 bg-blue-600/30 border border-blue-400/30 rounded-lg">
                          <div className="text-gray-200 text-sm">Monitor detection trends, workflow performance, and usage patterns.</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg text-center">
                    <p className="text-green-300 font-semibold text-sm">
                      User-centric design ensuring optimal workflows for all stakeholders in the authenticity verification ecosystem
                    </p>
                  </div>
                </div>
                
                {/* Financial Overview */}
                <div className="mt-12 p-6 bg-gradient-to-br from-indigo-900/20 to-blue-900/10 border border-indigo-500/20 rounded-xl">
                  <h3 className="text-xl font-bold text-white mb-4 text-center">Financial Projections Summary</h3>
                  
                  <div className="text-center mb-6">
                    <div className="inline-flex items-center gap-4 p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <div>
                        <div className="text-2xl font-bold text-blue-400">$67M</div>
                        <div className="text-sm text-gray-300">Year 10 Revenue (Medium Case)</div>
                      </div>
                      <div className="w-px h-12 bg-blue-500/30"></div>
                      <div>
                        <div className="text-2xl font-bold text-blue-400">~$500M</div>
                        <div className="text-sm text-gray-300">Projected Valuation</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <a href="#financial-modeling" onClick={(e) => {
                      e.preventDefault();
                      document.getElementById('financial-modeling').scrollIntoView({ behavior: 'smooth' });
                    }} className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Detailed Financial Modeling
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Market Opportunity */}
            <section id="market-opportunity" className="relative group card-hover scroll-mt-24">
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-purple-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">4</span>
                  </div>
                  Market Opportunity
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h3 className="text-xl font-bold text-purple-300 mb-3">Initial Market: News & Media</h3>
                      <p className="text-gray-300 text-sm">Initial focus on news and media organizations, leveraging the CNN Digital partnership to establish a strong foothold.</p>
                    </div>
                    <div className="p-6 bg-pink-500/10 border border-pink-500/20 rounded-lg">
                      <h3 className="text-xl font-bold text-pink-300 mb-3">Expansion Market: Insurance & Legal</h3>
                      <p className="text-gray-300 text-sm">Expand into insurance and legal sectors, where verifiable authenticity is critical for fraud detection and evidence validation.</p>
                    </div>
                  </div>
                  <div className="text-center pt-6">
                    <p className="text-2xl font-bold text-white">Total Addressable Market (TAM): <span className="text-green-400">$10B+</span></p>
                    <p className="text-gray-400">Based on enterprise SaaS spending in target verticals.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Funding & Growth Roadmap */}
            <section id="funding-roadmap" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-cyan-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">5</span>
                  </div>
                  Funding & Growth Roadmap
                </h2>
                
                <div className="space-y-8">
                  {/* Pre-Seed Current */}
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-green-500 rounded-full mr-4" />
                      <h3 className="text-xl font-bold text-green-400">Pre-Seed (Current) — $1.8M SAFE @ $18M</h3>
                    </div>
                    <div className="ml-8 space-y-3">
                      <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <p className="text-green-300 font-semibold mb-2">24-Month Milestones:</p>
                        <ul className="text-gray-200 text-sm space-y-1">
                          <li>• CNN Digital production deployment & case study</li>
                          <li>• Media Verification OS v1 with multi-modal orchestration</li>
                          <li>• 3-5 enterprise pilots across news, compliance, and legal</li>
                          <li>• $500K+ ARR with proven unit economics</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Seed Next */}
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-blue-500 rounded-full mr-4" />
                      <h3 className="text-xl font-bold text-blue-400">Seed (Next) — $8-12M @ $40-60M via DARPA Horizon Ventures</h3>
                    </div>
                    <div className="ml-8 space-y-3">
                      <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-300 font-semibold mb-2">Strategic Advantage:</p>
                        <p className="text-gray-200 text-sm mb-3">
                          DARPA Horizon Ventures provides unique dual-use scaling pathway, connecting defense validation with commercial acceleration.
                        </p>
                        <div className="text-gray-200 text-sm space-y-1">
                          <div>• <strong>Target:</strong> $3M+ ARR with 50+ enterprise customers</div>
                          <div>• <strong>Focus:</strong> Government partnerships + enterprise expansion</div>
                          <div>• <strong>Network:</strong> Defense contractors & intelligence community</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Series A Ready */}
                  <div className="relative">
                    <div className="flex items-center mb-4">
                      <div className="w-4 h-4 bg-purple-500 rounded-full mr-4" />
                      <h3 className="text-xl font-bold text-purple-400">Series A Ready — $15-25M @ $100M+</h3>
                    </div>
                    <div className="ml-8 space-y-3">
                      <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                        <p className="text-purple-300 font-semibold mb-2">Key Metrics for Series A:</p>
                        <ul className="text-gray-200 text-sm space-y-1">
                          <li>• $10M+ ARR with 20%+ QoQ growth</li>
                          <li>• 100+ enterprise customers across 3 verticals</li>
                          <li>• Proven unit economics with positive gross margins</li>
                          <li>• Strategic partnerships with major platforms</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* The Ask */}
            <section id="the-ask" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-emerald-500/20 to-green-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-emerald-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-green-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">6</span>
                  </div>
                  The Ask
                </h2>
                <div className="space-y-4 text-gray-200 leading-relaxed">
                  <p className="text-xl font-bold text-white">
                    Zerker is raising a $1.8M pre-seed round after partnering with SRI to exclusively commercialize DARPA-funded deepfake detection and media verification technology with CNN as the lighthouse customer in the News Media vertical.
                  </p>
                  <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-black text-emerald-400">$1.8M</div>
                        <div className="text-sm text-gray-300">Pre-Seed SAFE</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-emerald-400">$18M</div>
                        <div className="text-sm text-gray-300">Post-Money Valuation</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-emerald-400">24</div>
                        <div className="text-sm text-gray-300">Month Runway</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Link to detailed financial model */}
                  <div className="mt-6 text-center">
                    <Link href="/financials" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/30 text-white rounded-lg hover:from-blue-600/30 hover:to-indigo-600/30 hover:border-blue-500/40 transition-all duration-200 text-sm font-medium">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                      View Detailed Use of Funds (24-Month Plan)
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            {/* Appendix Divider */}
            <div className="relative my-16">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-600"></div>
              </div>
              <div className="relative flex justify-center">
                <div className="bg-[#0A0A0A] px-8 py-4">
                  <h2 className="text-2xl font-bold text-gray-400 uppercase tracking-[0.2em] text-center">
                    📋 Appendix
                  </h2>
                  <p className="text-sm text-gray-500 text-center mt-2">
                    Detailed technical information and supporting materials
                  </p>
                </div>
              </div>
            </div>

            {/* A1: Financial Modeling */}
            <section id="financial-modeling" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-green-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">A1</span>
                  </div>
                  Financial Modeling Scenarios
                </h2>
                <p className="text-center text-blue-200 mb-8 text-lg">Medium Case Shows a Company with $67M Revenue in Year 5 (~$500M Valuation)¹</p>
                
                <div className="text-sm text-gray-400 mb-6 p-4 bg-gray-800/30 rounded-lg">
                  <p>📊 <strong>Note:</strong> This financial modeling is for illustrative purposes. Early-stage projections are used to understand key assumptions and validate business drivers rather than predict exact outcomes.</p>
                </div>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Financial modeling tables will be here - referencing existing content */}
                    <div className="p-6 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                      <h4 className="text-blue-300 font-bold mb-4">High Case Scenario</h4>
                      <p className="text-gray-300 text-sm">Insurance pricing 2x increase, higher market penetration</p>
                    </div>
                    <div className="p-6 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                      <h4 className="text-indigo-300 font-bold mb-4">Medium Case Scenario</h4>
                      <p className="text-gray-300 text-sm">$67M revenue by year 5, ~$500M valuation target</p>
                    </div>
                    <div className="p-6 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                      <h4 className="text-purple-300 font-bold mb-4">Conservative Case</h4>
                      <p className="text-gray-300 text-sm">Lower pricing model, organic growth focus</p>
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      📈 <strong>Link to detailed models:</strong> Full financial projections available in Financial section
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* A2: Technical Architecture */}
            <section id="technical-architecture" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-blue-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">A2</span>
                  </div>
                  Technical Architecture
                </h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                  {/* ZERKER Infrastructure */}
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
                    <h3 className="text-xl font-bold text-blue-300 mb-4">ZERKER Infrastructure</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Defense-grade foundation from OPERA / SentinelOne</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Continuous update pipeline of trusted data</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>Cross-modal explainability for forensics and audit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>CNN-validated technologies for trusted verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                        <span>API-first architecture with LLM and metadata plug-ins</span>
                      </div>
                    </div>
                  </div>

                  {/* Business Model */}
                  <div className="bg-gray-800/50 p-6 rounded-xl border border-blue-500/20">
                    <h3 className="text-xl font-bold text-blue-300 mb-4">Business Model</h3>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span><strong>Enterprise API Licensing:</strong> volume-based SaaS for forensic verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span><strong>Forensic Analytics Dashboard:</strong> audit trail + chain-of-custody reports</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span><strong>Developer Revenue Share:</strong> royalties to trusted detector partners</span>
                      </div>
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-500/20 rounded-lg">
                      <div className="text-blue-200 font-semibold mb-2">Rollout Path:</div>
                      <div className="text-sm text-blue-300">CNN → news & compliance partners → enterprise market</div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Risks & Mitigations */}
                  <div className="bg-red-900/20 p-6 rounded-xl border border-red-500/20">
                    <h3 className="text-xl font-bold text-red-300 mb-4">Risks & Mitigations</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-red-200 font-semibold">Generator arms race</div>
                        <div className="text-gray-300 text-sm">Continuous real-team updates via CTR & Purdue</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-semibold">Academic dependency</div>
                        <div className="text-gray-300 text-sm">Hybrid commercial contracts + redundancy across labs</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-semibold">Market education</div>
                        <div className="text-gray-300 text-sm">Proof-of-value through CNN case study</div>
                      </div>
                      <div>
                        <div className="text-red-200 font-semibold">Cost / scalability</div>
                        <div className="text-gray-300 text-sm">GPU optimization + multi-tenant architecture</div>
                      </div>
                    </div>
                  </div>

                  {/* Exit Potential */}
                  <div className="bg-green-900/20 p-6 rounded-xl border border-green-500/20">
                    <h3 className="text-xl font-bold text-green-300 mb-4">Exit Potential</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="text-green-200 font-semibold">Strategic acquirers:</div>
                        <div className="text-gray-300 text-sm">Warner Bros. Discovery (CNN) • Comcast (NBC) • Disney (ABC) • Paramount • NYT • Reuters</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-semibold">Comparables</div>
                        <div className="text-gray-300 text-sm">Truepic (Verisign acq.) • Deepware ($32M Series B)</div>
                      </div>
                      <div>
                        <div className="text-green-200 font-semibold">5-7 yr outlook:</div>
                        <div className="text-green-300 font-bold text-lg">$50 - $100M+ exit</div>
                        <div className="text-gray-300 text-sm">via infrastructure acquisition or dual-use scale up</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* A3: Product Features */}
            <section id="product-features" className="relative group card-hover scroll-mt-24 section-to-print">
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-green-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">A3</span>
                  </div>
                  Product Features
                </h2>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Detection Features */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-green-300 mb-4">Detection Capabilities</h3>
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-green-500/20">
                      <h4 className="text-lg font-semibold text-green-200 mb-3">Multi-Modal Analysis</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Real-time deepfake video detection
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          AI-generated image identification
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Synthetic audio verification
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Cross-modal consistency checks
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl border border-green-500/20">
                      <h4 className="text-lg font-semibold text-green-200 mb-3">Forensic Capabilities</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Chain-of-custody tracking
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Explainable AI decisions
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Confidence scoring and thresholds
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Audit trail generation
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* Platform Features */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-bold text-green-300 mb-4">Platform Infrastructure</h3>
                    
                    <div className="bg-gray-800/50 p-6 rounded-xl border border-green-500/20">
                      <h4 className="text-lg font-semibold text-green-200 mb-3">API & Integration</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          RESTful API with webhook support
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Real-time streaming analysis
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Batch processing capabilities
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Custom threshold management
                        </li>
                      </ul>
                    </div>

                    <div className="bg-gray-800/50 p-6 rounded-xl border border-green-500/20">
                      <h4 className="text-lg font-semibold text-green-200 mb-3">Enterprise Dashboard</h4>
                      <ul className="space-y-2 text-gray-300 text-sm">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Real-time monitoring & alerts
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Usage analytics and reporting
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Role-based access control
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                          Compliance reporting tools
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      {/* PDF Export Functions */}
      <div id="pdf-content" className="hidden">
        {/* This div contains the content for PDF export */}
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .glass {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-2px);
        }
        
        .floating-toc {
          position: fixed;
          top: 50%;
          left: 20px;
          transform: translateY(-50%);
          z-index: 1000;
          max-height: 80vh;
          overflow-y: auto;
        }
        
        @media (max-width: 1024px) {
          .floating-toc {
            display: none;
          }
        }
        
        .toc-item {
          transition: all 0.2s ease;
        }
        
        .toc-item:hover {
          background: rgba(59, 130, 246, 0.1);
          border-left: 3px solid rgb(59, 130, 246);
        }
        
        .toc-item.active {
          background: rgba(59, 130, 246, 0.2);
          border-left: 3px solid rgb(59, 130, 246);
          color: rgb(59, 130, 246);
        }
      `}</style>
    </div>
  );
};

export default ExecutiveSummary;