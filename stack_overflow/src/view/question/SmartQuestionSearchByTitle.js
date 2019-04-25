import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsTable from "./QuestionsTable";
import QuestionSearchPresenter from "../../presenter/QuestionSearchPresenter";
import QuestionSearchByTitle from "./QuestionSearchByTitle";

const mapQuestionStateToComponentState = state => ({
    searchedQuestions: state.questionState.searchedQuestions
});

function mapDispatchToProps(dispatch) {
    return {
        onChange: QuestionSearchPresenter.onChange,
        onSearch: QuestionSearchPresenter.onSearch,
        onAnswer: QuestionSearchPresenter.onAnswer,
        onDeleteQuestion: QuestionSearchPresenter.onDeleteQuestion,
        onUpvoteQuestion: QuestionSearchPresenter.onUpvoteQuestion,
        onDownvoteQuestion: QuestionSearchPresenter.onDownvoteQuestion
    };
}

class SmartQuestionsSearchByTitle extends Component {
    constructor() {
        super();
    }

    render() {
        return (

            <div className="container" className="has-background-light">
                <h2 className="title">
                    Search Questions by Title
                </h2>

                <QuestionSearchByTitle
                    title={this.props.title}
                    onChange={this.props.onChange}
                    onSearch={this.props.onSearch}
                />

                <QuestionsTable
                    questions={this.props.searchedQuestions}
                    onAnswer={this.props.onAnswer}
                    onDeleteQuestion={this.props.onDeleteQuestion}
                    onUpvoteQuestion={this.props.onUpvoteQuestion}
                    onDownvoteQuestion={this.props.onDownvoteQuestion}
                />
            </div>
        );
    }
}

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionsSearchByTitle);