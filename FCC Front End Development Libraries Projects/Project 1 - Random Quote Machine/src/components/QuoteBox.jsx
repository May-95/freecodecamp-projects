import Quote from "./Quote";
import ShareQuote from "./ShareQuote";
import NewQuote from "./NewQuote";

function QuoteBox(props) {
  return (
    <>
      <div
        className="quote-box"
        id="quote-box">
        <Quote
          backgroundColor={props.backgroundColor}
          quote={props.quote}
        />
        <div className="container">
          <ShareQuote
            backgroundColor={props.backgroundColor}
            quote={props.quote}
          />
          <NewQuote
            backgroundColor={props.backgroundColor}
            newQuote={props.newQuote}
          />
        </div>
      </div>
    </>
  );
}

export default QuoteBox;
