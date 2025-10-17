import React, { useEffect, useRef } from 'react';
import { gsap, createOptimizedGSAP } from '../utils/gsapLoader';

const MainContent: React.FC = () => {
  const withFarookRef = useRef<HTMLDivElement>(null);
  const subBrandRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const subBrands = [
    'CODE',
    'NEXTGEN',
    'BRAND',
    'STORIES'
  ];

  useEffect(() => {
    // Create optimized GSAP timeline for initial animation
    const tl = createOptimizedGSAP();
    
    // Initial animation for "withFarook"
    if (withFarookRef.current) {
      tl.fromTo(withFarookRef.current, 
        { opacity: 0, y: 80, scale: 0.8 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 2.5,
          ease: "power3.out"
        }
      );
    }

    // Hide subbrand initially and set up for animations
    if (subBrandRef.current) {
      subBrandRef.current.textContent = '';
      subBrandRef.current.style.opacity = '0';
      subBrandRef.current.style.transform = 'translateY(20px)';
    }

    // Function to animate sub-brand text appearance
    const animateSubBrand = (brand: string) => {
      if (!subBrandRef.current) return;

      // Animate out current text first
      if (subBrandRef.current.textContent) {
        gsap.to(subBrandRef.current, 
          { 
            opacity: 0, 
            y: -20, 
            scale: 1.1,
            rotationX: 15,
            duration: 0.6,
            ease: "power3.in",
            onComplete: () => {
              // Animate in new text
              if (subBrandRef.current) {
                subBrandRef.current.textContent = brand;
                gsap.fromTo(subBrandRef.current, 
                  { 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.9,
                    rotationX: -15
                  },
                  { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    rotationX: 0,
                    duration: 1.0,
                    ease: "power3.out"
                  }
                );
              }
            }
          }
        );
      } else {
        // First time - just animate in
        if (subBrandRef.current) {
          subBrandRef.current.textContent = brand;
          gsap.fromTo(subBrandRef.current, 
            { 
              opacity: 0, 
              y: 30, 
              scale: 0.9,
              rotationX: -15
            },
            { 
              opacity: 1, 
              y: 0, 
              scale: 1,
              rotationX: 0,
              duration: 1.0,
              ease: "power3.out"
            }
          );
        }
      }
    };

    // Auto-cycle through sub-brands
    let currentIndex = 0;
    let cycleInterval: NodeJS.Timeout | null = null;

    const startNewCycle = () => {
      currentIndex = 0;
      
      // Cycle through all brands quickly (1 second each)
      subBrands.forEach((brand, index) => {
        setTimeout(() => {
          animateSubBrand(brand);
          currentIndex = index + 1;
          
          // If this is the last brand, clear text after 1 second, then wait 3 seconds
          if (index === subBrands.length - 1) {
            setTimeout(() => {
              // Clear the text (animate out)
              if (subBrandRef.current) {
                gsap.to(subBrandRef.current, 
                  { 
                    opacity: 0, 
                    y: -20, 
                    scale: 1.1,
                    rotationX: 15,
                    duration: 0.6,
                    ease: "power3.in",
                    onComplete: () => {
                      if (subBrandRef.current) {
                        subBrandRef.current.textContent = '';
                        subBrandRef.current.style.opacity = '0';
                        subBrandRef.current.style.transform = 'translateY(20px)';
                      }
                    }
                  }
                );
              }
              
              // Wait 3 seconds after clearing, then start new cycle
              setTimeout(() => {
                startNewCycle(); // Start next cycle
              }, 3000);
            }, 1000); // Wait 1 second after STORIES appears, then clear
          }
        }, index * 1000); // 1 second delay for each brand
      });
    };

    // Start cycling after initial withFarook animation
    const startCycling = setTimeout(() => {
      startNewCycle(); // Start first cycle
    }, 3000);

    return () => {
      clearTimeout(startCycling);
    };
  }, []);

  return (
    <div className="app" ref={containerRef}>
      <div className="content">
        <div className="main-text">
          <div className="with-farook" ref={withFarookRef}>
            withFarook
          </div>
          <div className="sub-brand" ref={subBrandRef}></div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
