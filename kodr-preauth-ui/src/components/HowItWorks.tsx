import { motion } from 'framer-motion';
import { Upload, Brain, Eye } from 'lucide-react';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

export function HowItWorks() {
  const steps = [
    {
      icon: Upload,
      title: 'Paste or write code',
      description: 'Support for JS, Python, Java, C++.',
      step: '01',
    },
    {
      icon: Brain,
      title: 'AI explains line-by-line',
      description: 'Detailed, beginner-to-advanced depths.',
      step: '02',
    },
    {
      icon: Eye,
      title: 'See flowchart & learn',
      description: 'Interactive diagram maps to code lines.',
      step: '03',
    },
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-6">
        <MotionWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              How <span className="text-primary">KODR</span> works
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to understand any code
            </p>
          </div>
        </MotionWrapper>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="text-center relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Step Number */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary font-bold text-xl mb-6 relative">
                {step.step}
                
                {/* Connection Line */}
                {index < steps.length - 1 && (
                  <motion.div
                    className="hidden md:block absolute left-full top-1/2 w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.8 }}
                  />
                )}
              </div>

              {/* Icon */}
              <motion.div
                className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-card mb-6 group"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <step.icon className="w-10 h-10 text-primary" />
              </motion.div>

              {/* Content */}
              <h3 className="text-2xl font-semibold mb-3 text-foreground">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}