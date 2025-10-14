'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Link from 'next/link';
import { BackgroundEffects } from '../../components/BackgroundEffects';

const deckContent = [
  {
    type: "title",
    title: "ZERKER",
    subtitle: "OS + infrastructure for enterprises to verify media and rebuild trust in the AI Era."
  },
  {
    type: "catalyst",
    title: "The Catalyst",
    headline: "The Enterprise Approach to Media is Obsolete.",
    description: "Generative AI has turned media verification from a niche feature into a mission-critical, enterprise-wide problem."
  },
  {
    type: "pain",
    title: "The Pain",
    points: [
      {
        title: "Slow, Unscalable Manual Reviews",
        description: "Current enterprise media verification relies on human reviewers and manual processes that cannot keep pace with AI-generated content at scale."
      },
      {
        title: "Lack of Actionable Explainability",
        description: "Black-box detection tools provide scores without the forensic-grade evidence enterprises need to make confident decisions."
      },
      {
        title: "High Risk of Reputational & Financial Damage",
        description: "Organizations face exposure to misinformation campaigns and synthetic media attacks that can cause immediate brand and financial harm."
      }
    ]
  },
  {
    type: "paradigm",
    title: "The New Paradigm",
    old: [
      "Manual verification workflows",
      "Single-point detection tools",
      "Black-box scoring systems",
      "Reactive security posture"
    ],
    new: [
      "Automated agentic workflows",
      "Comprehensive OS ecosystem",
      "Forensic-grade explainability",
      "Proactive trust infrastructure"
    ]
  },
  {
    type: "os_features",
    title: "The ZERKER Operating System",
    subtitle: "Enterprise-grade infrastructure for media trust at scale",
    features: [
      {
        name: "Open Ecosystem",
        description: "Access elite, pre-vetted detector developers and research labs through our unified platform."
      },
      {
        name: "Agentic Workflows",
        description: "Automate complex, multi-stage verification tasks with intelligent routing and decision-making."
      },
      {
        name: "Radical Explainability",
        description: "Pixel-level forensic analysis with audit trails that provide actionable evidence for business decisions."
      }
    ]
  },
  {
    type: "validation",
    title: "Market Validation",
    points: [
      {
        title: "CNN Partnership",
        description: "Exclusive collaboration to power CNN's next-generation media verification infrastructure with our DARPA-proven technology."
      },
      {
        title: "$300K Commercial Pipeline",
        description: "Secured pilot agreements with major media and entertainment clients, demonstrating strong product-market fit."
      },
      {
        title: "Government Endorsement",
        description: "DARPA SemaFor program validation establishes our technology as the gold standard for media forensics."
      }
    ]
  },
  {
    type: "moat",
    title: "Our Moat",
    subtitle: "An insurmountable advantage built on three pillars",
    advantages: [
      {
        title: "Government Pedigree",
        description: "Forged in DARPA's elite SemaFor program with exclusive access to classified threat intelligence and cutting-edge research."
      },
      {
        title: "Proprietary Data",
        description: "Exclusive partnership with CNN provides 2M+ hours of pristine, professionally annotated media datasets."
      },
      {
        title: "Elite Ecosystem",
        description: "Pre-vetted partnerships with Purdue, STR, and other world-class detector developers ready for day-one integration."
      }
    ]
  },
  {
    type: "business_model",
    title: "Revenue Model",
    model: [
      {
        title: "Enterprise SaaS",
        description: "Annual subscriptions with usage-based pricing for API calls and compute resources."
      },
      {
        title: "Professional Services",
        description: "Custom integration, training, and forensic consulting for enterprise deployments."
      },
      {
        title: "Marketplace Revenue",
        description: "Transaction fees from detector ecosystem and data partnerships within the platform."
      }
    ]
  },
  {
    type: "market_size",
    title: "Market Opportunity",
    headline: "$1.2M ARR opportunity in enterprise media verification",
    description: "Clear path to $1.2M ARR milestone by capturing enterprise demand for authenticated media infrastructure."
  },
  {
    type: "vision",
    title: "Our Vision",
    content: [
      "We are building the foundational operating system for enterprise trust in the age of AI.",
      "ZERKER will become the standard infrastructure that powers media authenticity across every major enterprise, government agency, and media organization globally."
    ]
  },
  {
    type: "team",
    title: "The Team",
    headline: "World-class team with unassailable domain expertise",
    achievements: [
      "Built and scaled Shutterstock's API and Computer Vision teams to serve billions of media requests.",
      "Core architects of the U.S. government's DARPA SemaFor media forensics program.",
      "Secured exclusive partnership with SRI International to commercialize breakthrough detection technology."
    ],
    members: "Revaz Tsivtsivadze (CEO), Disha Jain (CTO), Jacob Torres (Head of Research)"
  },
  {
    type: "ask",
    title: "The Ask",
    headline: "Raising $2M Pre-Seed to accelerate enterprise adoption",
    description: "Capital will fund conversion of design partners into $300K ARR commercial pilots, scaling to $1.2M ARR for Series A readiness."
  }
];

const PremiumDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);

  console.log('PremiumDeck render - currentSlide:', currentSlide);

  // Navigation functions
  const nextSlide = useCallback(() => {
    console.log('nextSlide called');
    setCurrentSlide((prev) => {
      const next = (prev + 1) % deckContent.length;
      console.log('Moving from slide', prev, 'to', next);
      return next;
    });
  }, [deckContent.length]);

  const prevSlide = useCallback(() => {
    console.log('prevSlide called');
    setCurrentSlide((prev) => {
      const previous = (prev - 1 + deckContent.length) % deckContent.length;
      console.log('Moving from slide', prev, 'to', previous);
      return previous;
    });
  }, [deckContent.length]);

  const goToSlide = useCallback((index) => {
    console.log('goToSlide called with index:', index);
    setCurrentSlide(index);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      console.log('Key pressed:', e.key);
      // Allow navigation with arrow keys and spacebar
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prevSlide();
      }
    };

    // Add event listener to document to ensure it captures all keystrokes
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [nextSlide, prevSlide]);

  // PDF Export Function
  const exportToPDF = async () => {
    setIsGeneratingPDF(true);
    const date = new Date().toISOString().split('T')[0];
    
    try {
      const pdf = new jsPDF('l', 'pt', [1920, 1080]);
      
      for (let i = 0; i < deckContent.length; i++) {
        // Temporarily navigate to the slide for better capture
        setCurrentSlide(i);
        
        // Wait a moment for the slide to fully render
        await new Promise(resolve => setTimeout(resolve, 500));
        
        const slideElement = document.getElementById(`slide-${i}`);
        if (slideElement) {
          const canvas = await html2canvas(slideElement, {
            width: 1920,
            height: 1080,
            scale: 1.5,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#0a0e27',
            ignoreElements: (element) => {
              // Skip animated elements that might cause issues
              return element.tagName === 'ANIMATE' || 
                     element.classList?.contains('animate') ||
                     element.style?.animation;
            },
            onclone: (clonedDoc) => {
              // Ensure fonts and styles are properly applied
              const clonedElement = clonedDoc.getElementById(`slide-${i}`);
              if (clonedElement) {
                clonedElement.style.fontFamily = '-apple-system, BlinkMacSystemFont, sans-serif';
                clonedElement.style.color = '#ffffff';
                
                // Ensure all text is visible
                const textElements = clonedElement.querySelectorAll('*');
                textElements.forEach(el => {
                  if (el.style.color === 'transparent' || el.style.opacity === '0') {
                    el.style.color = '#ffffff';
                    el.style.opacity = '1';
                  }
                });
              }
            }
          });
          
          const imgData = canvas.toDataURL('image/png', 1.0);
          
          if (i > 0) pdf.addPage();
          pdf.addImage(imgData, 'PNG', 0, 0, 1920, 1080);
        }
      }
      
      pdf.save(`ZERKER-Executive-Presentation-${date}.pdf`);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('PDF generation failed. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const slideStyles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e27 0%, #151a36 25%, #0f1628 50%, #151a36 75%, #0a0e27 100%)',
      color: '#ffffff',
      overflow: 'hidden',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      position: 'relative',
      letterSpacing: '-0.02em'
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      background: 'rgba(10, 14, 39, 0.7)',
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '16px 32px'
    },
    backLink: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      color: '#94a3b8',
      textDecoration: 'none',
      fontWeight: '500',
      fontSize: '14px',
      transition: 'all 0.3s ease'
    },
    headerRight: {
      display: 'flex',
      alignItems: 'center',
      gap: '24px'
    },
    counter: {
      fontSize: '14px',
      color: '#64748b',
      fontWeight: '500'
    },
    pdfButton: {
      padding: '10px 20px',
      background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
      color: '#ffffff',
      border: 'none',
      borderRadius: '8px',
      fontWeight: '600',
      cursor: 'pointer',
      fontSize: '14px',
      transition: 'all 0.3s ease',
      boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
    },
    slideContainer: {
      paddingTop: '80px',
      height: '100vh',
      position: 'relative'
    },
    slide: {
      position: 'absolute',
      top: '80px',
      left: 0,
      right: 0,
      bottom: 0,
      padding: '60px',
      transition: 'all 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center'
    },
    dots: {
      position: 'fixed',
      bottom: '40px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 50,
      display: 'flex',
      gap: '12px',
      padding: '12px 24px',
      background: 'rgba(10, 14, 39, 0.6)',
      backdropFilter: 'blur(10px)',
      borderRadius: '50px',
      border: '1px solid rgba(255, 255, 255, 0.08)'
    },
    dot: {
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.4s ease',
      background: 'rgba(255, 255, 255, 0.2)'
    },
    navButton: {
      position: 'fixed',
      top: '50%',
      transform: 'translateY(-50%)',
      zIndex: 50,
      width: '56px',
      height: '56px',
      backgroundColor: 'rgba(10, 14, 39, 0.6)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      borderRadius: '50%',
      color: '#ffffff',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '20px',
      fontWeight: '300',
      transition: 'all 0.3s ease'
    }
  };

  return (
    <div 
      style={slideStyles.container} 
      data-deck-container 
      tabIndex={-1}
    >
      {/* Premium Background */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.15) 0%, transparent 50%)',
        zIndex: 0
      }} />
      <div style={{ 
        opacity: 0.03, 
        position: 'absolute', 
        inset: 0,
        zIndex: 1
      }}>
        <BackgroundEffects variant="hero" intensity="low" />
      </div>
      
      {/* Navigation Header */}
      <div style={slideStyles.header}>
        <div style={slideStyles.headerContent}>
          <Link href="/" style={slideStyles.backLink}>
            <span style={{ fontSize: '18px' }}>←</span>
            <span>Back to Portal</span>
          </Link>
          
          <div style={slideStyles.headerRight}>
            <div style={slideStyles.counter}>
              Slide {currentSlide + 1} of {deckContent.length}
            </div>
            <button
              onClick={exportToPDF}
              disabled={isGeneratingPDF}
              style={{
                ...slideStyles.pdfButton,
                opacity: isGeneratingPDF ? 0.6 : 1,
                cursor: isGeneratingPDF ? 'not-allowed' : 'pointer'
              }}
              onMouseOver={(e) => {
                if (!isGeneratingPDF) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(59, 130, 246, 0.4)';
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(59, 130, 246, 0.3)';
              }}
            >
              {isGeneratingPDF ? 'Generating...' : 'Export PDF'}
            </button>
          </div>
        </div>
      </div>

      {/* Slide Navigation Dots */}
      <div style={slideStyles.dots}>
        {deckContent.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            style={{
              ...slideStyles.dot,
              backgroundColor: index === currentSlide ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
              width: index === currentSlide ? '24px' : '8px',
              borderRadius: index === currentSlide ? '12px' : '50%'
            }}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        style={{
          ...slideStyles.navButton,
          left: '48px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.backgroundColor = 'rgba(10, 14, 39, 0.8)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.backgroundColor = 'rgba(10, 14, 39, 0.6)';
        }}
      >
        ←
      </button>
      
      <button
        onClick={nextSlide}
        style={{
          ...slideStyles.navButton,
          right: '48px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
          e.currentTarget.style.backgroundColor = 'rgba(10, 14, 39, 0.8)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
          e.currentTarget.style.backgroundColor = 'rgba(10, 14, 39, 0.6)';
        }}
      >
        →
      </button>

      {/* Slide Container */}
      <div style={slideStyles.slideContainer}>
        {deckContent.map((slide, index) => (
          <div
            key={index}
            id={`slide-${index}`}
            style={{
              ...slideStyles.slide,
              opacity: index === currentSlide ? 1 : 0,
              transform: index === currentSlide 
                ? 'translateX(0) scale(1)' 
                : index < currentSlide 
                ? 'translateX(-50%) scale(0.9)' 
                : 'translateX(50%) scale(0.9)',
              pointerEvents: index === currentSlide ? 'auto' : 'none',
              zIndex: index === currentSlide ? 10 : 0
            }}
          >
            <SlideRenderer slide={slide} slideIndex={index} />
          </div>
        ))}
      </div>
    </div>
  );
};

