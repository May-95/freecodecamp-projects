function Key(props) {
  function clickPlay() {
    const audio = document.getElementById(props.drumPad);
    audio.currentTime = 0;
    audio.play();
    props.display(props.description);
  }

  return (
    <>
      <button
        className={`drum-pad ${props.bg}`}
        id={props.description}
        onClick={clickPlay}>
        <audio
          src={props.src}
          controls
          className="clip"
          id={props.drumPad}
        />
        {props.drumPad}
      </button>
    </>
  );
}

export default Key;
