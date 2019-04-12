
import React from "react";

const QuestionSearchByTitle = ({ title, onChange, onSearch }) => (
    <div>
        <label> Title: </label>
        <input value={title}
            onChange={e => onChange("title", e.target.value)} />
        <br />

        <button onClick={onSearch}> Search </button>
    </div>
);

export default QuestionSearchByTitle;