import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "./GlassCard";
import { Upload, User, ArrowRight } from "lucide-react";

interface AvatarSelectionProps {
  onComplete: (avatarData: { type: 'preset' | 'upload', value: string }) => void;
}

const presetAvatars = [
  "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face", 
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
];

export const AvatarSelection = ({ onComplete }: AvatarSelectionProps) => {
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<'preset' | 'upload' | null>(null);

  const handlePresetSelect = (avatar: string) => {
    setSelectedAvatar(avatar);
    setUploadedImage(null);
    setSelectedType('preset');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedImage(result);
        setSelectedAvatar(null);
        setSelectedType('upload');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (selectedType && (selectedAvatar || uploadedImage)) {
      onComplete({
        type: selectedType,
        value: selectedType === 'preset' ? selectedAvatar! : uploadedImage!
      });
    }
  };

  const handleSkip = () => {
    onComplete({
      type: 'preset',
      value: presetAvatars[0]
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
            Select an avatar or upload your photo to personalize your profile
          </p>
        </motion.div>

        <GlassCard>
          <div className="space-y-8">
            {/* Preset Avatars */}
            <div>
              <h3 className="text-xl font-raleway font-semibold mb-6 text-center">Choose a Preset Avatar</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {presetAvatars.map((avatar, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handlePresetSelect(avatar)}
                    className={`relative rounded-full overflow-hidden border-4 transition-all duration-300 ${
                      selectedAvatar === avatar
                        ? 'border-primary scale-110 shadow-lg'
                        : 'border-border hover:border-primary/50 hover:scale-105'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar option ${index + 1}`}
                      className="w-24 h-24 object-cover"
                    />
                    {selectedAvatar === avatar && (
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
            </div>

            {/* Upload Section */}
            <div className="border-t border-border pt-8">
              <h3 className="text-xl font-raleway font-semibold mb-6 text-center">Or Upload Your Photo</h3>
              <div className="flex flex-col items-center space-y-4">
                <label
                  htmlFor="avatar-upload"
                  className={`relative cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors duration-300 ${
                    uploadedImage
                      ? 'border-primary bg-primary/5'
                      : 'border-border hover:border-primary hover:bg-primary/5'
                  }`}
                >
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  {uploadedImage ? (
                    <div className="flex flex-col items-center space-y-2">
                      <img
                        src={uploadedImage}
                        alt="Uploaded avatar"
                        className="w-24 h-24 rounded-full object-cover border-4 border-primary"
                      />
                      <p className="text-sm text-muted-foreground">Photo uploaded successfully!</p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <Upload className="w-8 h-8 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PNG, JPG up to 10MB
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Button
                onClick={handleNext}
                disabled={!selectedType}
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