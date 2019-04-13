import question from "../model/question";
import Main from "./Main";
import React, { Component } from "react";
import MainPresenter from "../presenter/MainPresenter";

const mapMainStateToComponentState = mainState => ({
    questions: mainState.questions
});

export default class SmartMain extends Component {
    constructor() {
        super();
        this.state = mapMainStateToComponentState(question.state);
        this.listener = mainState => this.setState(mapMainStateToComponentState(mainState));
        question.addListener("change", this.listener);
    }

    componentWillUnmount() {
        question.removeListener("change", this.listener);
    }

    render() {
        return (
            <Main
                questions={this.state.questions}
                onAskQuestion={MainPresenter.onAskQuestion}
                onSearchQuestionTitle={MainPresenter.onSearchQuestionTitle}
                onSearchQuestionTag={MainPresenter.onSearchQuestionTag}
                onAnswer={MainPresenter.onAnswer}
                onUpvoteQuestion={MainPresenter.onUpvoteQuestion}
                onDownvoteQuestion={MainPresenter.onDownvoteQuestion}
            />
        );
    }
}