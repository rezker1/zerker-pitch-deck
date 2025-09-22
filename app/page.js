'use client';

import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const deckContent = [
  // Slide 1: Title
  { 
    section: "Title", 
    title: "ZERKER", 
    subtitle: "The Operating System for Enterprise Trust\nin the AI Era",
    date: "September 2025" 
  },
  // Slide 2: The Problem
  { 
    section: "The Problem", 
    title: "AI has broken digital trust — creating immediate, material enterprise risk",
    points: [
      "Reputational hits first: One convincing fake can sink credibility, move markets, and trigger legal exposure. Recovery costs are material; trust takes months to rebuild.",
      "Manual verification can't keep up: Today it's 2–6 hours per video across source calls, frame-by-frame review, EXIF checks, and cross-desk approvals. Volume overwhelms teams.",
      "Incident frequency is spiking: Voice, image, and video fakes are getting cheaper and faster to produce, outpacing point tools and content moderation.",
      "Current tools fail on explainability: Our 17 enterprise/government interviews: \"No explainability, no go.\" Black-box risk scores aren't defensible to editors, legal, or regulators."
    ]
  },
  // Slide 3: The Solution
  { 
    section: "The Solution", 
    title: "The media verification OS that lets enterprises verify, explain, and act — fast",
    features: [
      {
        title: "Verify",
        description: "Multi-modal detection (video, audio, images) with pipeline speed and batch/API."
      },
      {
        title: "Explain",
        description: "Pixel-level heatmaps, reason codes, and OSINT traces for editorial/legal confidence."
      },
      {
        title: "Act",
        description: "Audit-ready reports, takedown/notification flows, and integrations into newsroom & trust/SOC tools."
      }
    ],
    outcome: "Outcome: Minutes, not hours — with a chain-of-custody trail leadership can stand behind."
  },
  // Slide 4: Market Opportunity & Size
  { 
    section: "Market Opportunity & Size", 
    title: "Urgent, venture-scale category — practical path to $130M+ ARR",
    points: [
      "Beachhead: Top newsrooms, talent/rights, and insurance SIUs where verification is mission-critical.",
      "Economic buyers: Standards & Practices, Trust & Safety, Brand Protection, Claims/SIU.",
      "Model: Enterprise ACVs $75k–$250k plus add-ons (proactive monitoring, takedowns, compliance exports).",
      "Plan: Land with news/talent, expand across adjacent enterprise trust workflows → $130M+ ARR path."
    ]
  },
  // Slide 5: Product & Roadmap
  { 
    section: "Product & Roadmap", 
    title: "Deliver value now with ZERKER CORE; evolve to agentic, end-to-end trust",
    phases: [
      {
        title: "Phase 1 — ZERKER CORE (live)",
        description: "UI + API pipelines, detector enrollment, workflow builder, batch/API, audit reports, newsroom/SOC integrations."
      },
      {
        title: "Phase 2 — Agentic Workflows",
        description: "Orchestrated agents automate discovery → forensics → OSINT → provenance check → action."
      },
      {
        title: "Phase 3 — Autonomous Trust Agents",
        description: "SENTRY/SPECTER/ORACLE/AEGIS manage continuous monitoring, risk scoring, escalation, and takedowns."
      }
    ],
    provenance: "Provenance: Co-define \"Zerker Verified\" standard with flagship newsroom partner; signed reports and machine-readable attestations."
  },
  // Slide 6: The Moat
  { 
    section: "The Moat", 
    title: "Hard to copy: explainability + data + ecosystem — not just another detector",
    pillars: [
      {
        title: "Explainability-first",
        description: "Pixel-level artifact localization, reason codes, and chain-of-custody by default."
      },
      {
        title: "Data & distribution",
        description: "Flagship newsroom partnership provides scale data access and a high-credibility deployment channel."
      },
      {
        title: "Ecosystem leverage",
        description: "Pre-vetted detector/data partners from top labs; we're the neutral OS that unifies them."
      }
    ],
    note: "USG-evaluated lineage (one mention): Built on SRI-developed components evaluated in U.S. government programs and exclusively licensed for commercialization through SRI."
  },
  // Slide 7: Go-To-Market & Business Model
  { 
    section: "Go-To-Market & Business Model", 
    title: "High-value enterprise motions; outcome-tied expansion",
    points: [
      "Consultative land: Co-develop workflows with CNN (news verification) and UTA (talent/brand protection).",
      "Expand: Add monitoring, takedowns, and compliance exports; broaden to insurers and platforms."
    ],
    commercials: {
      title: "Commercials:",
      items: [
        "CORE license: $75k (Small), $150k (Mid), $250k+ (Enterprise/VPC).",
        "Add-ons: Proactive monitoring, takedown automation, compliance exports.",
        "Deployment: Cloud by default; VPC/on-prem for regulated or high-throughput desks."
      ]
    }
  },
  // Slide 8: Competition & Why We Win
  { 
    section: "Competition & Why We Win", 
    title: "Point tools, in-house bets, and academic projects can't meet enterprise bar",
    competition: [
      {
        title: "Point detectors",
        description: "Feature, not a system. No workflow, weak explainability."
      },
      {
        title: "In-house platforms",
        description: "Slow, unfocused, hard to staff and maintain."
      },
      {
        title: "Open research",
        description: "Great demos; not productized or supported."
      }
    ],
    edge: "ZERKER's edge: We're the operating system — multi-modal pipelines, explainability, auditability, and integrations that drive enterprise outcomes."
  },
  // Slide 9: Team
  { 
    section: "Team", 
    title: "Built for this moment",
    team: [
      {
        name: "Revaz Tsivtsivadze — CEO",
        description: "Scaled AI/API products to revenue; led enterprise integrations at scale."
      },
      {
        name: "Jacob Emerick — Eng Lead",
        description: "Designed and ran production media systems for global content platforms."
      },
      {
        name: "Advisors",
        description: "Enterprise AI GTM, security/compliance."
      }
    ],
    ip: "IP rights: Exclusive commercialization agreement with SRI International for core technology funded under U.S. government programs."
  },
  // Slide 10: The Ask
  { 
    section: "The Ask", 
    title: "Raising $2.5M seed for ~24 months to convert pilots and prove repeatability",
    breakdown: {
      title: "Use of funds:",
      items: ["~60% product/engineering", "~25% GTM", "~15% compute/security"]
    },
    milestones: {
      title: "Milestones:",
      items: [
        "Convert $300k pilots (CNN, UTA, CAA) into multi-year contracts.",
        "Deploy ZERKER CORE in production (newsroom + talent workflows).",
        "Hit $1.5–$2.0M ARR run-rate with 3–5 paying enterprise logos.",
        "SOC 2 Type I in progress; audit-ready reporting live."
      ]
    }
  },
  // Slide 11: Appendix — Financial Projections
  { 
    section: "Appendix — Financial Projections", 
    title: "Revenue (selected scenarios)",
    table: {
      headers: ["Scenario", "Year 5", "Year 10"],
      rows: [
        ["Medium", "$8.5M", "$66.7M"],
        ["High (Target)", "$11.8M", "$131.8M"]
      ]
    },
    assumptions: "Assumptions: ACV mix $75k–$250k+, blended gross margin >70% at scale; add-on attach 25–40%."
  },
  // Slide 12: Contact
  { 
    section: "Contact", 
    title: "Join us in rebuilding digital trust.",
    company: "ZERKER",
    contact: {
      name: "Revaz Tsivtsivadze, CEO",
      email: "revaz@zerker.ai"
    }
  },
  // Slide 13: Detailed Financial Projections (Appendix)
  { 
    section: "Appendix — Detailed Financial Projections", 
    title: "Path to $130M+ ARR with positive EBITDA by Year 3",
    yearTargets: [
      {
        year: "Year 1",
        arr: "$1.2M",
        details: ["3 Enterprise clients", "1 Government contract", "SBIR Phase II"]
      },
      {
        year: "Year 3", 
        arr: "$12M",
        details: ["30+ Enterprise clients", "8 Government contracts", "International expansion"]
      },
      {
        year: "Year 10",
        arr: "$132M",
        details: ["$1B+ valuation", "Market leadership", "Global presence"]
      }
    ],
    unitEconomics: {
      title: "Unit Economics",
      metrics: [
        { label: "Average Contract Value", value: "$150K" },
        { label: "Gross Margin", value: "85%" },
        { label: "CAC Payback Period", value: "8 months" },
        { label: "Net Revenue Retention", value: "120%" },
        { label: "Annual Churn Rate", value: "<5%" }
      ]
    },
    scenarios: {
      title: "Year 10 Scenarios",
      cases: [
        { 
          type: "Bull Case", 
          arr: "$132M ARR", 
          valuation: "$1B+ valuation at 10x multiple",
          color: "green"
        },
        { 
          type: "Base Case", 
          arr: "$67M ARR", 
          valuation: "$500M+ valuation at 7.5x multiple",
          color: "blue"
        },
        { 
          type: "Bear Case", 
          arr: "$43M ARR", 
          valuation: "$350M+ valuation at 8x multiple",
          color: "yellow"
        }
      ]
    }
  }
];

