import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { VoiceWave } from "@/components/VoiceWave";
import { ProgressBar } from "@/components/ProgressBar";
import { Mic, MicOff, SkipForward, ArrowRight } from "lucide-react";
import { surveyQuestions, parseVoiceResponse } from "@/data/surveyQuestions";
import { UserProfile } from "@/types/roommate";
import avatarImage from "@/assets/avatar-3d.png";

interface VoiceSurveyProps {
  onComplete: (profile: UserProfile) => void;
}

export const VoiceSurvey = ({ onComplete }: VoiceSurveyProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [responses, setResponses] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  const progress = ((currentQuestion + 1) / surveyQuestions.length) * 100;
  const question = surveyQuestions[currentQuestion];

  // Mock voice recognition (replace with actual implementation)
  const startListening = () => {
    setIsListening(true);
    setTranscript("");
    
    // Simulate voice recognition
    setTimeout(() => {
      const mockResponses = [
        "I'm definitely an early bird, I love waking up at 6 AM",
        "I'd rate myself about an 8 out of 10 for cleanliness, I like things organized",
        "I work from home most days but go to the office occasionally",
        "I'm pretty social, maybe a 7 out of 10, I enjoy chatting with roommates",
        "I'd prefer a room with a window for natural light"
      ];
      
      const mockTranscript = mockResponses[currentQuestion];
      setTranscript(mockTranscript);
      setIsListening(false);
    }, 3000);
  };

  const stopListening = () => {
    setIsListening(false);
  };

  const handleNext = () => {
    if (transcript) {
      setIsProcessing(true);
      
      // Process the response
      const processedValue = parseVoiceResponse(transcript, question.field);
      setResponses(prev => ({
        ...prev,
        [question.field]: processedValue
      }));

      setTimeout(() => {
        setIsProcessing(false);
        
        if (currentQuestion < surveyQuestions.length - 1) {
          setCurrentQuestion(prev => prev + 1);
          setTranscript("");
        } else {
          // Complete survey
          const userProfile: UserProfile = {
            id: `user_${Date.now()}`,
            name: "New User", // Would be collected separately
            age: 25, // Would be collected separately
            preferences: {
              sleepSchedule: responses.sleepSchedule || "flexible",
              cleanliness: responses.cleanliness || 5,
              workStyle: responses.workStyle || "mixed",
              socialLevel: responses.socialLevel || 5,
              roomPreference: responses.roomPreference || "no_preference"
            },
            lifestyle: {
              smoking: false,
              pets: false,
              music: "moderate",
              guests: "occasionally"
            },
            createdAt: new Date()
          };
          
          onComplete(userProfile);
        }
      }, 1500);
    }
  };

  const skip = () => {
    if (currentQuestion < surveyQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTranscript("");
    } else {
      // Complete with default responses
      const userProfile: UserProfile = {
        id: `user_${Date.now()}`,
        name: "New User",
        age: 25,
        preferences: {
          sleepSchedule: "flexible",
          cleanliness: 5,
          workStyle: "mixed",
          socialLevel: 5,
          roomPreference: "no_preference"
        },
        lifestyle: {
          smoking: false,
          pets: false,
          music: "moderate",
          guests: "occasionally"
        },
        createdAt: new Date()
      };
      
      onComplete(userProfile);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl mx-auto w-full">
        {/* Progress Bar */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Question {currentQuestion + 1} of {surveyQuestions.length}
            </span>
            <span className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <ProgressBar progress={progress} />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Avatar Section */}
          <motion.div
            className="text-center"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="relative inline-block"
              animate={isListening ? { scale: [1, 1.05, 1] } : {}}
              transition={{ duration: 2, repeat: isListening ? Infinity : 0 }}
            >
              <img
                src={avatarImage}
                alt="AI Assistant"
                className="w-64 h-64 mx-auto rounded-3xl"
              />
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-3xl border-4 border-primary"
                  animate={{
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>

            {/* Voice Wave Animation */}
            <div className="mt-6">
              <VoiceWave isActive={isListening} className="justify-center mb-4" />
              <p className="text-sm text-muted-foreground">
                {isListening ? "Listening..." : "Click to speak"}
              </p>
            </div>
          </motion.div>

          {/* Question Section */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <GlassCard>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentQuestion}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 className="text-2xl font-poppins font-semibold mb-6 text-foreground">
                    {question.question}
                  </h2>

                  {/* Transcript Display */}
                  {transcript && (
                    <motion.div
                      className="bg-muted/50 rounded-lg p-4 mb-6"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-foreground italic">"{transcript}"</p>
                    </motion.div>
                  )}

                  {/* Voice Controls */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    {!isListening ? (
                      <Button
                        onClick={startListening}
                        size="lg"
                        className="flex-1 bg-primary hover:bg-primary-glow transition-smooth"
                        disabled={isProcessing}
                      >
                        <Mic className="w-5 h-5 mr-2" />
                        Start Speaking
                      </Button>
                    ) : (
                      <Button
                        onClick={stopListening}
                        size="lg"
                        variant="destructive"
                        className="flex-1"
                      >
                        <MicOff className="w-5 h-5 mr-2" />
                        Stop
                      </Button>
                    )}

                    {transcript && !isProcessing && (
                      <Button
                        onClick={handleNext}
                        size="lg"
                        className="flex-1 bg-accent hover:bg-accent/80 transition-smooth"
                      >
                        {currentQuestion === surveyQuestions.length - 1 ? (
                          <>Complete Survey</>
                        ) : (
                          <>Next <ArrowRight className="w-4 h-4 ml-2" /></>
                        )}
                      </Button>
                    )}

                    <Button
                      onClick={skip}
                      variant="outline"
                      size="lg"
                      disabled={isProcessing}
                    >
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip
                    </Button>
                  </div>

                  {isProcessing && (
                    <motion.div
                      className="mt-4 text-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <p className="text-muted-foreground">Processing your response...</p>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </GlassCard>
          </motion.div>
        </div>
      </div>
    </div>
  );
};