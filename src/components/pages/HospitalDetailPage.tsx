import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Award, DollarSign, Globe, ArrowLeft, CheckCircle, Building } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Hospitals } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HospitalDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [hospital, setHospital] = useState<Hospitals | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadHospital();
  }, [id]);

  const loadHospital = async () => {
    try {
      const data = await BaseCrudService.getById<Hospitals>('hospitals', id!);
      setHospital(data);
    } catch (error) {
      console.error('Error loading hospital:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-space-black text-foreground">
      <Header />

      <div className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 py-12">
        <Link to="/hospitals">
          <motion.button
            whileHover={{ x: -5 }}
            className="flex items-center gap-2 text-neon-teal font-paragraph mb-8 hover:gap-3 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Hospitals
          </motion.button>
        </Link>

        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !hospital ? (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/50">Hospital not found</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Hero Image */}
              {hospital.hospitalImage && (
                <div className="relative h-[400px] rounded-2xl overflow-hidden mb-8">
                  <Image
                    src={hospital.hospitalImage}
                    alt={hospital.hospitalName || 'Hospital'}
                    width={1200}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-space-black via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-neon-teal/90 backdrop-blur-sm rounded-full mb-4">
                      <CheckCircle className="w-4 h-4 text-space-black" />
                      <span className="font-paragraph text-sm text-space-black font-bold">
                        {hospital.accreditationStatus}
                      </span>
                    </div>
                    <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white">
                      {hospital.hospitalName}
                    </h1>
                  </div>
                </div>
              )}

              {/* Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Overview */}
                  <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
                    <h2 className="font-heading text-3xl text-white mb-6">Overview</h2>
                    <p className="font-paragraph text-foreground/80 leading-relaxed">
                      {hospital.description || 'No description available.'}
                    </p>
                  </div>

                  {/* Treatment Specialties */}
                  {hospital.treatmentSpecialties && (
                    <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
                      <div className="flex items-center gap-3 mb-6">
                        <Award className="w-6 h-6 text-neon-teal" />
                        <h2 className="font-heading text-3xl text-white">Treatment Specialties</h2>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {hospital.treatmentSpecialties.split(',').map((specialty, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-deep-space-blue/50 border border-neon-teal/30 rounded-lg font-paragraph text-sm text-foreground"
                          >
                            {specialty.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Accreditation Details */}
                  <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg">
                    <div className="flex items-center gap-3 mb-6">
                      <Building className="w-6 h-6 text-electric-magenta" />
                      <h2 className="font-heading text-3xl text-white">Accreditation & Standards</h2>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-neon-teal" />
                        <span className="font-paragraph text-foreground/80">
                          Status: <span className="text-neon-teal font-bold">{hospital.accreditationStatus}</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-neon-teal" />
                        <span className="font-paragraph text-foreground/80">
                          Blockchain Verified Credentials
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-neon-teal" />
                        <span className="font-paragraph text-foreground/80">
                          International Quality Standards Compliant
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Quick Info */}
                  <div className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg">
                    <h3 className="font-heading text-xl text-white mb-6">Quick Information</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-electric-magenta mt-1 flex-shrink-0" />
                        <div>
                          <p className="font-paragraph text-sm text-foreground/60 mb-1">Location</p>
                          <p className="font-paragraph text-foreground">
                            {hospital.address}<br />
                            {hospital.city}, {hospital.country}
                          </p>
                        </div>
                      </div>

                      {hospital.costRange && (
                        <div className="flex items-start gap-3">
                          <DollarSign className="w-5 h-5 text-electric-magenta mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60 mb-1">Cost Range</p>
                            <p className="font-paragraph text-foreground">{hospital.costRange}</p>
                          </div>
                        </div>
                      )}

                      {hospital.websiteURL && (
                        <div className="flex items-start gap-3">
                          <Globe className="w-5 h-5 text-electric-magenta mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-paragraph text-sm text-foreground/60 mb-1">Website</p>
                            <a
                              href={hospital.websiteURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-paragraph text-neon-teal hover:underline break-all"
                            >
                              Visit Website
                            </a>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA */}
                  <Link to="/contact">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-6 py-4 bg-neon-teal text-space-black font-heading font-bold rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,255,255,0.5)]"
                    >
                      Request Information
                    </motion.button>
                  </Link>

                  <Link to="/treatment-costs">
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
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
