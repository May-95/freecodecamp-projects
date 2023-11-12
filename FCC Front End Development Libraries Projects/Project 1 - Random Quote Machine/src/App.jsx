import { useState } from "react";
import "./App.css";
import QuoteBox from "./components/QuoteBox";

function App() {
  const randomNum = () => {
    return Math.floor(Math.random() * (245 - 0 + 1)) + 0;
  };
  let backgroundColor = `rgb(${randomNum()}, ${randomNum()}, ${randomNum()})`;

  const [quote, setQuote] = useState([]);

  const handleClick = async () => {
    try {
      const data = await (await fetch("/api")).json();
      setQuote(data[0]);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <main
        className="wrapper"
        style={(backgroundColor = { backgroundColor })}>
        <QuoteBox
          backgroundColor={backgroundColor}
          quote={quote}
          newQuote={handleClick}
        />
      </main>
    </>
  );
}

export default App;
