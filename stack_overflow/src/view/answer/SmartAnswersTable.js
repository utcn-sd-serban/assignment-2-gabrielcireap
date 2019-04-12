import React, { Component } from "react";
import answer from "../../model/answer";
import AnswersTable from "./AnswersTable";
import AnswersInput from "./AnswersInput";
import AnswersTablePresenter from "../../presenter/AnswersTablePresenter";
import question from "../../model/question";

const mapAnswerStateToComponentState = (answerState, props) => ({
    answers: answerState.answers,
    selectedQuestion: question.state.questions[props.match.params.id],
    text: answerState.newAnswer.text
});

export default class SmartAnswersTable extends Component {
    constructor(props) {
        super(props);
        this.state = mapAnswerStateToComponentState(answer.state, props);
        this.listener = answerState => this.setState(mapAnswerStateToComponentState(answerState, this.props));
        answer.addListener("change", this.listener);
    }

    componentDidUpdate(prev) {
        if (prev.match.params.id !== this.props.match.params.id) {
            this.setState(mapAnswerStateToComponentState(answer.state, this.props));
        }
    }


    componentWillUnmount() {
        answer.removeListener("change", this.listener);
    }

    render() {
        return (

            <div>
                <h2> Answers </h2>
                <AnswersInput
                    text={this.state.text}
                    currentQuestion={this.state.selectedQuestion}
                    onChange={AnswersTablePresenter.onChange}
                    onCreate={AnswersTablePresenter.onCreate}
                />

                <AnswersTable
                    answers={this.state.answers}
                />
            </div>
        );
    }
}