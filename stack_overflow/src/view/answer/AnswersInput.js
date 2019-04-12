
import React from "react";

const AnswersInput = ({ text, currentQuestion, onChange, onCreate }) => (
    <div>
        <label> Text: </label>
        <input value={text}
            onChange={e => onChange("text", e.target.value)} />
        <br />
        <button onClick={() => onCreate(currentQuestion)}> Create!</button>
    </div>
);

export default AnswersInput;