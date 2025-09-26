import { motion } from 'framer-motion';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

export function SocialProof() {
  const stats = [
    { value: '10k+', label: 'explanations' },
    { value: '5', label: 'languages' },
    { value: '99%', label: 'satisfaction' },
  ];

  return (
    <section className="py-20 bg-secondary/10">
      <div className="container mx-auto px-6">
        <MotionWrapper>
          <div className="text-center mb-12">
            <p className="text-lg text-muted-foreground mb-8">
              Trusted by learners in <span className="text-primary font-semibold">120+ colleges</span>
            </p>
            
            {/* College Logos Placeholder */}
            <div className="flex justify-center items-center space-x-8 mb-12 opacity-60">
              {[1, 2, 3].map((index) => (
                <div
                  key={index}
                  className="w-16 h-16 rounded-lg bg-muted/30 flex items-center justify-center text-xs text-muted-foreground"
                >
                  Logo {index}
                </div>
              ))}
            </div>
          </div>
        </MotionWrapper>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              className="text-center"
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <motion.div
                className="text-4xl md:text-5xl font-bold text-primary mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {stat.value}
              </motion.div>
              <div className="text-sm text-muted-foreground uppercase tracking-wide">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}