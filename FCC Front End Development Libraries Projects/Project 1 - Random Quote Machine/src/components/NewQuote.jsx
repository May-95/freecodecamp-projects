function NewQuote(props) {
  return (
    <>
      <button
        type="button"
        onClick={props.newQuote}
        style={{
          backgroundColor: props.backgroundColor.backgroundColor,
          borderColor: props.backgroundColor.backgroundColor,
          color: "white",
        }}
        className="btn btn-primary background"
        id="new-quote">
        New Quote
      </button>
    </>
  );
}

export default NewQuote;
