import { motion } from "framer-motion";

interface VoiceWaveProps {
  isActive: boolean;
  className?: string;
}

export const VoiceWave = ({ isActive, className = "" }: VoiceWaveProps) => {
  return (
    <div className={`flex items-center justify-center space-x-1 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="voice-wave"
          animate={
            isActive
              ? {
                  height: [8, 24, 8],
                  transition: {
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: i * 0.1,
                  },
                }
              : { height: 8 }
          }
        />
      ))}
    </div>
  );
};