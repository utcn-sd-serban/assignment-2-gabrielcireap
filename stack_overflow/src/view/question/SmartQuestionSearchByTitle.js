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
        question.addListener("changeQuestion", this.listener);
    }

    componentWillUnmount() {
        question.removeListener("changeQuestion", this.listener);
    }

    render() {
        return (

            <div className="container" className="has-background-light">
                <h2 className="title">
                    Search Questions by Title
                </h2>

                <QuestionSearchByTitle
                    title={this.state.title}
                    onChange={QuestionSearchPresenter.onChange}
                    onSearch={QuestionSearchPresenter.onSearch}
                />

                <QuestionsTable
                    questions={this.state.searchedQuestions}
                    onAnswer={QuestionSearchPresenter.onAnswer}
                    onDeleteQuestion={QuestionSearchPresenter.onDeleteQuestion}
                    onUpvoteQuestion={QuestionSearchPresenter.onUpvoteQuestion}
                    onDownvoteQuestion={QuestionSearchPresenter.onDownvoteQuestion}
                />
            </div>
        );
    }
}