import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "./GlassCard";
import { Sparkles, Users, Home, Zap } from "lucide-react";
import crystalHero from "@/assets/crystal-hero.png";

interface LandingProps {
  onStartSurvey: () => void;
}

export const Landing = ({ onStartSurvey }: LandingProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      {/* Main Content Container with Soft Frame */}
      <motion.div
        className="relative max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Soft Glow Frame */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/30 to-secondary/20 rounded-3xl blur-xl transform scale-110 opacity-50" />
        
        {/* Inner Glassmorphism Container */}
        <div className="relative bg-gradient-to-br from-card/80 via-card/60 to-background/50 backdrop-blur-xl border border-white/20 rounded-3xl p-8 md:p-12 shadow-2xl">
          {/* Decorative Corner Accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-l-2 border-t-2 border-primary/30 rounded-tl-3xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-primary/30 rounded-tr-3xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-primary/30 rounded-bl-3xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-r-2 border-b-2 border-primary/30 rounded-br-3xl" />
          
          {/* Hero Content */}
          <div className="text-center">
            {/* Crystal Illustration */}
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img 
                src={crystalHero} 
                alt="Mystical Crystal" 
                className="w-32 h-32 crystal-glow drop-shadow-2xl"
              />
            </motion.div>

            {/* Main Tagline */}
            <motion.h1
              className="text-5xl md:text-7xl font-playfair font-bold text-foreground mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Your Vibe, Your Tribe
            </motion.h1>

            <motion.p
              className="text-xl md:text-2xl font-dm-sans text-muted-foreground mb-12 max-w-2xl mx-auto drop-shadow-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              Smart Matches for Shared Spaces
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
            >
              <Button
                onClick={onStartSurvey}
                size="lg"
                className="text-xl px-12 py-6 font-poppins font-semibold bg-primary hover:bg-primary-glow transition-smooth glow-primary shadow-xl hover:shadow-2xl hover:scale-105 transform"
              >
                <Sparkles className="w-6 h-6 mr-3" />
                Meet Your Roomie
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        className="mt-16 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
      >
        <GlassCard>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-poppins font-semibold text-lg mb-2">Voice-Powered Survey</h3>
            <p className="text-muted-foreground">
              Quick 5-question voice survey captures your true personality and preferences
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-poppins font-semibold text-lg mb-2">AI Matching</h3>
            <p className="text-muted-foreground">
              Advanced algorithm finds your perfect compatibility match with detailed scores
            </p>
          </div>
        </GlassCard>

        <GlassCard>
          <div className="text-center">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Home className="w-6 h-6 text-primary-foreground" />
            </div>
            <h3 className="font-poppins font-semibold text-lg mb-2">Smart Room Assignment</h3>
            <p className="text-muted-foreground">
              Get personalized room suggestions based on both roommates' preferences
            </p>
          </div>
        </GlassCard>
      </motion.div>

      {/* Background ambient music note */}
      <motion.p
        className="fixed bottom-4 right-4 text-sm text-muted-foreground/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        🎵 Ambient music available
      </motion.p>
    </div>
  );
};