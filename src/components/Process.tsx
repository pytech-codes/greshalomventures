'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IconDroplet, IconFilter, IconCheck, IconTruck } from '@tabler/icons-react';

gsap.registerPlugin(ScrollTrigger);

const Process = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      icon: IconDroplet,
      title: 'Source',
      description: 'Natural mountain spring water sourced from pristine locations',
      color: 'text-ocean-mist',
    },
    {
      icon: IconFilter,
      title: 'Filtration',
      description: 'Advanced multi-stage filtration process for maximum purity',
      color: 'text-seafoam-dark',
    },
    {
      icon: IconCheck,
      title: 'Quality Testing',
      description: 'Rigorous testing to ensure highest quality standards',
      color: 'text-ocean-mist-dark',
    },
    {
      icon: IconTruck,
      title: 'Delivery',
      description: 'Fresh delivery to your doorstep for optimal freshness',
      color: 'text-seafoam',
    },
  ];

  useEffect(() => {
    stepsRef.current.forEach((step, index) => {
      if (step) {
        gsap.fromTo(
          step,
          {
            opacity: 0,
            x: index % 2 === 0 ? -50 : 50,
          },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 85%',
            },
          }
        );
      }
    });

    // Animate connecting line
    const line = sectionRef.current?.querySelector('.process-line');
    if (line) {
      gsap.fromTo(
        line,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: line,
            start: 'top 80%',
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative py-20 overflow-hidden"
    >
      <div className="watercolor-bg">
        <div className="watercolor-layer" />
        <div className="watercolor-layer" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-gray-800 mb-4">
            Our Process
          </h2>
          <p className="text-xl text-gray-600 font-light">
            From source to your doorstep
          </p>
        </div>

        <div className="relative">
          {/* Connecting Line */}
          <div className="process-line absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-ocean-mist via-seafoam to-ocean-mist transform -translate-y-1/2 origin-left hidden md:block" />

          {/* Process Steps */}
          <div className="grid md:grid-cols-4 gap-8 relative">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepsRef.current[index] = el)}
                className="relative z-10 text-center"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full glassmorphism mb-6 mx-auto">
                  <step.icon className={`w-10 h-10 ${step.color}`} />
                </div>
                <h3 className="text-xl font-medium text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 font-light text-sm">
                  {step.description}
                </p>

                {/* Step Number */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-ocean-mist text-white flex items-center justify-center font-medium">
                  {index + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Animated Water Drop */}
        <div className="mt-16 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full glassmorphism-dark flex items-center justify-center">
              <IconDroplet className="w-16 h-16 text-ocean-mist animate-bounce" />
            </div>
            <div className="absolute inset-0 rounded-full border-2 border-ocean-mist opacity-30 animate-ping" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;