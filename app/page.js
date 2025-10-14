'use client';
// Platinum Design v2 - Force Refresh
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const InvestorsPortal = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  // All hooks must be called before any conditional returns
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  // Show loading while checking authentication
  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#3B82F6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#9CA3AF]">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!session) {
    return null;
  }

  // Role-based resource filtering
  const getFilteredResources = (userRole) => {
    const allResources = [
      {
        id: 'pitch-deck',
        title: 'Pre-Seed Deck',
        description: 'Access the latest investor materials, including our pre-seed deck, financial reports, and company updates.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
        ),
        href: '/docs/zerker-pre-seed-deck-october-2025.pdf',
        status: 'Available',
        color: 'from-[#60A5FA]/20 via-[#3B82F6]/10 to-transparent',
        metrics: ['7 Slides', 'Clean Design', 'Investor Ready'],
        isExternal: true,
        requiredRoles: ['PROSPECT_INVESTOR', 'CURRENT_INVESTOR', 'BOARD_MEMBER', 'PARTNER', 'ADMIN'] // All can see
      },
      {
        id: 'executive-summary',
        title: 'Investment Memo',
        description: 'Investment memo with company overview, team, market opportunity, and funding requirements',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        ),
        href: '/one-pagers',
        status: 'Available',
        color: 'from-[#A78BFA]/20 via-[#8B5CF6]/10 to-transparent',
        metrics: ['Key Metrics', 'Investment Thesis', 'Market Opportunity'],
        requiredRoles: ['PROSPECT_INVESTOR', 'CURRENT_INVESTOR', 'BOARD_MEMBER', 'PARTNER', 'ADMIN'] // All can see
      },
      {
        id: 'financial-model',
        title: 'Financial Model',
        description: '5 & 10 year projections with Excel model download and interactive view',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        ),
        href: '/financials',
        status: 'Available',
        color: 'from-[#34D399]/20 via-[#10B981]/10 to-transparent',
        metrics: ['Excel Download', 'Interactive View', '5 & 10 Year'],
        requiredRoles: ['BOARD_MEMBER', 'ADMIN'] // Board members and admins only
      },
      {
        id: 'cnn-ui-demo',
        title: 'CNN Initiative',
        description: 'Interactive CNN newsroom UI prototype powered by Zerker. Demo + one-pager inside.',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <rect x="3" y="5" width="18" height="14" rx="2" ry="2" strokeWidth="1.5" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 10l5 3-5 3V10z" />
          </svg>
        ),
        href: '/cnn',
        status: 'Available',
        color: 'from-[#F87171]/20 via-[#EF4444]/10 to-transparent',
        metrics: ['Newsroom UI', 'Workflow Prototype', 'Interactive'],
        isExternal: false,
        requiredRoles: ['PROSPECT_INVESTOR', 'CURRENT_INVESTOR', 'BOARD_MEMBER', 'PARTNER', 'ADMIN']
      },
      {
        id: 'demo',
        title: 'Live Product Demo',
        description: 'Interactive demonstration of ZERKER\'s multi-modal detection platform and API capabilities',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M19 10a9 9 0 11-18 0 9 9 0 0118 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 17h5l-5 5v-5z" />
          </svg>
        ),
        href: 'https://app.zerker.ai/',
        status: 'Available',
        color: 'from-[#22D3EE]/20 via-[#06B6D4]/10 to-transparent',
        metrics: ['Live Detection', 'API Testing', 'Interactive Demo'],
        isExternal: true,
        requiredRoles: ['PROSPECT_INVESTOR', 'CURRENT_INVESTOR', 'BOARD_MEMBER', 'PARTNER', 'ADMIN'] // All can see
      },
      {
        id: 'due-diligence',
        title: 'Corporate Documents',
        description: 'Legal documentation, intellectual property, regulatory compliance, and corporate structure',
        icon: (
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        ),
        href: 'https://drive.google.com/drive/folders/13HuoEWmc3JWDvmReSNFhkQGYQe5T9kfE?usp=drive_link',
        status: 'Available',
        color: 'from-[#FBBF24]/20 via-[#F59E0B]/10 to-transparent',
        metrics: ['Legal Documents', 'IP Portfolio', 'Compliance'],
        isExternal: true,
        requiredRoles: ['CURRENT_INVESTOR', 'BOARD_MEMBER', 'PARTNER', 'ADMIN'] // No due diligence for prospects
      }
    ];

    return allResources.filter(resource => 
      resource.requiredRoles.includes(userRole)
    );
  };

  const resources = getFilteredResources(session?.user?.role || 'PROSPECT_INVESTOR');

  // Debug: Log user info
  console.log('Current session:', session);
  console.log('User role:', session?.user?.role);
  console.log('Filtered resources:', resources.length);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white font-['Inter'] antialiased overflow-hidden">
      {/* Platinum Enterprise Background System */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F0F0F] via-[#1A1A1A] to-[#0A0A0A]" />
      <div className="fixed inset-0 bg-gradient-to-tr from-[#374151]/20 via-transparent to-[#1F2937]/30" />
      <div className="fixed inset-0 bg-gradient-to-bl from-transparent via-[#4B5563]/10 to-[#1F2937]/20" />
      
      {/* Simple static grid - optimized for smooth scrolling */}
      <div className="fixed inset-0 opacity-[0.02]" style={{
        backgroundImage: `
          linear-gradient(rgba(209, 213, 219, 0.5) 1px, transparent 1px),
          linear-gradient(90deg, rgba(209, 213, 219, 0.5) 1px, transparent 1px)
        `,
        backgroundSize: '80px 80px'
      }} />

      {/* Sleek Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 px-8 py-3 glass border-b border-white/5 bg-red-500">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-white/5 to-transparent rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative">
                  <h1 className="text-2xl font-black text-white tracking-tight">ZERKER</h1>
                  <p className="text-[10px] text-gray-500 font-medium tracking-[0.2em] uppercase">Investor Portal</p>
                </div>
              </div>
              
              {/* User Menu */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm text-gray-300 font-medium">{session.user?.name}</p>
                    {session.user?.role === 'ADMIN' ? (
                      <Link href="/admin" className="text-xs text-gray-500 capitalize hover:text-gray-300 transition-colors duration-200 cursor-pointer">
                        {session.user?.role?.replace('_', ' ').toLowerCase() || 'User'}
                      </Link>
                    ) : (
                      <p className="text-xs text-gray-500 capitalize">{session.user?.role?.replace('_', ' ').toLowerCase() || 'User'}</p>
                    )}
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                    className="px-4 py-2 text-gray-300 hover:text-white text-sm font-medium transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          </div>
      </header>
      
      {/* Content */}
      <div className="relative z-10 pt-32">
        {/* Main Content */}
        <main className="px-8 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Cinematic Hero Section */}
            <div className="text-center mb-12 relative">
              {/* Platinum Hero Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#F3F4F6]/3 via-transparent to-[#E5E7EB]/3 rounded-3xl blur-3xl" />
              
              <div className="relative">
                <div className="mb-4">
                  <div className="w-20 h-[2px] bg-gradient-to-r from-[#D1D5DB] via-[#F3F4F6] to-[#E5E7EB] rounded-full mx-auto shadow-xl mb-4" />
                </div>
                
                <div className="relative mb-6">
                  <h2 className="text-[clamp(32px,6vw,48px)] font-bold text-[#F8FAFC] leading-none tracking-[-0.03em] mb-3">
                    ZERKER
                  </h2>
                  <p className="text-[clamp(14px,1.8vw,16px)] text-[#D1D5DB] font-medium tracking-wider uppercase">
                    Access pre-seed investment materials, financial data, and partnership information.
                  </p>
                </div>
                
                
              </div>
            </div>

            {/* Cinematic Resources Grid */}
            <div className="pb-24">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {resources.map((resource, index) => (
                <div
                  key={resource.id}
                  className="group relative"
                >
                  {/* Enterprise neon glow overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${resource.color} rounded-xl pointer-events-none`} />
                  <div className={`absolute inset-0 bg-gradient-to-tl ${resource.color} rounded-xl pointer-events-none`} />
                  
                  {/* Clean OS-style card */}
                  <div className="relative h-full p-6 bg-[#0F0F0F]/90 border border-white/10 rounded-xl hover:border-white/20 transition-all duration-150 shadow-lg hover:shadow-2xl">
                    

                    {/* Icon - subtle enterprise style */}
                    <div className="relative mb-5">
                      <div className="w-12 h-12 bg-white/5 border border-white/10 rounded-lg flex items-center justify-center shadow-lg">
                        <div className="text-[#9CA3AF] scale-90">
                          {resource.icon}
                        </div>
                      </div>
                    </div>

                    {/* Compact content - OS style */}
                    <div className="mb-5 min-h-[90px]">
                      <h3 className="text-[22px] font-bold text-[#F8FAFC] mb-2 leading-tight">
                        {resource.title}
                      </h3>
                      <p className="text-[14px] text-[#9CA3AF] leading-snug line-clamp-2">
                        {resource.description}
                      </p>
                    </div>

                    {/* Fast OS-style action button */}
                    <div className="mt-auto">
                      {resource.status === 'Available' ? (
                        resource.hasDualOptions ? (
                          <div className="space-y-2">
                            <Link href={resource.href}>
                              <div className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r ${resource.color} text-white text-sm font-semibold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-md hover:shadow-lg`}>
                                <span>View Online</span>
                                <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </div>
                            </Link>
                            <a href={resource.pdfHref} target="_blank" rel="noopener noreferrer">
                              <div className="inline-flex items-center justify-center w-full px-4 py-2 bg-white/5 border border-white/10 text-white text-xs font-medium rounded-lg hover:bg-white/10 transition-all duration-150">
                                <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                                Download PDF
                              </div>
                            </a>
                          </div>
                        ) : resource.isExternal ? (
                          <a href={resource.href} target="_blank" rel="noopener noreferrer">
                            <div className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r ${resource.color} text-white text-sm font-semibold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-md hover:shadow-lg`}>
                              <span>{resource.id === 'due-diligence' ? 'Request Access' : 'Open'}</span>
                              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                              </svg>
                            </div>
                          </a>
                        ) : (
                          <Link href={resource.href}>
                            <div className={`inline-flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r ${resource.color} text-white text-sm font-semibold rounded-lg hover:scale-[1.02] active:scale-[0.98] transition-all duration-150 shadow-md hover:shadow-lg`}>
                              <span>View</span>
                              <svg className="w-3.5 h-3.5 ml-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </Link>
                        )
                      ) : (
                        <div className="inline-flex items-center justify-center w-full px-6 py-4 bg-gradient-to-r from-[#374151] to-[#1F2937] text-[#9CA3AF] font-semibold rounded-lg cursor-not-allowed border border-[#374151]">
                          <span>Available {resource.status}</span>
                          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                      )}

                      {resource.id === 'cnn-ui-demo' && resource.pdfHref && (
                        <div className="mt-3 text-center">
                          <a href={resource.pdfHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm text-gray-300 hover:text-white transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                            </svg>
                            View CNN × ZERKER Phase I (PDF)
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Platinum top accent with depth */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[3px] bg-gradient-to-r from-[#D1D5DB] via-[#F3F4F6] to-[#E5E7EB] rounded-b-full opacity-60 group-hover:opacity-100 group-hover:w-32 transition-all duration-700 shadow-lg" />
                    
                    {/* Platinum Floating side accents */}
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-16 bg-gradient-to-b from-transparent via-[#D1D5DB]/30 to-transparent rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[3px] h-16 bg-gradient-to-b from-transparent via-[#E5E7EB]/30 to-transparent rounded-l-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </div>
              ))}
            </div>

              {/* Premium Contact Section */}
              <div className="mt-32 text-center">
              <div className="max-w-5xl mx-auto relative">
                {/* Enterprise neon glow overlay - subtle blue */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#60A5FA]/20 via-[#3B82F6]/10 to-transparent rounded-2xl pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-tl from-[#60A5FA]/20 via-[#3B82F6]/10 to-transparent rounded-2xl pointer-events-none" />
                
                <div className="relative p-12 bg-[#0F0F0F]/90 border border-white/10 rounded-2xl shadow-2xl hover:border-white/20 transition-all duration-150">
                  
                  <h3 className="text-[clamp(28px,3.5vw,36px)] font-bold text-[#F8FAFC] mb-6 leading-tight">
                    Schedule a Meeting
                  </h3>
                  
                  <p className="text-[clamp(16px,2vw,20px)] text-[#94A3B8] mb-12 leading-relaxed max-w-3xl mx-auto">
                    Ready to discuss ZERKER's synthetic media detection platform? Schedule a 30-minute meeting with our CEO to explore partnership opportunities and see our technology in action.
                  </p>
                  
                  <div className="flex flex-col items-center justify-center gap-8">
                    {/* Sleek Schedule Meeting button */}
                    <a href="https://calendly.com/revaz-ts/30min?month=2025-09" target="_blank" rel="noopener noreferrer">
                      <div className="inline-flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-[#60A5FA]/20 via-[#3B82F6]/10 to-transparent text-white font-semibold rounded-lg hover:from-[#60A5FA]/30 hover:via-[#3B82F6]/15 border border-white/10 hover:border-white/20 transition-all duration-150 shadow-lg hover:shadow-xl text-base">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <span>Schedule a Meeting</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>
                    </a>
                    
                    {/* Contact Information */}
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      <div className="relative">
                        {/* Subtle neon glow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#A78BFA]/20 via-[#8B5CF6]/10 to-transparent rounded-lg pointer-events-none" />
                        <div className="absolute inset-0 bg-gradient-to-tl from-[#A78BFA]/20 via-[#8B5CF6]/10 to-transparent rounded-lg pointer-events-none" />
                        
                        <div className="relative p-6 bg-[#0F0F0F]/90 border border-white/10 rounded-lg shadow-lg">
                          <div className="text-center">
                            <div className="text-[#F3F4F6] font-bold mb-1">Revaz Tsivtsivadze</div>
                            <div className="text-[#9CA3AF] text-sm font-medium">Chief Executive Officer</div>
                            <div className="text-[#D1D5DB] text-xs mt-1 font-semibold">revaz@zerker.ai</div>
                          </div>
                        </div>
                      </div>
                      
                    </div>
                  </div>

                </div>
              </div>
            </div>
            </div>
            
            {/* Footer */}
            <footer className="mt-32 py-12 border-t border-white/5">
              <div className="max-w-7xl mx-auto px-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">ZERKER</h3>
                    <p className="text-sm text-gray-400">The Media Verification Operating System</p>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-sm text-gray-400">© 2025 ZERKER. All rights reserved.</p>
                    <p className="text-xs text-gray-500 mt-1">Investor Documentation Portal</p>
                  </div>
                </div>
              </div>
            </footer>
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
        
        /* Platinum Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: rgba(15, 15, 15, 0.5);
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #D1D5DB, #9CA3AF);
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #E5E7EB, #D1D5DB);
        }
      `}</style>
    </div>
  );
};

export default InvestorsPortal;