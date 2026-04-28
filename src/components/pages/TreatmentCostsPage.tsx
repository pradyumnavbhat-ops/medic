import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, DollarSign, TrendingUp, Info } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { TreatmentCosts } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TreatmentCostsPage() {
  const [treatments, setTreatments] = useState<TreatmentCosts[]>([]);
  const [filteredTreatments, setFilteredTreatments] = useState<TreatmentCosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    loadTreatments();
  }, [skip]);

  const loadTreatments = async () => {
    try {
      const result = await BaseCrudService.getAll<TreatmentCosts>('treatmentcosts', {}, { limit: 50, skip });
      if (skip === 0) {
        setTreatments(result.items);
        setFilteredTreatments(result.items);
      } else {
        setTreatments(prev => [...prev, ...result.items]);
        setFilteredTreatments(prev => [...prev, ...result.items]);
      }
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Error loading treatments:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      const filtered = treatments.filter(t => 
        t.procedureName?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTreatments(filtered);
    } else {
      setFilteredTreatments(treatments);
    }
  }, [searchTerm, treatments]);

  const formatCurrency = (amount: number | undefined, currency: string | undefined) => {
    if (amount === undefined) return 'N/A';
    const curr = currency || 'USD';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: curr,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

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
            TrueCost
            <span className="block mt-2 bg-gradient-to-r from-neon-teal to-electric-magenta bg-clip-text text-transparent">
              Transparency Engine
            </span>
          </h1>
          <p className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto">
            AI-powered itemized pricing with binding financial blueprints. No hidden costs, no medical bait-and-switch.
          </p>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-r from-neon-teal/10 to-electric-magenta/10 border border-neon-teal/30 rounded-2xl p-6 mb-12"
        >
          <div className="flex items-start gap-4">
            <Info className="w-6 h-6 text-neon-teal flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-heading text-xl text-white mb-2">All-Inclusive Cost Breakdown</h3>
              <p className="font-paragraph text-sm text-foreground/70">
                Each estimate includes surgeon fees, operation theater charges, hospital stay, accommodation, and local transport. 
                Powered by AI aggregation of historical billing data for transparent, binding financial blueprints.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-6 backdrop-blur-lg mb-12"
        >
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/50" />
            <input
              type="text"
              placeholder="Search procedures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-deep-space-blue/50 border border-neon-teal/20 rounded-lg text-foreground font-paragraph focus:outline-none focus:border-neon-teal transition-colors"
            />
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-8">
          <p className="font-paragraph text-foreground/70">
            Showing <span className="text-neon-teal font-bold">{filteredTreatments.length}</span> treatment cost breakdowns
          </p>
        </div>

        {/* Treatments Grid */}
        <div className="min-h-[600px]">
          {isLoading ? null : filteredTreatments.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {filteredTreatments.map((treatment, index) => (
                <motion.div
                  key={treatment._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  className="bg-frosted-glass border border-frosted-glass-foreground rounded-2xl p-8 backdrop-blur-lg hover:border-neon-teal/50 transition-all duration-300"
                >
                  {/* Header */}
                  <div className="mb-6 pb-6 border-b border-frosted-glass-foreground">
                    <h3 className="font-heading text-2xl text-white mb-2">
                      {treatment.procedureName}
                    </h3>
                    <div className="flex items-center gap-2 text-neon-teal">
                      <TrendingUp className="w-4 h-4" />
                      <span className="font-paragraph text-sm">AI-Verified Pricing</span>
                    </div>
                  </div>

                  {/* Cost Breakdown */}
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-sm text-foreground/70">Surgeon Fees</span>
                      <span className="font-paragraph text-foreground font-bold">
                        {formatCurrency(treatment.surgeonFees, treatment.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-sm text-foreground/70">OT Charges</span>
                      <span className="font-paragraph text-foreground font-bold">
                        {formatCurrency(treatment.otCharges, treatment.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-sm text-foreground/70">Hospital Stay</span>
                      <span className="font-paragraph text-foreground font-bold">
                        {formatCurrency(treatment.hospitalStayCost, treatment.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-sm text-foreground/70">Accommodation</span>
                      <span className="font-paragraph text-foreground font-bold">
                        {formatCurrency(treatment.accommodationCost, treatment.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-paragraph text-sm text-foreground/70">Local Transport</span>
                      <span className="font-paragraph text-foreground font-bold">
                        {formatCurrency(treatment.localTransportCost, treatment.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="pt-6 border-t border-neon-teal/30">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-neon-teal" />
                        <span className="font-heading text-lg text-white">Total Estimated Cost</span>
                      </div>
                      <span className="font-heading text-3xl text-neon-teal">
                        {formatCurrency(treatment.totalEstimatedCost, treatment.currency)}
                      </span>
                    </div>
                  </div>

                  {/* Footer Note */}
                  <div className="mt-6 pt-6 border-t border-frosted-glass-foreground">
                    <p className="font-paragraph text-xs text-foreground/50">
                      * Costs based on historical billing data. Final amount may vary based on individual medical requirements.
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="font-paragraph text-lg text-foreground/50">
                No treatment costs found matching your search
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
              Load More Treatments
            </motion.button>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 md:px-12 lg:px-20 py-24 border-t border-frosted-glass-foreground">
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-deep-space-blue to-space-black border border-neon-teal/30 rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-lg bg-neon-teal/10 border border-neon-teal/30 flex items-center justify-center mb-4">
              <DollarSign className="w-6 h-6 text-neon-teal" />
            </div>
            <h3 className="font-heading text-xl text-white mb-3">Binding Estimates</h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Smart contract-based escrow system ensures the billed amount matches pre-agreed scope
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-deep-space-blue to-space-black border border-electric-magenta/30 rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-lg bg-electric-magenta/10 border border-electric-magenta/30 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-electric-magenta" />
            </div>
            <h3 className="font-heading text-xl text-white mb-3">AI-Powered Analysis</h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Historical billing data aggregation provides accurate, data-driven cost predictions
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-deep-space-blue to-space-black border border-neon-teal/30 rounded-2xl p-8"
          >
            <div className="w-12 h-12 rounded-lg bg-neon-teal/10 border border-neon-teal/30 flex items-center justify-center mb-4">
              <Info className="w-6 h-6 text-neon-teal" />
            </div>
            <h3 className="font-heading text-xl text-white mb-3">Complete Transparency</h3>
            <p className="font-paragraph text-sm text-foreground/70">
              Every cost component itemized - no hidden fees or surprise charges
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
