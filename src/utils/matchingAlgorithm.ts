import { UserProfile, RoomMatch } from "@/types/roommate";
import { mockProfiles } from "@/data/mockProfiles";

export const calculateCompatibility = (user1: UserProfile, user2: UserProfile): number => {
  let totalScore = 0;
  let weightSum = 0;

  // Sleep schedule compatibility (weight: 25%)
  const sleepWeight = 0.25;
  let sleepScore = 0;
  if (user1.preferences.sleepSchedule === user2.preferences.sleepSchedule) {
    sleepScore = 100;
  } else if (user1.preferences.sleepSchedule === "flexible" || user2.preferences.sleepSchedule === "flexible") {
    sleepScore = 75;
  } else {
    sleepScore = 30; // Opposite schedules can still work
  }
  totalScore += sleepScore * sleepWeight;
  weightSum += sleepWeight;

  // Cleanliness compatibility (weight: 30%)
  const cleanWeight = 0.30;
  const cleanDiff = Math.abs(user1.preferences.cleanliness - user2.preferences.cleanliness);
  const cleanScore = Math.max(0, 100 - (cleanDiff * 15)); // Penalize large differences
  totalScore += cleanScore * cleanWeight;
  weightSum += cleanWeight;

  // Social level compatibility (weight: 20%)
  const socialWeight = 0.20;
  const socialDiff = Math.abs(user1.preferences.socialLevel - user2.preferences.socialLevel);
  const socialScore = Math.max(0, 100 - (socialDiff * 12));
  totalScore += socialScore * socialWeight;
  weightSum += socialWeight;

  // Work style compatibility (weight: 15%)
  const workWeight = 0.15;
  let workScore = 0;
  if (user1.preferences.workStyle === user2.preferences.workStyle) {
    workScore = 100;
  } else if (user1.preferences.workStyle === "mixed" || user2.preferences.workStyle === "mixed") {
    workScore = 80;
  } else {
    workScore = 60; // Different styles but can complement
  }
  totalScore += workScore * workWeight;
  weightSum += workWeight;

  // Room preference compatibility (weight: 10%)
  const roomWeight = 0.10;
  let roomScore = 0;
  if (user1.preferences.roomPreference === user2.preferences.roomPreference || 
      user1.preferences.roomPreference === "no_preference" || 
      user2.preferences.roomPreference === "no_preference") {
    roomScore = 100;
  } else {
    roomScore = 50; // Different preferences but manageable
  }
  totalScore += roomScore * roomWeight;
  weightSum += roomWeight;

  return Math.round(totalScore / weightSum);
};

export const generateMatchExplanation = (user1: UserProfile, user2: UserProfile, score: number): string => {
  const explanations = [];

  // Sleep schedule
  if (user1.preferences.sleepSchedule === user2.preferences.sleepSchedule) {
    explanations.push(`Both are ${user1.preferences.sleepSchedule.replace('_', ' ')}s`);
  } else if (user1.preferences.sleepSchedule === "flexible" || user2.preferences.sleepSchedule === "flexible") {
    explanations.push("Flexible sleep schedules complement each other");
  }

  // Cleanliness
  const cleanDiff = Math.abs(user1.preferences.cleanliness - user2.preferences.cleanliness);
  if (cleanDiff <= 2) {
    explanations.push("Similar cleanliness standards");
  } else if (cleanDiff <= 4) {
    explanations.push("Complementary organization styles");
  }

  // Social compatibility
  const socialDiff = Math.abs(user1.preferences.socialLevel - user2.preferences.socialLevel);
  if (socialDiff <= 2) {
    explanations.push("Balanced social energy");
  } else if (socialDiff <= 4) {
    explanations.push("Good balance of social and quiet time");
  }

  // Work style
  if (user1.preferences.workStyle === user2.preferences.workStyle) {
    explanations.push(`Both prefer ${user1.preferences.workStyle} work`);
  }

  if (explanations.length === 0) {
    explanations.push("Complementary personalities that could work well together");
  }

  return explanations.slice(0, 3).join(", ") + ".";
};

