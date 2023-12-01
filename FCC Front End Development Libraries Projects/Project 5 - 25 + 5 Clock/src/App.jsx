import { useState, useEffect } from "react";
import "./App.css";
import Time from "./components/Time";
import Break from "./components/Break";
import Session from "./components/Session";

function App() {
  const [breakTime, setBreakTime] = useState(5);
  const [sessionTime, setSessionTime] = useState(25);
  const [timeLeftText, setTimeLeftText] = useState("25:00");
  const [timer, setTimer] = useState(0);
  const [sessionOn, setSessionOn] = useState(false);
  const [breakOn, setBreakOn] = useState(false);

  const breakDecrement = () => {
    setBreakTime((prev) => {
      const newBreak = prev - 1;
      return newBreak <= 0 ? 1 : newBreak;
    });
  };
  const breakIncrement = () => {
    setBreakTime((prev) => {
      const newBreak = prev + 1;
      return newBreak >= 60 ? 60 : newBreak;
    });
  };
  const sessionDecrement = () => {
    setSessionTime((prev) => {
      const newSession = prev - 1;
      return newSession <= 0 ? 1 : newSession;
    });
    setTimeLeftText(() => {
      if (sessionTime - 1 <= 1) {
        return "01:00";
      } else if (sessionTime - 1 < 10) {
        return "0" + (sessionTime - 1) + ":00";
      } else {
        return sessionTime - 1 + ":00";
      }
    });
  };
  const sessionIncrement = () => {
    setSessionTime((prev) => {
      const newSession = prev + 1;
      return newSession >= 60 ? 60 : newSession;
    });
    setTimeLeftText(() => {
      if (sessionTime + 1 >= 60) {
        return "60:00";
      } else if (sessionTime + 1 < 10) {
        return "0" + (sessionTime + 1) + ":00";
      } else {
        return sessionTime + 1 + ":00";
      }
    });
  };
  const reset = () => {
    const audio = document.getElementById("beep");
    audio.pause();
    audio.load();
    setTimer(0);
    setBreakTime(5);
    setSessionTime(25);
    setTimeLeftText("25:00");
    setSessionOn(false);
    setBreakOn(false);
    document.getElementById("start_stop").innerHTML = "start";
    document.getElementById("timer-label").innerHTML = "Session";
  };

  const playAudio = () => {
    document.getElementById("beep").play();
  };

  function start(e) {
    if (e.target.textContent == "start") {
      if (timer == 0) {
        startSession();
        setSessionOn(true);
      } else {
        setSessionOn(true);
      }
      document.getElementById("start_stop").innerHTML = "pause";
    } else {
      if (sessionOn) {
        setSessionOn(false);
        setBreakOn(false);
      } else if (breakOn) {
        setBreakOn(false);
        setSessionOn(false);
      }
      document.getElementById("start_stop").innerHTML = "start";
    }
  }

  function updateDisplay(timer) {
    const secondsDisplay = timer % 60;
    const minutesDisplay = Math.floor(timer / 60);
    const displayText = `${
      minutesDisplay < 10 ? "0" + minutesDisplay : minutesDisplay
    }:${secondsDisplay < 10 ? "0" + secondsDisplay : secondsDisplay}`;
    setTimeLeftText(displayText);
  }

  function startBreak() {
    const time = breakTime * 60;
    updateDisplay(time);
    setTimer(time);
    document.getElementById("timer-label").innerHTML = "Break";
  }

  function startSession() {
    const time = sessionTime * 60;
    updateDisplay(time);
    setTimer(time);
    document.getElementById("timer-label").innerHTML = "Session";
  }

  useEffect(() => {
    if ((!sessionOn && !breakOn) || breakOn) {
      return;
    }

    const sessionCountdown = setInterval(() => {
      setTimer((prev) => {
        if (timer == 1) {
          updateDisplay(timer - 1);
          playAudio();
          return prev - 1;
        } else if (timer <= 0) {
          playAudio();
          updateDisplay(timer);
          setSessionOn(false);
          setBreakOn(true);
          startBreak();
          return;
        } else {
          updateDisplay(timer - 1);
          return prev - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(sessionCountdown);
    };
  }, [timer, sessionOn, breakOn]);

  useEffect(() => {
    if ((!sessionOn && !breakOn) || sessionOn) {
      return;
    }

    const breakCountdown = setInterval(() => {
      setTimer((prev) => {
        if (timer == 1) {
          updateDisplay(timer - 1);
          playAudio();
          return prev - 1;
        } else if (timer <= 0) {
          playAudio();
          updateDisplay(timer);
          setBreakOn(false);
          setSessionOn(true);
          startSession();
          return;
        } else {
          updateDisplay(timer - 1);
          return prev - 1;
        }
      });
    }, 1000);
    return () => {
      clearInterval(breakCountdown);
    };
  }, [timer, sessionOn, breakOn]);

  return (
    <>
      <div className="container">
        <h1 className="title">25 + 5 Clock</h1>
        <div>
          <Time
            reset={reset}
            countdown={start}
            timeLeftText={timeLeftText}
          />
        </div>
        <div className="flex-row break-session">
          <Break
            breakDecrement={breakDecrement}
            breakTime={breakTime}
            breakIncrement={breakIncrement}
          />
          <Session
            sessionDecrement={sessionDecrement}
            sessionIncrement={sessionIncrement}
            sessionTime={sessionTime}
          />
        </div>
      </div>
    </>
  );
}

export default App;
