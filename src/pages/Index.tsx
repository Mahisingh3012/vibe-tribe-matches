import { useState, useEffect } from "react";
import { Landing } from "../components/Landing";
import { AvatarSelection } from "../components/AvatarSelection";
import { VoiceSurvey } from "../components/VoiceSurvey";
import { MatchResults } from "../components/MatchResults";
import { AdminPanel } from "../components/AdminPanel";
import { UserProfile, RoomMatch } from "@/types/roommate";
import { findBestMatch } from "@/utils/matchingAlgorithm";

type AppState = "landing" | "avatar" | "survey" | "results" | "admin";

const Index = () => {
  const [currentState, setCurrentState] = useState<AppState>("landing");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [matchResult, setMatchResult] = useState<RoomMatch | null>(null);
  const [avatarData, setAvatarData] = useState<{ type: 'preset' | 'upload', value: string } | null>(null);

  const handleStartSurvey = () => {
    setCurrentState("avatar");
  };

  const handleAvatarComplete = (data: { type: 'preset' | 'upload', value: string }) => {
    setAvatarData(data);
    setCurrentState("survey");
  };

  const handleSurveyComplete = (profile: UserProfile) => {
    setUserProfile(profile);
    const match = findBestMatch(profile);
    setMatchResult(match);
    setCurrentState("results");
  };

  const handleConfirmMatch = () => {
    // Here you would typically save to database
    console.log("Match confirmed!", { userProfile, matchResult });
    alert("Booking confirmed! You'll receive further details via email.");
    setCurrentState("landing");
  };

  const handleSeeOtherMatches = () => {
    // For now, just go back to landing
    // In a real app, this would show alternative matches
    setCurrentState("landing");
  };

  // Secret admin access (in production, this would be a protected route)
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'a' && e.ctrlKey && e.shiftKey) {
      setCurrentState("admin");
    }
  };

  // Add event listener for admin access
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress as any);
    return () => window.removeEventListener('keydown', handleKeyPress as any);
  }, []);

  switch (currentState) {
    case "avatar":
      return <AvatarSelection onComplete={handleAvatarComplete} />;
    
    case "survey":
      return <VoiceSurvey onComplete={handleSurveyComplete} />;
    
    case "results":
      if (!matchResult) return null;
      return (
        <MatchResults
          match={matchResult}
          onConfirm={handleConfirmMatch}
          onSeeOtherMatches={handleSeeOtherMatches}
        />
      );
    
    case "admin":
      return <AdminPanel />;
    
    default:
      return <Landing onStartSurvey={handleStartSurvey} />;
  }
};

export default Index;
