
import './App.css';
import colorPicker from './ColorPicker.css';
import React, { useState } from 'react';
import Slider from './Slider';
const MIN = 0;
const MAX = 255;

function App() {
  const [red, setRed]     = useState(getRandomIntegerBetween(MIN, MAX));
  const [green, setGreen] = useState(getRandomIntegerBetween(MIN, MAX));
  const [blue, setBlue]   = useState(getRandomIntegerBetween(MIN, MAX));
  const [showResult, setShowResult] = useState(false);
  const [cheatingMode, setCheatMode] = useState(false);
  
  const [userGuess, setUserGuess] = useState({ red: 0, green: 0, blue: 0 });
  // Function to handle user's guess
  const handleGuess = () => {
    
    setShowResult(true);
      
  
  };

  const handleNext = () => {
      window.location.reload(false);
  };

  // Function to update user's guess
  const handleSliderChange = (color, value) => {
    setUserGuess((prevGuess) => ({ ...prevGuess, [color]: value }));
  };

  const handleCheatingMode = (e) => {
    setCheatMode(e.target.checked);
  };

  return (
    

  <div className="App">
    <div style={{position:"absolute", top:"0",right: "0", margin: "10px"}}>
      <label>
        Cheating Mode: 
        <input type="checkbox" onChange={handleCheatingMode} />
      </label>
    </div>
      <div id="color-preview" style={{backgroundColor: `rgb(${red}, ${green}, ${blue})`}} />
      {showResult && !cheatingMode && (
      <div id="user-guess" style={{ backgroundColor: `rgb(${userGuess.red}, ${userGuess.green}, ${userGuess.blue})` }} />
      )}
      {cheatingMode && (
        <div id="cheating-color" style={{ backgroundColor: `rgb(${userGuess.red}, ${userGuess.green}, ${userGuess.blue})` }}>
        
        </div>
      )}
      <div id="color-picker">
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(255, 0, 0, ${red/MAX})`  }}>Red:</span>
          <Slider min={MIN} max={MAX} startingValue={userGuess.red} onChange={r => handleSliderChange('red', r)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 255, 0, ${green/MAX})`}}>Green:</span>
          <Slider min={MIN} max={MAX} startingValue={userGuess.green} onChange={g => handleSliderChange('green',g)} />
        </div>
        <div className="row">
          <span className="component-color-preview" style={{backgroundColor: `rgb(0, 0, 255, ${blue/MAX})` }}>Blue:</span>
          <Slider min={MIN} max={MAX} startingValue={userGuess.blue} onChange={b => handleSliderChange('blue', b)} />
      </div>
  </div>
      {/* Button to submit the guess */}
      {!showResult && <button onClick={handleGuess}>Guess</button>}
      {showResult && (
        <div>
            <div
            style={{backgroundColor: `rgb(${userGuess.red}, ${userGuess.green}, ${userGuess.blue})`}}
            ></div>
          <p>
            Your guess: rgb({userGuess.red}, {userGuess.green}, {userGuess.blue}). Actual:{' '}
            <strong>rgb({red}, {green}, {blue})</strong>
          </p>
          <button onClick={handleNext}>Next</button>
        </div>
      )}

  </div>
  );
};

export default App;

function getRandomIntegerBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
