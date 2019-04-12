import question from "../model/question";
import Main from "./Main";
import React, { Component } from "react";
import mainPresenter from "../presenter/MainPresenter";

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
                onAskQuestion={mainPresenter.onAskQuestion}
                onSearchQuestionTitle={mainPresenter.onSearchQuestionTitle}
                onSearchQuestionTag={mainPresenter.onSearchQuestionTag}
                onAnswer={mainPresenter.onAnswer}
            />
        );
    }
}