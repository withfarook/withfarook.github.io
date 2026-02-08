import React, { useEffect, useRef } from 'react';
import { gsap } from '../utils/gsapLoader';

const MainContent: React.FC = () => {
  const withFarookRef = useRef<HTMLDivElement>(null);
  const subBrandRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hexagonsRef = useRef<HTMLDivElement>(null);

  const subBrands = [
    'CODE',
    'NEXTGEN',
    'BRAND',
    'STORIES'
  ];

  const finalMessage = "Let's do it";

  useEffect(() => {
    if (!withFarookRef.current || !subBrandRef.current || !hexagonsRef.current) return;

    // Initialize subbrand as hidden
    gsap.set(subBrandRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.9
    });

    // Initialize hexagons as hidden
    gsap.set(hexagonsRef.current, {
      opacity: 0,
      y: 30
    });

    // Initialize individual hexagons
    const hexagonElements = hexagonsRef.current.children;
    gsap.set(hexagonElements, {
      opacity: 0,
      scale: 0.8,
      y: 20
    });

    // Create master timeline for the entire animation sequence
    const masterTL = gsap.timeline({
      defaults: {
        ease: "power3.out"
      }
    });

    // Step 1: Animate "withFarook" entrance (quick but smooth)
    masterTL.fromTo(withFarookRef.current, 
      { 
        opacity: 0, 
        y: 50, 
        scale: 0.88 
      },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1,
        duration: 1.2,
        ease: "power3.out"
      }
    );

    // Step 2: Cycle through all subbrands with optimized timing
    // Each brand: 0.3s fade out + 0.4s fade in + 0.05s display = 0.75s total per brand
    // First brand appears at 0.5s (immediately visible)
    subBrands.forEach((brand, index) => {
      const brandStartTime = 0.5 + (index * 0.75);
      
      if (index === 0) {
        // First brand - quick fade in
        masterTL.fromTo(subBrandRef.current, {
          opacity: 0,
          y: 25,
          scale: 0.92
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out",
          onStart: () => {
            if (subBrandRef.current) {
              subBrandRef.current.textContent = brand;
            }
          }
        }, brandStartTime);

        // Hold the first brand visible
        masterTL.to(subBrandRef.current, {
          duration: 0.35,
          ease: "none"
        }, brandStartTime + 0.4);
      } else {
        // Subsequent brands - quick fade out then fade in
        masterTL.to(subBrandRef.current, {
          opacity: 0,
          y: -15,
          scale: 1.08,
          duration: 0.3,
          ease: "power1.in",
          onComplete: () => {
            // Update text content during fade out
            if (subBrandRef.current) {
              subBrandRef.current.textContent = brand;
            }
          }
        }, brandStartTime);

        // Fade in new brand with smooth entrance
        masterTL.fromTo(subBrandRef.current, {
          opacity: 0,
          y: 25,
          scale: 0.92
        }, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.4,
          ease: "power2.out"
        }, brandStartTime + 0.3);

        // Hold the brand visible
        masterTL.to(subBrandRef.current, {
          duration: 0.05,
          ease: "none"
        }, brandStartTime + 0.7);
      }
    });

    // Step 3: After all subbrands, show "Let's do it" and hexagons together
    const finalMessageStartTime = 0.5 + (subBrands.length * 0.75) + 0.1;
    
    // Fade out last subbrand smoothly
    masterTL.to(subBrandRef.current, {
      opacity: 0,
      y: -15,
      scale: 1.08,
      duration: 0.3,
      ease: "power1.in",
      onComplete: () => {
        if (subBrandRef.current) {
          subBrandRef.current.textContent = finalMessage;
        }
      }
    }, finalMessageStartTime);

    // Fade in "Let's do it" with a memorable but quick entrance
    masterTL.fromTo(subBrandRef.current, {
      opacity: 0,
      y: 30,
      scale: 0.88
    }, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: "back.out(1.2)"
    }, finalMessageStartTime + 0.3);

    // Show hexagons container at the same time as "Let's do it"
    masterTL.to(hexagonsRef.current, {
      opacity: 1,
      y: 0,
      visibility: 'visible',
      duration: 0.5,
      ease: "power2.out"
    }, finalMessageStartTime + 0.3);

    // Animate individual hexagons with stagger (starting at the same time)
    masterTL.to(hexagonElements, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "back.out(1.2)",
      stagger: 0.1
    }, finalMessageStartTime + 0.3);

    // Add a subtle, continuous breathing animation to "Let's do it"
    masterTL.to(subBrandRef.current, {
      scale: 1.03,
      duration: 2.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1
    }, finalMessageStartTime + 1.1);

    // Cleanup function
    return () => {
      masterTL.kill();
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
        <div className="hexagons-container" ref={hexagonsRef}>
          {subBrands.map((brand, index) => (
            <div key={index} className="hexagon-wrapper">
              <div className="hexagon">
                <div className="hexagon-text">{brand}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainContent;
