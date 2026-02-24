import React, { createContext, useContext, useState, useEffect } from 'react';
import { getZodiacSign } from '../utils/zodiacCalculator'; // Will create this utility

const UserContext = createContext();

const PROFILE_KEY = 'palm_reader_profile';

const initialProfile = {
  name: '',
  dob: null, // YYYY-MM-DD
  timeOfBirth: null, // HH:mm
  gender: '', // male, female, other
  zodiacSign: '', // calculated from dob
  avatarId: 'default', // avatar-1, avatar-2, etc.
  completedOnboarding: false,
};

export const UserProvider = ({ children }) => {
  // 1. Initialize State
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem(PROFILE_KEY);
    return saved ? JSON.parse(saved) : initialProfile;
  });

  // 2. Persist Profile
  useEffect(() => {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  // 3. Update Profile Logic
  const updateProfile = (newData) => {
    setUserProfile((prev) => {
      const updated = { ...prev, ...newData };
      
      // Auto-calculate Zodiac if DOB changes
      if (newData.dob) {
        const sign = getZodiacSign(new Date(newData.dob));
        updated.zodiacSign = sign;
      }

      return updated;
    });
  };

  // 4. Mark Onboarding Complete
  const completeOnboarding = () => {
    updateProfile({ completedOnboarding: true });
  };

  // 5. Reset Profile (Logout/Clear Data)
  const clearProfile = () => {
    setUserProfile(initialProfile);
    localStorage.removeItem(PROFILE_KEY);
  };

  const value = {
    userProfile,
    updateProfile,
    completeOnboarding,
    clearProfile,
    isProfileComplete: !!(userProfile.name && userProfile.dob),
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

// Custom Hook
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
