import React, { useState } from 'react';
import { GameConfig } from '../types/game';
import { Save } from 'lucide-react';
import { Tooltip } from './Tooltip';
import { useBackground, backgroundThemes } from '../contexts/BackgroundContext';

interface GameSettingsProps {
  config: GameConfig;
  onConfigChange: (newConfig: GameConfig) => void;
  onClose: () => void;
}

export function GameSettings({ config, onConfigChange, onClose }: GameSettingsProps) {
  const [localConfig, setLocalConfig] = useState(config);
  const [hasChanges, setHasChanges] = useState(false);
  const { setCurrentTheme } = useBackground();

  const handleGridSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = parseInt(event.target.value);
    const newConfig = { ...localConfig, gridSize: newSize };
    setLocalConfig(newConfig);
    setHasChanges(true);
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTheme = event.target.value as keyof typeof backgroundThemes;
    const newConfig = { ...localConfig, theme: newTheme };
    setLocalConfig(newConfig);
    setCurrentTheme(newTheme);
    setHasChanges(true);
  };

  const handleWinningTileChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newTile = parseInt(event.target.value);
    const newConfig = { ...localConfig, winningTile: newTile };
    setLocalConfig(newConfig);
    setHasChanges(true);
  };

  const handleSaveChanges = () => {
    onConfigChange(localConfig);
    setHasChanges(false);
    onClose();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Game Settings</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Grid Size</h3>
        <div className="flex items-center gap-2">
          <select
            value={localConfig.gridSize}
            onChange={handleGridSizeChange}
            className="bg-opacity-50 bg-black text-white rounded px-2 py-1"
          >
            <option value={4}>4x4</option>
            <option value={5}>5x5</option>
            <option value={6}>6x6</option>
            <option value={8}>8x8</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Winning Tile</h3>
        <div className="flex items-center gap-2">
          <select
            value={localConfig.winningTile}
            onChange={handleWinningTileChange}
            className="bg-opacity-50 bg-black text-white rounded px-2 py-1"
          >
            <option value={1024}>1024</option>
            <option value={2048}>2048</option>
            <option value={4096}>4096</option>
            <option value={8192}>8192</option>
          </select>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-4">Background Theme</h3>
        <div className="flex items-center gap-2">
          <select
            value={localConfig.theme}
            onChange={handleThemeChange}
            className="bg-opacity-50 bg-black text-white rounded px-2 py-1"
          >
            {Object.entries(backgroundThemes).map(([key, theme]) => (
              <option key={key} value={key}>
                {theme.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {hasChanges && (
        <div className="flex justify-end">
          <button
            onClick={handleSaveChanges}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
}