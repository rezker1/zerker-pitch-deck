'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const InvestorsPortal = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const resources = [
    {
      id: 'pitch-deck',
      title: 'Executive Presentation',
      description: 'Comprehensive investor deck with market analysis, competitive positioning, and growth projections',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      href: '/',
      status: 'Available',
      color: 'from-[#1E40AF] to-[#3730A3]',
      metrics: ['13 Slides', 'Interactive', 'PDF Export']
    },
    {
      id: 'executive-summary',
      title: 'Executive Summary',
      description: 'One-page overview for initial investor evaluation and internal distribution',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      href: '/investors/one-pagers',
      status: 'Q4 2024',
      color: 'from-[#7C3AED] to-[#5B21B6]',
      metrics: ['1 Page', 'Printable', 'Executive']
    },
    {
      id: 'financial-model',
      title: 'Financial Model',
      description: 'Detailed 5-year projections, unit economics, scenario analysis, and sensitivity models',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      href: '/investors/financials',
      status: 'Q4 2024',
      color: 'from-[#059669] to-[#047857]',
      metrics: ['5-Year', 'Unit Economics', 'Scenarios']
    },
    {
      id: 'due-diligence',
      title: 'Due Diligence',
      description: 'Legal documentation, intellectual property, regulatory compliance, and corporate structure',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      href: '/investors/legal',
      status: 'Q4 2024',
      color: 'from-[#DC2626] to-[#B91C1C]',
      metrics: ['Legal Docs', 'IP Portfolio', 'Compliance']
    }
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] antialiased overflow-hidden">
      {/* Cinematic Background System */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0B0F1A] via-[#1A1F2E] to-[#0F1419]" />
      <div className="fixed inset-0 bg-gradient-to-tr from-[#1e293b]/30 via-transparent to-[#0f172a]/40" />
      <div className="fixed inset-0 bg-gradient-to-bl from-transparent via-[#1e1b4b]/15 to-[#0f172a]/25" />
      
      {/* Advanced Particle System */}
      <div className="fixed inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E")`,
        backgroundSize: '400px 400px',
        animation: 'drift 120s linear infinite'
      }} />
      
      {/* Dynamic Mouse Light */}
      <div 
        className="fixed inset-0 opacity-[0.15] pointer-events-none transition-all duration-500 ease-out"
        style={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15) 0%, rgba(139, 92, 246, 0.1) 20%, transparent 50%)`
        }}
      />
      
      {/* Premium Geometric Framework */}
      <div className="fixed top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#6366F1]/40 to-transparent" />
      <div className="fixed bottom-0 right-0 w-full h-[2px] bg-gradient-to-l from-transparent via-[#8B5CF6]/40 to-transparent" />
      <div className="fixed top-0 left-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#6366F1]/25 to-transparent" />
      <div className="fixed top-0 right-0 w-[2px] h-full bg-gradient-to-b from-transparent via-[#8B5CF6]/25 to-transparent" />
      
      {/* Floating Orbs */}
      <div className="fixed top-20 left-20 w-96 h-96 bg-[#6366F1]/5 rounded-full blur-[120px] animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="fixed bottom-20 right-20 w-80 h-80 bg-[#8B5CF6]/5 rounded-full blur-[100px] animate-pulse" style={{ animationDuration: '6s', animationDelay: '2s' }} />
      <div className="fixed top-1/2 left-1/3 w-64 h-64 bg-[#A855F7]/3 rounded-full blur-[80px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '4s' }} />
      
      {/* Cinematic Vignette */}
      <div className="fixed inset-0 bg-gradient-radial from-transparent via-transparent to-[#0A0A0A]/60" />
      
      {/* Premium Grid Pattern */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px'
      }} />

      {/* Content */}
      <div className="relative z-10">
        {/* Floating Header */}
        <header className="px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className={`flex items-center justify-between mb-20 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'}`}>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-[#1E40AF] to-[#1E3A8A] rounded-lg flex items-center justify-center shadow-xl">
                    <span className="text-2xl font-black text-white">Z</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#F8FAFC] tracking-tight">ZERKER</h1>
                  <p className="text-sm text-[#94A3B8] font-medium">Enterprise Trust Infrastructure</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-8">
                <div className="relative p-4 bg-gradient-to-br from-[#FFFFFF]/10 to-[#FFFFFF]/5 backdrop-blur-xl border border-[#FFFFFF]/20 rounded-xl">
                  <div className="text-right">
                    <p className="text-sm text-[#6366F1] font-semibold tracking-wide">CONFIDENTIAL</p>
                    <p className="text-xs text-[#94A3B8] mt-1">Authorized Investors Only</p>
                  </div>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full" />
                </div>
              </div>
            </div>

            {/* Cinematic Hero Section */}
            <div className="text-center mb-24 relative">
              {/* Hero Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/5 via-transparent to-[#8B5CF6]/5 rounded-3xl blur-3xl" />
              
              <div className={`relative transition-all duration-1200 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
                <div className="mb-12">
                  <div className="relative">
                    <div className="w-32 h-[4px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-full mx-auto shadow-2xl mb-12 animate-pulse" />
                    <div className="absolute inset-0 w-32 h-[4px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-full mx-auto blur-md opacity-50" />
                  </div>
                </div>
                
                <div className="relative mb-12">
                  <h2 className="text-[clamp(48px,8vw,72px)] font-bold text-[#F8FAFC] leading-none tracking-[-0.03em] mb-4">
                    Investor Relations
                  </h2>
                  <p className="text-[clamp(16px,2vw,20px)] text-[#6366F1] font-medium tracking-wider uppercase">
                    Series Seed • Confidential Materials
                  </p>
                </div>
                
                <div className="relative max-w-4xl mx-auto mb-16">
                  <p className="text-[clamp(18px,2.5vw,24px)] text-[#CBD5E1] leading-relaxed">
                    Comprehensive documentation for our <span className="text-[#F8FAFC] font-semibold">Series Seed funding round</span>. 
                    ZERKER is building the enterprise-grade operating system for digital trust and media verification in the AI era.
                  </p>
                </div>
                
                {/* Enterprise metrics grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                  <div className="text-center p-6 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
                    <div className="text-[clamp(24px,3vw,32px)] font-bold text-[#F8FAFC] mb-2">$2.5M</div>
                    <div className="text-sm text-[#94A3B8] uppercase tracking-wider">Target Raise</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
                    <div className="text-[clamp(24px,3vw,32px)] font-bold text-[#F8FAFC] mb-2">24M</div>
                    <div className="text-sm text-[#94A3B8] uppercase tracking-wider">Month Runway</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
                    <div className="text-[clamp(24px,3vw,32px)] font-bold text-[#F8FAFC] mb-2">$130M+</div>
                    <div className="text-sm text-[#94A3B8] uppercase tracking-wider">ARR Target Y10</div>
                  </div>
                  <div className="text-center p-6 bg-gradient-to-br from-[#FFFFFF]/8 to-[#FFFFFF]/3 backdrop-blur-xl border border-[#FFFFFF]/10 rounded-xl">
                    <div className="text-[clamp(24px,3vw,32px)] font-bold text-[#10B981] mb-2">Active</div>
                    <div className="text-sm text-[#94A3B8] uppercase tracking-wider">Fundraising</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Cinematic Resources Grid */}
        <main className="px-8 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className={`group relative transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${600 + index * 200}ms` }}
                  onMouseEnter={() => setHoveredCard(resource.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Multi-layer glow system */}
                  <div className={`absolute -inset-4 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-20 transition-all duration-1000 rounded-3xl blur-2xl`} />
                  <div className={`absolute -inset-2 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-15 transition-all duration-700 rounded-2xl blur-xl`} />
                  <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} opacity-0 group-hover:opacity-10 transition-all duration-500 rounded-xl blur-lg`} />
                  
                  {/* Main card with glass morphism */}
                  <div className="relative h-full p-10 bg-gradient-to-br from-[#FFFFFF]/[0.15] via-[#FFFFFF]/[0.08] to-[#FFFFFF]/[0.05] backdrop-blur-2xl border border-[#FFFFFF]/20 rounded-2xl group-hover:border-[#6366F1]/50 group-hover:bg-[#FFFFFF]/[0.18] transition-all duration-700 shadow-2xl group-hover:shadow-[0_25px_50px_rgba(99,102,241,0.15)] group-hover:scale-[1.02] transform-gpu perspective-1000">
                    
                    {/* Floating status indicator */}
                    <div className="absolute -top-3 right-8">
                      <div className={`px-4 py-2 rounded-full text-sm font-semibold backdrop-blur-xl border shadow-lg transform group-hover:scale-110 transition-all duration-500 ${
                        resource.status === 'Available' 
                          ? 'bg-gradient-to-r from-[#10B981]/30 to-[#059669]/20 text-[#10B981] border-[#10B981]/30 shadow-[#10B981]/20' 
                          : 'bg-gradient-to-r from-[#F59E0B]/30 to-[#D97706]/20 text-[#F59E0B] border-[#F59E0B]/30 shadow-[#F59E0B]/20'
                      }`}>
                        {resource.status}
                      </div>
                    </div>

                    {/* Professional icon with enterprise styling */}
                    <div className="relative mb-8">
                      <div className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-xl flex items-center justify-center shadow-xl group-hover:scale-110 transition-all duration-500 transform-gpu`}>
                        <div className="text-white group-hover:scale-110 transition-transform duration-500">
                          {resource.icon}
                        </div>
                      </div>
                    </div>

                    {/* Enterprise content structure */}
                    <div className="mb-8">
                      <h3 className="text-[clamp(24px,3vw,28px)] font-bold text-[#F8FAFC] mb-3 group-hover:text-white transition-colors duration-500 leading-tight">
                        {resource.title}
                      </h3>
                      <p className="text-[clamp(14px,1.8vw,16px)] text-[#94A3B8] leading-relaxed group-hover:text-[#CBD5E1] transition-colors duration-500 mb-4">
                        {resource.description}
                      </p>
                      
                      {/* Professional metrics */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {resource.metrics?.map((metric, idx) => (
                          <span key={idx} className="px-3 py-1 bg-[#FFFFFF]/10 text-[#E2E8F0] text-xs font-medium rounded-full border border-[#FFFFFF]/20">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Enterprise action button */}
                    <div className="mt-auto">
                      {resource.status === 'Available' ? (
                        <Link href={resource.href}>
                          <div className="relative group/btn">
                            <div className={`absolute inset-0 bg-gradient-to-r ${resource.color} rounded-lg blur-lg opacity-20 group-hover/btn:opacity-40 transition-opacity duration-500`} />
                            <div className={`relative inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r ${resource.color} text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 shadow-lg`}>
                              <span>Access Materials</span>
                              <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-[#374151] to-[#1F2937] text-[#9CA3AF] font-semibold rounded-lg cursor-not-allowed border border-[#374151]">
                          <span>Available {resource.status}</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Premium top accent with depth */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-b-full opacity-60 group-hover:opacity-100 group-hover:w-32 transition-all duration-700 shadow-lg" />
                    
                    {/* Floating side accents */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-16 bg-gradient-to-b from-transparent via-[#6366F1]/30 to-transparent rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-16 bg-gradient-to-b from-transparent via-[#8B5CF6]/30 to-transparent rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>

            {/* Premium Contact Section */}
            <div className={`mt-32 text-center transition-all duration-1000 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
              <div className="max-w-5xl mx-auto relative">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 via-transparent to-[#8B5CF6]/10 rounded-3xl blur-3xl" />
                
                <div className="relative p-12 bg-gradient-to-br from-[#FFFFFF]/[0.12] via-[#FFFFFF]/[0.08] to-[#FFFFFF]/[0.04] backdrop-blur-2xl border border-[#FFFFFF]/20 rounded-3xl shadow-2xl">
                  {/* Floating top decoration */}
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-32 h-[4px] bg-gradient-to-r from-[#6366F1] via-[#8B5CF6] to-[#A855F7] rounded-full shadow-lg" />
                  
                  <h3 className="text-[clamp(28px,3.5vw,36px)] font-bold text-[#F8FAFC] mb-6 leading-tight">
                    Investor Inquiries
                  </h3>
                  
                  <p className="text-[clamp(16px,2vw,20px)] text-[#94A3B8] mb-12 leading-relaxed max-w-3xl mx-auto">
                    For additional materials, due diligence requests, or to schedule a management presentation, please contact our investor relations team directly.
                  </p>
                  
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                    {/* Professional email button */}
                    <a href="mailto:revaz@zerker.ai" className="group/email relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] rounded-lg blur-lg opacity-30 group-hover/email:opacity-50 transition-opacity duration-500" />
                      <div className="relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#1E40AF] to-[#1E3A8A] text-white font-semibold rounded-lg hover:from-[#1D4ED8] hover:to-[#2563EB] transition-all duration-300 shadow-xl">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span>Contact Investor Relations</span>
                      </div>
                    </a>
                    
                    {/* Professional contact info */}
                    <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/10 to-[#FFFFFF]/5 backdrop-blur-xl border border-[#FFFFFF]/20 rounded-lg shadow-lg">
                      <div className="text-center">
                        <div className="text-[#E2E8F0] font-semibold mb-1">revaz@zerker.ai</div>
                        <div className="text-[#94A3B8] text-sm">Chief Executive Officer</div>
                        <div className="text-[#6366F1] text-xs mt-1">Investor Relations</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating corner decorations */}
                  <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-[#6366F1]/30 rounded-tl-lg" />
                  <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-[#8B5CF6]/30 rounded-tr-lg" />
                  <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-[#8B5CF6]/30 rounded-bl-lg" />
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-[#A855F7]/30 rounded-br-lg" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Custom CSS for advanced animations */}
      <style jsx>{`
        @keyframes drift {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(10px) translateY(-5px) rotate(1deg); }
          50% { transform: translateX(-5px) translateY(10px) rotate(-0.5deg); }
          75% { transform: translateX(-10px) translateY(-10px) rotate(0.5deg); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        
        @keyframes glow {
          0%, 100% { opacity: 0.5; filter: blur(10px); }
          50% { opacity: 1; filter: blur(5px); }
        }
        
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        
        .bg-gradient-radial {
          background: radial-gradient(circle at center, transparent 0%, rgba(10, 10, 10, 0.6) 100%);
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .transform-gpu {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 4s ease-in-out infinite;
        }
        
        /* Enhanced glass morphism */
        .glass-card {
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15) 0%,
            rgba(255, 255, 255, 0.08) 50%,
            rgba(255, 255, 255, 0.05) 100%
          );
          backdrop-filter: blur(20px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          box-shadow: 
            0 25px 50px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
        }
        
        /* Cinematic depth effects */
        .depth-layer-1 { z-index: 10; }
        .depth-layer-2 { z-index: 20; }
        .depth-layer-3 { z-index: 30; }
        
        /* Premium text effects */
        .text-glow {
          text-shadow: 
            0 0 10px rgba(99, 102, 241, 0.3),
            0 0 20px rgba(99, 102, 241, 0.2),
            0 0 40px rgba(99, 102, 241, 0.1);
        }
        
        /* Subtle scroll enhancement */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 15, 15, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #6366F1, #8B5CF6);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #5855EB, #7C3AED);
        }
      `}</style>
    </div>
  );
};

export default InvestorsPortal;