'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraph>(null);
  const bottleRef = useRef<HTMLDivElement>(null);
  const splashRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Splash animation
    const splashTimeline = gsap.timeline();

    splashTimeline
      .to(splashRef.current, {
        height: '0%',
        duration: 1.5,
        ease: 'power2.inOut',
        delay: 0.5,
      })
      .to(splashRef.current, {
        opacity: 0,
        duration: 0.5,
      });

    // Hero content animation
    const heroTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top 80%',
      },
    });

    // Split text animation for title
    if (titleRef.current) {
      const text = titleRef.current.textContent || '';
      titleRef.current.innerHTML = '';
      
      text.split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? '\u00A0' : char;
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(20px)';
        titleRef.current?.appendChild(span);

        heroTimeline.to(span, {
          opacity: 1,
          y: 0,
          duration: 0.05,
          ease: 'power2.out',
        }, index * 0.05);
      });
    }

    // Subtitle fade in
    heroTimeline.to(
      subtitleRef.current,
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      '-=0.3'
    );

    // Bottle float animation
    heroTimeline.to(
      bottleRef.current,
      {
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: 'power2.out',
      },
      '-=0.5'
    );

    // Continuous floating animation
    gsap.to(bottleRef.current, {
      y: -15,
      rotation: 2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'power1.inOut',
    });

  }, []);

  return (
    <>
      {/* Splash animation overlay */}
      <div
        ref={splashRef}
        className="splash-container"
      >
        <div className="splash-text">GRESHALOM</div>
      </div>

      {/* Hero Section */}
      <section
        id="home"
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div className="watercolor-bg">
          <div className="watercolor-layer" />
          <div className="watercolor-layer" />
          <div className="watercolor-layer" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center md:text-left">
              <h1
                ref={titleRef}
                className="text-5xl md:text-7xl font-light text-gray-800 mb-6 tracking-tight"
              >
                Pure Water, Pure Life
              </h1>
              <p
                ref={subtitleRef}
                className="text-xl md:text-2xl text-gray-600 font-light mb-8 opacity-0 translate-y-4"
              >
                Experience the essence of purity with Greshalom Ventures
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a
                  href="#products"
                  className="px-8 py-3 bg-ocean-mist text-white rounded-full hover:bg-ocean-mist-dark transition-all duration-300 font-light tracking-wide"
                >
                  Explore Products
                </a>
                <a
                  href="#order"
                  className="px-8 py-3 border-2 border-ocean-mist text-ocean-mist rounded-full hover:bg-ocean-mist hover:text-white transition-all duration-300 font-light tracking-wide"
                >
                  Order Now
                </a>
              </div>
            </div>

            {/* Bottle Image */}
            <div className="flex justify-center">
              <div
                ref={bottleRef}
                className="relative w-64 h-96 md:w-80 md:h-[28rem] opacity-0 scale-95"
              >
                {/* Glassmorphism background */}
                <div className="absolute inset-0 glassmorphism-dark rounded-3xl" />
                
                {/* Actual bottle image */}
                <div className="absolute inset-4 flex items-center justify-center">
                  <img 
                    src="/bottle.jpg" 
                    alt="Greshalom Premium Water Bottle" 
                    className="w-full h-full object-contain floating-bottle drop-shadow-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-ocean-mist rounded-full flex justify-center">
            <div className="w-1 h-3 bg-ocean-mist rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;