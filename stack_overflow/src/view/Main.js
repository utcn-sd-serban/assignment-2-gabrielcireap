import React from "react";
import QuestionsTable from "./question/QuestionsTable";
import MainPresenter from "../presenter/MainPresenter";

const Main = ({ questions, onAskQuestion, onSearchQuestionTitle, onSearchQuestionTag, onAnswer }) => (
    <div>
        <h2> Assignment 2 </h2>
        <button onClick={onAskQuestion}> Ask Question </button>
        <button onClick={onSearchQuestionTitle}> Search Questions by Title </button>
        <button onClick={onSearchQuestionTag}> Search Questions by Tag </button>
        <br />
        <h1> Questions </h1>
        <QuestionsTable
            questions={questions}
            onAnswer={onAnswer}
        />
    </div>
);

export default Main;