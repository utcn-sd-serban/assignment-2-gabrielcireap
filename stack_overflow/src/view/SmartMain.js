import question from "../model/question";
import Main from "./Main";
import user from "../model/User";
import React, { Component } from "react";
import MainPresenter from "../presenter/MainPresenter";

const mapMainStateToComponentState = (userState)=> ({
    users: userState.users,
    loggedUser: userState.loggedUser
});

const mapQuestionStateToComponentState = (questionState) => ({
    questions: questionState.questions
});

export default class SmartMain extends Component {
    constructor() {
        super();
        this.userState = mapMainStateToComponentState(user.state);
        this.questionState = mapQuestionStateToComponentState(question.state);
        this.userListener = userState => this.setState(mapMainStateToComponentState(userState));
        this.questionListener = questionState => this.setState(mapQuestionStateToComponentState(questionState));
        user.addListener("changeUser", this.userListener);
        question.addListener("changeQuestion", this.questionListener);
    }

    componentWillUnmount() {
        user.removeListener("changeUser", this.userListener);
        question.removeListener("changeQuestion", this.questionListener);
    }

    render() {
        return (
            <Main
                questions={this.questionState.questions}
                users={this.userState.users}
                loggedUser={this.userState.loggedUser}
                onBan={MainPresenter.onBan}
                onAskQuestion={MainPresenter.onAskQuestion}
                onSearchQuestionTitle={MainPresenter.onSearchQuestionTitle}
                onSearchQuestionTag={MainPresenter.onSearchQuestionTag}
                onAnswer={MainPresenter.onAnswer}
                onDeleteQuestion={MainPresenter.onDeleteQuestion}
                onUpvoteQuestion={MainPresenter.onUpvoteQuestion}
                onDownvoteQuestion={MainPresenter.onDownvoteQuestion}
            />
        );
    }
}