
import React, { createContext, useState, useContext, useMemo, ReactNode } from 'react';
import { AppView, User } from '../types';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  currentView: AppView;
  setView: (view: AppView) => void;
  completedSteps: Set<number>;
  toggleStepCompletion: (stepId: number) => void;
  sobrietyDate: string | null;
  setSobrietyDate: (date: string | null) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setView] = useState<AppView>(AppView.WELCOME);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [sobrietyDate, setSobrietyDate] = useState<string | null>(null);

  const toggleStepCompletion = (stepId: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepId)) {
        newSet.delete(stepId);
      } else {
        newSet.add(stepId);
      }
      return newSet;
    });
  };

  const appContextValue = useMemo(() => ({
    user,
    setUser,
    currentView,
    setView,
    completedSteps,
    toggleStepCompletion,
    sobrietyDate,
    setSobrietyDate
  }), [user, currentView, completedSteps, sobrietyDate]);

  return (
    <AppContext.Provider value={appContextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
