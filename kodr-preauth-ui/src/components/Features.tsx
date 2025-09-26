import { FileText, GitBranch, Code2 } from 'lucide-react';
import { FeatureCard } from '@/components/FeatureCard';
import { MotionWrapper } from '@/components/ui/motion-wrapper';

export function Features() {
  const features = [
    {
      icon: FileText,
      title: 'Line-by-Line Clarity',
      description: 'AI explains each line with examples, edge cases, and common bugs.',
    },
    {
      icon: GitBranch,
      title: 'Visual Flowcharts',
      description: 'Automatic control-flow diagrams to visualize program logic.',
    },
    {
      icon: Code2,
      title: 'IDE & Web Integration',
      description: 'Use Kodr on the web or inside VS Code for a native workflow.',
    },
  ];

  return (
    <section id="features" className="py-20 bg-secondary/20">
      <div className="container mx-auto px-6">
        <MotionWrapper>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Features that <span className="text-primary">accelerate learning</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful tools designed to help you understand any codebase quickly and thoroughly
            </p>
          </div>
        </MotionWrapper>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}