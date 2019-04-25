import React, { Component } from "react";
import { connect } from "react-redux";
import QuestionsTable from "./QuestionsTable";
import QuestionSearchTagPresenter from "../../presenter/QuestionSearchTagPresenter";
import QuestionSearchByTag from "./QuestionSearchByTitle";

const mapQuestionStateToComponentState = state => ({
    searchedQuestions: state.questionState.searchedQuestions,
    title: state.questionState.newQuestion.title
});

function mapDispatchToProps(dispatch) {
    return {
        onChange: QuestionSearchTagPresenter.onChange,
        onSearch: QuestionSearchTagPresenter.onSearch,
        onAnswer: QuestionSearchTagPresenter.onAnswer,
        onDeleteQuestion: QuestionSearchTagPresenter.onDeleteQuestion,
        onUpvoteQuestion: QuestionSearchTagPresenter.onUpvoteQuestion,
        onDownvoteQuestion: QuestionSearchTagPresenter.onDownvoteQuestion
    };
}

class SmartQuestionSearchByTag extends Component {
    constructor() {
        super();
    }

    render() {
        return (

            <div className="container" className="has-background-light">
                <h2 className="title">
                    Search Questions by Tag
                </h2>

                <QuestionSearchByTag
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

export default connect(mapQuestionStateToComponentState, mapDispatchToProps)(SmartQuestionSearchByTag);