import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { PatientInquiries } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    countryOfResidence: '',
    inquirySubject: '',
    inquiryMessage: '',
    preferredContactMethod: 'email'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create<PatientInquiries>('inquiries', {
        ...formData,
        submissionDateTime: new Date().toISOString(),
        _id: crypto.randomUUID()
      });
      
      setIsSuccess(true);
      setFormData({
        patientName: '',
        patientEmail: '',
        patientPhone: '',
        countryOfResidence: '',
        inquirySubject: '',
        inquiryMessage: '',
        preferredContactMethod: 'email'
      });

      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting inquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email Us',
      value: 'support@meditrust.com',
      description: 'Get a response within 24 hours'
    },
    {
      icon: Phone,
      title: 'Call Us',
      value: '+1 (555) 123-4567',
      description: '24/7 support available'
    },
    {
      icon: MapPin,
      title: 'Global Network',
      value: 'Worldwide Coverage',
      description: 'Partners in 50+ countries'
    }
  ];

  return (
    <div className="min-h-screen bg-space-black text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h1 className="font-heading text-5xl md:text-6xl lg:text-7xl text-white mb-6">
            Get Personalized
            <span className="block mt-2 bg-gradient-to-r from-neon-teal to-electric-magenta bg-clip-text text-transparent">
              Medical Travel Support
            </span>
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
            Submit your inquiry and our team will provide customized treatment information and guidance
          </p>
        </motion.div>

        {/* Contact Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method, index) => (
            <div
              key={index}
              className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg text-center"
            >
              <div className="w-12 h-12 rounded-lg bg-neon-teal/10 border border-neon-teal/30 flex items-center justify-center mx-auto mb-4">
                <method.icon className="w-6 h-6 text-neon-teal" />
              </div>
              <h3 className="font-heading text-lg text-white mb-2">{method.title}</h3>
              <p className="font-paragraph text-neon-teal mb-2">{method.value}</p>
              <p className="font-paragraph text-sm text-foreground/60">{method.description}</p>
            </div>
          ))}
        </motion.div>

        {/* Form Section */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
              <h2 className="font-heading text-3xl text-white mb-6">Submit Your Inquiry</h2>
              
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-neon-teal/10 border border-neon-teal/30 rounded-lg flex items-center gap-3"
                >
                  <CheckCircle className="w-5 h-5 text-neon-teal flex-shrink-0" />
                  <p className="font-paragraph text-sm text-neon-teal">
                    Your inquiry has been submitted successfully! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="patientName"
                      value={formData.patientName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="patientEmail"
                      value={formData.patientEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="patientPhone"
                      value={formData.patientPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                      Country of Residence *
                    </label>
                    <input
                      type="text"
                      name="countryOfResidence"
                      value={formData.countryOfResidence}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                      placeholder="United States"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                    Inquiry Subject *
                  </label>
                  <input
                    type="text"
                    name="inquirySubject"
                    value={formData.inquirySubject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
                    placeholder="e.g., Cardiac Surgery Inquiry"
                  />
                </div>

                <div>
                  <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                    Preferred Contact Method *
                  </label>
                  <select
                    name="preferredContactMethod"
                    value={formData.preferredContactMethod}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors appearance-none cursor-pointer"
                  >
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                    <option value="whatsapp">WhatsApp</option>
                  </select>
                </div>

                <div>
                  <label className="block font-paragraph text-sm text-foreground/70 mb-2">
                    Your Message *
                  </label>
                  <textarea
                    name="inquiryMessage"
                    value={formData.inquiryMessage}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors resize-none"
                    placeholder="Please provide details about your medical needs, preferred treatment locations, and any specific questions..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 bg-neon-teal text-space-black font-heading font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    'Submitting...'
                  ) : (
                    <>
                      Submit Inquiry
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Why Contact Us */}
            <div className="bg-gradient-to-br from-deep-space-blue to-space-black border border-neon-teal/30 rounded-2xl p-8">
              <h3 className="font-heading text-2xl text-white mb-6">Why Contact Us?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-teal mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading text-white mb-1">Personalized Recommendations</p>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Get customized hospital and doctor suggestions based on your specific needs
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-teal mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading text-white mb-1">Cost Transparency</p>
                    <p className="font-paragraph text-sm text-foreground/70">
                      Receive detailed cost breakdowns with no hidden fees
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-teal mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading text-white mb-1">End-to-End Support</p>
                    <p className="font-paragraph text-sm text-foreground/70">
                      From initial consultation to post-care coordination
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-neon-teal mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-heading text-white mb-1">Verified Credentials</p>
                    <p className="font-paragraph text-sm text-foreground/70">
                      All recommendations backed by blockchain-verified data
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response Time */}
            <div className="bg-frosted-glass border border-electric-magenta/30 rounded-2xl p-8 backdrop-blur-lg">
              <h3 className="font-heading text-2xl text-white mb-4">Quick Response</h3>
              <p className="font-paragraph text-foreground/70 mb-4">
                Our team typically responds within 24 hours. For urgent inquiries, please call our 24/7 support line.
              </p>
              <div className="flex items-center gap-2 text-electric-magenta">
                <Phone className="w-5 h-5" />
                <span className="font-paragraph font-bold">+1 (555) 123-4567</span>
              </div>
            </div>

            {/* Privacy Notice */}
            <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg">
              <p className="font-paragraph text-xs text-foreground/60">
                Your information is protected by HIPAA/GDPR compliance standards. We never share your data without explicit consent.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
