import { SurveyQuestion } from "@/types/roommate";

export const surveyQuestions: SurveyQuestion[] = [
  {
    id: 1,
    question: "Do you consider yourself an early bird or a night owl?",
    type: "voice",
    field: "sleepSchedule"
  },
  {
    id: 2,
    question: "How do you prefer your room — always tidy or casual comfort? Rate from 1 to 10, where 1 is very messy and 10 is perfectly organized.",
    type: "voice",
    field: "cleanliness"
  },
  {
    id: 3,
    question: "Do you work from home, go to the office, or mix both?",
    type: "voice",
    field: "workStyle"
  },
  {
    id: 4,
    question: "How social are you at home — do you like to chat and hang out, or do you prefer keeping things quiet? Rate from 1 to 10.",
    type: "voice",
    field: "socialLevel"
  },
  {
    id: 5,
    question: "Would you prefer a room near a window with natural light, or somewhere quieter away from street noise?",
    type: "voice",
    field: "roomPreference"
  }
];

export const parseVoiceResponse = (transcript: string, field: string): any => {
  const lowerTranscript = transcript.toLowerCase();
  
  switch (field) {
    case "sleepSchedule":
      if (lowerTranscript.includes("early") || lowerTranscript.includes("morning")) {
        return "early_bird";
      } else if (lowerTranscript.includes("night") || lowerTranscript.includes("late")) {
        return "night_owl";
      } else {
        return "flexible";
      }
    
    case "cleanliness":
      const cleanlinessMatch = lowerTranscript.match(/(\d+)/);
      if (cleanlinessMatch) {
        return Math.min(10, Math.max(1, parseInt(cleanlinessMatch[1])));
      }
      // Fallback based on keywords
      if (lowerTranscript.includes("very tidy") || lowerTranscript.includes("organized")) return 9;
      if (lowerTranscript.includes("tidy") || lowerTranscript.includes("clean")) return 7;
      if (lowerTranscript.includes("casual") || lowerTranscript.includes("comfortable")) return 5;
      if (lowerTranscript.includes("messy") || lowerTranscript.includes("relaxed")) return 3;
      return 5; // Default middle ground
    
    case "workStyle":
      if (lowerTranscript.includes("home") || lowerTranscript.includes("remote")) {
        return "home";
      } else if (lowerTranscript.includes("office") || lowerTranscript.includes("workplace")) {
        return "office";
      } else {
        return "mixed";
      }
    
    case "socialLevel":
      const socialMatch = lowerTranscript.match(/(\d+)/);
      if (socialMatch) {
        return Math.min(10, Math.max(1, parseInt(socialMatch[1])));
      }
      // Fallback based on keywords
      if (lowerTranscript.includes("very social") || lowerTranscript.includes("love to chat")) return 9;
      if (lowerTranscript.includes("social") || lowerTranscript.includes("chat")) return 7;
      if (lowerTranscript.includes("sometimes") || lowerTranscript.includes("occasionally")) return 5;
      if (lowerTranscript.includes("quiet") || lowerTranscript.includes("private")) return 3;
      if (lowerTranscript.includes("very quiet") || lowerTranscript.includes("alone")) return 1;
      return 5; // Default
    
    case "roomPreference":
      if (lowerTranscript.includes("window") || lowerTranscript.includes("light") || lowerTranscript.includes("natural")) {
        return "window";
      } else if (lowerTranscript.includes("quiet") || lowerTranscript.includes("noise") || lowerTranscript.includes("peaceful")) {
        return "quiet";
      } else {
        return "no_preference";
      }
    
    default:
      return lowerTranscript;
  }
};