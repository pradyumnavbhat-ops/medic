import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Activity, FileText, Heart, ArrowRight } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { PostCareGuides } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PostCarePage() {
  const [guides, setGuides] = useState<PostCareGuides[]>([]);
  const [filteredGuides, setFilteredGuides] = useState<PostCareGuides[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedGuide, setExpandedGuide] = useState<string | null>(null);
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadGuides();
  }, [skip]);

  const loadGuides = async () => {
    try {
      const result = await BaseCrudService.getAll<PostCareGuides>('postcareguides', {}, { limit: 50, skip });
      if (skip === 0) {
        setGuides(result.items);
        setFilteredGuides(result.items);
      } else {
        setGuides(prev => [...prev, ...result.items]);
        setFilteredGuides(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading guides:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let filtered = guides;

    if (searchTerm) {
      filtered = filtered.filter(g => 
        g.guideTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.guideDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.category?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(g => g.category === selectedCategory);
    }

    setFilteredGuides(filtered);
  }, [searchTerm, selectedCategory, guides]);

  const categories = Array.from(new Set(guides.map(g => g.category).filter(Boolean)));

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
            CareContinuum
            <span className="block mt-2 bg-gradient-to-r from-neon-teal to-electric-magenta bg-clip-text text-transparent">
              Bridge
            </span>
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
            Comprehensive post-treatment care with AI recovery monitoring and global care coordination
          </p>
        </motion.div>

        {/* Features Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          <div className="bg-frosted-glass border border-neon-teal/30 rounded-2xl p-6 backdrop-blur-lg">
            <Activity className="w-8 h-8 text-neon-teal mb-3" />
            <h3 className="font-heading text-lg text-white mb-2">AI Recovery Monitoring</h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Wearable-integrated tracking with vital signs and wound healing analysis
            </p>
          </div>
          <div className="bg-frosted-glass border border-electric-magenta/30 rounded-2xl p-6 backdrop-blur-lg">
            <Heart className="w-8 h-8 text-electric-magenta mb-3" />
            <h3 className="font-heading text-lg text-white mb-2">Global Affiliate Network</h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Synchronized dashboard connecting foreign surgeons with local GPs
            </p>
          </div>
          <div className="bg-frosted-glass border border-neon-teal/30 rounded-2xl p-6 backdrop-blur-lg">
            <FileText className="w-8 h-8 text-neon-teal mb-3" />
            <h3 className="font-heading text-lg text-white mb-2">Health Wallet</h3>
            <p className="font-paragraph text-sm text-foreground/70">
              HIPAA/GDPR-compliant storage for surgical notes and medical images
            </p>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg mb-12"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <input
                type="text"
                placeholder="Search post-care guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
              />
            </div>

            <div className="relative">
              <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors appearance-none cursor-pointer"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="font-paragraph text-foreground/70">
            Showing <span className="text-neon-teal font-bold">{filteredGuides.length}</span> post-care guides
          </p>
        </div>

        {/* Guides Grid */}
        <div className="min-h-[600px]">
          {isLoading ? null : filteredGuides.length > 0 ? (
            <div className="space-y-6">
              {filteredGuides.map((guide, index) => (
                <motion.div
                  key={guide._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl overflow-hidden backdrop-blur-lg hover:border-neon-teal/50 transition-all duration-300"
                >
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Image */}
                    {guide.guideImage && (
                      <div className="md:col-span-1 h-64 md:h-auto">
                        <Image
                          src={guide.guideImage}
                          alt={guide.guideTitle || 'Post-care guide'}
                          width={400}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className={`${guide.guideImage ? 'md:col-span-2' : 'md:col-span-3'} p-8`}>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          {guide.category && (
                            <span className="inline-block px-3 py-1 bg-electric-magenta/10 border border-electric-magenta/30 rounded-full font-paragraph text-xs text-electric-magenta mb-3">
                              {guide.category}
                            </span>
                          )}
                          <h3 className="font-heading text-2xl md:text-3xl text-white mb-3">
                            {guide.guideTitle}
                          </h3>
                          <p className="font-paragraph text-foreground/70 mb-4">
                            {guide.guideDescription}
                          </p>
                        </div>
                      </div>

                      {/* Expandable Content */}
                      <button
                        onClick={() => setExpandedGuide(expandedGuide === guide._id ? null : guide._id)}
                        className="flex items-center gap-2 text-neon-teal font-paragraph text-sm hover:gap-3 transition-all mb-4"
                      >
                        {expandedGuide === guide._id ? 'Hide Details' : 'View Full Guide'}
                        <ArrowRight className={`w-4 h-4 transition-transform ${expandedGuide === guide._id ? 'rotate-90' : ''}`} />
                      </button>

                      {expandedGuide === guide._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-6 pt-6 border-t border-frosted-glass-foreground"
                        >
                          {/* Recovery Steps */}
                          {guide.recoverySteps && (
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <Activity className="w-5 h-5 text-neon-teal" />
                                <h4 className="font-heading text-xl text-white">Recovery Steps</h4>
                              </div>
                              <div className="bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg p-6">
                                <p className="font-paragraph text-foreground/80 whitespace-pre-line leading-relaxed">
                                  {guide.recoverySteps}
                                </p>
                              </div>
                            </div>
                          )}

                          {/* Follow-up Care */}
                          {guide.followUpCare && (
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <Heart className="w-5 h-5 text-electric-magenta" />
                                <h4 className="font-heading text-xl text-white">Follow-up Care</h4>
                              </div>
                              <div className="bg-deep-space-blue/50 border border-electric-magenta/20 rounded-lg p-6">
                                <p className="font-paragraph text-foreground/80 whitespace-pre-line leading-relaxed">
                                  {guide.followUpCare}
                                </p>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/50">
                No post-care guides found matching your criteria
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
              Load More Guides
            </motion.button>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
