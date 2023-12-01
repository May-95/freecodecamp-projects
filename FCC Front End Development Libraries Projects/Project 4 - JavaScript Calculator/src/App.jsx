import { useState } from "react";
import "./App.css";
import Button from "./Button";

function App() {
  const [result, setResult] = useState(0);
  const [current, setCurrent] = useState(0);
  const operations = ["+", "-", "*", "/"];

  function calculate(e) {
    switch (e.target.name) {
      case "AC":
        setResult(0);
        setCurrent(0);
        break;
      case "=":
        calculateEquation();
        break;
      case ".":
        const splitResult = result.split(/[+,\-,*,/]/);
        if (current == ".") {
          break;
        } else if (
          (splitResult[0].includes(".") && splitResult.length == 1) ||
          splitResult.slice(-1).includes(".")
        ) {
          break;
        } else {
          setCurrent(e.target.name);
          setResult(`${result}${e.target.name}`);
          break;
        }
      case "+":
      case "-":
      case "/":
      case "*":
        if (result == 0) {
          break;
        } else if (operations.includes(current.toString())) {
          if (e.target.name == "-") {
            setResult(`${result}${e.target.name}`);
            setCurrent(e.target.name);
            break;
          } else if (current == "-") {
            const newResult = result.slice(0, -2);
            setResult(`${newResult}${e.target.name}`);
            break;
          } else {
            const newResult = result.slice(0, -1);
            setResult(`${newResult}${e.target.name}`);
            break;
          }
        } else {
          setResult(`${result}${e.target.name}`);
          setCurrent(e.target.name);
          break;
        }
      default:
        setCurrent(e.target.name);
        if (result == 0) {
          setResult(e.target.name);
        } else {
          setResult(`${result}${e.target.name}`);
        }
    }
  }

  function calculateEquation() {
    const answer = eval(result);
    setResult(answer);
  }

  const buttons = [
    {
      text: "AC",
      description: "clear",
    },
    {
      text: "/",
      description: "divide",
    },
    {
      text: "*",
      description: "multiply",
    },
    {
      text: "7",
      description: "seven",
    },
    {
      text: "8",
      description: "eight",
    },
    {
      text: "9",
      description: "nine",
    },
    {
      text: "-",
      description: "subtract",
    },
    {
      text: "4",
      description: "four",
    },
    {
      text: "5",
      description: "five",
    },
    {
      text: "6",
      description: "six",
    },
    {
      text: "+",
      description: "add",
    },
    {
      text: "1",
      description: "one",
    },
    {
      text: "2",
      description: "two",
    },
    {
      text: "3",
      description: "three",
    },
    {
      text: "=",
      description: "equals",
    },
    {
      text: "0",
      description: "zero",
    },
    {
      text: ".",
      description: "decimal",
    },
  ];

  return (
    <>
      <div className="container">
        <h1
          className="display"
          id="display">
          {result}
        </h1>
        <div className="buttons-container">
          {buttons.map((button) => {
            return (
              <Button
                key={button.description}
                text={button.text}
                description={button.description}
                calculate={calculate}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
