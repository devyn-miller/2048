import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import breakBlocksSound from '../components/audio/break-blocks.mp3';
import backgroundMusic from '../components/audio/bckgrd-music.mp3';

interface AudioContextType {
  playBreakSound: () => void;
  toggleBackgroundMusic: () => void;
  isMusicPlaying: boolean;
  setIsMusicPlaying: (playing: boolean) => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  effectsVolume: number;
  setEffectsVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | null>(null);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [musicVolume, setMusicVolume] = useState(0.5); // 50% default volume
  const [effectsVolume, setEffectsVolume] = useState(0.7); // 70% default volume
  const breakSoundRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (bgMusicRef.current) {
      bgMusicRef.current.volume = musicVolume;
    }
  }, [musicVolume]);

  useEffect(() => {
    if (breakSoundRef.current) {
      breakSoundRef.current.volume = effectsVolume;
    }
  }, [effectsVolume]);

  const playBreakSound = () => {
    if (breakSoundRef.current && effectsVolume > 0) {
      breakSoundRef.current.currentTime = breakSoundRef.current.duration - 0.5; // Start at last 0.5 seconds
      breakSoundRef.current.play();
    }
  };

  const toggleBackgroundMusic = () => {
    if (bgMusicRef.current) {
      if (isMusicPlaying) {
        bgMusicRef.current.pause();
        setIsMusicPlaying(false);
      } else if (musicVolume > 0) {
        bgMusicRef.current.play();
        setIsMusicPlaying(true);
      }
    }
  };

  return (
    <AudioContext.Provider 
      value={{ 
        playBreakSound, 
        toggleBackgroundMusic, 
        isMusicPlaying, 
        setIsMusicPlaying,
        musicVolume,
        setMusicVolume,
        effectsVolume,
        setEffectsVolume
      }}
    >
      <audio 
        ref={breakSoundRef}
        src={breakBlocksSound}
        preload="auto"
      />
      <audio 
        ref={bgMusicRef}
        src={backgroundMusic}
        loop
        preload="auto"
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
}
