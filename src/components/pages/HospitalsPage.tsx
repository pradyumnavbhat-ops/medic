import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, MapPin, Award, DollarSign, ArrowRight, Filter } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { Hospitals } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HospitalsPage() {
  const [hospitals, setHospitals] = useState<Hospitals[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<Hospitals[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadHospitals();
  }, [skip]);

  const loadHospitals = async () => {
    try {
      const result = await BaseCrudService.getAll<Hospitals>('hospitals', {}, { limit: 50, skip });
      if (skip === 0) {
        setHospitals(result.items);
        setFilteredHospitals(result.items);
      } else {
        setHospitals(prev => [...prev, ...result.items]);
        setFilteredHospitals(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading hospitals:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = hospitals;

    if (searchTerm) {
      filtered = filtered.filter(h => 
        h.hospitalName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        h.treatmentSpecialties?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCountry !== 'all') {
      filtered = filtered.filter(h => h.country === selectedCountry);
    }

    if (selectedSpecialty !== 'all') {
      filtered = filtered.filter(h => 
        h.treatmentSpecialties?.toLowerCase().includes(selectedSpecialty.toLowerCase())
      );
    }

    setFilteredHospitals(filtered);
  }, [searchTerm, selectedCountry, selectedSpecialty, hospitals]);

  const countries = Array.from(new Set(hospitals.map(h => h.country).filter(Boolean)));
  const specialties = Array.from(new Set(
    hospitals.flatMap(h => h.treatmentSpecialties?.split(',').map(s => s.trim()) || [])
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
            Verified Global
            <span className="block mt-2 bg-gradient-to-r from-neon-teal to-electric-magenta bg-clip-text text-transparent">
              Healthcare Facilities
            </span>
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
            Browse blockchain-verified hospitals with transparent accreditation status and treatment specialties
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg mb-12"
        >
          <div className="grid md:grid-cols-4 gap-4">
            <div className="md:col-span-2 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search hospitals, cities, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Countries</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>

            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Specialties</option>
                {specialties.map(specialty => (
                  <option key={specialty} value={specialty}>{specialty}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="font-paragraph text-foreground/70">
            Showing <span className="text-neon-teal font-bold">{filteredHospitals.length}</span> verified hospitals
          </p>
        </div>

        {/* Hospitals Grid */}
        <div className="min-h-[600px]">
          {isLoading ? null : filteredHospitals.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredHospitals.map((hospital, index) => (
                <motion.div
                  key={hospital._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link to={`/hospitals/${hospital._id}`}>
                    <div className="group h-full bg-frosted-glass border border-frosted-glass-foreground rounded-2xl overflow-hidden backdrop-blur-lg transition-all duration-300 hover:border-neon-teal/50 hover:-translate-y-2">
                      {hospital.hospitalImage && (
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={hospital.hospitalImage}
                            alt={hospital.hospitalName || 'Hospital'}
                            width={400}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                          <div className="absolute top-4 right-4 px-3 py-1 bg-neon-teal/90 backdrop-blur-sm rounded-full">
                            <span className="font-paragraph text-xs text-space-black font-bold">
                              {hospital.accreditationStatus}
                            </span>
                          </div>
                        </div>
                      )}
                      
                      <div className="p-6">
                        <h3 className="font-heading text-xl text-white mb-3 line-clamp-2">
                          {hospital.hospitalName}
                        </h3>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-foreground/70">
                            <MapPin className="w-4 h-4 text-electric-magenta" />
                            <span className="font-paragraph text-sm">
                              {hospital.city}, {hospital.country}
                            </span>
                          </div>
                          
                          {hospital.treatmentSpecialties && (
                            <div className="flex items-start gap-2 text-foreground/70">
                              <Award className="w-4 h-4 text-neon-teal mt-0.5 flex-shrink-0" />
                              <span className="font-paragraph text-sm line-clamp-2">
                                {hospital.treatmentSpecialties}
                              </span>
                            </div>
                          )}
                          
                          {hospital.costRange && (
                            <div className="flex items-center gap-2 text-foreground/70">
                              <DollarSign className="w-4 h-4 text-electric-magenta" />
                              <span className="font-paragraph text-sm">
                                {hospital.costRange}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-neon-teal font-paragraph text-sm group-hover:gap-3 transition-all">
                          View Details <ArrowRight className="w-4 h-4" />
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
                No hospitals found matching your criteria
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
              Load More Hospitals
            </motion.button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
