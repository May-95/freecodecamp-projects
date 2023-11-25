import { useState } from "react";
import "./App.css";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

function App() {
  const defaultText = `# Heading level 1

## Heading level 2

I just love **bold text**

My favourite search engine is [Duck Duck Go](https://duckduckgo.com).

Heres some code, \`<div></div>\`, between 2 backticks.

#### Code block
\`\`\`
function test() {
  console.log("notice the blank line before this function?");
}
\`\`\`

#### Lists
1. First item
2. Second item
3. Third item
4. Fourth item

#### Blockquote
To create a blockquote, add a > in front of a paragraph.
> Dorothy followed her through many of the beautiful rooms in her castle.

#### Image
![Google logo!](https://www.google.co.uk/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png "Google logo")
    `;

  const [text, setText] = useState(defaultText);

  function onChange(e) {
    setText(e.target.value);
  }

  return (
    <>
      <div className="container">
        <h1 className="title">Markdown Previewer</h1>
        <div className="main">
          <Editor
            text={text}
            onChange={onChange}
          />
          <Preview text={text} />
        </div>
      </div>
    </>
  );
}

export default App;
