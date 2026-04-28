import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Award, Briefcase, ArrowRight, Filter, Shield } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Doctors } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function DoctorsPage() {
  const [doctors, setDoctors] = useState<Doctors[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<Doctors[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('all');
  const [minExperience, setMinExperience] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadDoctors();
  }, [skip]);

  const loadDoctors = async () => {
    try {
      const result = await BaseCrudService.getAll<Doctors>('doctors', {}, { limit: 50, skip });
      if (skip === 0) {
        setDoctors(result.items);
        setFilteredDoctors(result.items);
      } else {
        setDoctors(prev => [...prev, ...result.items]);
        setFilteredDoctors(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading doctors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = doctors;

    if (searchTerm) {
      filtered = filtered.filter(d => 
        d.doctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.specializations?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.qualifications?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialization !== 'all') {
      filtered = filtered.filter(d => 
        d.specializations?.toLowerCase().includes(selectedSpecialization.toLowerCase())
      );
    }

    if (minExperience > 0) {
      filtered = filtered.filter(d => (d.yearsOfExperience || 0) >= minExperience);
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, selectedSpecialization, minExperience, doctors]);

  const specializations = Array.from(new Set(
    doctors.flatMap(d => d.specializations?.split(',').map(s => s.trim()) || [])
  )).filter(Boolean);

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
            Blockchain-Verified
            <span className="block mt-2 bg-gradient-to-r from-neon-teal to-electric-magenta bg-clip-text text-transparent">
              Medical Professionals
            </span>
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
            Browse certified doctors with tamper-proof credentials and verified surgical success rates
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg mb-12"
        >
          <div className="grid md:grid-cols-3 gap-4">
            <div className="md:col-span-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search doctors or qualifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <select
                value={selectedSpecialization}
                onChange={(e) => setSelectedSpecialization(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Specializations</option>
                {specializations.map(spec => (
                  <option key={spec} value={spec}>{spec}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <select
                value={minExperience}
                onChange={(e) => setMinExperience(Number(e.target.value))}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors appearance-none cursor-pointer"
              >
                <option value={0}>Any Experience</option>
                <option value={5}>5+ Years</option>
                <option value={10}>10+ Years</option>
                <option value={15}>15+ Years</option>
                <option value={20}>20+ Years</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="font-paragraph text-foreground/70">
            Showing <span className="text-neon-teal font-bold">{filteredDoctors.length}</span> verified doctors
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="min-h-[600px]">
          {isLoading ? null : filteredDoctors.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map((doctor, index) => (
                <motion.div
                  key={doctor._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/doctors/${doctor._id}`}>
                    <div className="group h-full bg-frosted-glass border border-frosted-glass-foreground rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 hover:border-neon-teal/50 hover:-translate-y-2">
                      <div className="relative">
                        {doctor.profilePicture ? (
                          <div className="h-64 overflow-hidden">
                            <Image
                              src={doctor.profilePicture}
                              alt={doctor.doctorName || 'Doctor'}
                              width={400}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                          </div>
                        ) : (
                          <div className="h-64 bg-gradient-to-br from-deep-space-blue to-space-black flex items-center justify-center">
                            <Shield className="w-20 h-20 text-neon-teal/30" />
                          </div>
                        )}
                        <div className="absolute top-4 right-4 px-3 py-1 bg-neon-teal/90 backdrop-blur-sm rounded-full">
                          <span className="font-paragraph text-xs text-space-black font-bold flex items-center gap-1">
                            <Shield className="w-3 h-3" />
                            Verified
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-6">
                        <h3 className="font-heading text-xl text-white mb-2">
                          {doctor.doctorName}
                        </h3>
                        
                        {doctor.specializations && (
                          <p className="font-paragraph text-sm text-electric-magenta mb-3">
                            {doctor.specializations}
                          </p>
                        )}

                        <div className="space-y-2 mb-4">
                          {doctor.qualifications && (
                            <div className="flex items-start gap-2 text-foreground/70">
                              <Award className="w-4 h-4 text-neon-teal mt-0.5 flex-shrink-0" />
                              <span className="font-paragraph text-sm line-clamp-2">
                                {doctor.qualifications}
                              </span>
                            </div>
                          )}
                          
                          {doctor.yearsOfExperience !== undefined && (
                            <div className="flex items-center gap-2 text-foreground/70">
                              <Briefcase className="w-4 h-4 text-electric-magenta" />
                              <span className="font-paragraph text-sm">
                                {doctor.yearsOfExperience} years experience
                              </span>
                            </div>
                          )}

                          {doctor.successRate !== undefined && (
                            <div className="mt-3 px-3 py-2 bg-deep-space-blue/50 rounded-lg border border-neon-teal/30">
                              <span className="font-paragraph text-xs text-foreground/60">Success Rate</span>
                              <p className="font-heading text-2xl text-neon-teal">{doctor.successRate}%</p>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-neon-teal font-paragraph text-sm group-hover:gap-3 transition-all">
                          View Profile <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/50">
                No doctors found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Load More */}
        {hasNext && !isLoading && (
          <div className="text-center mt-12">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSkip(prev => prev + 50)}
              className="px-8 py-4 bg-transparent text-neon-teal border border-neon-teal font-heading font-medium rounded-lg transition-all duration-300 hover:bg-neon-teal/10"
            >
              Load More Doctors
            </motion.button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
