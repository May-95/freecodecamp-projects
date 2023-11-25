function Editor(props) {
  return (
    <>
      <div>
        <h2 className="section-title">Editor</h2>
        <textarea
          name="editor"
          id="editor"
          cols="90"
          rows="30"
          className="section"
          defaultValue={props.text}
          onChange={props.onChange}></textarea>
      </div>
    </>
  );
}

export default Editor;
