export interface UserProfile {
  id: string;
  name: string;
  age: number;
  profilePicture?: string;
  preferences: {
    sleepSchedule: "early_bird" | "night_owl" | "flexible";
    cleanliness: number; // 1-10 scale
    workStyle: "home" | "office" | "mixed";
    socialLevel: number; // 1-10 scale (1=quiet, 10=very social)
    roomPreference: "window" | "quiet" | "no_preference";
  };
  lifestyle: {
    smoking: boolean;
    pets: boolean;
    music: "quiet" | "moderate" | "loud";
    guests: "never" | "occasionally" | "frequently";
  };
  createdAt: Date;
}

export interface RoomMatch {
  matchedUser: UserProfile;
  compatibilityScore: number;
  suggestedRoom: string;
  explanation: string;
  matchDetails: {
    sleepCompatibility: number;
    cleanlinessCompatibility: number;
    socialCompatibility: number;
    lifestyleCompatibility: number;
  };
}

export interface SurveyQuestion {
  id: number;
  question: string;
  type: "voice" | "multiple_choice";
  options?: string[];
  field: keyof UserProfile["preferences"] | keyof UserProfile["lifestyle"];
}

export interface VoiceResponse {
  transcript: string;
  confidence: number;
  processedValue: any;
}