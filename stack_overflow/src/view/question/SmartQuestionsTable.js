import React, { Component } from "react";
import question from "../../model/question";
import QuestionsTable from "./QuestionsTable";
import QuestionsInput from "./QuestionsInput";
import QuestionsTablePresenter from "../../presenter/QuestionsTablePresenter";

const mapQuestionStateToComponentState = questionState => ({
    questions: questionState.questions,
    searchedQuestions: questionState.searchedQuestions,
    id: questionState.newQuestion.id,
    title: questionState.newQuestion.title,
    text: questionState.newQuestion.text,
    voteCount: questionState.newQuestion.voteCount,
    creationDate: questionState.newQuestion.creationDate,
    tags: questionState.newQuestion.tags,
});

export default class SmartQuestionsTable extends Component {
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
                <QuestionsInput
                    title={this.state.title}
                    text={this.state.text}
                    tags={this.state.tags}
                    onChange={QuestionsTablePresenter.onChange}
                    onCreate={QuestionsTablePresenter.onCreate}
                />

                <QuestionsTable
                    questions={this.state.questions}
                />
            </div>
        );
    }
}