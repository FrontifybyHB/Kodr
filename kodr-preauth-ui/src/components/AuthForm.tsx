import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, Mail, Eye, EyeOff, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

interface AuthFormProps {
  mode: 'signin' | 'signup' | 'forgot';
  onModeChange: (mode: 'signin' | 'signup' | 'forgot') => void;
  onSuccess: (user: any) => void;
}

interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
  rememberMe: boolean;
}

interface FormErrors {
  [key: string]: string;
}

export function AuthForm({ mode, onModeChange, onSuccess }: AuthFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8 && /\d/.test(password) && /[!@#$%^&*]/.test(password);
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Invalid email address';
    }

    if (mode !== 'forgot') {
      if (!formData.password) {
        newErrors.password = 'Password is required';
      } else if (mode === 'signup' && !validatePassword(formData.password)) {
        newErrors.password = 'Use 8+ characters, 1 number, 1 symbol';
      }

      if (mode === 'signup') {
        if (!formData.name) {
          newErrors.name = 'Name is required';
        }

        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }

        if (!formData.acceptTerms) {
          newErrors.acceptTerms = 'You must accept the terms';
        }
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (mode === 'forgot') {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onModeChange('signin');
      }, 2000);
    } else {
      onSuccess({ email: formData.email, name: formData.name });
    }

    setIsLoading(false);
  };

  const handleSocialAuth = (provider: string) => {
    // In a real app, this would initiate OAuth flow
    console.log(`${provider} auth initiated`);
    onSuccess({ provider });
  };

  const getTitle = () => {
    switch (mode) {
      case 'signin': return 'Welcome back — explain more code';
      case 'signup': return 'Create your Kodr account';
      case 'forgot': return 'Reset your password';
    }
  };

  const getSubmitText = () => {
    switch (mode) {
      case 'signin': return 'Sign In';
      case 'signup': return 'Create Account';
      case 'forgot': return 'Send reset link';
    }
  };

  if (isSuccess && mode === 'forgot') {
    return (
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
        >
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">Check your email</h2>
        <p className="text-muted-foreground">
          We've sent a password reset link to {formData.email}
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-2xl font-bold text-center mb-8">{getTitle()}</h2>

      {/* Tab Navigation */}
      {mode !== 'forgot' && (
        <div className="flex rounded-lg bg-muted p-1 mb-6">
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all focus-ring ${
              mode === 'signup'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onModeChange('signup')}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-sm font-medium rounded-md transition-all focus-ring ${
              mode === 'signin'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
            onClick={() => onModeChange('signin')}
          >
            Sign In
          </button>
        </div>
      )}

      {/* Social Login */}
      {mode !== 'forgot' && (
        <div className="space-y-3 mb-6">
          <Button
            type="button"
            variant="outline"
            className="w-full focus-ring"
            onClick={() => handleSocialAuth('google')}
          >
            <Mail className="w-4 h-4 mr-2" />
            Continue with Google
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-full focus-ring"
            onClick={() => handleSocialAuth('github')}
          >
            <Github className="w-4 h-4 mr-2" />
            Continue with GitHub
          </Button>
        </div>
      )}

      {mode !== 'forgot' && (
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {mode === 'signup' && (
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className={`focus-ring ${errors.name ? 'border-destructive' : ''}`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="text-sm text-destructive mt-1">{errors.name}</p>
            )}
          </div>
        )}

        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={`focus-ring ${errors.email ? 'border-destructive' : ''}`}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        {mode !== 'forgot' && (
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className={`focus-ring pr-10 ${errors.password ? 'border-destructive' : ''}`}
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            {errors.password && (
              <p id="password-error" className="text-sm text-destructive mt-1">{errors.password}</p>
            )}
            {mode === 'signup' && (
              <p className="text-xs text-muted-foreground mt-1">
                Use 8+ characters, 1 number, 1 symbol
              </p>
            )}
          </div>
        )}

        {mode === 'signup' && (
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={`focus-ring ${errors.confirmPassword ? 'border-destructive' : ''}`}
              aria-invalid={!!errors.confirmPassword}
              aria-describedby={errors.confirmPassword ? 'confirm-password-error' : undefined}
            />
            {errors.confirmPassword && (
              <p id="confirm-password-error" className="text-sm text-destructive mt-1">{errors.confirmPassword}</p>
            )}
          </div>
        )}

        {mode === 'signin' && (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => setFormData({ ...formData, rememberMe: !!checked })}
                className="focus-ring"
              />
              <Label htmlFor="remember" className="text-sm">Remember me</Label>
            </div>
            <Button
              type="button"
              variant="link"
              className="text-sm p-0 h-auto focus-ring"
              onClick={() => onModeChange('forgot')}
            >
              Forgot password?
            </Button>
          </div>
        )}

        {mode === 'signup' && (
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={formData.acceptTerms}
              onCheckedChange={(checked) => setFormData({ ...formData, acceptTerms: !!checked })}
              className={`focus-ring ${errors.acceptTerms ? 'border-destructive' : ''}`}
              aria-invalid={!!errors.acceptTerms}
            />
            <Label htmlFor="terms" className="text-sm">
              I accept the{' '}
              <a href="#" className="text-primary hover:underline focus-ring rounded">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" className="text-primary hover:underline focus-ring rounded">
                Privacy Policy
              </a>
            </Label>
          </div>
        )}
        {errors.acceptTerms && (
          <p className="text-sm text-destructive">{errors.acceptTerms}</p>
        )}

        <Button
          type="submit"
          className="w-full focus-ring"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : getSubmitText()}
        </Button>
      </form>

      {mode === 'forgot' && (
        <div className="mt-6 text-center">
          <Button
            type="button"
            variant="link"
            className="text-sm focus-ring"
            onClick={() => onModeChange('signin')}
          >
            Back to Sign In
          </Button>
        </div>
      )}
    </motion.div>
  );
}