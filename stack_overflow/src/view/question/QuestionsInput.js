
import React from "react";

const QuestionsInput = ({ title, text, tags, onChange, onCreate, onEditQuestion }) => (
    <div className="container" className="has-background-light">

        <div className="column is-one-quarter">
            <label class="label"> Title </label>
            <input value={title} onChange={e => onChange("title", e.target.value)} class="input" type="text" placeholder="Text input" />
        </div>

        <div className="column is-one-quarter">
            <label class="label"> Text </label>
            <input value={text} onChange={e => onChange("text", e.target.value)} class="input" type="text" placeholder="Text input" />
        </div>

        <div className="column is-one-quarter">
            <label class="label"> Tags/Id </label>
            <input value={tags} onChange={e => onChange("tags", e.target.value)} class="input" type="text" placeholder="Text input" />
        </div>
        
        <div class="control">
            <button class="button is-link" onClick={onCreate}> Create </button>
        </div>
        <br />
        <div class="control">
            <button class="button is-link" onClick={onEditQuestion}> Edit </button>
        </div>
    </div>
);

export default QuestionsInput;