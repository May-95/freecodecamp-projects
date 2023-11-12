function Quote(props) {
  return (
    <>
      <p
        className="text background"
        id="text"
        style={{ color: props.backgroundColor.backgroundColor }}>
        <i className="bi bi-quote"></i>
        {props.quote.length != 0
          ? props.quote.q
          : "No man is happy unless he believes he is."}
      </p>
      <p
        className="author background"
        id="author"
        style={{ color: props.backgroundColor.backgroundColor }}>
        — {props.quote.length != 0 ? props.quote.a : "Publilius Syrus"}
      </p>
    </>
  );
}

export default Quote;
