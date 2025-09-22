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
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl blur-lg opacity-50 group-hover:opacity-75 transition-opacity duration-500" />
                  <div className="relative w-16 h-16 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500">
                    <span className="text-3xl font-black text-white">Z</span>
                  </div>
                </div>
                <div>
                  <h1 className="text-3xl font-black text-[#F8FAFC] tracking-tight">ZERKER</h1>
                  <p className="text-sm text-[#6366F1] font-medium tracking-wider uppercase">Investor Portal</p>
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
                
                <div className="relative mb-8">
                  <h2 className="text-[clamp(64px,10vw,96px)] font-black text-transparent bg-gradient-to-br from-[#F8FAFC] via-[#E2E8F0] to-[#CBD5E1] bg-clip-text leading-none tracking-[-0.06em] mb-6 drop-shadow-2xl">
                    Investment Materials
                  </h2>
                  <div className="absolute inset-0 text-[clamp(64px,10vw,96px)] font-black text-[#6366F1]/10 leading-none tracking-[-0.06em] blur-sm">
                    Investment Materials
                  </div>
                </div>
                
                <div className="relative max-w-5xl mx-auto mb-12">
                  <p className="text-[clamp(20px,3vw,28px)] font-light text-[#E2E8F0] leading-relaxed backdrop-blur-sm">
                    Access comprehensive materials for our <span className="text-[#6366F1] font-semibold">$2.5M seed round</span>. <br />
                    Building the <span className="text-transparent bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] bg-clip-text font-semibold">operating system for enterprise trust</span> in the AI era.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
                  <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-br from-[#10B981]/20 to-[#059669]/10 backdrop-blur-xl border border-[#10B981]/30 rounded-full">
                    <div className="w-3 h-3 bg-[#10B981] rounded-full animate-pulse shadow-lg shadow-[#10B981]/50"></div>
                    <span className="text-[#10B981] font-semibold tracking-wide">Seed Stage</span>
                  </div>
                  <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-br from-[#6366F1]/20 to-[#5855EB]/10 backdrop-blur-xl border border-[#6366F1]/30 rounded-full">
                    <div className="w-3 h-3 bg-[#6366F1] rounded-full animate-pulse shadow-lg shadow-[#6366F1]/50"></div>
                    <span className="text-[#6366F1] font-semibold tracking-wide">$2.5M Target</span>
                  </div>
                  <div className="flex items-center space-x-3 px-6 py-3 bg-gradient-to-br from-[#8B5CF6]/20 to-[#7C3AED]/10 backdrop-blur-xl border border-[#8B5CF6]/30 rounded-full">
                    <div className="w-3 h-3 bg-[#8B5CF6] rounded-full animate-pulse shadow-lg shadow-[#8B5CF6]/50"></div>
                    <span className="text-[#8B5CF6] font-semibold tracking-wide">24 Month Runway</span>
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

                    {/* Floating icon with depth */}
                    <div className="relative mb-8">
                      <div className="w-20 h-20 bg-gradient-to-br from-[#FFFFFF]/20 to-[#FFFFFF]/10 backdrop-blur-xl border border-[#FFFFFF]/30 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-700 transform-gpu">
                        <div className="text-5xl group-hover:scale-110 transition-transform duration-500">
                          {resource.icon}
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#6366F1]/10 to-[#8B5CF6]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>
                    </div>

                    {/* Enhanced content */}
                    <div className="mb-8">
                      <h3 className="text-[clamp(28px,3.5vw,36px)] font-black text-transparent bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] bg-clip-text mb-4 group-hover:from-[#FFFFFF] group-hover:to-[#F8FAFC] transition-all duration-500 leading-tight">
                        {resource.title}
                      </h3>
                      <p className="text-[clamp(16px,2vw,20px)] text-[#CBD5E1] leading-relaxed group-hover:text-[#E2E8F0] transition-colors duration-500">
                        {resource.description}
                      </p>
                    </div>

                    {/* Premium action button */}
                    <div className="mt-auto">
                      {resource.status === 'Available' ? (
                        <Link href={resource.href}>
                          <div className="relative group/btn overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-xl blur-lg opacity-50 group-hover/btn:opacity-75 transition-opacity duration-500" />
                            <div className="relative inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] text-white font-bold rounded-xl hover:from-[#5855EB] hover:to-[#7C3AED] transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu">
                              <span className="text-lg">Access Now</span>
                              <svg className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ) : (
                        <div className="inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-[#FFFFFF]/20 to-[#FFFFFF]/10 text-[#94A3B8] font-bold rounded-xl cursor-not-allowed backdrop-blur-xl border border-[#FFFFFF]/20">
                          <span className="text-lg">Coming Soon</span>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  
                  <h3 className="text-[clamp(32px,4vw,48px)] font-black text-transparent bg-gradient-to-br from-[#F8FAFC] to-[#E2E8F0] bg-clip-text mb-6 leading-tight">
                    Questions or Need Additional Materials?
                  </h3>
                  
                  <p className="text-[clamp(18px,2.5vw,24px)] text-[#CBD5E1] mb-12 leading-relaxed max-w-3xl mx-auto">
                    Connect directly with our founding team for detailed discussions and comprehensive due diligence materials.
                  </p>
                  
                  <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
                    {/* Enhanced email button */}
                    <a href="mailto:revaz@zerker.ai" className="group/email relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] rounded-xl blur-lg opacity-50 group-hover/email:opacity-75 transition-opacity duration-500" />
                      <div className="relative inline-flex items-center space-x-4 px-10 py-5 bg-gradient-to-r from-[#8B5CF6] to-[#A855F7] text-white font-bold rounded-xl hover:from-[#7C3AED] hover:to-[#9333EA] transition-all duration-500 shadow-xl hover:shadow-2xl hover:scale-105 transform-gpu">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M3 8l7.89 3.26a2 2 0 001.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-xl">Email Our Team</span>
                        <svg className="w-5 h-5 group-hover/email:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </a>
                    
                    {/* Enhanced contact info */}
                    <div className="relative p-6 bg-gradient-to-br from-[#FFFFFF]/15 to-[#FFFFFF]/5 backdrop-blur-xl border border-[#FFFFFF]/20 rounded-xl shadow-lg">
                      <div className="text-[#94A3B8] text-lg font-medium">
                        <div className="text-[#E2E8F0] font-bold mb-1">revaz@zerker.ai</div>
                        <div className="text-[#6366F1] text-sm">CEO & Co-Founder</div>
                      </div>
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-[2px] bg-gradient-to-r from-[#6366F1] to-[#8B5CF6] rounded-b-full" />
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