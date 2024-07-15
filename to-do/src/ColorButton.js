import React from 'react';
import { useTheme } from './ThemeContext';

const ColorButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="color-button-container">
      <button className="color-button" onClick={toggleTheme}>
        Switch to {theme === "light" ? "dark" : "light"} mode
      </button>
    </div>
  );
};

export default ColorButton;
