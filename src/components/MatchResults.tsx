import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ProgressBar";
import { 
  Heart, 
  Home, 
  Users, 
  CheckCircle, 
  Clock, 
  Sparkles,
  Coffee,
  Moon,
  Sun
} from "lucide-react";
import { RoomMatch } from "@/types/roommate";

interface MatchResultsProps {
  match: RoomMatch;
  onConfirm: () => void;
  onSeeOtherMatches: () => void;
}

export const MatchResults = ({ match, onConfirm, onSeeOtherMatches }: MatchResultsProps) => {
  const getCompatibilityColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-orange-600";
  };

  const getCompatibilityLabel = (score: number) => {
    if (score >= 80) return "Excellent";
    if (score >= 60) return "Good";
    return "Fair";
  };

  const getSleepIcon = (schedule: string) => {
    switch (schedule) {
      case "early_bird": return <Sun className="w-4 h-4" />;
      case "night_owl": return <Moon className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-8 h-8 text-primary mr-3" />
            <h1 className="text-4xl font-poppins font-bold text-foreground">
              You Met Your Roomie!
            </h1>
          </div>
          <p className="text-lg text-muted-foreground">
            We found your perfect compatibility match
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Match Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlassCard className="text-center">
              <motion.div
                className="relative inline-block mb-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src={match.matchedUser.profilePicture || "/placeholder-avatar.jpg"}
                  alt={match.matchedUser.name}
                  className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-primary"
                />
                <motion.div
                  className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="w-4 h-4 text-primary-foreground" />
                </motion.div>
              </motion.div>

              <h2 className="text-2xl font-poppins font-semibold mb-2">
                {match.matchedUser.name}
              </h2>
              
              <p className="text-muted-foreground mb-4">
                Age {match.matchedUser.age}
              </p>

              {/* Compatibility Score */}
              <motion.div
                className="mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              >
                <div className={`text-5xl font-bold ${getCompatibilityColor(match.compatibilityScore)} mb-2`}>
                  {match.compatibilityScore}%
                </div>
                <Badge variant="secondary" className="text-lg px-4 py-1">
                  {getCompatibilityLabel(match.compatibilityScore)} Match
                </Badge>
              </motion.div>

              {/* Lifestyle Badges */}
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                <Badge variant="outline" className="flex items-center gap-1">
                  {getSleepIcon(match.matchedUser.preferences.sleepSchedule)}
                  {match.matchedUser.preferences.sleepSchedule.replace('_', ' ')}
                </Badge>
                <Badge variant="outline">
                  <Coffee className="w-3 h-3 mr-1" />
                  {match.matchedUser.preferences.workStyle} work
                </Badge>
                <Badge variant="outline">
                  Cleanliness {match.matchedUser.preferences.cleanliness}/10
                </Badge>
              </div>
            </GlassCard>
          </motion.div>

          {/* Match Details */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Room Suggestion */}
            <GlassCard>
              <div className="flex items-center mb-4">
                <Home className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-poppins font-semibold">Suggested Room</h3>
              </div>
              <div className="bg-primary/10 rounded-lg p-4 mb-4">
                <p className="text-2xl font-bold text-primary">{match.suggestedRoom}</p>
              </div>
              <p className="text-muted-foreground">
                Perfectly suited for both your preferences and lifestyle needs.
              </p>
            </GlassCard>

            {/* Compatibility Breakdown */}
            <GlassCard>
              <div className="flex items-center mb-4">
                <Users className="w-6 h-6 text-primary mr-3" />
                <h3 className="text-xl font-poppins font-semibold">Compatibility Details</h3>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Sleep Schedule</span>
                    <span className="text-sm">{match.matchDetails.sleepCompatibility}%</span>
                  </div>
                  <ProgressBar progress={match.matchDetails.sleepCompatibility} />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Cleanliness</span>
                    <span className="text-sm">{match.matchDetails.cleanlinessCompatibility}%</span>
                  </div>
                  <ProgressBar progress={match.matchDetails.cleanlinessCompatibility} />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Social Energy</span>
                    <span className="text-sm">{match.matchDetails.socialCompatibility}%</span>
                  </div>
                  <ProgressBar progress={match.matchDetails.socialCompatibility} />
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Lifestyle</span>
                    <span className="text-sm">{match.matchDetails.lifestyleCompatibility}%</span>
                  </div>
                  <ProgressBar progress={match.matchDetails.lifestyleCompatibility} />
                </div>
              </div>
            </GlassCard>

            {/* Match Explanation */}
            <GlassCard>
              <h3 className="text-lg font-poppins font-semibold mb-3">Why This Match Works</h3>
              <p className="text-muted-foreground leading-relaxed">
                {match.explanation}
              </p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 mt-8 justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Button
            onClick={onConfirm}
            size="lg"
            className="px-8 py-3 bg-primary hover:bg-primary-glow transition-smooth glow-primary"
          >
            <CheckCircle className="w-5 h-5 mr-2" />
            Confirm & Book Room
          </Button>
          
          <Button
            onClick={onSeeOtherMatches}
            size="lg"
            variant="outline"
            className="px-8 py-3"
          >
            See Other Matches
          </Button>
        </motion.div>
      </div>
    </div>
  );
};