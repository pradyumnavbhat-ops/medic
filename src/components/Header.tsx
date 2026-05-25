import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/hospitals', label: 'Hospitals' },
    { path: '/doctors', label: 'Doctors' },
    { path: '/treatment-costs', label: 'Treatment Costs' },
    { path: '/post-care', label: 'Post-Care' },
    { path: '/contact', label: 'Contact' },
    { path: '/patient-login', label: 'Patient Login' }
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-space-black/80 backdrop-blur-lg border-b border-frosted-glass-foreground">
      <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-20 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-teal to-electric-magenta flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
              <Shield className="w-6 h-6 text-space-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-heading text-xl font-bold text-white">MediTrust</span>
              <span className="font-paragraph text-xs text-neon-teal">Global Healthcare Navigator</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 font-paragraph text-sm transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-neon-teal'
                    : 'text-foreground hover:text-neon-teal'
                }`}
              >
                {link.label}
                {isActive(link.path) && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-teal"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <Link to="/contact" className="hidden lg:block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-neon-teal text-space-black font-heading font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)]"
            >
              Get Started
            </motion.button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-neon-teal transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 font-paragraph rounded-lg transition-colors ${
                      isActive(link.path)
                        ? 'bg-neon-teal/10 text-neon-teal border border-neon-teal/30'
                        : 'text-foreground hover:bg-frosted-glass'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link to="/contact" onClick={() => setIsMenuOpen(false)}>
                  <button className="w-full mt-4 px-6 py-3 bg-neon-teal text-space-black font-heading font-bold rounded-lg">
                    Get Started
                  </button>
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
