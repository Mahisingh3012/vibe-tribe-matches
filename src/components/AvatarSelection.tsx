import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "./GlassCard";
import { User, ArrowRight } from "lucide-react";
import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import avatar4 from "@/assets/avatar-4.png";
import avatar5 from "@/assets/avatar-5.png";
import avatar6 from "@/assets/avatar-6.png";

interface AvatarSelectionProps {
  onComplete: (avatarData: { type: 'preset' | 'upload', value: string }) => void;
}

const presetAvatars = [
  { src: avatar1, alt: "Short brown hair avatar" },
  { src: avatar2, alt: "Long curly purple hair avatar" },
  { src: avatar3, alt: "Blonde hair with glasses avatar" },
  { src: avatar4, alt: "Wavy red hair with earrings avatar" },
  { src: avatar5, alt: "Short black hair avatar" },
  { src: avatar6, alt: "Long braided teal hair avatar" }
];

export const AvatarSelection = ({ onComplete }: AvatarSelectionProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const handlePresetSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
  };

  const handleNext = () => {
    if (selectedAvatar) {
      onComplete({
        type: 'preset',
        value: selectedAvatar
      });
    }
  };

  const handleSkip = () => {
    onComplete({
      type: 'preset',
      value: presetAvatars[0].src
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto w-full">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Choose Your Avatar
          </h1>
          <p className="text-lg font-dm-sans text-muted-foreground max-w-2xl mx-auto">
            Choose your perfect avatar to personalize your profile
          </p>
        </motion.div>

        <GlassCard>
          <div className="space-y-8">
            {/* Stylized 3D Avatars */}
            <div>
              <h3 className="text-xl font-raleway font-semibold mb-6 text-center">Choose Your Avatar</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {presetAvatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handlePresetSelect(avatar.src)}
                    className={`relative rounded-2xl overflow-hidden border-4 transition-all duration-300 ${
                      selectedAvatar === avatar.src
                        ? 'border-primary scale-110 shadow-xl shadow-primary/20'
                        : 'border-border hover:border-primary/50 hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={avatar.src}
                      alt={avatar.alt}
                      className="w-28 h-28 object-cover"
                    />
                    {selectedAvatar === avatar.src && (
                      <motion.div
                        className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-primary-foreground" />
                        </div>
                      </motion.div>
                    )}
                  </motion.button>
                ))}
              </div>
              <p className="text-sm text-muted-foreground text-center mt-4">
                Choose from our collection of stylized 3D avatars
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={handleNext}
                disabled={!selectedAvatar}
                size="lg"
                className="flex-1 bg-primary hover:bg-primary-glow transition-smooth"
              >
                Continue <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={handleSkip}
                variant="outline"
                size="lg"
                className="sm:w-auto"
              >
                Skip for now
              </Button>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
};