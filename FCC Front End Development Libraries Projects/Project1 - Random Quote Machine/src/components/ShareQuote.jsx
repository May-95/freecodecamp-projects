function ShareQuote(props) {
  const quote =
    props.quote.length != 0
      ? `"${props.quote.q}" — ${props.quote.a}`
      : `"No man is happy unless he believes he is." — Publilius Syrus`;
  return (
    <>
      <a
        href={`https://twitter.com/intent/tweet?text=${quote}&hashtags=quote`}
        id="tweet-quote"
        target="_blank">
        <button
          type="button"
          style={{
            backgroundColor: props.backgroundColor.backgroundColor,
            borderColor: props.backgroundColor.backgroundColor,
            color: "white",
          }}
          className="btn btn-primary background">
          <i className="bi bi-twitter"></i>
        </button>
      </a>
    </>
  );
}

export default ShareQuote;
