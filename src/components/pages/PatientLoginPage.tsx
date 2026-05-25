import { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Eye, EyeOff, CheckCircle, AlertCircle, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function PatientLoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      if (isSignUp) {
        // Validate sign up form
        if (formData.password !== formData.confirmPassword) {
          setMessage({
            type: 'error',
            text: 'Passwords do not match.'
          });
          setIsLoading(false);
          return;
        }
        if (formData.password.length < 6) {
          setMessage({
            type: 'error',
            text: 'Password must be at least 6 characters long.'
          });
          setIsLoading(false);
          return;
        }
        
        // Simulate account creation
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        setMessage({
          type: 'success',
          text: 'Account created successfully! Redirecting to dashboard...'
        });
        
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      } else {
        // Simulate login process
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Store login state
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('userEmail', formData.email);
        
        setMessage({
          type: 'success',
          text: 'Login successful! Redirecting to your dashboard...'
        });
        
        setTimeout(() => {
          navigate('/home');
        }, 2000);
      }
      
      setFormData({
        email: '',
        password: '',
        confirmPassword: '',
        fullName: ''
      });
    } catch (error) {
      setMessage({
        type: 'error',
        text: isSignUp ? 'Account creation failed. Please try again.' : 'Login failed. Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const features = [
    {
      title: 'Secure Access',
      description: 'Your medical data is protected with enterprise-grade encryption'
    },
    {
      title: 'Track Progress',
      description: 'Monitor your treatment journey and recovery milestones'
    },
    {
      title: 'Manage Records',
      description: 'Access all your medical records and documentation in one place'
    },
    {
      title: '24/7 Support',
      description: 'Get instant access to our support team whenever you need help'
    }
  ];

  return (
    <div className="min-h-screen bg-space-black text-foreground flex flex-col">
      {/* Main Content */}
      <section className="flex-1 w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 py-16 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full"
        >
          <div className="text-center mb-12">
            <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6">
              {isSignUp ? 'Create Account' : 'Patient'}
              <span className="block mt-2 bg-gradient-to-r from-neon-teal to-electric-magenta bg-clip-text text-transparent">
                {isSignUp ? 'Join MediTrust' : 'Login Portal'}
              </span>
            </h1>
            <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
              {isSignUp 
                ? 'Create your account to access medical records, track treatment progress, and manage your healthcare journey'
                : 'Access your medical records, track your treatment progress, and manage your healthcare journey'
              }
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-lg bg-neon-teal/10 border border-neon-teal/30 flex items-center justify-center">
                    {isSignUp ? (
                      <UserPlus className="w-6 h-6 text-neon-teal" />
                    ) : (
                      <LogIn className="w-6 h-6 text-neon-teal" />
                    )}
                  </div>
                  <h2 className="font-heading text-3xl text-white">
                    {isSignUp ? 'Sign Up' : 'Sign In'}
                  </h2>
                </div>

                {message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mb-6 p-4 rounded-lg flex items-center gap-3 border ${
                      message.type === 'success'
                        ? 'bg-neon-teal/10 border-neon-teal/30'
                        : 'bg-electric-magenta/10 border-electric-magenta/30'
                    }`}
                  >
                    {message.type === 'success' ? (
                      <CheckCircle className="w-5 h-5 text-neon-teal flex-shrink-0" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-electric-magenta flex-shrink-0" />
                    )}
                    <p className={`font-paragraph text-sm ${
                      message.type === 'success' ? 'text-neon-teal' : 'text-electric-magenta'
                    }`}>
                      {message.text}
                    </p>
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Full Name Field (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                        Full Name *
                      </label>
                      <div className="relative">
                        <UserPlus className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-teal/50" />
                        <input
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required={isSignUp}
                          className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  )}

                  {/* Email Field */}
                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                      Email Address *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-teal/50" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-teal/50" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-12 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-teal/50 hover:text-neon-teal transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5" />
                        ) : (
                          <Eye className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field (Sign Up Only) */}
                  {isSignUp && (
                    <div>
                      <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                        Confirm Password *
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-teal/50" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required={isSignUp}
                          className="w-full pl-12 pr-12 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                          placeholder="••••••••"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-4 top-1/2 -translate-y-1/2 text-neon-teal/50 hover:text-neon-teal transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Remember Me & Forgot Password (Sign In Only) */}
                  {!isSignUp && (
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-neon-teal/20 bg-deep-space-blue/50 accent-neon-teal"
                        />
                        <span className="font-paragraph text-sm text-foreground/70">Remember me</span>
                      </label>
                      <a href="#" className="font-paragraph text-sm text-neon-teal hover:text-neon-teal/80 transition-colors">
                        Forgot password?
                      </a>
                    </div>
                  )}

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={isLoading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-6 py-4 bg-neon-teal text-space-black font-heading font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-space-black border-t-transparent rounded-full animate-spin" />
                        {isSignUp ? 'Creating Account...' : 'Signing in...'}
                      </>
                    ) : (
                      <>
                        {isSignUp ? 'Create Account' : 'Sign In'}
                        {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                      </>
                    )}
                  </motion.button>

                  {/* Toggle Sign In / Sign Up */}
                  <p className="text-center font-paragraph text-sm text-foreground/70">
                    {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSignUp(!isSignUp);
                        setMessage(null);
                        setFormData({
                          email: '',
                          password: '',
                          confirmPassword: '',
                          fullName: ''
                        });
                      }}
                      className="text-neon-teal hover:text-neon-teal/80 transition-colors font-bold"
                    >
                      {isSignUp ? 'Sign In' : 'Create one now'}
                    </button>
                  </p>
                </form>
              </div>
            </motion.div>

            {/* Features Section */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <h3 className="font-heading text-3xl text-white mb-8">
                {isSignUp ? 'Get Started Today' : 'Why Login?'}
              </h3>
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                  className="bg-gradient-to-br from-deep-space-blue to-space-black border border-neon-teal/20 rounded-xl p-6 hover:border-neon-teal/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-neon-teal/10 border border-neon-teal/30 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-5 h-5 text-neon-teal" />
                    </div>
                    <div>
                      <h4 className="font-heading text-lg text-white mb-2">{feature.title}</h4>
                      <p className="font-paragraph text-sm text-foreground/70">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Security Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="bg-frosted-glass border border-electric-magenta/30 rounded-xl p-6 backdrop-blur-lg"
              >
                <p className="font-paragraph text-xs text-foreground/60">
                  🔒 Your login is secured with 256-bit SSL encryption and complies with HIPAA/GDPR standards. Your privacy is our priority.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
