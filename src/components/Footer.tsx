import { Link } from 'react-router-dom';
import { Shield, Mail, Globe, Lock, Activity } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Platform',
      links: [
        { label: 'Hospitals', path: '/hospitals' },
        { label: 'Doctors', path: '/doctors' },
        { label: 'Treatment Costs', path: '/treatment-costs' },
        { label: 'Post-Care Guides', path: '/post-care' }
      ]
    },
    {
      title: 'Trust & Security',
      links: [
        { label: 'Blockchain Verification', path: '/hospitals' },
        { label: 'Doctor Credentials', path: '/doctors' },
        { label: 'Transparent Pricing', path: '/treatment-costs' },
        { label: 'Care Continuity', path: '/post-care' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', path: '/contact' },
        { label: 'Submit Inquiry', path: '/contact' },
        { label: 'Find Hospitals', path: '/hospitals' },
        { label: 'Find Doctors', path: '/doctors' }
      ]
    }
  ];

  const trustBadges = [
    { icon: Shield, label: 'Blockchain Secured' },
    { icon: Lock, label: 'HIPAA Compliant' },
    { icon: Activity, label: '24/7 Monitoring' },
    { icon: Globe, label: 'Global Network' }
  ];

  return (
    <footer className="w-full bg-deep-space-blue border-t border-frosted-glass-foreground">
      <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 py-16">
        {/* Trust Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 pb-16 border-b border-frosted-glass-foreground">
          {trustBadges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center text-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-frosted-glass border border-neon-teal/30 flex items-center justify-center">
                <badge.icon className="w-6 h-6 text-neon-teal" />
              </div>
              <span className="font-paragraph text-sm text-foreground/70">{badge.label}</span>
            </div>
          ))}
        </div>

        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-neon-teal to-electric-magenta flex items-center justify-center">
                <Shield className="w-7 h-7 text-space-black" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-2xl font-bold text-white">MediTrust</span>
                <span className="font-paragraph text-xs text-neon-teal">Global Healthcare Navigator</span>
              </div>
            </Link>
            <p className="font-paragraph text-sm text-foreground/70 mb-6 leading-relaxed max-w-md">
              The ultimate digital compass for international medical travel. Navigate global healthcare with blockchain-verified credentials, transparent costs, and comprehensive post-care support.
            </p>
            <div className="flex items-center gap-2 text-foreground/70">
              <Mail className="w-4 h-4" />
              <a href="mailto:support@meditrust.com" className="font-paragraph text-sm hover:text-neon-teal transition-colors">
                support@meditrust.com
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="font-heading text-lg font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.path}
                      className="font-paragraph text-sm text-foreground/70 hover:text-neon-teal transition-colors inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-frosted-glass-foreground">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-foreground/60">
              © {currentYear} MediTrust. All rights reserved. Powered by blockchain technology.
            </p>
            <div className="flex items-center gap-6">
              <span className="font-paragraph text-xs text-foreground/60">Privacy Policy</span>
              <span className="font-paragraph text-xs text-foreground/60">Terms of Service</span>
              <span className="font-paragraph text-xs text-foreground/60">Medical Disclaimer</span>
            </div>
          </div>
          <p className="font-paragraph text-xs text-foreground/50 mt-4 text-center md:text-left">
            Disclaimer: This platform provides information for medical travel planning. Always consult with qualified healthcare professionals before making medical decisions.
          </p>
        </div>
      </div>
    </footer>
  );
}
