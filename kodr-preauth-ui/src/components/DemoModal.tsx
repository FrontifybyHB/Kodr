import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DemoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const demoCode = [
  'function fibonacci(n) {',
  '  if (n <= 1) return n;',
  '  return fibonacci(n - 1) + fibonacci(n - 2);',
  '}'
];

const explanations = [
  'Defines a function named "fibonacci" that takes a parameter "n"',
  'Base case: if n is 0 or 1, return n directly (0 or 1)',
  'Recursive case: add the two previous Fibonacci numbers',
  'Closes the function definition'
];

export function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [currentLine, setCurrentLine] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (!isPlaying || !isOpen) return;

    const interval = setInterval(() => {
      setCurrentLine((prev) => {
        if (prev >= demoCode.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [isPlaying, isOpen]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && currentLine >= demoCode.length - 1) {
      setCurrentLine(0);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.28 }}
          >
            <div
              className="glass rounded-2xl p-8 w-full max-w-3xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 focus-ring"
                onClick={onClose}
                aria-label="Close demo"
              >
                <X className="w-5 h-5" />
              </Button>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-2">KODR Demo</h2>
                <p className="text-muted-foreground">
                  Watch how KODR explains code line by line
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Code Column */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Code</h3>
                  <div className="bg-card rounded-lg p-4 font-mono text-sm border">
                    {demoCode.map((line, index) => (
                      <motion.div
                        key={index}
                        className={`py-1 px-2 rounded transition-all duration-300 ${
                          index === currentLine
                            ? 'bg-primary/20 text-primary border-l-2 border-primary'
                            : 'text-muted-foreground'
                        }`}
                        animate={{
                          scale: index === currentLine ? 1.02 : 1,
                        }}
                      >
                        <span className="text-muted-foreground mr-2 select-none">
                          {index + 1}
                        </span>
                        {line}
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Explanation Column */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">AI Explanation</h3>
                  <div className="bg-card rounded-lg p-4 border min-h-[200px]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentLine}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="text-sm leading-relaxed"
                      >
                        <div className="text-primary font-medium mb-2">
                          Line {currentLine + 1}:
                        </div>
                        <div>{explanations[currentLine]}</div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="flex justify-center mt-8">
                <Button
                  onClick={togglePlayback}
                  className="bg-primary hover:bg-primary/90 focus-ring"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause Demo
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      {currentLine >= demoCode.length - 1 ? 'Restart Demo' : 'Play Demo'}
                    </>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}