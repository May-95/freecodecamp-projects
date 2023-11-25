import DOMPurify from "dompurify";
import { marked } from "marked";

function Preview(props) {
  marked.use({
    breaks: true,
  });

  return (
    <>
      <div className="section-container">
        <h2 className="section-title">Preview</h2>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(marked.parse(props.text)),
          }}
          name="preview"
          id="preview"
          className="section"
          defaultValue={DOMPurify.sanitize(marked.parse(props.text))}></div>
      </div>
    </>
  );
}

export default Preview;
