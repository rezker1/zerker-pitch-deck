'use client';

import React from 'react';
import Link from 'next/link';

const ExecutiveSummaryPrint = () => {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] antialiased noise-bg relative">
      <main className="relative z-10 px-8 py-12 pt-32">
        <div id="executive-brief-content" className="max-w-5xl mx-auto">
          
          {/* Title Section */}
          <div className="text-center mb-16 animate-fadeIn" style={{ pageBreakAfter: 'always' }}>
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
              <div>Ask: <span className="text-green-400 font-bold">$2M SAFE @ $15M post-money</span></div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-12">
            
            {/* Executive Summary */}
            <section id="executive-summary" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
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
            <section id="problem" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
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
            <section id="solution" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
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
              </div>
            </section>

            {/* Market Opportunity */}
            <section id="market-opportunity" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
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
            <section id="funding-roadmap" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
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
                      <h3 className="text-xl font-bold text-green-400">Pre-Seed (Current) — $2M SAFE @ $15M</h3>
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
            <section id="the-ask" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
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
                    Zerker is raising a $2M pre-seed round after partnering with SRI to exclusively commercialize DARPA-funded deepfake detection and media verification technology with CNN as the lighthouse customer in the News Media vertical.
                  </p>
                  <div className="p-6 bg-gradient-to-r from-emerald-500/10 to-green-500/10 border border-emerald-500/20 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                      <div>
                        <div className="text-2xl font-black text-emerald-400">$2M</div>
                        <div className="text-sm text-gray-300">Pre-Seed SAFE</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-emerald-400">$15M</div>
                        <div className="text-sm text-gray-300">Post-Money Valuation</div>
                      </div>
                      <div>
                        <div className="text-2xl font-black text-emerald-400">24M</div>
                        <div className="text-sm text-gray-300">Month Runway</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* A1: Financial Modeling */}
            <section id="financial-modeling" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
              <div className="absolute -inset-1 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
              <div className="relative p-10 glass rounded-2xl border border-green-500/20">
                <h2 className="text-3xl font-bold text-white mb-6 flex items-center">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mr-4">
                    <span className="text-white font-bold">A1</span>
                  </div>
                  Financial Modeling Scenarios
                </h2>
                <p className="text-center text-blue-200 mb-8 text-lg">Medium Case Shows a Company with $67M Revenue in Year 10 (~$500M Valuation)¹</p>
                
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
                      <p className="text-gray-300 text-sm">$67M revenue by year 10, ~$500M valuation target</p>
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
            <section id="technical-architecture" className="relative group card-hover scroll-mt-24" style={{ pageBreakAfter: 'always' }}>
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
                        <div className="text-gray-300 text-sm">Palantir • SentinelOne • OpenAI • Verisign • Google DeepMind</div>
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
            <section id="product-features" className="relative group card-hover scroll-mt-24">
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

export default ExecutiveSummaryPrint;
