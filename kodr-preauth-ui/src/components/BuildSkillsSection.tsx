import { motion, useReducedMotion, Variants } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight, Code, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function BuildSkillsSection() {
  const shouldReduceMotion = useReducedMotion();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    skipSnaps: false,
    dragFree: false
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  // Auto-play with pause on hover
  useEffect(() => {
    if (!emblaApi || shouldReduceMotion) return;
    
    let autoplayTimer: NodeJS.Timeout;
    
    const play = () => {
      autoplayTimer = setTimeout(() => {
        emblaApi.scrollNext();
        play();
      }, 4000);
    };
    
    const stop = () => {
      clearTimeout(autoplayTimer);
    };
    
    play();
    
    return () => stop();
  }, [emblaApi, shouldReduceMotion]);

  const features = [
    {
      icon: Code,
      badge: "Project",
      title: "Hands-on Projects",
      description: "Build real projects, push to GitHub, showcase skills.",
      codeSnippet: "const portfolio = build()",
      color: "text-brand-cyan"
    },
    {
      icon: Users,
      badge: "AI Mentor",
      title: "Mentored Explanations", 
      description: "AI explains every line and shows flowcharts so you really understand.",
      codeSnippet: "explain(code, depth: 'detailed')",
      color: "text-brand-amber"
    },
    {
      icon: BookOpen,
      badge: "Path",
      title: "Career Paths",
      description: "Guided learning paths designed for job-ready skills.",
      codeSnippet: "learn.path('fullstack')",
      color: "text-primary"
    }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: shouldReduceMotion ? 0.1 : 0.45,
        ease: "easeOut"
      }
    }
  };

  const headingVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: shouldReduceMotion ? 0.1 : 0.8,
        staggerChildren: shouldReduceMotion ? 0 : 0.1
      }
    }
  };

  const letterVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: shouldReduceMotion ? 0.1 : 0.2 }
    }
  };

  const floatingFragments = [
    { code: "const", x: "10%", y: "20%" },
    { code: "=>", x: "85%", y: "30%" },
    { code: "{}", x: "15%", y: "70%" },
    { code: "//", x: "90%", y: "80%" }
  ];

  return (
    <section className="py-20 bg-secondary/5 relative overflow-hidden">
      {/* Floating code fragments */}
      {!shouldReduceMotion && floatingFragments.map((fragment, index) => (
        <motion.div
          key={index}
          className="absolute text-muted-foreground/20 font-mono text-sm pointer-events-none"
          style={{ left: fragment.x, top: fragment.y }}
          animate={{
            y: [0, -8, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.5,
            ease: "easeInOut"
          }}
        >
          {fragment.code}
        </motion.div>
      ))}

      <div className="container mx-auto px-6">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="glass rounded-2xl p-8 md:p-12 backdrop-blur-sm border border-white/10"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div className="space-y-6">
              <motion.h2
                variants={headingVariants}
                className="text-4xl md:text-5xl font-bold text-foreground"
              >
                {shouldReduceMotion ? (
                  "Build skills that stand out"
                ) : (
                  "Build skills that stand out".split(" ").map((word, wordIndex) => (
                    <motion.span key={wordIndex} variants={letterVariants} className="inline-block mr-4">
                      {word}
                    </motion.span>
                  ))
                )}
              </motion.h2>
              
              <motion.p 
                className="text-xl text-muted-foreground leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.3, duration: shouldReduceMotion ? 0.1 : 0.5 }}
              >
                Hands-on projects. Real-world code. Career-ready skills — explained line-by-line by Kodr's AI.
              </motion.p>

              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.4, duration: shouldReduceMotion ? 0.1 : 0.5 }}
              >
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <Button 
                    size="lg" 
                    className="group relative overflow-hidden"
                    onClick={() => window.location.href = '/dashboard'}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={shouldReduceMotion ? {} : { x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    Explore Paths
                  </Button>
                </motion.div>
                
                <motion.div
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="group"
                    onClick={() => {
                      // Open demo modal - this should trigger the existing demo modal
                      const event = new CustomEvent('openDemo');
                      window.dispatchEvent(event);
                    }}
                  >
                    Try a Demo
                  </Button>
                </motion.div>
              </motion.div>

              <motion.p 
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: shouldReduceMotion ? 0 : 0.6, duration: shouldReduceMotion ? 0.1 : 0.3 }}
              >
                No credit card required • Free demo available
              </motion.p>
            </div>

            {/* Right Column - Carousel */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: shouldReduceMotion ? 0 : 0.5, duration: shouldReduceMotion ? 0.1 : 0.6 }}
            >
              <div className="overflow-hidden rounded-xl" ref={emblaRef}>
                <div className="flex">
                  {features.map((feature, index) => (
                    <div key={index} className="flex-[0_0_100%] min-w-0 px-2">
                      <motion.div
                        className="bg-card/50 rounded-xl p-6 border border-white/10 backdrop-blur-sm group cursor-pointer"
                        whileHover={shouldReduceMotion ? {} : { 
                          scale: 1.03, 
                          rotateX: -1, 
                          rotateY: 1,
                          boxShadow: "0 20px 40px rgba(0,0,0,0.2)"
                        }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg bg-primary/10 ${feature.color}`}>
                            <feature.icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full bg-muted/30 text-muted-foreground font-mono">
                            {feature.badge}
                          </span>
                        </div>
                        
                        <h3 className="text-lg font-semibold mb-2 text-foreground">
                          {feature.title}
                        </h3>
                        
                        <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                          {feature.description}
                        </p>
                        
                        <div className="bg-muted/20 rounded-lg p-3 font-mono text-sm text-muted-foreground border">
                          <motion.div
                            animate={shouldReduceMotion ? {} : {
                              opacity: [0.6, 1, 0.6],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              ease: "easeInOut"
                            }}
                          >
                            {feature.codeSnippet}
                          </motion.div>
                        </div>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex gap-2">
                  {scrollSnaps.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === selectedIndex 
                          ? 'bg-primary w-6' 
                          : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                      }`}
                      onClick={() => scrollTo(index)}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollPrev}
                    className="w-8 h-8 rounded-full"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={scrollNext}
                    className="w-8 h-8 rounded-full"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}