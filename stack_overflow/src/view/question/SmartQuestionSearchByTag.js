import React, { Component } from "react";
import question from "../../model/question";
import QuestionsTable from "./QuestionsTable";
import QuestionSearchTagPresenter from "../../presenter/QuestionSearchTagPresenter";
import QuestionSearchByTag from "./QuestionSearchByTitle";

const mapQuestionStateToComponentState = questionState => ({
    searchedQuestions: questionState.searchedQuestions
});

export default class SmartQuestionSearchByTag extends Component {
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

            <div>
                <h2> Questions - Search by Tag </h2>
                <QuestionSearchByTag
                    title={this.state.title}
                    onChange={QuestionSearchTagPresenter.onChange}
                    onSearch={QuestionSearchTagPresenter.onSearch}
                />

                <QuestionsTable
                    questions={this.state.searchedQuestions}
                    onAnswer={QuestionSearchTagPresenter.onAnswer}
                    onDeleteQuestion={QuestionSearchTagPresenter.onDeleteQuestion}
                    onUpvoteQuestion={QuestionSearchTagPresenter.onUpvoteQuestion}
                    onDownvoteQuestion={QuestionSearchTagPresenter.onDownvoteQuestion}
                />
            </div>
        );
    }
}