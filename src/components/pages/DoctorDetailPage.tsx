import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Award, Briefcase, ArrowLeft, CheckCircle, Shield, ExternalLink, TrendingUp } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Doctors } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DoctorDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctors | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDoctor();
  }, [id]);

  const loadDoctor = async () => {
    try {
      const data = await BaseCrudService.getById<Doctors>('doctors', id!);
      setDoctor(data);
    } catch (error) {
      console.error('Error loading doctor:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-black text-foreground">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 py-12">
        <Link to="/doctors">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-neon-teal font-paragraph mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Doctors
          </motion.button>
        </Link>

        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !doctor ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/50">Doctor not found</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Header Section */}
              <div className="grid lg:grid-cols-3 gap-8 mb-8">
                {/* Profile Image */}
                <div className="lg:col-span-1">
                  <div className="sticky top-24">
                    <div className="relative rounded-2xl overflow-hidden bg-frosted-glass border border-frosted-glass-foreground backdrop-blur-lg">
                      {doctor.profilePicture ? (
                        <Image
                          src={doctor.profilePicture}
                          alt={doctor.doctorName || 'Doctor'}
                          width={400}
                          className="w-full aspect-square object-cover"
                        />
                      ) : (
                        <div className="w-full aspect-square bg-gradient-to-br from-deep-space-blue to-space-black flex items-center justify-center">
                          <Shield className="w-32 h-32 text-neon-teal/30" />
                        </div>
                      )}
                      <div className="absolute top-4 right-4 px-4 py-2 bg-neon-teal/90 backdrop-blur-sm rounded-full">
                        <span className="font-paragraph text-sm text-space-black font-bold flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Verified
                        </span>
                      </div>
                    </div>

                    {/* Success Rate Card */}
                    {doctor.successRate !== undefined && (
                      <div className="mt-6 bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg">
                        <div className="flex items-center gap-3 mb-3">
                          <TrendingUp className="w-5 h-5 text-neon-teal" />
                          <span className="font-paragraph text-sm text-foreground/70">Success Rate</span>
                        </div>
                        <p className="font-heading text-5xl text-neon-teal mb-2">{doctor.successRate}%</p>
                        <p className="font-paragraph text-xs text-foreground/60">
                          Based on verified surgical outcomes
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Name and Title */}
                  <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
                    <h1 className="font-heading text-4xl md:text-5xl text-white mb-4">
                      {doctor.doctorName}
                    </h1>
                    {doctor.specializations && (
                      <p className="font-paragraph text-xl text-electric-magenta mb-6">
                        {doctor.specializations}
                      </p>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      {doctor.yearsOfExperience !== undefined && (
                        <div className="flex items-center gap-3 p-4 bg-deep-space-blue/50 rounded-lg border border-neon-teal/20">
                          <Briefcase className="w-6 h-6 text-electric-magenta" />
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60">Experience</p>
                            <p className="font-heading text-xl text-white">{doctor.yearsOfExperience} Years</p>
                          </div>
                        </div>
                      )}

                      {doctor.qualifications && (
                        <div className="flex items-center gap-3 p-4 bg-deep-space-blue/50 rounded-lg border border-neon-teal/20">
                          <Award className="w-6 h-6 text-neon-teal" />
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60">Qualifications</p>
                            <p className="font-paragraph text-sm text-white line-clamp-2">{doctor.qualifications}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Biography */}
                  {doctor.biography && (
                    <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
                      <h2 className="font-heading text-3xl text-white mb-6">Professional Biography</h2>
                      <p className="font-paragraph text-foreground/80 leading-relaxed whitespace-pre-line">
                        {doctor.biography}
                      </p>
                    </div>
                  )}

                  {/* Qualifications Detail */}
                  {doctor.qualifications && (
                    <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <Award className="w-6 h-6 text-neon-teal" />
                        <h2 className="font-heading text-3xl text-white">Qualifications & Certifications</h2>
                      </div>
                      <div className="space-y-3">
                        {doctor.qualifications.split(',').map((qual, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-neon-teal mt-0.5 flex-shrink-0" />
                            <span className="font-paragraph text-foreground/80">{qual.trim()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Blockchain Verification */}
                  <div className="bg-gradient-to-br from-deep-space-blue to-space-black border border-neon-teal/30 rounded-2xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="w-6 h-6 text-neon-teal" />
                      <h2 className="font-heading text-3xl text-white">Blockchain Verification</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-neon-teal" />
                        <span className="font-paragraph text-foreground/80">
                          Credentials verified on tamper-proof ledger
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-neon-teal" />
                        <span className="font-paragraph text-foreground/80">
                          Surgical success rates pulled from national medical boards
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-neon-teal" />
                        <span className="font-paragraph text-foreground/80">
                          Malpractice history verified and transparent
                        </span>
                      </div>
                      {doctor.credentialVerificationUrl && (
                        <a
                          href={doctor.credentialVerificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-neon-teal/10 border border-neon-teal/30 rounded-lg text-neon-teal font-paragraph text-sm hover:bg-neon-teal/20 transition-colors"
                        >
                          View Verification Details
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 bg-neon-teal text-space-black font-heading font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                      >
                        Request Consultation
                      </motion.button>
                    </Link>
                    <Link to="/treatment-costs" className="flex-1">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full px-6 py-4 bg-transparent text-electric-magenta border border-electric-magenta font-heading font-medium rounded-lg transition-all duration-300 hover:bg-electric-magenta/10"
                      >
                        View Treatment Costs
                      </motion.button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
