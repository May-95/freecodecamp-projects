function Time(props) {
  return (
    <>
      <div className="time-controls">
        <div className="timer-container">
          <h2
            className="timer-label"
            id="timer-label">
            Session
          </h2>
          <p
            className="time-left"
            id="time-left">
            {props.timeLeftText}
          </p>
          <audio
            src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
            id="beep"
            controls
          />
        </div>
        <div className="controls-container">
          <button
            className="start_stop"
            id="start_stop"
            onClick={props.countdown}>
            start
          </button>
          <button
            className="reset"
            id="reset"
            onClick={props.reset}>
            reset
          </button>
        </div>
      </div>
    </>
  );
}

export default Time;
