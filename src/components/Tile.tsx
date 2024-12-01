import React, { useEffect, useState } from 'react';
import { Tile as TileType } from '../types/game';
import { useTheme } from '../contexts/ThemeContext';

// Import Minecraft block images
import dirtImage from './images/dirt.png';
import cobblestoneImage from './images/cobblestone.png';
import deepslateImage from './images/deepslate.png';
import redstoneImage from './images/Block_of_Redstone_JE2_BE2.png';
import ironBlockImage from './images/iron.png';
import goldBlockImage from './images/Block_of_Gold_JE6_BE3.png';
import diamondBlockImage from './images/Block_of_Diamond_JE6_BE3.png';
import emeraldBlockImage from './images/Block_of_Emerald_JE4_BE3.png';
import netheriteBlockImage from './images/Block_of_Netherite_JE1_BE1.png';
import pinkCoralBlockImage from './images/pink-coral.png';
import beaconImage from './images/beacon.png';
import endStoneImage from './images/end-stone.png';
import obsidianImage from './images/obsidian.webp';
import dragonImage from './images/dragon.png';

// Mapping of tile values to Minecraft block images
const MINECRAFT_BLOCK_IMAGES: { [key: number]: string } = {
  2: dirtImage,
  4: cobblestoneImage,
  8: deepslateImage,
  16: redstoneImage,
  32: ironBlockImage,
  64: goldBlockImage,
  128: diamondBlockImage,
  256: emeraldBlockImage,
  512: netheriteBlockImage,
  1024: pinkCoralBlockImage,
  2048: beaconImage,
  4096: endStoneImage,
  8192: obsidianImage,
  16384: dragonImage
};

interface TileProps {
  tile: TileType;
  cellSize: number;
  gap: number;
}

export function Tile({ tile, cellSize, gap }: TileProps) {
  const { value, position, merging } = tile;
  const blockImage = MINECRAFT_BLOCK_IMAGES[value];
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (merging) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 400);
      return () => clearTimeout(timer);
    }
  }, [merging]);
  
  const containerStyle = {
    transform: `translate(${position.col * (cellSize + gap)}px, ${position.row * (cellSize + gap)}px)`,
    transition: 'all 100ms ease-in-out',
    position: 'absolute' as const,
    width: `${cellSize}px`,
    height: `${cellSize}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
    left: -2,
    top: 0,
  };

  const imageContainerStyle = {
    width: '100%',
    height: '100%',
    position: 'relative' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    animation: isAnimating ? 'tileSpawn 400ms ease-in-out' : undefined,
    transform: 'translateX(-6px)',
  };

  const glowStyle = {
    position: 'absolute' as const,
    inset: '-25%',
    background: isAnimating
      ? 'radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(255,215,0,0.8) 30%, rgba(255,255,255,0) 70%)'
      : 'none',
    opacity: isAnimating ? 1 : 0,
    transition: 'opacity 400ms ease-in-out',
    animation: isAnimating ? 'glowPulse 400ms ease-in-out' : undefined,
    pointerEvents: 'none' as const,
    mixBlendMode: 'screen' as const,
    filter: 'blur(4px)',
    zIndex: 1,
  };

  const sparkleStyle = {
    position: 'absolute' as const,
    width: '200%',
    height: '200%',
    top: '-50%',
    left: '-50%',
    opacity: isAnimating ? 1 : 0,
    animation: isAnimating ? 'sparkle 600ms linear' : undefined,
    pointerEvents: 'none' as const,
    zIndex: 2,
  };

  const sparkleInnerStyle = {
    position: 'absolute' as const,
    width: '100%',
    height: '100%',
    animation: isAnimating ? 'sparkleSpin 300ms linear infinite' : undefined,
    backgroundImage: `
      radial-gradient(circle at 50% 0%, white 0%, transparent 6%),
      radial-gradient(circle at 100% 50%, white 0%, transparent 6%),
      radial-gradient(circle at 50% 100%, white 0%, transparent 6%),
      radial-gradient(circle at 0% 50%, white 0%, transparent 6%),
      radial-gradient(circle at 85% 15%, white 0%, transparent 5%),
      radial-gradient(circle at 15% 85%, white 0%, transparent 5%),
      radial-gradient(circle at 85% 85%, white 0%, transparent 5%),
      radial-gradient(circle at 15% 15%, white 0%, transparent 5%)
    `,
    filter: 'blur(0.5px)',
  };

  const sparkleInnerStyle2 = {
    ...sparkleInnerStyle,
    animation: isAnimating ? 'sparkleSpin2 400ms linear infinite' : undefined,
    transform: 'scale(0.8)',
  };

  const imageStyle = {
    width: '90%',
    height: '90%',
    backgroundImage: blockImage ? `url(${blockImage})` : 'none',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated' as const,
    filter: isAnimating ? 'brightness(1.5) contrast(1.2)' : undefined,
    transform: isAnimating ? 'scale(1.15)' : 'scale(1)',
    transition: 'all 150ms ease-in-out',
    position: 'relative' as const,
    zIndex: 3,
  };

  const valueStyle = {
    position: 'absolute' as const,
    bottom: '2px',
    right: '4px',
    fontSize: `${cellSize / 6}px`,
    fontWeight: 'bold',
    color: '#fff',
    textShadow: '1px 1px 2px rgba(0,0,0,0.8), -1px -1px 2px rgba(0,0,0,0.8)',
    zIndex: 11,
    padding: '2px',
    lineHeight: 1,
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes tileSpawn {
            0% { transform: scale(1); }
            50% { transform: scale(1.2); }
            100% { transform: scale(1); }
          }

          @keyframes glowPulse {
            0% { opacity: 0; transform: scale(0.8) rotate(0deg); }
            50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
            100% { opacity: 0; transform: scale(1.4) rotate(360deg); }
          }

          @keyframes sparkle {
            0% { transform: scale(0.4) rotate(0deg); opacity: 0; }
            25% { transform: scale(0.8) rotate(90deg); opacity: 1; }
            50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
            75% { transform: scale(0.8) rotate(270deg); opacity: 1; }
            100% { transform: scale(0.4) rotate(360deg); opacity: 0; }
          }

          @keyframes sparkleSpin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }

          @keyframes sparkleSpin2 {
            from { transform: rotate(360deg) scale(0.8); }
            to { transform: rotate(0deg) scale(0.8); }
          }
        `}
      </style>
      <div style={imageContainerStyle}>
        <div style={glowStyle} />
        <div style={sparkleStyle}>
          <div style={sparkleInnerStyle} />
          <div style={sparkleInnerStyle2} />
        </div>
        <div style={imageStyle} />
        <div style={valueStyle}>{value}</div>
      </div>
    </div>
  );
}