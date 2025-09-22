'use client';

import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

// Premium VC-focused components
const MetricCard = ({ value, label, accent = false, trend = null }) => (
  <div className={`relative group ${accent ? 'col-span-2' : ''}`}>
    <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    <div className="relative p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#00AEEF]/50 transition-all duration-300">
      <div className="flex items-end justify-between">
        <div>
          <div className={`${accent ? 'text-[56px]' : 'text-[42px]'} font-bold bg-gradient-to-r from-[#00AEEF] to-[#0088CC] bg-clip-text text-transparent leading-none`}>
            {value}
          </div>
          <div className="text-[16px] text-[#888888] mt-3 uppercase tracking-wider">{label}</div>
        </div>
        {trend && (
          <div className="text-[#00FF88] text-sm font-medium flex items-center">
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

const AgentCard = ({ name, description, icon }) => (
  <div className="relative overflow-hidden group h-full">
    <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/5 via-transparent to-[#0066AA]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="relative p-8 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#00AEEF]/30 transition-all duration-300 h-full">
      <div className="flex items-start mb-6">
        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0066AA] flex items-center justify-center flex-shrink-0">
          <div className="text-2xl">{icon}</div>
        </div>
        <h4 className="ml-4 text-[26px] font-semibold text-[#00AEEF] mt-2">{name}</h4>
      </div>
      <p className="text-[18px] text-[#CCCCCC] leading-relaxed">{description}</p>
    </div>
  </div>
);

const TimelineItem = ({ phase, title, description, isActive = false }) => (
  <div className="relative">
    <div className={`absolute left-0 top-0 w-full h-1 ${isActive ? 'bg-gradient-to-r from-[#00AEEF] to-[#0099DD]' : 'bg-[#1A1A1A]'} transition-all duration-500`} />
    <div className="pt-8">
      <div className={`text-sm font-semibold uppercase tracking-wider ${isActive ? 'text-[#00AEEF]' : 'text-[#666666]'} mb-2`}>
        {phase}
      </div>
      <h4 className={`text-[20px] font-semibold ${isActive ? 'text-[#FFFFFF]' : 'text-[#999999]'} mb-2`}>
        {title}
      </h4>
      <p className={`text-[16px] ${isActive ? 'text-[#CCCCCC]' : 'text-[#666666]'} leading-relaxed`}>
        {description}
      </p>
    </div>
  </div>
);

const TeamMember = ({ name, role, expertise }) => (
  <div className="relative group">
    <div className="absolute inset-0 bg-gradient-to-br from-[#00AEEF]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    <div className="relative p-6 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl hover:border-[#00AEEF]/30 transition-all duration-300">
      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0066AA] mb-4" />
      <h4 className="text-[22px] font-semibold text-[#FFFFFF] mb-1">{name}</h4>
      <p className="text-[16px] text-[#00AEEF] mb-3">{role}</p>
      <p className="text-[14px] text-[#888888] leading-relaxed">{expertise}</p>
    </div>
  </div>
);

const FundingAllocation = ({ category, percentage, amount }) => (
  <div className="relative mb-6">
    <div className="flex justify-between mb-2">
      <span className="text-[18px] text-[#FFFFFF]">{category}</span>
      <span className="text-[18px] text-[#00AEEF] font-semibold">{amount}</span>
    </div>
    <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
      <div 
        className="h-full bg-gradient-to-r from-[#00AEEF] to-[#0099DD] rounded-full transition-all duration-1000"
        style={{ width: `${percentage}%` }}
      />
    </div>
    <div className="text-[14px] text-[#666666] mt-1">{percentage}%</div>
  </div>
);

const deckContent = [
    // Slide 1: Title
    { section: "Title", title: "ZERKER", subtitle: "The Media Verification Operating System", date: "September 22, 2025" },
    // Slide 2: The Problem
    { section: "Problem", title: "AI's Accessibility Has Broken Digital Trust, Creating Massive Enterprise Risk", points: ["Infodemic at Scale: Generative AI tools are now dangerously accessible, allowing anyone to create a convincing deepfake video for as little as $15.", "Mission-Critical Impact: This fuels misinformation that erodes brand trust, enables sophisticated fraud, and facilitates reputational attacks.", "Existing Tools are Failing: Current point solutions are reactive, slow, and lack the critical explainability that our 17 enterprise and government interviews confirmed is non-negotiable."] },
    // Slide 3: The Solution
    { section: "Solution", title: "We Are Creating the Media Verification Operating System to Rebuild Enterprise Trust at Scale", description: "We provide the essential synthetic media detection, authenticity, and verification infrastructure for the modern enterprise. Our agentic system manages the entire lifecycle of trust—from initial discovery to understanding its origin and impact, and enabling decisive action." },
    // Slide 4: Market Opportunity
    { section: "Why Now", title: "Technological, Economic, and Regulatory Forces Have Made Enterprise-Grade Verification a Mission-Critical Imperative", points: ["Technological Acceleration: The rapid improvement of generative models means manual or single-point solutions are now obsolete.", "Economic Imperative: The financial impact of fraud and brand damage from synthetic media is moving from a rounding error to a significant P&L issue.", "Regulatory Pressure: New legislation is emerging that will hold platforms and enterprises accountable for the spread of malicious deepfakes."] },
    // Slide 5: Market Size
    { section: "Market", title: "We Are Capturing an Underserved Enterprise Market with a Validated Path to $67M+ ARR", points: ["Initial Beachhead TAM: Our analysis of 14 commercial segments identified a core market of thousands of enterprises across News Media, Talent Agencies, and Insurance.", "Strategic Expansion: Our infrastructure is built to scale into adjacent high-value verticals, including Law Firms, Financial Services, and Government.", "Clear Path to Scale: Our financial model projects a path to $66.7M in Annual Recurring Revenue (ARR) by Year 10 in our medium case scenario."] },
    // Slide 6: Product Roadmap
    { section: "Product", title: "Our Roadmap Delivers Immediate Value with ZERKER CORE, Evolving to a Fully Agentic System to Dominate the Market", roadmap: [
      { phase: "Phase 1: ZERKER CORE (Today)", description: "A robust system with a UI for enrolling detectors, building custom verification workflows, and running analysis. It is fully API-integrated and serves as the core infrastructure we co-develop with our initial enterprise partners." },
      { phase: "Phase 2: Agentic Workflows (The Roadmap)", description: "We will evolve the system to introduce semi-autonomous agentic workflows, enabling proactive analysis and intelligent management of the detector lifecycle." },
      { phase: "Phase 3: Fully Autonomous Agents (The Vision)", description: "Our long-term vision is a coordinated system of fully autonomous agents—SENTRY (Coordination), SPECTER (Analysis), ORACLE (Explainability), and AEGIS (Action)—that manage the entire trust lifecycle." }
    ]},
    // Slide 7: Technology & Moat
    { section: "Technology", title: "We Have an Insurmountable Moat Built on DARPA Intelligence, Exclusive CNN Data, and a Captive Distribution Channel", points: ["DARPA-Forged Intelligence: Our core system was forged through unique exposure within US government programs like DARPA's SemaFor, providing an unparalleled understanding of malicious threats.", "Proprietary Data Access: Our strategic partnership with CNN provides an unparalleled data moat, with access to over 2 million hours of pristine, annotated media footage.", "Built-in Distribution: The CNN partnership also provides a built-in distribution channel to their global network of affiliates and partners."] },
    // Slide 8: Developer Ecosystem
    { section: "Ecosystem", title: "We Win the 'Arms Race' with a Pre-Vetted Ecosystem of Elite Developers from the DARPA SemaFor Program", points: ["Our ecosystem is comprised of two types of partners from the elite DARPA SemaFor program: Detector Developers and Synthetic Data Providers (Red Teams).", "Highly recommended Detector Developers include top-performing university labs like Purdue, Syracuse, and Drexel.", "Purdue has already outlined commercial terms, requiring ~$100k/year for a dedicated PhD-led team.", "Highly recommended Data Providers include the dependable, enterprise-grade team at STR.", "We will use resources like UL's detection challenges to continuously scout for new talent."] },
    // Slide 9: Go-To-Market
    { section: "Go-To-Market", title: "Our GTM Strategy Secures Lighthouse Accounts First, Creating a Flywheel for Enterprise Domination", phases: [
      { phase: "Phase 1: Co-Development with Market Leaders", description: "Secure initial multi-year contracts with design partners like CNN & UTA to build and validate custom, outcome-driven solutions.", detail: "Leveraging our initial ZERKER CORE workflow system." },
      { phase: "Phase 2: Strategic Enterprise Sales", description: "Leverage these lighthouse accounts to target the top 100 enterprises in our beachhead verticals with a dedicated, solutions-oriented sales approach." },
      { phase: "Phase 3: Scale Through ZERKER CORE", description: "Expand to adjacencies by productizing the most valuable workflows.", detail: "Powered by our maturing Agentic Workflow capabilities." }
    ]},
    // Slide 10: Competition
    { section: "Competition", title: "Competitors Sell Legacy Tools; We Win by Creating a New Category Built on Verifiable Outcomes", comparison: {
      intro: "Our research identified 33 companies in the media verification space. However, they are competing with legacy tools while we are creating a new category.",
      features: [
        { feature: "Model", legacy: "Single-Point Tool", zerker: "Coordinated Agentic System" },
        { feature: "Technology", legacy: "Closed & Proprietary", zerker: "Open & Battle-Tested" },
        { feature: "Output", legacy: "'Black Box' Probability Score", zerker: "Radical, Visual Explainability" },
        { feature: "Business", legacy: "Transactional & Reactive", zerker: "Partnership & Proactive" }
      ]
    }},
    // Slide 11: Business Model
    { section: "Business Model", title: "We Drive High-Retention Revenue Through Outcome-Driven, Multi-Year Enterprise Contracts", points: ["Deep Engagement: We engage deeply with clients to co-develop custom workflows using ZERKER CORE.", "Value-Based Pricing: Our enterprise contracts are anchored by a tiered structure (starting at $10k for small, $75k for medium, and $150k+ for large organizations) but are customized based on the strategic outcomes delivered, driving significant ACV.", "High Retention: By becoming critical infrastructure for our clients, we build a sticky, defensible revenue base."] },
    // Slide 12: Team
    { section: "Team", title: "Our Founding Team Has the Exact Combination of Vision, GTM, and Technical Expertise Required to Win", team: [
      { name: "Revaz Tsivtsivadze", role: "CEO", description: "The entrepreneurial lead driving the company's vision, strategy, and product." },
      { name: "Disha", role: "COO", description: "The operational and GTM leader responsible for scaling partnerships and revenue, with direct experience from Google." },
      { name: "Jacob", role: "CTO", description: "The technical architect responsible for building the ZERKER agentic infrastructure." }
    ]},
    // Slide 13: Financial Projections
    { section: "Financials", title: "Our Capital-Efficient Model Delivers Profitability and a $67M Revenue Run Rate by Year 10", description: "Our model focuses on securing high-value enterprise contracts to drive growth.", projections: { fy5: { customers: 499, revenue: "$8.5M", ebitda: "($0.91M)" }, fy10: { customers: "3,010", revenue: "$66.7M", ebitda: "$6.6M" } }},
    // Slide 14: The Ask
    { section: "The Ask", title: "We Are Raising $2.5M to Convert a $300k Pilot Pipeline and Unlock Our Series A", description: "With our core infrastructure already built, we are raising a $2.5M seed round for 24 months of runway to secure foundational enterprise contracts and scale our agentic system.", milestones: ["Convert $300k in commercial pilots (CNN, UTA, CAA) into multi-year, ARR-generating enterprise contracts.", "Deliver the ZERKER CORE workflow and UI system, validating it by successfully deploying our three commercial pilots.", "Establish a repeatable, consultative GTM playbook for high-value accounts.", "Establish the commercial traction and repeatable sales model necessary for future growth and financing."] },
    // Slide 15: Contact
    { section: "Contact", title: "Join Us in Rebuilding Digital Trust.", contact: { name: "Revaz Tsivtsivadze", role: "CEO", email: "revaz@zerker.ai" }}
];

// Slide component for both display and PDF generation
const SlideContent = ({ slide, currentSlide, isPDF = false }) => {
  const baseTextClass = isPDF ? '' : 'transition-all duration-700';
  const isTitle = slide.section === "Title";
  
  // Special slide rendering for specific slides
  if (currentSlide === 0) { // Title slide - Enhanced branding
    return (
      <div className="relative flex flex-col items-center justify-center h-full px-32">
        {/* Animated background elements */}
        {!isPDF && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00AEEF]/5 rounded-full blur-[120px] animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#000000]/50" />
          </>
        )}
        
        <div className="relative z-10">
          <div className="mb-12 relative">
            <h1 className={`text-[180px] font-black bg-gradient-to-b from-[#00AEEF] via-[#0099DD] to-[#0077BB] bg-clip-text text-transparent tracking-[-0.06em] leading-none ${baseTextClass} ${!isPDF && 'animate-slideIn'}`}>
              {slide.title}
            </h1>
            {!isPDF && (
              <div className="absolute -inset-x-40 -inset-y-10 bg-[#00AEEF]/10 blur-[100px] -z-10 animate-pulse" />
            )}
          </div>
          <div className={`text-center space-y-6 ${!isPDF && 'animate-fadeIn animation-delay-300'}`}>
            <p className="text-[48px] font-extralight text-[#F5F5F5] tracking-[-0.02em]">
              {slide.subtitle}
            </p>
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent mx-auto" />
            <p className="text-[24px] font-light text-[#666666] tracking-[0.1em] uppercase">
              {slide.date}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 5) { // Product Roadmap - Timeline visualization
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="space-y-8">
          {slide.roadmap?.map((phase, index) => (
            <div key={index} className={`bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8 ${!isPDF && 'animate-slideIn'}`} style={!isPDF ? { animationDelay: `${(index + 1) * 150}ms` } : {}}>
              <div className="flex items-start">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#00AEEF] to-[#0066AA] flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-xl font-bold">{index + 1}</span>
                </div>
                <div className="ml-6">
                  <h4 className="text-[24px] font-semibold text-[#00AEEF] mb-3">{phase.phase}</h4>
                  <p className="text-[18px] text-[#CCCCCC] leading-relaxed">{phase.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (currentSlide === 9) { // Competition Matrix
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em] mb-6">
            {slide.title}
          </h2>
          <p className="text-[20px] text-[#888888] leading-relaxed mb-12">{slide.comparison?.intro}</p>
        </div>
        
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 bg-[#111111]">
            <div className="p-6 text-[18px] font-semibold text-[#CCCCCC] border-r border-[#1A1A1A]">Feature</div>
            <div className="p-6 text-[18px] font-semibold text-[#FF6B6B] border-r border-[#1A1A1A]">Legacy Detectors</div>
            <div className="p-6 text-[18px] font-semibold text-[#00AEEF]">ZERKER</div>
          </div>
          {slide.comparison?.features.map((row, index) => (
            <div key={index} className={`grid grid-cols-3 border-t border-[#1A1A1A] ${!isPDF && 'animate-slideIn'}`} style={!isPDF ? { animationDelay: `${(index + 1) * 100}ms` } : {}}>
              <div className="p-6 text-[16px] text-[#FFFFFF] border-r border-[#1A1A1A] font-medium">{row.feature}</div>
              <div className="p-6 text-[16px] text-[#CCCCCC] border-r border-[#1A1A1A]">{row.legacy}</div>
              <div className="p-6 text-[16px] text-[#FFFFFF] font-medium">{row.zerker}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (currentSlide === 11) { // Team slide - Professional showcase
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          {slide.team?.map((member, index) => (
            <div key={index} className={!isPDF ? `animate-slideIn` : ''} style={!isPDF ? { animationDelay: `${(index + 1) * 150}ms` } : {}}>
              <TeamMember 
                name={member.name} 
                role={member.role} 
                expertise={member.description}
              />
            </div>
          ))}
        </div>
      </div>
    );
  }
  
  if (currentSlide === 12) { // Financial Projections
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em] mb-4">
            {slide.title}
          </h2>
          <p className="text-[20px] text-[#888888]">{slide.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
            <h3 className="text-[28px] font-semibold text-[#FFFFFF] mb-8 text-center">Medium Case Projections</h3>
            <div className="space-y-8">
              <div className="grid grid-cols-3 text-center">
                <div className="text-[#888888] text-[16px] font-medium">Metric</div>
                <div className="text-[#00AEEF] text-[16px] font-semibold">FY5</div>
                <div className="text-[#00AEEF] text-[16px] font-semibold">FY10</div>
              </div>
              <div className="grid grid-cols-3 text-center py-4 border-t border-[#1A1A1A]">
                <div className="text-[#FFFFFF] text-[18px]">Customers</div>
                <div className="text-[#FFFFFF] text-[24px] font-bold">{slide.projections?.fy5.customers}</div>
                <div className="text-[#FFFFFF] text-[24px] font-bold">{slide.projections?.fy10.customers}</div>
              </div>
              <div className="grid grid-cols-3 text-center py-4 border-t border-[#1A1A1A]">
                <div className="text-[#FFFFFF] text-[18px]">Revenue</div>
                <div className="text-[#00AEEF] text-[28px] font-bold">{slide.projections?.fy5.revenue}</div>
                <div className="text-[#00AEEF] text-[28px] font-bold">{slide.projections?.fy10.revenue}</div>
              </div>
              <div className="grid grid-cols-3 text-center py-4 border-t border-[#1A1A1A]">
                <div className="text-[#FFFFFF] text-[18px]">EBITDA</div>
                <div className="text-[#FFFFFF] text-[24px] font-bold">{slide.projections?.fy5.ebitda}</div>
                <div className="text-[#00FF88] text-[24px] font-bold">{slide.projections?.fy10.ebitda}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
            <h3 className="text-[28px] font-semibold text-[#FFFFFF] mb-8">Growth Trajectory</h3>
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <span className="text-[#CCCCCC]">Customer Growth</span>
                <span className="text-[#00AEEF] font-semibold">503% CAGR</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00AEEF] to-[#0099DD] rounded-full w-[85%]" />
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-[#CCCCCC]">Revenue Growth</span>
                <span className="text-[#00AEEF] font-semibold">685% CAGR</span>
              </div>
              <div className="w-full h-2 bg-[#1A1A1A] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#00AEEF] to-[#0099DD] rounded-full w-[92%]" />
              </div>
              
              <div className="mt-8 p-4 bg-[#111111] rounded-lg">
                <div className="text-[#FFFFFF] text-[20px] font-semibold mb-2">Path to Profitability</div>
                <div className="text-[#888888] text-[16px]">Break-even by Year 6 with strong unit economics</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 8) { // Market metrics slide - Enhanced data visualization
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[52px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-4 gap-6 mb-12">
          <MetricCard value="13,800+" label="Target Enterprises" accent={true} trend="+127%" />
          <MetricCard value="$2.4B" label="Initial TAM" />
          <MetricCard value="$300K" label="Current Pilots" />
        </div>
        
        <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
          <h3 className="text-[20px] font-semibold text-[#FFFFFF] mb-6">Strategic Partners</h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-[48px] font-black text-[#00AEEF] mb-2">CNN</div>
              <p className="text-[14px] text-[#888888]">News Media Partner</p>
            </div>
            <div className="text-center">
              <div className="text-[48px] font-black text-[#00AEEF] mb-2">UTA</div>
              <p className="text-[14px] text-[#888888]">Talent Agency Partner</p>
            </div>
            <div className="text-center">
              <div className="text-[48px] font-black text-[#00AEEF] mb-2">CAA</div>
              <p className="text-[14px] text-[#888888]">Entertainment Partner</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 11) { // Team slide - Professional showcase
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[52px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-8">
          <TeamMember 
            name="Revaz Tsivtsivadze" 
            role="CEO & Co-Founder" 
            expertise="Serial entrepreneur, product visionary, former startup CTO"
          />
          <TeamMember 
            name="Disha" 
            role="COO & Co-Founder" 
            expertise="Google alumna, enterprise GTM expert, strategic partnerships"
          />
          <TeamMember 
            name="Jacob" 
            role="CTO & Co-Founder" 
            expertise="AI/ML architect, distributed systems, ex-DARPA researcher"
          />
        </div>
      </div>
    );
  }
  
  if (currentSlide === 12) { // Go-to-market timeline
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[52px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em]">
            {slide.title}
          </h2>
        </div>
        
        <div className="grid grid-cols-3 gap-12">
          <TimelineItem 
            phase="PHASE 1" 
            title="Co-Development" 
            description="Secure multi-year contracts with CNN/UTA to validate solutions"
            isActive={true}
          />
          <TimelineItem 
            phase="PHASE 2" 
            title="Enterprise Sales" 
            description="Target top 100 enterprises with proven lighthouse accounts"
            isActive={false}
          />
          <TimelineItem 
            phase="PHASE 3" 
            title="Scale ZERKER CORE" 
            description="Expand to adjacencies by productizing valuable workflows"
            isActive={false}
          />
        </div>
        
        <div className="mt-16 bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-[24px] font-semibold text-[#FFFFFF] mb-2">Current Status</h4>
              <p className="text-[#888888]">Active pilots with 3 strategic partners</p>
            </div>
            <div className="text-right">
              <div className="text-[36px] font-bold text-[#00AEEF]">Q1 2025</div>
              <p className="text-[#888888]">First enterprise contract target</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 13) { // The Ask - Use of funds visualization
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className={`mb-12 ${!isPDF && 'animate-slideIn'}`}>
          <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em] mb-6">
            {slide.section}
          </p>
          <h2 className="text-[48px] font-bold text-[#F5F5F5] leading-[1.15] tracking-[-0.02em] mb-4">
            {slide.title}
          </h2>
          <p className="text-[20px] text-[#888888]">{slide.description}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-12">
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
            <h3 className="text-[24px] font-semibold text-[#FFFFFF] mb-8">Use of Funds</h3>
            <FundingAllocation category="Product & Engineering" percentage={40} amount="$1.0M" />
            <FundingAllocation category="Sales & Partnerships" percentage={30} amount="$750K" />
            <FundingAllocation category="Operations & Legal" percentage={20} amount="$500K" />
            <FundingAllocation category="Marketing & Brand" percentage={10} amount="$250K" />
          </div>
          
          <div className="bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-8">
            <h3 className="text-[24px] font-semibold text-[#FFFFFF] mb-8">Key Milestones</h3>
            <div className="space-y-6">
              {slide.milestones?.map((milestone, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00AEEF] to-[#0066AA] flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-sm font-bold">{index + 1}</span>
                  </div>
                  <p className="ml-4 text-[16px] text-[#CCCCCC] leading-relaxed">{milestone}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (currentSlide === 14) { // Contact slide
    return (
      <div className="relative flex flex-col items-center justify-center h-full px-32">
        {/* Background elements */}
        {!isPDF && (
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00AEEF]/5 rounded-full blur-[100px] animate-pulse" />
          </div>
        )}
        
        <div className="relative z-10 text-center">
          <h2 className={`text-[72px] font-bold text-[#F5F5F5] leading-[1.1] tracking-[-0.03em] mb-16 ${!isPDF && 'animate-slideIn'}`}>
            {slide.title}
          </h2>
          
          <div className={`bg-[#0A0A0A] border border-[#1A1A1A] rounded-xl p-12 ${!isPDF && 'animate-fadeIn animation-delay-300'}`}>
            <div className="text-[96px] font-black text-[#00AEEF] mb-8">ZERKER</div>
            <div className="space-y-4">
              <div className="text-[32px] font-semibold text-[#FFFFFF]">{slide.contact?.name}</div>
              <div className="text-[24px] text-[#888888]">{slide.contact?.role}</div>
              <div className="text-[28px] text-[#00AEEF] font-medium">{slide.contact?.email}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Handle slides with descriptions instead of points
  if (slide.description && !slide.points && !slide.roadmap && !slide.comparison && !slide.team && !slide.projections && !slide.milestones && !slide.contact) {
    return (
      <div className="flex flex-col justify-center h-full px-32 py-24">
        <div className="max-w-[1400px]">
          <div className={`mb-16 ${!isPDF && 'animate-slideIn'}`}>
            <div className="flex items-center mb-8">
              <div className="w-12 h-[2px] bg-gradient-to-r from-[#00AEEF] to-transparent mr-4" />
              <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em]">
                {slide.section}
              </p>
            </div>
            <h2 className="text-[56px] font-bold text-[#F5F5F5] leading-[1.1] tracking-[-0.03em] max-w-[1200px] mb-12">
              {slide.title}
            </h2>
            <p className="text-[28px] font-light text-[#E5E5E5] leading-[1.6] tracking-[-0.01em] max-w-[1200px]">
              {slide.description}
            </p>
          </div>
        </div>
      </div>
    );
  }
  
  if (isTitle) {
    return (
      <div className="relative flex flex-col items-center justify-center h-full px-32">
        {/* Animated background elements */}
        {!isPDF && (
          <>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00AEEF]/5 rounded-full blur-[120px] animate-pulse" />
            </div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#000000]/50" />
          </>
        )}
        
        <div className="relative z-10">
          <div className="mb-16 relative">
            <h1 className={`text-[180px] font-black bg-gradient-to-b from-[#00AEEF] via-[#0099DD] to-[#0077BB] bg-clip-text text-transparent tracking-[-0.06em] leading-none ${baseTextClass} ${!isPDF && 'animate-slideIn'}`}>
              {slide.title}
            </h1>
            {!isPDF && (
              <div className="absolute -inset-x-40 -inset-y-10 bg-[#00AEEF]/10 blur-[100px] -z-10 animate-pulse" />
            )}
          </div>
          {slide.points && (
            <div className={`text-center space-y-4 ${!isPDF && 'animate-fadeIn animation-delay-300'}`}>
              <p className="text-[48px] font-extralight text-[#F5F5F5] tracking-[-0.02em]">
                {slide.points[0]}
              </p>
              <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#00AEEF] to-transparent mx-auto" />
              <p className="text-[24px] font-light text-[#666666] tracking-[0.1em] uppercase">
                {slide.points[1]}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center h-full px-32 py-24">
      <div className="max-w-[1400px]">
        <div className={`mb-16 ${!isPDF && 'animate-slideIn'}`}>
          <div className="flex items-center mb-8">
            <div className="w-12 h-[2px] bg-gradient-to-r from-[#00AEEF] to-transparent mr-4" />
            <p className="text-[#00AEEF] text-[16px] font-semibold uppercase tracking-[0.2em]">
              {slide.section}
            </p>
          </div>
          <h2 className="text-[56px] font-bold text-[#F5F5F5] leading-[1.1] tracking-[-0.03em] max-w-[1200px]">
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
                <div className="absolute -left-8 top-0 w-1 h-full bg-gradient-to-b from-[#00AEEF]/0 via-[#00AEEF]/20 to-[#00AEEF]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="flex-shrink-0 w-8 h-8 mt-1">
                  <div className="w-2 h-2 bg-[#00AEEF] rounded-full mt-3 group-hover:scale-150 group-hover:shadow-[0_0_20px_rgba(0,174,239,0.5)] transition-all duration-300" />
                </div>
                <p className="text-[28px] font-light text-[#E5E5E5] leading-[1.6] tracking-[-0.01em] pl-4 group-hover:text-[#FFFFFF] transition-colors duration-300">
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
  const pdfContainerRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isTransitioning) return;
      
      if (e.key === 'ArrowLeft' && currentSlide > 0) {
        handleSlideChange(currentSlide - 1);
      } else if (e.key === 'ArrowRight' && currentSlide < deckContent.length - 1) {
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

    for (let i = 0; i < deckContent.length; i++) {
      const slide = deckContent[i];
      const isTitle = slide.section === "Title";
      
      // Create a temporary container for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.style.position = 'absolute';
      tempDiv.style.left = '-9999px';
      tempDiv.style.width = '1920px';
      tempDiv.style.height = '1080px';
      tempDiv.style.backgroundColor = '#0F0F0F';
      tempDiv.style.fontFamily = 'Inter, -apple-system, BlinkMacSystemFont, sans-serif';
      tempDiv.className = 'pdf-container';
      
      // Render the slide content
      const slideHtml = `
        <div style="width: 1920px; height: 1080px; background: linear-gradient(135deg, #0F0F0F 0%, #1A1A1A 100%); display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden;">
          <!-- Background pattern -->
          <div style="position: absolute; inset: 0; opacity: 0.03;">
            <div style="position: absolute; inset: 0; background-image: radial-gradient(circle at 2px 2px, #00AEEF 1px, transparent 1px); background-size: 40px 40px;"></div>
          </div>
          
          <!-- Content -->
          <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; position: relative; z-index: 1;">
            ${isTitle ? `
              <!-- Title Slide -->
              <div style="text-align: center; padding: 0 120px;">
                <h1 style="font-size: 180px; font-weight: 900; color: #00AEEF; margin: 0 0 60px 0; letter-spacing: -0.04em; line-height: 1;">
                  ${slide.title}
                </h1>
                ${slide.points ? `
                  <p style="font-size: 48px; font-weight: 300; color: #F5F5F5; margin: 0 0 20px 0; letter-spacing: -0.01em;">
                    ${slide.points[0]}
                  </p>
                  <p style="font-size: 32px; font-weight: 300; color: #666666; margin: 0; letter-spacing: 0.05em;">
                    ${slide.points[1]}
                  </p>
                ` : ''}
              </div>
            ` : `
              <!-- Content Slide -->
              <div style="padding: 120px 160px; width: 100%; max-width: 1600px;">
                <div style="margin-bottom: 60px;">
                  <p style="color: #00AEEF; font-size: 18px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.2em; margin: 0 0 24px 0;">
                    ${slide.section}
                  </p>
                  <h2 style="font-size: 64px; font-weight: 700; color: #F5F5F5; line-height: 1.15; letter-spacing: -0.02em; margin: 0;">
                    ${slide.title}
                  </h2>
                </div>
                
                ${slide.points ? `
                  <div style="margin-top: 48px;">
                    ${slide.points.map(point => `
                      <div style="display: flex; align-items: flex-start; margin-bottom: 32px;">
                        <div style="width: 8px; height: 8px; background: #00AEEF; border-radius: 50%; margin-top: 14px; margin-right: 24px; flex-shrink: 0;"></div>
                        <p style="font-size: 28px; font-weight: 300; color: #E5E5E5; line-height: 1.6; letter-spacing: -0.01em; margin: 0;">
                          ${point}
                        </p>
                      </div>
                    `).join('')}
                  </div>
                ` : ''}
              </div>
            `}
          </div>
          
          <!-- Slide number -->
          <div style="position: absolute; bottom: 40px; right: 60px; color: #666666; font-size: 14px; font-weight: 500; letter-spacing: 0.1em;">
            ${String(i + 1).padStart(2, '0')} / ${String(deckContent.length).padStart(2, '0')}
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

    pdf.save('ZERKER_Pitch_Deck.pdf');
    setIsGeneratingPDF(false);
  };

  const slide = deckContent[currentSlide];
  const isTitle = slide.section === "Title";

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center font-['Inter'] antialiased">
      {/* Background gradient -->
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#111111] to-[#1A1A1A]" />
      
      {/* Subtle grid pattern */}
      <div className="fixed inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, #00AEEF 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-[90vw] mx-auto z-10 pt-20 pb-20">
        {/* HUD */}
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-2">
          <div className="flex items-center space-x-8">
            <span className="text-[#00AEEF] text-xs font-semibold uppercase tracking-[0.2em]">
              {slide.section}
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[#666666] text-xs font-medium tracking-wider">
                {String(currentSlide + 1).padStart(2, '0')}
              </span>
              <span className="text-[#444444] text-xs">/</span>
              <span className="text-[#444444] text-xs font-medium tracking-wider">
                {String(deckContent.length).padStart(2, '0')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => setCurrentSlide(0)}
              className="text-[#666666] hover:text-[#00AEEF] text-xs font-medium tracking-wider transition-colors duration-300"
            >
              RESTART
            </button>
            <div className="w-px h-4 bg-[#333333]" />
            <button
              onClick={generatePDF}
              disabled={isGeneratingPDF}
              className="group relative px-8 py-3 overflow-hidden rounded-full bg-[#0A0A0A] border border-[#00AEEF]/30 hover:border-[#00AEEF] transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#00AEEF] to-[#0099DD] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
              <span className="relative text-xs font-semibold tracking-[0.15em] text-[#00AEEF] group-hover:text-[#0A0A0A] transition-colors duration-300 uppercase">
                {isGeneratingPDF ? 'Generating PDF...' : 'Export Deck'}
              </span>
            </button>
          </div>
        </div>

        {/* Slide Container */}
        <div className="relative aspect-video bg-gradient-to-br from-[#0a0a0a] to-[#0f0f0f] rounded-lg overflow-hidden shadow-[0_0_120px_rgba(0,174,239,0.1)]">
          {/* Noise texture overlay */}
          <div className="absolute inset-0 opacity-[0.015]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.5'/%3E%3C/svg%3E")`
          }} />
          
          <div className="absolute inset-0">
            <SlideContent slide={slide} currentSlide={currentSlide} isTitle={isTitle} />
          </div>
          
          {/* Premium corner accents */}
          <div className="absolute top-0 left-0 w-40 h-40">
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#00AEEF]/30 to-transparent" />
            <div className="absolute top-0 left-0 h-full w-[2px] bg-gradient-to-b from-[#00AEEF]/30 to-transparent" />
          </div>
          <div className="absolute bottom-0 right-0 w-40 h-40">
            <div className="absolute bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-[#00AEEF]/30 to-transparent" />
            <div className="absolute bottom-0 right-0 h-full w-[2px] bg-gradient-to-t from-[#00AEEF]/30 to-transparent" />
          </div>
        </div>

        {/* Navigation */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center translate-y-20">
          <div className="flex items-center space-x-12">
            <button
              onClick={() => handleSlideChange(Math.max(0, currentSlide - 1))}
              disabled={currentSlide === 0}
              className="group p-4 rounded-full border border-[#00AEEF]/20 hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-[#00AEEF] group-hover:transform group-hover:-translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <div className="flex items-center space-x-3">
              {deckContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleSlideChange(index)}
                  className="group relative p-1"
                >
                  <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                    index === currentSlide 
                      ? 'bg-[#00AEEF] w-12 h-1.5' 
                      : 'bg-[#444444] group-hover:bg-[#666666]'
                  }`} />
                </button>
              ))}
            </div>

            <button
              onClick={() => handleSlideChange(Math.min(deckContent.length - 1, currentSlide + 1))}
              disabled={currentSlide === deckContent.length - 1}
              className="group p-4 rounded-full border border-[#00AEEF]/20 hover:border-[#00AEEF] hover:bg-[#00AEEF]/10 transition-all duration-300 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5 text-[#00AEEF] group-hover:transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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