// GSAP Loader utility for optimized bundle splitting
import { gsap } from 'gsap';

// Lazy load ScrollTrigger to reduce initial bundle size
export const initScrollTrigger = async () => {
  try {
    // Use the original working approach
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);
    return ScrollTrigger;
  } catch (error) {
    console.error('Failed to load ScrollTrigger:', error);
    return null;
  }
};

// Optimized GSAP instance with minimal features
export const createOptimizedGSAP = () => {
  // Use gsap.timeline for better performance
  return gsap.timeline();
};

export { gsap };
export default gsap;
