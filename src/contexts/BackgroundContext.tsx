import React, { createContext, useContext, useState } from 'react';
import mountainCavernsImg from '../components/backgrounds/Mountain-Caverns.jpg';
import junglewoodGroveImg from '../components/backgrounds/Junglewood-Grove.png';
import mobsMinesImg from '../components/backgrounds/Mobs-and-Mines.jpeg';
import sunsetSanctuaryImg from '../components/backgrounds/sunset-sanctuary.jpg';

interface BackgroundTheme {
  name: string;
  backgroundImage: string;
  textColor: string;
}

export const backgroundThemes = {
  mountainCaverns: {
    name: 'Mountain Caverns',
    backgroundImage: mountainCavernsImg,
    textColor: '#B8E3FF',
  },
  junglewood: {
    name: 'Junglewood Grove',
    backgroundImage: junglewoodGroveImg,
    textColor: '#E2D3BC',
  },
  mobsMines: {
    name: 'Mobs & Mines',
    backgroundImage: mobsMinesImg,
    textColor: '#FFE8B6',
  },
  sunsetSanctuary: {
    name: 'Sunset Sanctuary',
    backgroundImage: sunsetSanctuaryImg,
    textColor: '#FFD700',
  }
};

interface BackgroundContextType {
  currentTheme: keyof typeof backgroundThemes;
  setCurrentTheme: (theme: keyof typeof backgroundThemes) => void;
}

const BackgroundContext = createContext<BackgroundContextType | null>(null);

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof backgroundThemes>('mountainCaverns');

  return (
    <BackgroundContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export function useBackground() {
  const context = useContext(BackgroundContext);
  if (!context) {
    throw new Error('useBackground must be used within a BackgroundProvider');
  }
  return context;
}
