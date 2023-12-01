function Break(props) {
  return (
    <>
      <div>
        <h2
          className="break-label"
          id="break-label">
          Break Length
        </h2>
        <div className="flex-row update-time">
          <button
            id="break-decrement"
            className="increment-decrement"
            onClick={props.breakDecrement}>
            <i class="bi bi-dash-square-fill"></i>
          </button>
          <p
            id="break-length"
            className="break-length">
            {props.breakTime}
          </p>
          <button
            id="break-increment"
            className="increment-decrement"
            onClick={props.breakIncrement}>
            <i class="bi bi-plus-square-fill"></i>
          </button>
        </div>
      </div>
    </>
  );
}

export default Break;
