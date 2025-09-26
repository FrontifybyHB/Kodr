import { motion } from 'framer-motion';
import { Code, Play, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MotionWrapper } from '@/components/ui/motion-wrapper';
import heroImage from '@/assets/hero-image.jpg';

interface HeroProps {
  onTryKodrClick: () => void;
  onDemoClick: () => void;
}

export function Hero({ onTryKodrClick, onDemoClick }: HeroProps) {
  const features = [
    { icon: Code, text: 'Multi-language (JavaScript, Python, Java, C++, and more)' },
    { icon: Zap, text: 'Real-time line-by-line AI explanations' },
    { icon: Play, text: 'Interactive flowchart & downloadable explanations' },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 code-pattern opacity-30" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/90" />

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="text-center lg:text-left">
            <MotionWrapper>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Understand Code
                </span>
                <br />
                <span className="text-foreground">Line by Line.</span>
              </h1>
            </MotionWrapper>

            <MotionWrapper delay={0.1}>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
                Paste any code. Kodr explains every line in plain language and generates 
                a flowchart so you can see how it runs.
              </p>
            </MotionWrapper>

            {/* Feature Bullets */}
            <MotionWrapper delay={0.2}>
              <div className="space-y-4 mb-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center space-x-3 text-sm text-muted-foreground"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                      <feature.icon className="w-3 h-3 text-primary" />
                    </div>
                    <span>{feature.text}</span>
                  </motion.div>
                ))}
              </div>
            </MotionWrapper>

            {/* CTAs */}
            <MotionWrapper delay={0.4}>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button
                  size="lg"
                  onClick={onTryKodrClick}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-4 text-lg focus-ring transform hover:scale-105 transition-all duration-200 animate-glow"
                >
                  Try Kodr — Explain Code
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={onDemoClick}
                  className="text-lg font-medium focus-ring hover:bg-secondary/50"
                >
                  Or try demo
                </Button>
              </div>
            </MotionWrapper>
          </div>

          {/* Right Column - Hero Image */}
          <MotionWrapper delay={0.5} className="relative">
            <motion.div
              className="relative"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="relative rounded-2xl overflow-hidden glass p-2">
                <img
                  src={heroImage}
                  alt="Developer workspace with AI overlay explaining code"
                  className="w-full h-auto rounded-xl"
                  loading="eager"
                />
                
                {/* Floating Code Snippet Overlay */}
                <motion.div
                  className="absolute top-4 right-4 glass rounded-lg p-3 text-xs font-mono"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1, duration: 0.5 }}
                >
                  <div className="text-primary">function fibonacci(n) {'{'}</div>
                  <div className="text-muted-foreground ml-2">// AI: Calculates nth Fibonacci number</div>
                  <div className="text-accent">  return n &lt;= 1 ? n : ...</div>
                </motion.div>
              </div>
            </motion.div>
          </MotionWrapper>
        </div>
      </div>
    </section>
  );
}