"use client"

import React, { useRef, useEffect } from 'react';

const AnimatedContent = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  disappearAfter = 0,
  disappearDuration = 0.5,
  disappearEase = 'power3.in',
  onComplete,
  onDisappearanceComplete,
  className = '',
  ...props
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Simple CSS animation fallback (since we don't have GSAP installed)
    const axis = direction === 'horizontal' ? 'translateX' : 'translateY';
    const offset = reverse ? -distance : distance;

    // Set initial state
    el.style.transform = `${axis}(${offset}px) scale(${scale})`;
    el.style.opacity = animateOpacity ? initialOpacity : 1;
    el.style.visibility = 'visible';
    el.style.transition = `all ${duration}s cubic-bezier(0.215, 0.61, 0.355, 1)`;
    
    // Fallback: ensure content is visible after a short delay
    setTimeout(() => {
      if (el.style.opacity === '0' || el.style.opacity === initialOpacity.toString()) {
        el.style.opacity = '1';
        el.style.transform = `${axis}(0px) scale(1)`;
      }
    }, 100);

    // Create intersection observer for scroll trigger
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              el.style.transform = `${axis}(0px) scale(1)`;
              el.style.opacity = '1';
              
              if (onComplete) {
                setTimeout(onComplete, duration * 1000);
              }

              if (disappearAfter > 0) {
                setTimeout(() => {
                  el.style.transform = `${axis}(${reverse ? distance : -distance}px) scale(0.8)`;
                  el.style.opacity = animateOpacity ? initialOpacity : 0;
                  el.style.transition = `all ${disappearDuration}s ${disappearEase.replace('power3.in', 'cubic-bezier(0.55, 0.055, 0.675, 0.19)')}`;
                  
                  if (onDisappearanceComplete) {
                    setTimeout(onDisappearanceComplete, disappearDuration * 1000);
                  }
                }, disappearAfter * 1000);
              }
            }, delay * 1000);
            
            observer.unobserve(el);
          }
        });
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [
    container,
    distance,
    direction,
    reverse,
    duration,
    ease,
    initialOpacity,
    animateOpacity,
    scale,
    threshold,
    delay,
    disappearAfter,
    disappearDuration,
    disappearEase,
    onComplete,
    onDisappearanceComplete
  ]);

  return (
    <div ref={ref} className={className} {...props}>
      {children}
    </div>
  );
};

export default AnimatedContent;