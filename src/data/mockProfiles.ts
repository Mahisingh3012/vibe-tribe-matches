import { UserProfile } from "@/types/roommate";

export const mockProfiles: UserProfile[] = [
  {
    id: "1",
    name: "Sarah Chen",
    age: 24,
    profilePicture: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=200&h=200&fit=crop&crop=face",
    preferences: {
      sleepSchedule: "early_bird",
      cleanliness: 8,
      workStyle: "mixed",
      socialLevel: 6,
      roomPreference: "window"
    },
    lifestyle: {
      smoking: false,
      pets: false,
      music: "moderate",
      guests: "occasionally"
    },
    createdAt: new Date("2024-01-15")
  },
  {
    id: "2",
    name: "Emma Rodriguez",
    age: 26,
    profilePicture: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    preferences: {
      sleepSchedule: "night_owl",
      cleanliness: 7,
      workStyle: "home",
      socialLevel: 8,
      roomPreference: "quiet"
    },
    lifestyle: {
      smoking: false,
      pets: true,
      music: "quiet",
      guests: "frequently"
    },
    createdAt: new Date("2024-01-20")
  },
  {
    id: "3",
    name: "Maya Patel",
    age: 23,
    profilePicture: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face",
    preferences: {
      sleepSchedule: "flexible",
      cleanliness: 9,
      workStyle: "office",
      socialLevel: 5,
      roomPreference: "window"
    },
    lifestyle: {
      smoking: false,
      pets: false,
      music: "quiet",
      guests: "never"
    },
    createdAt: new Date("2024-01-25")
  },
  {
    id: "4",
    name: "Zoe Williams",
    age: 25,
    profilePicture: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    preferences: {
      sleepSchedule: "early_bird",
      cleanliness: 6,
      workStyle: "mixed",
      socialLevel: 7,
      roomPreference: "no_preference"
    },
    lifestyle: {
      smoking: false,
      pets: true,
      music: "moderate",
      guests: "occasionally"
    },
    createdAt: new Date("2024-02-01")
  },
  {
    id: "5",
    name: "Aria Johnson",
    age: 22,
    profilePicture: "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=200&h=200&fit=crop&crop=face",
    preferences: {
      sleepSchedule: "night_owl",
      cleanliness: 5,
      workStyle: "home",
      socialLevel: 9,
      roomPreference: "window"
    },
    lifestyle: {
      smoking: false,
      pets: false,
      music: "loud",
      guests: "frequently"
    },
    createdAt: new Date("2024-02-05")
  }
];