// Slide component for both display and PDF generation
const SlideContent = ({ slide, currentSlide, isPDF = false }) => {
  const baseTextClass = '';
  
  // Enhanced slide background component
  const SlideBackground = ({ children, variant = 'default' }) => {
    let backgroundClasses;
    if (variant === 'title') {
      backgroundClasses = "absolute inset-0 bg-gradient-to-br from-[#0F1419] via-[#1A1F2E] to-[#161B22]";
    } else if (variant === 'premium') {
      backgroundClasses = "absolute inset-0 bg-gradient-to-br from-[#0a0f1c] via-[#1a1f2e] to-[#0f1419]";
    } else {
      backgroundClasses = "absolute inset-0 bg-gradient-to-br from-[#0F1419] via-[#1A1F2E] to-[#161B22]";
    }
    
    return (
      <div className="relative h-full w-full overflow-hidden">
        {/* Primary background gradient */}
        <div className={backgroundClasses} />
        
        {/* Secondary overlay gradients for depth */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1e293b]/15 via-transparent to-[#0f172a]/20" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#1e1b4b]/8 to-[#0f172a]/15" />
        
        {/* Subtle texture overlay */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px'
        }} />
        
        {/* Geometric accent patterns */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6366F1]/15 to-transparent" />
        <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-[#8B5CF6]/15 to-transparent" />
        
        {/* Subtle radial accent */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.08) 0%, transparent 50%)'
        }} />
        
        {/* Content with relative positioning */}
        <div className="relative z-10 h-full w-full">
          {children}
        </div>
      </div>
    );
  };
  
  // Title slide
  if (currentSlide === 0) {
    return (
      <SlideBackground variant="title">
        <div className="relative flex flex-col items-center justify-center h-full px-16 py-12">
        <div className="relative z-10 text-center max-w-6xl">
          {/* Premium accent line */}
          <div className="mb-8">
            <div className="w-24 h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-full mx-auto shadow-lg" />
          </div>
          
          <div className="mb-8 relative">
            <h1 className="text-[clamp(80px,12vw,120px)] font-black font-inter text-[#F8FAFC] tracking-[-0.06em] leading-none drop-shadow-sm">
              {slide.title}
            </h1>
          </div>
          
          <div className="text-center space-y-6">
            <p className="text-[clamp(20px,3vw,28px)] font-light font-inter text-[#E2E8F0] tracking-[-0.02em] leading-[1.3] max-w-4xl mx-auto whitespace-pre-line">
              {slide.subtitle}
            </p>
            
            {/* Premium divider */}
            <div className="h-px w-48 bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent mx-auto my-8" />
            
            {slide.date && (
              <p className="text-[clamp(16px,2vw,20px)] font-medium font-inter text-[#94A3B8]">
                {slide.date}
              </p>
            )}
          </div>
        </div>
      </div>
      </SlideBackground>
    );
  }

  // Features slide with outcome (The Solution)
  if (slide.features && slide.outcome) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 text-center mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mx-auto mb-4 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="flex-1 grid grid-cols-3 gap-6 mb-6">
          {slide.features?.map((feature, index) => (
            <div key={index} className="relative group">
              <div className="relative h-full p-6 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl hover:border-[#6366F1]/30 hover:bg-[#FFFFFF]/12 transition-all duration-500 text-center flex flex-col">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full" />
                <h3 className="text-[clamp(20px,2.5vw,28px)] font-bold font-inter text-[#F8FAFC] mb-3 mt-4">{feature.title}</h3>
                <p className="text-[clamp(14px,1.5vw,16px)] font-inter text-[#CBD5E1] leading-relaxed flex-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <div className="relative inline-block p-4 bg-gradient-to-br from-[#10B981]/15 to-[#059669]/5 backdrop-blur-xl border border-[#10B981]/20 rounded-xl">
            <p className="text-[clamp(14px,1.8vw,18px)] font-semibold font-inter text-[#10B981]">
              {slide.outcome}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Phases slide (Product & Roadmap)
  if (slide.phases) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 text-center mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mx-auto mb-4 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="flex-1 space-y-4 overflow-y-auto mb-4">
          {slide.phases?.map((phase, index) => (
            <div key={index} className="relative group">
              <div className="relative p-4 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl hover:border-[#6366F1]/30 hover:bg-[#FFFFFF]/10 transition-all duration-500">
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full mt-2 flex-shrink-0" />
                  <div>
                    <h3 className="text-[clamp(16px,2vw,20px)] font-bold font-inter text-[#F8FAFC] mb-2">{phase.title}</h3>
                    <p className="text-[clamp(14px,1.6vw,16px)] font-inter text-[#CBD5E1] leading-relaxed">{phase.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {slide.provenance && (
          <div className="text-center">
            <p className="text-[clamp(12px,1.5vw,14px)] font-inter text-[#94A3B8] italic">
              {slide.provenance}
            </p>
          </div>
        )}
      </div>
    );
  }

  // Pillars with note (Moat slide)
  if (slide.pillars && slide.note) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 text-center mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mx-auto mb-4 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="flex-1 grid grid-cols-3 gap-6 mb-4">
          {slide.pillars?.map((pillar, index) => (
            <div key={index} className="relative group">
              <div className="relative h-full p-6 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl hover:border-[#6366F1]/30 hover:bg-[#FFFFFF]/12 transition-all duration-500 text-center flex flex-col">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-[#6366F1]/20 to-[#8B5CF6]/10 rounded-full flex items-center justify-center border border-[#6366F1]/20 flex-shrink-0">
                  <div className="w-6 h-6 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full" />
                </div>
                <h3 className="text-[clamp(18px,2.5vw,24px)] font-bold font-inter text-[#F8FAFC] mb-4">{pillar.title}</h3>
                <p className="text-[clamp(14px,1.5vw,16px)] font-inter text-[#CBD5E1] leading-relaxed flex-1">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <p className="text-[clamp(12px,1.5vw,14px)] font-inter text-[#94A3B8]">
            {slide.note}
          </p>
        </div>
      </div>
    );
  }

  // Commercials slide (GTM & Business Model)
  if (slide.commercials) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-4 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em] mb-6">
            {slide.title}
          </h2>
        </div>
        
        {/* Primary points */}
        {slide.points && (
          <div className="space-y-3 mb-6">
            {slide.points.map((point, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full mt-2 flex-shrink-0" />
                <div className="text-[clamp(14px,1.8vw,18px)] font-inter text-[#F8FAFC] leading-relaxed">{point}</div>
              </div>
            ))}
          </div>
        )}
        
        {/* Commercials section */}
        <div className="flex-1 mt-4">
          <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
            <h3 className="text-[clamp(18px,2.5vw,24px)] font-bold font-inter text-[#F8FAFC] mb-4">
              {slide.commercials.title}
            </h3>
            <div className="space-y-2">
              {slide.commercials.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 bg-[#6366F1] rounded-full mt-2 flex-shrink-0" />
                  <div className="text-[clamp(13px,1.6vw,16px)] font-inter text-[#CBD5E1] leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Competition slide
  if (slide.competition) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-4 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="flex-1 grid grid-cols-3 gap-4 mb-6">
          {slide.competition.map((comp, index) => (
            <div key={index} className="relative group">
              <div className="relative h-full p-4 bg-gradient-to-br from-[#EF4444]/10 to-[#DC2626]/5 backdrop-blur-xl border border-[#EF4444]/20 rounded-xl">
                <h3 className="text-[clamp(16px,2vw,20px)] font-bold font-inter text-[#F8FAFC] mb-2">{comp.title}</h3>
                <p className="text-[clamp(13px,1.5vw,15px)] font-inter text-[#FCA5A5] leading-relaxed">{comp.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {slide.edge && (
          <div className="text-center">
            <div className="relative inline-block p-4 bg-gradient-to-br from-[#10B981]/15 to-[#059669]/5 backdrop-blur-xl border border-[#10B981]/20 rounded-xl">
              <p className="text-[clamp(14px,1.8vw,18px)] font-semibold font-inter text-[#10B981]">
                {slide.edge}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Team slide
  if (slide.team) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-4 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="flex-1 space-y-4 mb-6">
          {slide.team.map((member, index) => (
            <div key={index} className="relative group">
              <div className="relative p-4 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl hover:border-[#6366F1]/30 hover:bg-[#FFFFFF]/10 transition-all duration-500">
                <h3 className="text-[clamp(16px,2vw,20px)] font-bold font-inter text-[#F8FAFC] mb-1">{member.name}</h3>
                <p className="text-[clamp(14px,1.6vw,16px)] font-inter text-[#CBD5E1] leading-relaxed">{member.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {slide.ip && (
          <div className="mt-auto">
            <div className="relative p-4 bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 backdrop-blur-xl border border-[#6366F1]/20 rounded-xl">
              <p className="text-[clamp(13px,1.5vw,15px)] font-inter text-[#E2E8F0]">
                {slide.ip}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // The Ask slide
  if (slide.breakdown && slide.milestones) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-4 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Use of funds */}
          <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
            <h3 className="text-[clamp(18px,2.5vw,24px)] font-bold font-inter text-[#F8FAFC] mb-4">
              {slide.breakdown.title}
            </h3>
            <div className="space-y-2">
              {slide.breakdown.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full mt-2 flex-shrink-0" />
                  <div className="text-[clamp(14px,1.6vw,16px)] font-inter text-[#CBD5E1] leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Milestones */}
          <div className="relative p-6 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 backdrop-blur-xl border border-[#10B981]/20 rounded-xl">
            <h3 className="text-[clamp(18px,2.5vw,24px)] font-bold font-inter text-[#10B981] mb-4">
              {slide.milestones.title}
            </h3>
            <div className="space-y-2">
              {slide.milestones.items.map((item, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full mt-2 flex-shrink-0" />
                  <div className="text-[clamp(13px,1.5vw,15px)] font-inter text-[#CBD5E1] leading-relaxed">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Financial Projections slide
  if (slide.table) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-16 py-8">
        <div className="text-center max-w-4xl">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mx-auto mb-6 rounded-full" />
          <h2 className="text-[clamp(28px,4vw,40px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em] mb-8">
            {slide.title}
          </h2>
          
          {/* Table */}
          <div className="relative overflow-hidden rounded-xl border border-[#FFFFFF]/10 mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/20 border-b border-[#FFFFFF]/10">
                  {slide.table.headers.map((header, index) => (
                    <th key={index} className="p-4 text-[clamp(14px,1.8vw,18px)] font-bold font-inter text-[#F8FAFC] text-center">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {slide.table.rows.map((row, rowIndex) => (
                  <tr key={rowIndex} className="border-b border-[#FFFFFF]/5 hover:bg-[#FFFFFF]/5 transition-colors">
                    {row.map((cell, cellIndex) => (
                      <td key={cellIndex} className={`p-4 text-[clamp(14px,1.8vw,18px)] font-inter text-center ${
                        cellIndex === 0 ? 'text-[#E2E8F0] font-medium' : 'text-[#10B981] font-bold'
                      }`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {slide.assumptions && (
            <p className="text-[clamp(12px,1.5vw,14px)] font-inter text-[#94A3B8] text-center">
              {slide.assumptions}
            </p>
          )}
        </div>
      </div>
    );
  }

  // Detailed Financial Projections slide
  if (slide.yearTargets && slide.unitEconomics && slide.scenarios) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 mb-6">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-4 rounded-full" />
          <h2 className="text-[clamp(24px,3.5vw,36px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        {/* Year Targets */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {slide.yearTargets.map((target, index) => {
            let cardClasses, textClasses;
            if (index === 0) {
              cardClasses = "relative p-6 bg-gradient-to-br from-[#F59E0B]/15 to-[#D97706]/5 backdrop-blur-xl border border-[#F59E0B]/20 rounded-xl text-center";
              textClasses = "text-[clamp(24px,3vw,32px)] font-black text-[#F59E0B] mb-3";
            } else if (index === 1) {
              cardClasses = "relative p-6 bg-gradient-to-br from-[#3B82F6]/15 to-[#2563EB]/5 backdrop-blur-xl border border-[#3B82F6]/20 rounded-xl text-center";
              textClasses = "text-[clamp(24px,3vw,32px)] font-black text-[#3B82F6] mb-3";
            } else {
              cardClasses = "relative p-6 bg-gradient-to-br from-[#10B981]/15 to-[#059669]/5 backdrop-blur-xl border border-[#10B981]/20 rounded-xl text-center";
              textClasses = "text-[clamp(24px,3vw,32px)] font-black text-[#10B981] mb-3";
            }
            return (
              <div key={index} className={cardClasses}>
                <div className="text-xs text-[#CBD5E1] uppercase tracking-wider mb-3">{target.year}</div>
                <div className={textClasses}>{target.arr}</div>
                <div className="text-xs text-[#94A3B8] mb-3">ARR Target</div>
                <div className="space-y-1">
                  {target.details.map((detail, idx) => (
                    <div key={idx} className="text-[clamp(10px,1.2vw,12px)] text-[#CBD5E1]">{detail}</div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Unit Economics and Scenarios */}
        <div className="flex-1 grid grid-cols-2 gap-6">
          {/* Unit Economics */}
          <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
            <h3 className="text-[clamp(16px,2vw,20px)] font-bold font-inter text-[#F8FAFC] mb-4 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-[#F59E0B] to-[#D97706] rounded-full mr-3" />
              {slide.unitEconomics.title}
            </h3>
            <div className="space-y-3">
              {slide.unitEconomics.metrics.map((metric, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-[clamp(12px,1.4vw,14px)] text-[#CBD5E1]">{metric.label}</span>
                  <span className="text-[clamp(12px,1.4vw,14px)] font-bold text-[#F8FAFC]">{metric.value}</span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Scenarios */}
          <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
            <h3 className="text-[clamp(16px,2vw,20px)] font-bold font-inter text-[#F8FAFC] mb-4 flex items-center">
              <div className="w-3 h-3 bg-gradient-to-r from-[#3B82F6] to-[#2563EB] rounded-full mr-3" />
              {slide.scenarios.title}
            </h3>
            <div className="space-y-3">
              {slide.scenarios.cases.map((scenario, index) => {
                let containerClasses, typeClasses, arrClasses;
                if (scenario.color === 'green') {
                  containerClasses = "p-3 bg-gradient-to-br from-[#10B981]/10 to-[#059669]/5 rounded-lg border border-[#10B981]/20";
                  typeClasses = "text-[clamp(11px,1.3vw,13px)] font-semibold text-[#10B981]";
                  arrClasses = "text-[clamp(11px,1.3vw,13px)] font-bold text-[#10B981]";
                } else if (scenario.color === 'blue') {
                  containerClasses = "p-3 bg-gradient-to-br from-[#3B82F6]/10 to-[#2563EB]/5 rounded-lg border border-[#3B82F6]/20";
                  typeClasses = "text-[clamp(11px,1.3vw,13px)] font-semibold text-[#3B82F6]";
                  arrClasses = "text-[clamp(11px,1.3vw,13px)] font-bold text-[#3B82F6]";
                } else {
                  containerClasses = "p-3 bg-gradient-to-br from-[#F59E0B]/10 to-[#D97706]/5 rounded-lg border border-[#F59E0B]/20";
                  typeClasses = "text-[clamp(11px,1.3vw,13px)] font-semibold text-[#F59E0B]";
                  arrClasses = "text-[clamp(11px,1.3vw,13px)] font-bold text-[#F59E0B]";
                }
                return (
                  <div key={index} className={containerClasses}>
                    <div className="flex justify-between items-center mb-1">
                      <span className={typeClasses}>{scenario.type}</span>
                      <span className={arrClasses}>{scenario.arr}</span>
                    </div>
                    <div className="text-[clamp(9px,1.1vw,11px)] text-[#94A3B8]">{scenario.valuation}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Contact slide
  if (slide.contact) {
    return (
      <div className="flex flex-col items-center justify-center h-full px-16 py-8">
        <div className="text-center max-w-4xl">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mx-auto mb-8 rounded-full" />
          <h2 className="text-[clamp(32px,5vw,48px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em] mb-12">
            {slide.title}
          </h2>
          
          <div className="mb-12">
            <h1 className="text-[clamp(60px,10vw,100px)] font-black font-inter text-[#F8FAFC] tracking-[-0.06em] leading-none drop-shadow-sm">
              {slide.company}
            </h1>
          </div>
          
          <div className="relative inline-block">
            <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
              <p className="text-[clamp(18px,2.5vw,24px)] font-bold font-inter text-[#F8FAFC] mb-2">
                {slide.contact.name}
              </p>
              <p className="text-[clamp(16px,2vw,20px)] font-inter text-[#6366F1]">
                {slide.contact.email}
              </p>
              {/* Premium highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Points-based slides (generic fallback)
  if (slide.points) {
    return (
      <div className="flex flex-col h-full px-16 py-8">
        <div className="flex-shrink-0 mb-8">
          <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mb-6 rounded-full" />
          <h2 className="text-[clamp(28px,4.5vw,44px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em] mb-6">
            {slide.title}
          </h2>
          {slide.description && (
            <p className="text-[clamp(16px,2vw,20px)] font-inter text-[#E2E8F0] leading-relaxed max-w-5xl">
              {slide.description}
            </p>
          )}
        </div>
        
        <div className="flex-1 space-y-4 overflow-y-auto">
          {slide.points.map((point, index) => (
            <div key={index} className="relative group">
              <div className="relative p-4 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl hover:border-[#6366F1]/30 hover:bg-[#FFFFFF]/10 transition-all duration-500">
                {/* Premium bullet point */}
                <div className="flex items-start space-x-4">
                  <div className="w-3 h-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full mt-2 flex-shrink-0" />
                  <div className="text-[clamp(16px,2.2vw,22px)] font-inter text-[#F8FAFC] leading-relaxed">{point}</div>
                </div>
                
                {/* Subtle accent line */}
                <div className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-[#6366F1]/30 to-transparent rounded-r-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Standard slides with description/subtitle
  return (
    <div className="flex flex-col items-center justify-center h-full px-16 py-8">
      <div className="text-center max-w-6xl">
        {/* Premium accent line */}
        <div className="w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] mx-auto mb-8 rounded-full" />
        
        <h2 className="text-[clamp(28px,4.5vw,48px)] font-bold font-inter text-[#F8FAFC] leading-[1.1] tracking-[-0.02em] mb-8">
          {slide.title}
        </h2>
        
        {slide.description && (
          <div className="relative mb-6">
            <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
              <p className="text-[clamp(16px,2.5vw,24px)] font-inter text-[#E2E8F0] leading-relaxed">
                {slide.description}
              </p>
              {/* Subtle top accent */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full" />
            </div>
          </div>
        )}
        
        {slide.subtitle && (
          <div className="relative inline-block">
            <div className="relative p-6 bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 backdrop-blur-xl border border-[#6366F1]/20 rounded-xl">
              <p className="text-[clamp(16px,2vw,20px)] font-semibold font-inter text-[#F8FAFC]">
                {slide.subtitle}
              </p>
              {/* Premium highlight */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full" />
            </div>
          </div>
        )}
        
        {/* Elegant bottom divider for simple slides */}
        {!slide.description && !slide.subtitle && (
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#6366F1]/30 to-transparent mx-auto mt-8" />
        )}
      </div>
    </div>
  );
};

// Main App component
export default function PitchDeck() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef(null);

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const generatePDF = async () => {
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const slideWidth = 297;
    const slideHeight = 210;
    const originalSlide = currentSlide;

    for (let i = 0; i < deckContent.length; i++) {
      if (i > 0) pdf.addPage();
      
      // Set current slide to the one we want to capture
      setCurrentSlide(i);
      
      // Wait for re-render
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        const canvas = await html2canvas(slideRef.current, {
          width: slideRef.current.offsetWidth,
          height: slideRef.current.offsetHeight,
          scale: 2,
          useCORS: true,
          backgroundColor: '#0F1419'
        });
        
        const imgData = canvas.toDataURL('image/png');
        pdf.addImage(imgData, 'PNG', 0, 0, slideWidth, slideHeight);
      } catch (error) {
        console.error('Error generating slide:', error);
      }
    }

    // Restore original slide
    setCurrentSlide(originalSlide);
    pdf.save('ZERKER-Pitch-Deck.pdf');
  };

  const slide = deckContent[currentSlide];
  const isTitle = currentSlide === 0;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowRight' && currentSlide < deckContent.length - 1) {
        handleSlideChange(currentSlide + 1);
      } else if (event.key === 'ArrowLeft' && currentSlide > 0) {
        handleSlideChange(currentSlide - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide]);

  return (
    <div className="min-h-screen relative flex items-center justify-center font-['Inter'] antialiased overflow-hidden bg-[#0a0a0a]">
      {/* Premium cinematic background layers */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F1419] via-[#1A1F2E] to-[#161B22]" />
      <div className="absolute inset-0 bg-gradient-to-tr from-[#1e293b]/20 via-transparent to-[#0f172a]/30" />
      <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-[#1e1b4b]/10 to-[#0f172a]/20" />
      
      {/* Subtle noise texture */}
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px'
      }} />
      
      {/* Geometric accent lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent" />
      <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-[#8B5CF6]/20 to-transparent" />
      <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#6366F1]/15 to-transparent" />
      <div className="absolute top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6]/15 to-transparent" />
      
      {/* Subtle radial highlight */}
      <div className="absolute inset-0 bg-radial-gradient opacity-10" style={{
        background: 'radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)'
      }} />
      <div className="w-full max-w-7xl mx-auto p-8">
        {/* Header with controls */}
        <div className="flex justify-between items-center mb-8">
          <div className="text-[#CBD5E1] text-sm">
            Slide {currentSlide + 1} of {deckContent.length}
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={generatePDF}
              className="px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold rounded-lg hover:from-[#7C3AED] hover:to-[#9333EA] transition-all duration-300 shadow-lg"
            >
              Export PDF
            </button>
          </div>
        </div>

        {/* Slide Container */}
        <div className="relative aspect-video overflow-hidden shadow-2xl">
          {/* Premium slide background with depth */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] rounded-lg" />
          <div className="absolute inset-0 bg-gradient-to-tr from-[#1a1a1a]/30 via-transparent to-[#0f0f0f]/50 rounded-lg" />
          <div className="absolute inset-0 border border-[#FFFFFF]/8 rounded-lg" />
          
          {/* Cinematic edge lighting */}
          <div className="absolute inset-0 rounded-lg" style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), inset 0 -1px 0 rgba(0,0,0,0.2), 0 20px 40px rgba(0,0,0,0.4)'
          }} />
          
          {/* Premium corner accents with enhanced styling */}
          <div className="absolute top-0 left-0 w-24 h-24 pointer-events-none">
            <div className="absolute top-0 left-4 w-16 h-[2px] bg-gradient-to-r from-[#6366F1]/60 via-[#6366F1]/30 to-transparent rounded-full" />
            <div className="absolute top-4 left-0 h-16 w-[2px] bg-gradient-to-b from-[#6366F1]/60 via-[#6366F1]/30 to-transparent rounded-full" />
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 pointer-events-none">
            <div className="absolute bottom-0 right-4 w-16 h-[2px] bg-gradient-to-l from-[#8B5CF6]/60 via-[#8B5CF6]/30 to-transparent rounded-full" />
            <div className="absolute bottom-4 right-0 h-16 w-[2px] bg-gradient-to-t from-[#8B5CF6]/60 via-[#8B5CF6]/30 to-transparent rounded-full" />
          </div>
          
          {/* Subtle inner glow */}
          <div className="absolute inset-2 bg-gradient-to-br from-[#6366F1]/[0.02] via-transparent to-[#8B5CF6]/[0.02] rounded-lg pointer-events-none" />
          
          <div className="absolute inset-0" ref={slideRef}>
            <SlideContent slide={slide} currentSlide={currentSlide} isTitle={isTitle} />
          </div>
        </div>

        {/* Premium Navigation Suite */}
        <div className="flex justify-center items-center mt-8 space-x-8">
          {/* Enhanced Previous Button */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1]/20 to-[#8B5CF6]/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
            <button
              onClick={() => handleSlideChange(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="relative p-4 rounded-full border border-[#FFFFFF]/15 hover:border-[#6366F1]/60 bg-gradient-to-br from-[#FFFFFF]/10 to-[#FFFFFF]/5 hover:from-[#6366F1]/15 hover:to-[#6366F1]/5 backdrop-blur-xl transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              <svg className="w-5 h-5 text-[#CBD5E1] group-hover:text-[#6366F1] group-hover:transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          {/* Sophisticated Slide Indicators */}
          <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-[#FFFFFF]/12 via-[#FFFFFF]/8 to-[#FFFFFF]/12 rounded-full border border-[#FFFFFF]/20 backdrop-blur-xl shadow-xl"
               style={{
                 boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.4)'
               }}>
            {deckContent.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSlideChange(index)}
                className="group relative p-1"
              >
                <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] shadow-lg shadow-[#6366F1]/40' 
                    : 'bg-[#FFFFFF]/40 hover:bg-[#FFFFFF]/60 group-hover:scale-125'
                }`} />
                {/* Active indicator glow */}
                {index === currentSlide && (
                  <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-full blur-sm opacity-50" />
                )}
              </button>
            ))}
          </div>
          
          {/* Enhanced Next Button */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6]/20 to-[#6366F1]/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-md" />
            <button
              onClick={() => handleSlideChange(Math.min(deckContent.length - 1, currentSlide + 1))}
              disabled={currentSlide === deckContent.length - 1}
              className="relative p-4 rounded-full border border-[#FFFFFF]/15 hover:border-[#6366F1]/60 bg-gradient-to-br from-[#FFFFFF]/10 to-[#FFFFFF]/5 hover:from-[#6366F1]/15 hover:to-[#6366F1]/5 backdrop-blur-xl transition-all duration-500 disabled:opacity-20 disabled:cursor-not-allowed shadow-xl"
              style={{
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1), 0 8px 32px rgba(0,0,0,0.3)'
              }}
            >
              <svg className="w-5 h-5 text-[#CBD5E1] group-hover:text-[#6366F1] group-hover:transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}