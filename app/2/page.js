'use client';

import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Components for the alternative version
const MetricCard = ({ value, label, accent = false, trend = null }) => (
  <div className={`relative group ${accent ? 'col-span-2' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    <div className="relative p-8 bg-gray-900 border border-gray-800 rounded-xl hover:border-purple-400/50 transition-all duration-300">
      <div className="flex items-end justify-between">
        <div>
          <div className={`${accent ? 'text-[56px]' : 'text-[42px]'} font-bold bg-gradient-to-r from-purple-400 to-purple-600 bg-clip-text text-transparent leading-none`}>
            {value}
          </div>
          <div className="text-[16px] text-gray-400 mt-3 uppercase tracking-wider">{label}</div>
        </div>
        {trend && (
          <div className="text-green-400 text-sm font-medium flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {trend}
          </div>
        )}
      </div>
    </div>
  </div>
);

// 15-slide version content with purple styling
const deckContentV2 = [
  // Slide 1: Title
  { 
    section: "Title", 
    title: "ZERKER", 
    subtitle: "The Media Verification Operating System", 
    date: "September 22, 2025" 
  },
  // Slide 2: The Problem
  { 
    section: "Problem", 
    title: "AI's Accessibility Has Broken Digital Trust, Creating Massive Enterprise Risk", 
    points: [
      "Infodemic at Scale: Generative AI tools are now dangerously accessible, allowing anyone to create a convincing deepfake video for as little as $15.",
      "Mission-Critical Impact: This fuels misinformation that erodes brand trust, enables sophisticated fraud, and facilitates reputational attacks.",
      "Existing Tools are Failing: Current point solutions are reactive, slow, and lack the critical explainability that our 17 enterprise and government interviews confirmed is non-negotiable."
    ] 
  },
  // Slide 3: The Solution
  { 
    section: "Solution", 
    title: "We Are Creating the Media Verification Operating System to Rebuild Enterprise Trust at Scale", 
    description: "We provide the essential synthetic media detection, authenticity, and verification infrastructure for the modern enterprise. Our agentic system manages the entire lifecycle of trust—from initial discovery to understanding its origin and impact, and enabling a decisive action." 
  },
  // Slide 4: Market Opportunity (Why Now?)
  { 
    section: "Why Now", 
    title: "Technological, Economic, and Regulatory Forces Have Made Enterprise-Grade Verification a Mission-Critical Imperative", 
    points: [
      "Technological Acceleration: The rapid improvement of generative models means manual or single-point solutions are now obsolete.",
      "Economic Imperative: The financial impact of fraud and brand damage from synthetic media is moving from a rounding error to a significant P&L issue.",
      "Regulatory Pressure: New legislation is emerging that will hold platforms and enterprises accountable for the spread of malicious deepfakes."
    ] 
  },
  // Slide 5: Market Size
  { 
    section: "Market", 
    title: "We Are Capturing an Underserved Enterprise Market with a Venture-Scale Opportunity", 
    points: [
      "Initial Beachhead TAM: Our analysis of 14 commercial segments identified a core market of thousands of enterprises across News Media, Talent Agencies, and Insurance.",
      "Strategic Expansion: Our infrastructure is built to scale into adjacent high-value verticals, including Law Firms, Financial Services, and Government.",
      "Clear Path to Scale: Our financial model projects a path to over $130M in Annual Recurring Revenue (ARR), demonstrating a clear venture-scale outcome."
    ] 
  },
  // Slide 6: Product Roadmap
  { 
    section: "Product", 
    title: "Our Roadmap Delivers Immediate Value with ZERKER CORE, Evolving to a Fully Agentic System to Dominate the Market", 
    roadmap: [
      { phase: "Phase 1: ZERKER CORE (Today)", description: "A robust system with a UI for enrolling detectors, building custom verification workflows, and running analysis. It is fully API-integrated and serves as the core infrastructure we co-develop with our initial enterprise partners." },
      { phase: "Phase 2: Agentic Workflows (The Roadmap)", description: "We will evolve the system to introduce semi-autonomous agentic workflows, enabling proactive analysis and intelligent management of the detector lifecycle." },
      { phase: "Phase 3: Fully Autonomous Agents (The Vision)", description: "Our long-term vision is a coordinated system of fully autonomous agents—SENTRY (Coordination), SPECTER (Analysis), ORACLE (Explainability), and AEGIS (Action)—that manage the entire trust lifecycle." }
    ]
  },
  // Slide 7: Technology & Moat
  { 
    section: "Technology", 
    title: "We Have an Insurmountable Moat Built on DARPA Intelligence, Exclusive CNN Data, and a Captive Distribution Channel", 
    points: [
      "DARPA-Forged Intelligence: Our core system was forged through unique exposure within US government programs like DARPA's SemaFor, providing an unparalleled understanding of malicious threats.",
      "Proprietary Data Access: Our strategic partnership with CNN provides an unparalleled data moat, with access to over 2 million hours of pristine, annotated media footage.",
      "Built-in Distribution: The CNN partnership also provides a built-in distribution channel to their global network of affiliates and partners."
    ] 
  },
  // Slide 8: Our Trusted Developer Ecosystem
  { 
    section: "Ecosystem", 
    title: "We Win the \"Arms Race\" with a Pre-Vetted Ecosystem of Elite Developers from the DARPA SemaFor Program", 
    points: [
      "Our ecosystem is comprised of two types of partners from the elite DARPA SemaFor program: Detector Developers and Synthetic Data Providers (Red Teams).",
      "Highly recommended Detector Developers include top-performing university labs like Purdue, Syracuse, and Drexel.",
      "Purdue has already outlined commercial terms, requiring ~$100k/year for a dedicated PhD-led team.",
      "Highly recommended Data Providers include the dependable, enterprise-grade team at STR.",
      "We will use resources like UL's detection challenges to continuously scout for new talent."
    ] 
  },
  // Slide 9: Go-To-Market Strategy
  { 
    section: "Go-To-Market", 
    title: "Our GTM Strategy Secures Lighthouse Accounts First, Creating a Flywheel for Enterprise Domination", 
    phases: [
      { phase: "Phase 1: Co-Development with Market Leaders", description: "Secure initial multi-year contracts with design partners like CNN & UTA to build and validate custom, outcome-driven solutions.", detail: "Leveraging our initial ZERKER CORE workflow system." },
      { phase: "Phase 2: Strategic Enterprise Sales", description: "Leverage these lighthouse accounts to target the top 100 enterprises in our beachhead verticals with a dedicated, solutions-oriented sales approach." },
      { phase: "Phase 3: Scale Through ZERKER CORE", description: "Expand to adjacencies by productizing the most valuable workflows.", detail: "Powered by our maturing Agentic Workflow capabilities." }
    ]
  },
  // Slide 10: Competition & Why We Win
  { 
    section: "Competition", 
    title: "Competitors Address Niches with Legacy Tools; We Own the Enterprise Operating System", 
    comparison: {
      intro: "Our analysis of the competitive landscape shows that rivals are focused on narrow, feature-based solutions, leaving the core enterprise infrastructure opportunity completely open.",
      categories: [
        { 
          category: "Point Solution Detectors", 
          examples: "Reality Defender, TrueMedia.Org", 
          flaw: "They sell a feature, not a system. They offer a \"black box\" score without the workflow or explainability an enterprise needs." 
        },
        { 
          category: "In-House Platform Efforts", 
          examples: "YouTube/Google's Internal Project", 
          flaw: "They are too slow, siloed, and unfocused. Large tech companies are notoriously dysfunctional at building these solutions internally and ultimately prefer to partner with a focused, nimble leader." 
        },
        { 
          category: "Open-Source & Academia", 
          examples: "Purdue, UNINA, research labs", 
          flaw: "They build brilliant technology, but not a product. They lack the enterprise-grade support, reliability, and outcome-driven focus required by large commercial clients." 
        }
      ]
    }
  },
  // Slide 11: Business Model
  { 
    section: "Business Model", 
    title: "We Drive High-Retention Revenue Through Outcome-Driven, Multi-Year Enterprise Contracts", 
    points: [
      "Deep Engagement: We engage deeply with clients to co-develop custom workflows using ZERKER CORE.",
      "Value-Based Pricing: Our enterprise contracts are anchored by a tiered structure (starting at $10k for small, $75k for medium, and $150k+ for large organizations) but are customized based on the strategic outcomes delivered, driving significant ACV.",
      "High Retention: By becoming critical infrastructure for our clients, we build a sticky, defensible revenue base."
    ] 
  },
  // Slide 12: The Team
  { 
    section: "Team", 
    title: "A Team with an Unassailable Advantage", 
    team: [
      { name: "Built and scaled Shutterstock's API and Computer Vision teams", role: "", description: "" },
      { name: "Core architects of the U.S. government's DARPA SemaFor media forensics program", role: "", description: "" },
      { name: "Secured an exclusive partnership with SRI International to commercialize the core technology", role: "", description: "" }
    ],
    members: "(Revaz, Disha, Jacob)"
  },
  // Slide 13: Financial Projections
  { 
    section: "Financials", 
    title: "Our Model Shows a Clear Path to a $100M+ ARR Venture-Scale Outcome", 
    description: "Our financial model includes multiple scenarios. We are targeting our High Case, which is driven by premium pricing for our forensic capabilities and greater market share, while our Medium Case provides a conservative baseline.",
    projections: { 
      medium: { fy5: "$8.5M", fy10: "$66.7M" },
      high: { fy5: "$11.8M", fy10: "$131.8M" }
    }
  },
  // Slide 14: The Ask
  { 
    section: "The Ask", 
    title: "We Are Raising $2.5M to Convert a $300k Pilot Pipeline and Unlock Our Series A", 
    description: "With our core infrastructure already built, we are raising a $2.5M seed round for 24 months of runway to secure foundational enterprise contracts and scale our agentic system.",
    milestones: [
      "Convert $300k in commercial pilots (CNN, UTA, CAA) into multi-year, ARR-generating enterprise contracts.",
      "Deliver the ZERKER CORE workflow and UI system, validating it by successfully deploying our three commercial pilots.",
      "Establish a repeatable, consultative GTM playbook for high-value accounts.",
      "Establish the commercial traction and repeatable sales model necessary for future growth and financing."
    ]
  },
  // Slide 15: Contact
  { 
    section: "Contact", 
    title: "Join Us in Rebuilding Digital Trust.", 
    contact: { 
      name: "Revaz Tsivtsivadze", 
      role: "CEO", 
      email: "revaz@zerker.ai" 
    }
  }
];

// Slide component
const SlideContent = ({ slide, currentSlide, isPDF = false }) => {
  const baseTextClass = isPDF ? '' : 'transition-all duration-700';
  const isTitle = slide.section === "Title";
  
  if (currentSlide === 0) { // Title slide
    return (
      <div className="relative flex flex-col items-center justify-center h-full px-32">
        {!isPDF && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/5 rounded-full blur-[120px] animate-pulse" />
          </div>
        )}
        
        <div className="relative z-10 text-center">
          <div className="mb-12">
            <h1 className={`text-[180px] font-black text-white tracking-[-0.06em] leading-none ${baseTextClass} ${!isPDF && 'animate-slideIn'}`}>
              {slide.title}
            </h1>
          </div>
          <div className={`space-y-6 ${!isPDF && 'animate-fadeIn animation-delay-300'}`}>
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-purple-400 to-transparent mx-auto mb-8" />
            <p className="text-[32px] font-light text-gray-300 tracking-[-0.01em] max-w-4xl mx-auto leading-relaxed">
              {slide.subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 5) { // Product Roadmap
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="space-y-8">
          {slide.roadmap?.map((phase, index) => (
            <div key={index} className={`bg-gray-900 border border-gray-800 rounded-xl p-8 ${!isPDF && 'animate-slideIn'}`} style={!isPDF ? { animationDelay: `${(index + 1) * 150}ms` } : {}}>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <div className="ml-6">
                  <h4 className="text-[24px] font-semibold text-purple-400 mb-3">{phase.phase}</h4>
                  <p className="text-[18px] text-gray-300 leading-relaxed">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentSlide === 8) { // Go-To-Market Strategy
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="space-y-8">
          {slide.phases?.map((phase, index) => (
            <div key={index} className={`bg-gray-900 border border-gray-800 rounded-xl p-8 ${!isPDF && 'animate-slideIn'}`} style={!isPDF ? { animationDelay: `${(index + 1) * 150}ms` } : {}}>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <div className="ml-6">
                  <h4 className="text-[24px] font-semibold text-purple-400 mb-3">{phase.phase}</h4>
                  <p className="text-[18px] text-gray-300 leading-relaxed mb-2">{phase.description}</p>
                  {phase.detail && (
                    <p className="text-[16px] text-gray-400 italic">{phase.detail}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentSlide === 9) { // Competition
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-6">
            {slide.title}
          </h2>
          <p className="text-[20px] text-gray-400 leading-relaxed mb-12">{slide.comparison?.intro}</p>
        </div>
        
        <div className="space-y-6">
          {slide.comparison?.categories.map((cat, index) => (
            <div key={index} className={`bg-gray-900 border border-gray-800 rounded-xl p-6 ${!isPDF && 'animate-slideIn'}`} style={!isPDF ? { animationDelay: `${(index + 1) * 150}ms` } : {}}>
              <div className="grid grid-cols-4 gap-6">
                <div className="text-[18px] font-semibold text-purple-400">{cat.category}</div>
                <div className="text-[16px] text-gray-300">{cat.examples}</div>
                <div className="col-span-2 text-[16px] text-gray-300">{cat.flaw}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentSlide === 11) { // Team slide
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[52px] font-bold text-white leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="space-y-6">
          {slide.team?.map((item, index) => (
            <div key={index} className={`bg-gray-900 border border-gray-800 rounded-xl p-8 ${!isPDF && 'animate-slideIn'}`} style={!isPDF ? { animationDelay: `${(index + 1) * 150}ms` } : {}}>
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="ml-4 text-[18px] text-gray-300 leading-relaxed">{item.name}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <p className="text-[24px] font-semibold text-purple-400">{slide.members}</p>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 12) { // Financials
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-4">
            {slide.title}
          </h2>
          <p className="text-[20px] text-gray-400">{slide.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-[28px] font-semibold text-white mb-8 text-center">Financial Projections (Revenue)</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-3 text-center">
                <div className="text-gray-400 text-[16px] font-medium">Scenario</div>
                <div className="text-purple-400 text-[16px] font-semibold">Year 5</div>
                <div className="text-purple-400 text-[16px] font-semibold">Year 10</div>
              </div>
              <div className="grid grid-cols-3 text-center py-4 border-t border-gray-800">
                <div className="text-white text-[18px]">Medium Case</div>
                <div className="text-white text-[24px] font-bold">{slide.projections?.medium.fy5}</div>
                <div className="text-white text-[24px] font-bold">{slide.projections?.medium.fy10}</div>
              </div>
              <div className="grid grid-cols-3 text-center py-4 border-t border-gray-800">
                <div className="text-white text-[18px]">High Case (Target)</div>
                <div className="text-purple-400 text-[28px] font-bold">{slide.projections?.high.fy5}</div>
                <div className="text-purple-400 text-[28px] font-bold">{slide.projections?.high.fy10}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
            <h3 className="text-[28px] font-semibold text-white mb-8">Growth Trajectory</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">High Case Revenue Growth</span>
                <span className="text-purple-400 font-semibold">1,017% CAGR</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full w-[95%]" />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Medium Case Revenue Growth</span>
                <span className="text-purple-400 font-semibold">685% CAGR</span>
              </div>
              <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-purple-400 to-purple-600 rounded-full w-[88%]" />
              </div>
              
              <div className="mt-8 p-4 bg-gray-800 rounded-lg">
                <div className="text-white text-[20px] font-semibold mb-2">Venture-Scale Outcome</div>
                <div className="text-gray-400 text-[16px]">Clear path to $100M+ ARR with premium pricing model</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 13) { // The Ask
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-white leading-[1.15] tracking-[-0.02em] mb-6">
            {slide.title}
          </h2>
          <p className="text-[20px] text-gray-400 max-w-4xl">{slide.description}</p>
        </div>
        
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-8">
          <h3 className="text-[24px] font-semibold text-white mb-8">Key Milestones for this Round:</h3>
          <div className="space-y-6">
            {slide.milestones?.map((milestone, index) => (
              <div key={index} className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="ml-4 text-[16px] text-gray-300 leading-relaxed">{milestone}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 14) { // Contact
    return (
      <div className="relative flex flex-col items-center justify-center h-full px-32">
        {!isPDF && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px] animate-pulse" />
          </div>
        )}
        
        <div className="relative z-10 text-center">
          <h2 className={`text-[72px] font-bold text-white leading-[1.1] tracking-[-0.03em] mb-16 ${!isPDF && 'animate-slideIn'}`}>
            {slide.title}
          </h2>
          
          <div className={`bg-gray-900 border border-gray-800 rounded-xl p-12 ${!isPDF && 'animate-fadeIn animation-delay-300'}`}>
            <div className="text-[96px] font-black text-white mb-8">ZERKER</div>
            <div className="space-y-4">
              <div className="text-[32px] font-semibold text-white">{slide.contact?.name}</div>
              <div className="text-[24px] text-gray-400">{slide.contact?.role}</div>
              <div className="text-[28px] text-purple-400 font-medium">{slide.contact?.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Default slide layout for content slides
  if (slide.description && !slide.points) {
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className="max-w-[1400px]">
          <div className={`mb-16 ${!isPDF && 'animate-slideIn'}`}>
            <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
              {slide.section}
            </p>
            <h2 className="text-[56px] font-bold text-white leading-[1.1] tracking-[-0.03em] max-w-[1200px] mb-12">
              {slide.title}
            </h2>
            <p className="text-[28px] font-light text-gray-300 leading-[1.6] tracking-[-0.01em] max-w-[1200px]">
              {slide.description}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full px-32 py-24">
      <div className="max-w-[1400px]">
        <div className={`mb-16 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-purple-400 text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[56px] font-bold text-white leading-[1.1] tracking-[-0.03em] max-w-[1200px]">
            {slide.title}
          </h2>
        </div>
        
        {slide.points && (
          <div className="space-y-8">
            {slide.points.map((point, index) => (
              <div 
                key={index} 
                className={`relative flex items-start group ${!isPDF && 'animate-slideIn'}`}
                style={!isPDF ? { animationDelay: `${(index + 1) * 100}ms` } : {}}
              >
                <div className="flex-shrink-0 w-8 h-8 mt-1">
                  <div className="w-2 h-2 bg-purple-400 rounded-full mt-3 group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.5)] transition-all duration-300" />
                </div>
                <p className="text-[28px] font-light text-gray-300 leading-[1.6] tracking-[-0.01em] pl-4 group-hover:text-white transition-colors duration-300">
                  {point}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        handleSlideChange(currentSlide - 1);
      } else if (e.key === 'ArrowRight' && currentSlide < deckContentV2.length - 1) {
        handleSlideChange(currentSlide + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isTransitioning]);

  const handleSlideChange = (newSlide) => {
    setIsTransitioning(true);
    setCurrentSlide(newSlide);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const generatePDF = async () => {
    setIsGeneratingPDF(true);
    
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1920, 1080],
      compress: true
    });

    for (let i = 0; i < deckContentV2.length; i++) {
      const slide = deckContentV2[i];
      
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '1920px';
      tempDiv.style.height = '1080px';
      tempDiv.style.backgroundColor = '#1F2937';
      tempDiv.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
      
      const slideHtml = `
        <div style="width: 1920px; height: 1080px; background: linear-gradient(135deg, #1F2937 0%, #374151 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1;">
            ${slide.section === "Title" ? `
              <div style="text-align: center; padding: 0 120px;">
                <h1 style="font-size: 180px; font-weight: 900; color: #FFFFFF; margin: 0 0 60px 0; letter-spacing: -0.04em; line-height: 1;">
                  ${slide.title}
                </h1>
                <div style="height: 2px; width: 160px; background: linear-gradient(to right, transparent, #A855F7, transparent); margin: 0 auto 48px;"></div>
                <p style="font-size: 32px; font-weight: 300; color: #D1D5DB; margin: 0; letter-spacing: -0.01em; max-width: 1000px; line-height: 1.6;">
                  ${slide.subtitle}
                </p>
              </div>
            ` : `
              <div style="padding: 120px 160px; width: 100%; max-width: 1600px;">
                <div style="margin-bottom: 60px;">
                  <p style="color: #A855F7; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 24px 0;">
                    ${slide.section}
                  </p>
                  <h2 style="font-size: 64px; font-weight: 700; color: #FFFFFF; line-height: 1.15; letter-spacing: -0.02em; margin: 0;">
                    ${slide.title}
                  </h2>
                </div>
                ${slide.points ? `
                  <div style="margin-top: 48px;">
                    ${slide.points.map(point => `
                      <div style="display: flex; align-items: flex-start; margin-bottom: 32px;">
                        <div style="width: 8px; height: 8px; background: #A855F7; border-radius: 50%; margin-top: 14px; margin-right: 24px; flex-shrink: 0;"></div>
                        <p style="font-size: 28px; font-weight: 300; color: #D1D5DB; line-height: 1.6; letter-spacing: -0.01em; margin: 0;">
                          ${point}
                        </p>
                      </div>
                    `).join('')}
                  </div>
                ` : slide.description ? `
                  <p style="font-size: 28px; font-weight: 300; color: #D1D5DB; line-height: 1.6; letter-spacing: -0.01em; margin: 48px 0 0 0; max-width: 1200px;">
                    ${slide.description}
                  </p>
                ` : ''}
              </div>
            `}
          </div>
          <div style="position: absolute; bottom: 40px; right: 60px; color: #6B7280; font-size: 14px; font-weight: 500; letter-spacing: 0.1em;">
            ${String(i + 1).padStart(2, '0')} / ${String(deckContentV2.length).padStart(2, '0')}
          </div>
        </div>
      `;
      
      tempDiv.innerHTML = slideHtml;
      document.body.appendChild(tempDiv);
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const canvas = await html2canvas(tempDiv, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: null,
        windowWidth: 1920,
        windowHeight: 1080
      });
      
      document.body.removeChild(tempDiv);
      
      if (i > 0) pdf.addPage();
      
      const imgData = canvas.toDataURL('image/png', 1.0);
      pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
    }

    pdf.save('ZERKER_V2_Pitch_Deck.pdf');
    setIsGeneratingPDF(false);
  };

  const slide = deckContentV2[currentSlide];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-['Inter'] antialiased">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900" />
      
      <div className="relative w-full max-w-[90vw] mx-auto z-10 pt-20 pb-20">
        {/* HUD */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-2">
          <div className="flex items-center space-x-8">
            <span className="text-purple-400 text-xs font-semibold uppercase tracking-[0.2em]">
              Slide {currentSlide + 1} of {deckContentV2.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentSlide(0)}
              className="text-gray-400 hover:text-purple-400 text-xs font-medium tracking-wider transition-colors duration-300"
            >
              RESTART
            </button>
            <div className="w-px h-4 bg-gray-600" />
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="group relative px-8 py-3 overflow-hidden rounded-full bg-purple-600 hover:bg-purple-500 transition-all duration-300"
            >
              <span className="relative text-xs font-semibold tracking-[0.15em] text-white transition-colors duration-300 uppercase">
                {isGeneratingPDF ? 'Generating PDF...' : 'Export PDF'}
              </span>
            </button>
          </div>
        </div>

        {/* Slide Container */}
        <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg overflow-hidden shadow-[0_0_120px_rgba(168,85,247,0.1)]">
          <div className="absolute inset-0">
            <SlideContent slide={slide} currentSlide={currentSlide} />
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center translate-y-20">
          <div className="flex items-center space-x-12">
            <button
              onClick={() => handleSlideChange(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="group p-4 rounded-full border border-purple-400/20 hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-purple-400 group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3">
              {deckContentV2.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className="group relative p-1"
                >
                  <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-purple-400 w-8 h-2' 
                      : 'bg-gray-600 group-hover:bg-gray-500'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleSlideChange(Math.min(deckContentV2.length - 1, currentSlide + 1))}
              disabled={currentSlide === deckContentV2.length - 1}
              className="group p-4 rounded-full border border-purple-400/20 hover:border-purple-400 hover:bg-purple-400/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-purple-400 group-hover:transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap');
        
        @keyframes slideIn {
          from { 
            opacity: 0; 
            transform: translateX(-30px);
          }
          to { 
            opacity: 1; 
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          opacity: 0;
        }
        
        .animation-delay-300 {
          animation-delay: 300ms;
        }
      `}</style>
    </div>
  );
}