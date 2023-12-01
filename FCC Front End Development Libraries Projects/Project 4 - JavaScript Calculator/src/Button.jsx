function Button(props) {
  return (
    <>
      <button
        className={`${props.description} buttons`}
        id={props.description}
        onClick={props.calculate}
        name={props.text}>
        {props.text == "*" ? "x" : props.text}
      </button>
    </>
  );
}

export default Button;
