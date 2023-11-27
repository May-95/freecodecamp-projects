import { useEffect, useState } from "react";
import "./App.css";
import Key from "./Key";

function App() {
  const [text, setText] = useState("Press key to play");

  function display(displayText) {
    setText(displayText);
  }

  useEffect(() => {
    window.addEventListener("keydown", (event) => {
      play(event.key.toUpperCase());
    });
  });

  function play(key) {
    const audio = document.getElementById(key);
    audio.currentTime = 0;
    audio.play();
  }

  const drumPads = [
    {
      drumPad: "Q",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
      description: "Heater 1",
      bg: "bg1",
    },
    {
      drumPad: "W",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
      description: "Heater 2",
      bg: "bg2",
    },
    {
      drumPad: "E",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
      description: "Heater 3",
      bg: "bg1",
    },
    {
      drumPad: "A",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
      description: "Heater 4",
      bg: "bg2",
    },
    {
      drumPad: "S",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
      description: "Clap",
      bg: "bg1",
    },
    {
      drumPad: "D",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
      description: "Open-HH",
      bg: "bg2",
    },
    {
      drumPad: "Z",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
      description: "Kick-n'-Hat",
      bg: "bg1",
    },
    {
      drumPad: "X",
      src: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
      description: "Kick",
      bg: "bg2",
    },
    {
      drumPad: "C",
      src: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
      description: "Closed-HH",
      bg: "bg1",
    },
  ];

  return (
    <>
      <div
        className="drum-machine"
        id="drum-machine">
        <h1
          className="display"
          id="display">
          {text}
        </h1>
        <div className="container">
          {drumPads.map((drum) => {
            return (
              <Key
                key={drum.drumPad}
                drumPad={drum.drumPad}
                src={drum.src}
                description={drum.description}
                bg={drum.bg}
                display={display}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
