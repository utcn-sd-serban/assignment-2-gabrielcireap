
import React from "react";

const QuestionsInput = ({ title, text, tags, onChange, onCreate }) => (
    <div>

        <label> Title: </label>
        <input value={title}
            onChange={e => onChange("title", e.target.value)} />
        <br />

        <label> Text: </label>
        <input value={text}
            onChange={e => onChange("text", e.target.value)} />
        <br />

        <label> Tags: </label>
        <input value={tags}
            onChange={e => onChange("tags", e.target.value)} />
        <br />
        <button onClick={onCreate}> Create!</button>
    </div>
);

export default QuestionsInput;