export const suggestRoom = (user: UserProfile, matchedUser: UserProfile): string => {
  const roomTypes = ["A", "B", "C"];
  const floors = [2, 3, 4, 5];
  const roomNumbers = [1, 2, 3, 4, 5, 6, 7, 8];

  // Prefer window rooms if either user wants them
  const preferWindow = user.preferences.roomPreference === "window" || 
                      matchedUser.preferences.roomPreference === "window";
  
  // Prefer quiet rooms if either user wants them
  const preferQuiet = user.preferences.roomPreference === "quiet" || 
                     matchedUser.preferences.roomPreference === "quiet";

  // Generate room suggestion
  const floor = floors[Math.floor(Math.random() * floors.length)];
  const roomNum = roomNumbers[Math.floor(Math.random() * roomNumbers.length)];
  const type = roomTypes[Math.floor(Math.random() * roomTypes.length)];
  
  let roomFeature = "";
  if (preferWindow && !preferQuiet) {
    roomFeature = ", Near Window";
  } else if (preferQuiet && !preferWindow) {
    roomFeature = ", Quiet Side";
  } else if (preferWindow && preferQuiet) {
    roomFeature = ", Garden View";
  }

  return `Room ${floor}0${roomNum}-${type}${roomFeature}`;
};

export const findBestMatch = (newUser: UserProfile): RoomMatch => {
  const availableProfiles = mockProfiles.filter(profile => profile.id !== newUser.id);
  
  let bestMatch = availableProfiles[0];
  let bestScore = 0;

  availableProfiles.forEach(profile => {
    const score = calculateCompatibility(newUser, profile);
    if (score > bestScore) {
      bestScore = score;
      bestMatch = profile;
    }
  });

  const explanation = generateMatchExplanation(newUser, bestMatch, bestScore);
  const suggestedRoom = suggestRoom(newUser, bestMatch);

  return {
    matchedUser: bestMatch,
    compatibilityScore: bestScore,
    suggestedRoom,
    explanation,
    matchDetails: {
      sleepCompatibility: calculateSleepCompatibility(newUser, bestMatch),
      cleanlinessCompatibility: calculateCleanlinessCompatibility(newUser, bestMatch),
      socialCompatibility: calculateSocialCompatibility(newUser, bestMatch),
      lifestyleCompatibility: calculateLifestyleCompatibility(newUser, bestMatch)
    }
  };
};

const calculateSleepCompatibility = (user1: UserProfile, user2: UserProfile): number => {
  if (user1.preferences.sleepSchedule === user2.preferences.sleepSchedule) return 100;
  if (user1.preferences.sleepSchedule === "flexible" || user2.preferences.sleepSchedule === "flexible") return 75;
  return 30;
};

const calculateCleanlinessCompatibility = (user1: UserProfile, user2: UserProfile): number => {
  const diff = Math.abs(user1.preferences.cleanliness - user2.preferences.cleanliness);
  return Math.max(0, 100 - (diff * 15));
};

const calculateSocialCompatibility = (user1: UserProfile, user2: UserProfile): number => {
  const diff = Math.abs(user1.preferences.socialLevel - user2.preferences.socialLevel);
  return Math.max(0, 100 - (diff * 12));
};

const calculateLifestyleCompatibility = (user1: UserProfile, user2: UserProfile): number => {
  let score = 100;
  
  // Check lifestyle compatibility factors
  if (user1.lifestyle.smoking !== user2.lifestyle.smoking) score -= 20;
  if (user1.lifestyle.pets !== user2.lifestyle.pets) score -= 10;
  
  // Music preferences
  const musicLevels = { quiet: 1, moderate: 2, loud: 3 };
  const musicDiff = Math.abs(musicLevels[user1.lifestyle.music] - musicLevels[user2.lifestyle.music]);
  score -= musicDiff * 10;
  
  return Math.max(0, score);
};