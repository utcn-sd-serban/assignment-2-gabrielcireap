import React, { Component } from "react";
import question from "../../model/question";
import QuestionsTable from "./QuestionsTable";
import QuestionsInput from "./QuestionsInput";
import QuestionsTablePresenter from "../../presenter/QuestionsTablePresenter";

const mapQuestionStateToComponentState = questionState => ({
    questions: question.sort(questionState.questions),
    title: questionState.newQuestion.title,
    text: questionState.newQuestion.text,
    tags: questionState.newQuestion.tags
});

export default class SmartQuestionsTable extends Component {
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

            <div className="has-background-light" className="container">

                <h2 className="title">
                    Ask Questions
                </h2>

                <QuestionsInput
                    title={this.state.title}
                    text={this.state.text}
                    tags={this.state.tags}
                    onChange={QuestionsTablePresenter.onChange}
                    onCreate={QuestionsTablePresenter.onCreate}
                    onEditQuestion={QuestionsTablePresenter.onEditQuestion}
                />

                <QuestionsTable
                    questions={this.state.questions}
                    onAnswer={QuestionsTablePresenter.onAnswer}
                    onDeleteQuestion={QuestionsTablePresenter.onDeleteQuestion}
                    onUpvoteQuestion={QuestionsTablePresenter.onUpvoteQuestion}
                    onDownvoteQuestion={QuestionsTablePresenter.onDownvoteQuestion}
                />
            </div>
        );
    }
}