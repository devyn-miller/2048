import React from 'react';
import { Tile as TileType } from '../types/game';
import { useTheme } from '../contexts/ThemeContext';

// Import Minecraft block images
import dirtImage from './images/dirt.png';
import ironOreImage from './images/iron-ore.webp';
import ironImage from './images/iron.png';
import polishedGraniteImage from './images/polished-granite.png';
import ironBlockImage from './images/iron.png';
import goldBlockImage from './images/Block_of_Gold_JE6_BE3.png';
import diamondBlockImage from './images/Block_of_Diamond_JE6_BE3.png';
import emeraldBlockImage from './images/Block_of_Emerald_JE4_BE3.png';
import netheriteBlockImage from './images/Block_of_Netherite_JE1_BE1.png';
import quartzBlockImage from './images/quartz.png';
import beaconImage from './images/beacon.png';
import endStoneImage from './images/end-stone.png';
import obsidianImage from './images/obsidian.webp';
import eggImage from './images/egg.png';

// Mapping of tile values to Minecraft block images
const MINECRAFT_BLOCK_IMAGES: { [key: number]: string } = {
  2: dirtImage,
  4: ironOreImage,
  8: ironImage,
  16: polishedGraniteImage,
  32: ironBlockImage,
  64: goldBlockImage,
  128: diamondBlockImage,
  256: emeraldBlockImage,
  512: netheriteBlockImage,
  1024: quartzBlockImage,
  2048: beaconImage,
  4096: endStoneImage,
  8192: obsidianImage,
  16384: eggImage
};

interface TileProps {
  tile: TileType;
  cellSize: number;
  gap: number;
}

export function Tile({ tile, cellSize, gap }: TileProps) {
  const { value, position } = tile;
  const blockImage = MINECRAFT_BLOCK_IMAGES[value];
  
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
  };

  const imageContainerStyle = {
    width: '90%',
    height: '90%',
    position: 'relative' as const,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    backgroundImage: blockImage ? `url(${blockImage})` : 'none',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    imageRendering: 'pixelated' as const,
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
      <div style={imageContainerStyle}>
        <div style={imageStyle} />
        <div style={valueStyle}>{value}</div>
      </div>
    </div>
  );
}