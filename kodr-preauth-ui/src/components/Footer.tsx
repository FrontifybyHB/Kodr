import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

export function Footer() {
  const links = [
    { label: 'About', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
  ];

  return (
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* Logo and tagline */}
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-lg font-semibold text-foreground mb-1">KODR</div>
            <div className="text-sm text-muted-foreground">
              Know, Observe, Develop, Run
            </div>
          </motion.div>

          {/* Links */}
          <motion.div
            className="flex items-center space-x-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded px-2 py-1"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors focus-ring rounded p-1"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* About KODR */}
        <motion.div
          className="mt-8 pt-8 border-t border-border/30 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            KODR (Know, Observe, Develop, Run) is an AI-powered learning platform that explains 
            code line-by-line and visualizes program logic with flowcharts. Kodr helps learners 
            and developers quickly understand existing code, debug with confidence, and learn 
            programming concepts interactively.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}