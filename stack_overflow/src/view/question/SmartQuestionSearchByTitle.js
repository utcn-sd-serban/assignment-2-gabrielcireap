import React, { Component } from "react";
import question from "../../model/question";
import QuestionsTable from "./QuestionsTable";
import QuestionSearchPresenter from "../../presenter/QuestionSearchPresenter";
import QuestionSearchByTitle from "./QuestionSearchByTitle";

const mapQuestionStateToComponentState = questionState => ({
    searchedQuestions: questionState.searchedQuestions
});

export default class SmartQuestionsSearchByTitle extends Component {
    constructor() {
        super();
        this.state = mapQuestionStateToComponentState(question.state);
        this.listener = questionState => this.setState(mapQuestionStateToComponentState(questionState));
        question.addListener("change", this.listener);
    }

    componentWillUnmount() {
        question.removeListener("change", this.listener);
    }

    render() {
        return (

            <div>
                <h2> Questions </h2>
                <QuestionSearchByTitle
                    title={this.state.title}
                    onChange={QuestionSearchPresenter.onChange}
                    onSearch={QuestionSearchPresenter.onSearch}
                />

                <QuestionsTable
                    questions={this.state.searchedQuestions}
                    onAnswer={QuestionSearchPresenter.onAnswer}
                />
            </div>
        );
    }
}