const SlideRenderer = ({ slide, slideIndex }) => {
  const premiumCardStyle = {
    padding: '40px',
    background: 'rgba(255, 255, 255, 0.02)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    borderRadius: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
    WebkitBackdropFilter: 'blur(20px)'
  };

  const slideContentStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '40px',
    position: 'relative',
    zIndex: 10
  };

  switch (slide.type) {
    case 'title':
      return (
        <div style={{ ...slideContentStyles, alignItems: 'center', textAlign: 'center' }}>
          <div style={{ 
            width: '120px', 
            height: '4px', 
            background: 'linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #3b82f6 100%)', 
            borderRadius: '4px', 
            margin: '0 auto 48px',
            opacity: 0.8
          }} />
          <h1 style={{ 
            fontSize: '96px', 
            fontWeight: '900', 
            lineHeight: '0.9',
            marginBottom: '32px',
            letterSpacing: '-0.04em',
            background: 'linear-gradient(135deg, #ffffff 0%, #94a3b8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 24px rgba(255, 255, 255, 0.1)'
          }}>
            {slide.title}
          </h1>
          <h2 style={{ 
            fontSize: '28px', 
            fontWeight: '300', 
            color: '#94a3b8', 
            lineHeight: '1.4',
            maxWidth: '800px',
            letterSpacing: '-0.01em'
          }}>
            {slide.subtitle}
          </h2>
        </div>
      );

    case 'catalyst':
      return (
        <div style={{ ...slideContentStyles, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={premiumCardStyle}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              marginBottom: '32px',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              {slide.title}
            </h1>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: '600', 
              color: '#ef4444', 
              marginBottom: '32px', 
              lineHeight: '1.2',
              letterSpacing: '-0.02em'
            }}>
              {slide.headline}
            </h2>
            <p style={{ 
              fontSize: '22px', 
              color: '#cbd5e1', 
              lineHeight: '1.6', 
              maxWidth: '800px',
              fontWeight: '300'
            }}>
              {slide.description}
            </p>
          </div>
        </div>
      );

    case 'pain':
      return (
        <div style={slideContentStyles}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '48px',
            letterSpacing: '-0.03em',
            color: '#ffffff'
          }}>
            {slide.title}
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {slide.points.map((point, index) => (
              <div key={index} style={{
                ...premiumCardStyle,
                borderColor: 'rgba(239, 68, 68, 0.2)',
                background: 'rgba(239, 68, 68, 0.03)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(239, 68, 68, 0.2)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#ef4444', 
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  {point.title}
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#e2e8f0', 
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  {point.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'paradigm':
      return (
        <div style={slideContentStyles}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '48px',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            {slide.title}
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            <div style={{
              ...premiumCardStyle,
              borderColor: 'rgba(239, 68, 68, 0.3)',
              background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.05) 0%, rgba(239, 68, 68, 0.02) 100%)'
            }}>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#ef4444', 
                marginBottom: '32px',
                letterSpacing: '-0.02em'
              }}>
                OLD
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {slide.old.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#ef4444', fontSize: '20px', fontWeight: '600' }}>✗</span>
                    <p style={{ 
                      fontSize: '18px', 
                      color: '#e2e8f0', 
                      lineHeight: '1.5',
                      opacity: 0.7
                    }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{
              ...premiumCardStyle,
              borderColor: 'rgba(34, 197, 94, 0.3)',
              background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, rgba(34, 197, 94, 0.02) 100%)'
            }}>
              <h3 style={{ 
                fontSize: '32px', 
                fontWeight: '700', 
                color: '#22c55e', 
                marginBottom: '32px',
                letterSpacing: '-0.02em'
              }}>
                NEW
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {slide.new.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ color: '#22c55e', fontSize: '20px', fontWeight: '600' }}>✓</span>
                    <p style={{ 
                      fontSize: '18px', 
                      color: '#e2e8f0', 
                      lineHeight: '1.5'
                    }}>
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      );

    case 'os_features':
      return (
        <div style={slideContentStyles}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              {slide.title}
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#94a3b8', 
              fontWeight: '300'
            }}>
              {slide.subtitle}
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {slide.features.map((feature, index) => (
              <div key={index} style={{
                ...premiumCardStyle,
                borderColor: 'rgba(59, 130, 246, 0.2)',
                background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(59, 130, 246, 0.3)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
                e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.2)';
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#3b82f6', 
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  {feature.name}
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#e2e8f0', 
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'validation':
      return (
        <div style={slideContentStyles}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '48px',
            letterSpacing: '-0.03em',
            color: '#ffffff'
          }}>
            {slide.title}
          </h1>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {slide.points.map((point, index) => (
              <div key={index} style={{
                ...premiumCardStyle,
                borderColor: 'rgba(34, 197, 94, 0.2)',
                background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.05) 0%, transparent 100%)',
                display: 'flex',
                alignItems: 'center',
                gap: '32px'
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(34, 197, 94, 0.1)',
                  border: '1px solid rgba(34, 197, 94, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  color: '#22c55e',
                  flexShrink: 0
                }}>
                  ✓
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '24px', 
                    fontWeight: '700', 
                    color: '#22c55e', 
                    marginBottom: '8px',
                    letterSpacing: '-0.02em'
                  }}>
                    {point.title}
                  </h3>
                  <p style={{ 
                    fontSize: '16px', 
                    color: '#e2e8f0', 
                    lineHeight: '1.6',
                    opacity: 0.8
                  }}>
                    {point.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'moat':
      return (
        <div style={slideContentStyles}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              {slide.title}
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#94a3b8',
              fontWeight: '300'
            }}>
              {slide.subtitle}
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {slide.advantages.map((advantage, index) => (
              <div key={index} style={{
                ...premiumCardStyle,
                borderColor: 'rgba(139, 92, 246, 0.2)',
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.05) 0%, rgba(99, 102, 241, 0.02) 100%)',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 16px 48px rgba(139, 92, 246, 0.3)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
              }}>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#8b5cf6', 
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  {advantage.title}
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#e2e8f0', 
                  lineHeight: '1.6',
                  opacity: 0.8
                }}>
                  {advantage.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'business_model':
      return (
        <div style={slideContentStyles}>
          <h1 style={{ 
            fontSize: '48px', 
            fontWeight: '800', 
            marginBottom: '48px',
            letterSpacing: '-0.03em',
            textAlign: 'center',
            color: '#ffffff'
          }}>
            {slide.title}
          </h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            {slide.model.map((item, index) => (
              <div key={index} style={{
                ...premiumCardStyle,
                borderColor: 'rgba(34, 197, 94, 0.2)',
                background: 'rgba(34, 197, 94, 0.02)',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.4)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(34, 197, 94, 0.2)';
              }}>
                <div style={{
                  fontSize: '48px',
                  marginBottom: '24px',
                  opacity: 0.8
                }}>
                  {index === 0 ? '💰' : index === 1 ? '🛠️' : '🏪'}
                </div>
                <h3 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  color: '#ffffff', 
                  marginBottom: '16px',
                  letterSpacing: '-0.02em'
                }}>
                  {item.title}
                </h3>
                <p style={{ 
                  fontSize: '16px', 
                  color: '#cbd5e1', 
                  lineHeight: '1.6'
                }}>
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      );

    case 'market_size':
      return (
        <div style={{ ...slideContentStyles, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{
            ...premiumCardStyle,
            maxWidth: '800px',
            padding: '60px',
            background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, rgba(59, 130, 246, 0.02) 100%)',
            borderColor: 'rgba(6, 182, 212, 0.3)'
          }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              marginBottom: '32px',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              {slide.title}
            </h1>
            <h2 style={{ 
              fontSize: '36px', 
              fontWeight: '700', 
              color: '#06b6d4', 
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              {slide.headline}
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: '#e2e8f0', 
              lineHeight: '1.6',
              fontWeight: '300'
            }}>
              {slide.description}
            </p>
          </div>
        </div>
      );

    case 'vision':
      return (
        <div style={{ ...slideContentStyles, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ maxWidth: '900px' }}>
            <div style={{ 
              width: '80px', 
              height: '4px', 
              background: 'linear-gradient(90deg, #8b5cf6 0%, #3b82f6 100%)', 
              borderRadius: '4px', 
              margin: '0 auto 48px'
            }} />
            <h1 style={{ 
              fontSize: '56px', 
              fontWeight: '800', 
              marginBottom: '48px',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {slide.title}
            </h1>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {slide.content.map((paragraph, index) => (
                <p key={index} style={{ 
                  fontSize: '24px', 
                  color: '#e2e8f0', 
                  lineHeight: '1.6',
                  fontWeight: '300',
                  opacity: 0.9
                }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      );

    case 'team':
      return (
        <div style={slideContentStyles}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ 
              fontSize: '48px', 
              fontWeight: '800', 
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              color: '#ffffff'
            }}>
              {slide.title}
            </h1>
            <p style={{ 
              fontSize: '20px', 
              color: '#94a3b8',
              fontWeight: '300'
            }}>
              {slide.headline}
            </p>
          </div>
          
          <div style={{
            ...premiumCardStyle,
            marginBottom: '32px'
          }}>
            <h3 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              color: '#3b82f6', 
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Key Achievements
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {slide.achievements.map((achievement, index) => (
                <div key={index} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                  <div style={{ 
                    width: '8px', 
                    height: '8px', 
                    backgroundColor: '#3b82f6', 
                    borderRadius: '50%', 
                    marginTop: '8px', 
                    flexShrink: 0 
                  }} />
                  <p style={{ 
                    fontSize: '18px', 
                    color: '#e2e8f0', 
                    lineHeight: '1.6'
                  }}>
                    {achievement}
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div style={{
            ...premiumCardStyle,
            background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.02) 100%)',
            textAlign: 'center'
          }}>
            <p style={{ 
              fontSize: '20px', 
              color: '#cbd5e1', 
              fontWeight: '400'
            }}>
              {slide.members}
            </p>
          </div>
        </div>
      );

    case 'ask':
      return (
        <div style={{ ...slideContentStyles, justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <div style={{
            ...premiumCardStyle,
            maxWidth: '800px',
            padding: '60px',
            background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderColor: 'rgba(139, 92, 246, 0.3)'
          }}>
            <h1 style={{ 
              fontSize: '56px', 
              fontWeight: '800', 
              marginBottom: '32px',
              letterSpacing: '-0.03em',
              background: 'linear-gradient(135deg, #ffffff 0%, #e2e8f0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              {slide.title}
            </h1>
            <h2 style={{ 
              fontSize: '32px', 
              fontWeight: '600', 
              color: '#a78bfa', 
              marginBottom: '32px',
              letterSpacing: '-0.02em'
            }}>
              {slide.headline}
            </h2>
            <p style={{ 
              fontSize: '20px', 
              color: '#e2e8f0', 
              lineHeight: '1.6',
              fontWeight: '300',
              opacity: 0.9
            }}>
              {slide.description}
            </p>
          </div>
        </div>
      );

    default:
      return (
        <div style={{ ...slideContentStyles, justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '700', color: '#ffffff', textAlign: 'center' }}>
            {slide.title || 'Slide Content'}
          </h1>
          <p style={{ fontSize: '18px', color: '#cbd5e1', textAlign: 'center', marginTop: '24px' }}>
            Slide type: {slide.type}
          </p>
        </div>
      );
  }
};

export default PremiumDeck;