'use client';

import React, { useState } from 'react';
import Link from 'next/link';

const InvestorsPortal = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const resources = [
    {
      id: 'pitch-deck',
      title: 'Interactive Pitch Deck',
      description: 'Complete investor presentation with live data and premium visuals',
      icon: '📊',
      href: '/',
      status: 'Available',
      color: 'from-[#6366F1] to-[#8B5CF6]'
    },
    {
      id: 'one-pagers',
      title: 'Executive One-Pagers',
      description: 'Condensed summaries for quick investor review',
      icon: '📄',
      href: '/investors/one-pagers',
      status: 'Coming Soon',
      color: 'from-[#8B5CF6] to-[#A855F7]'
    },
    {
      id: 'financials',
      title: 'Financial Models',
      description: 'Detailed projections, unit economics, and scenario analysis',
      icon: '💼',
      href: '/investors/financials',
      status: 'Coming Soon',
      color: 'from-[#A855F7] to-[#C084FC]'
    },
    {
      id: 'legal',
      title: 'Legal Documents',
      description: 'Term sheets, cap table, and investment documentation',
      icon: '⚖️',
      href: '/investors/legal',
      status: 'Coming Soon',
      color: 'from-[#C084FC] to-[#DDD6FE]'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white font-['Inter'] antialiased">
      {/* Premium background layers */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F1419] via-[#1A1F2E] to-[#161B22]" />
      <div className="fixed inset-0 bg-gradient-to-tr from-[#1e293b]/20 via-transparent to-[#0f172a]/30" />
      <div className="fixed inset-0 bg-gradient-to-bl from-transparent via-[#1e1b4b]/10 to-[#0f172a]/20" />
      
      {/* Subtle noise texture */}
      <div className="fixed inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        backgroundSize: '256px 256px'
      }} />
      
      {/* Geometric accent lines */}
      <div className="fixed top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#6366F1]/20 to-transparent" />
      <div className="fixed bottom-0 right-0 w-full h-px bg-gradient-to-l from-transparent via-[#8B5CF6]/20 to-transparent" />
      <div className="fixed top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-[#6366F1]/15 to-transparent" />
      <div className="fixed top-0 right-0 w-px h-full bg-gradient-to-b from-transparent via-[#8B5CF6]/15 to-transparent" />
      
      {/* Subtle radial highlight */}
      <div className="fixed inset-0" style={{
        background: 'radial-gradient(circle at 70% 30%, rgba(99, 102, 241, 0.08) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(139, 92, 246, 0.06) 0%, transparent 50%)'
      }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-16">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center">
                  <span className="text-2xl font-black text-white">Z</span>
                </div>
                <div>
                  <h1 className="text-2xl font-black text-[#F8FAFC]">ZERKER</h1>
                  <p className="text-sm text-[#94A3B8]">Investor Portal</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-sm text-[#6366F1] font-medium">Confidential</p>
                  <p className="text-xs text-[#94A3B8]">For authorized investors only</p>
                </div>
              </div>
            </div>

            {/* Hero Section */}
            <div className="text-center mb-20">
              <div className="mb-8">
                <div className="w-24 h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-full mx-auto shadow-lg mb-8" />
              </div>
              
              <h2 className="text-[clamp(48px,8vw,72px)] font-black text-[#F8FAFC] leading-none tracking-[-0.04em] mb-6">
                Investment Materials
              </h2>
              
              <p className="text-[clamp(18px,2.5vw,24px)] font-light text-[#E2E8F0] leading-relaxed max-w-4xl mx-auto mb-8">
                Access comprehensive materials for our $2.5M seed round. <br />
                Building the operating system for enterprise trust in the AI era.
              </p>
              
              <div className="flex items-center justify-center space-x-8 text-sm text-[#94A3B8]">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
                  <span>Seed Stage</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#6366F1] rounded-full"></div>
                  <span>$2.5M Target</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-[#8B5CF6] rounded-full"></div>
                  <span>24 Month Runway</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Resources Grid */}
        <main className="px-8 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="group relative"
                  onMouseEnter={() => setHoveredCard(resource.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-2xl blur-xl`} />
                  
                  <div className="relative h-full p-8 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-2xl hover:border-[#6366F1]/30 hover:bg-[#FFFFFF]/12 transition-all duration-500">
                    {/* Status indicator */}
                    <div className="absolute top-6 right-6">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                        resource.status === 'Available' 
                          ? 'bg-[#10B981]/20 text-[#10B981] border border-[#10B981]/20' 
                          : 'bg-[#F59E0B]/20 text-[#F59E0B] border border-[#F59E0B]/20'
                      }`}>
                        {resource.status}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6">
                      <div className="text-4xl mb-4">{resource.icon}</div>
                      <h3 className="text-[clamp(24px,3vw,32px)] font-bold text-[#F8FAFC] mb-3 group-hover:text-white transition-colors duration-300">
                        {resource.title}
                      </h3>
                      <p className="text-[clamp(14px,1.8vw,18px)] text-[#CBD5E1] leading-relaxed">
                        {resource.description}
                      </p>
                    </div>

                    {/* Action */}
                    <div className="mt-auto">
                      {resource.status === 'Available' ? (
                        <Link
                          href={resource.href}
                          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-semibold rounded-lg hover:from-[#5855EB] hover:to-[#7C3AED] transition-all duration-300 shadow-lg"
                        >
                          <span>Access Now</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center space-x-2 px-6 py-3 bg-[#FFFFFF]/10 text-[#94A3B8] font-semibold rounded-lg cursor-not-allowed">
                          <span>Coming Soon</span>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Premium accent */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full opacity-50 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              ))}
            </div>

            {/* Contact Section */}
            <div className="mt-20 text-center">
              <div className="max-w-4xl mx-auto">
                <div className="relative p-8 bg-gradient-to-br from-[#FFFFFF]/6 to-[#FFFFFF]/2 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-2xl">
                  <h3 className="text-[clamp(24px,3vw,32px)] font-bold text-[#F8FAFC] mb-4">
                    Questions or Need Additional Materials?
                  </h3>
                  <p className="text-[clamp(16px,2vw,20px)] text-[#CBD5E1] mb-6">
                    Connect directly with our founding team for detailed discussions and due diligence materials.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <a
                      href="mailto:revaz@zerker.ai"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-semibold rounded-lg hover:from-[#7C3AED] hover:to-[#9333EA] transition-all duration-300 shadow-lg"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      <span>Email Team</span>
                    </a>
                    
                    <div className="text-[#94A3B8] text-sm">
                      revaz@zerker.ai • CEO & Co-Founder
                    </div>
                  </div>

                  {/* Premium highlight */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default InvestorsPortal;