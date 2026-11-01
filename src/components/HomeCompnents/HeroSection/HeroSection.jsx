'use client';

import { useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function HeroSection() {
  // Initialize AOS on component mount
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true, // Animates only once when scrolling down
      offset: 50,
    });
  }, []);

  const techStack = [
    "Microservices", "AWS", "Kubernetes", "Kafka",
    "Spring Boot", "NestJS", "Next.js", "Docker", "Nginx",
    "Redis", "MinIO", "Elasticsearch", "CI/CD", "Terraform",
  ];

  return (
    <section className="relative flex items-center justify-center min-h-[90vh] w-full bg-background text-foreground py-20 overflow-hidden">
      
      {/* Subtle Background Glow Effect */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-400/10 dark:bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* LEFT COLUMN: Text Content */}
          <div className="flex flex-col items-start text-left order-2 lg:order-1">
            
            {/* Name & Greeting */}
            <h1 
              data-aos="fade-up" 
              className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-4 tracking-tight"
            >
              Hello, I&apos;m <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-700 drop-shadow-sm">
                Bhaskar Joshi
              </span>
            </h1>

            {/* Role / Title */}
            <h2 
              data-aos="fade-up" 
              data-aos-delay="100"
              className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-foreground/90"
            >
              Software Engineer at Quana | Scalable Backend & Cloud Systems
            </h2>

            {/* Description */}
            <p 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="text-base md:text-lg lg:text-xl mb-8 text-foreground/70 max-w-2xl leading-relaxed"
            >
              Based in Haldwani, Uttarakhand, India, I design and build scalable microservices and full-stack applications using Java, Spring Boot, NestJS, React, and AWS, focusing on performance, reliability, and cloud-native architecture.
            </p>

            {/* Tech Tags (Pills) */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="300"
              className="flex flex-wrap gap-2 md:gap-3 mb-10"
            >
              {techStack.map((tech, index) => (
                <span
                  key={index}
                  className="px-3 md:px-4 py-1.5 md:py-2 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold text-xs md:text-sm transition-colors hover:bg-blue-500 hover:text-white cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="400"
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <button className="px-8 py-3.5 md:py-4 rounded-xl border-2 border-foreground font-semibold text-base md:text-lg hover:bg-foreground hover:text-background transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 w-full sm:w-auto text-center">
                Download Resume
              </button>

              <Link href="/contact" className="px-8 py-3.5 md:py-4 rounded-xl bg-blue-600 font-semibold text-base md:text-lg text-white hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-blue-600/30 hover:-translate-y-1 w-full sm:w-auto text-center">
                Contact Me
              </Link>
            </div>

          </div>

          {/* RIGHT COLUMN: Photo/Image Container */}
          <div 
            data-aos="zoom-in-left" 
            data-aos-duration="1000"
            className="relative w-full max-w-md mx-auto lg:mx-0 lg:ml-auto order-1 lg:order-2 mb-10 lg:mb-0"
          >
            {/* Decorative background shape behind the image */}
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-cyan-400 rounded-[2rem] transform rotate-3 lg:rotate-6 scale-105 opacity-50 blur-lg animate-pulse"></div>
            
            {/* Image Wrapper */}
            <div className="relative rounded-[2rem] overflow-hidden border border-foreground/10 shadow-2xl aspect-square bg-foreground/5 z-10">
              <Image
                src="/bhaskar-joshi.jpg"
                alt="Bhaskar Joshi, Software Engineer based in Haldwani, Uttarakhand"
                fill
                sizes="(max-width: 496px) calc(100vw - 48px), 448px"
                loading="eager"
                fetchPriority="high"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              
              {/* Subtle overlay gradient to blend image with dark mode */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent"></div>
            </div>

            {/* Optional Floating Badge */}
            <div className="absolute -bottom-6 -left-6 bg-background border border-foreground/10 p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600 text-xl">
                🚀
              </div>
              <div>
                <p className="text-xs text-foreground/60 font-medium">Currently</p>
                <p className="text-sm font-bold text-foreground">Software Engineer @ Quana</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}