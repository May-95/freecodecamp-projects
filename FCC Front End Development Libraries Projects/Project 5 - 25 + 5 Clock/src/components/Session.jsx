function Session(props) {
  return (
    <>
      <div>
        <h2
          className="session-label"
          id="session-label">
          Session Length
        </h2>
        <div className="flex-row update-time">
          <button
            id="session-decrement"
            className="increment-decrement"
            onClick={props.sessionDecrement}>
            <i class="bi bi-dash-square-fill"></i>
          </button>
          <p
            id="session-length"
            className="session-length">
            {props.sessionTime}
          </p>
          <button
            id="session-increment"
            className="increment-decrement"
            onClick={props.sessionIncrement}>
            <i class="bi bi-plus-square-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Session;
