import React from "react";
import QuestionsTable from "./question/QuestionsTable";
import SmartUsersTable from "./user/SmartUsersTable";
import UsersTable from "./user/UsersTable";

const Main = ({ questions, users, loggedUser, onAskQuestion, onSearchQuestionTitle, onSearchQuestionTag, onAnswer, onDeleteQuestion, onUpvoteQuestion, onDownvoteQuestion, onBan }) => (
    <div>
        <h2> Assignment 2 </h2>
        <button onClick={onAskQuestion}> Ask Question </button>
        <button onClick={onSearchQuestionTitle}> Search Questions by Title </button>
        <button onClick={onSearchQuestionTag}> Search Questions by Tag </button>
        <br />

        <h1> Questions </h1>
        <QuestionsTable
            questions={questions}
            onAnswer={onAnswer}
            onDeleteQuestion={onDeleteQuestion}
            onUpvoteQuestion={onUpvoteQuestion}
            onDownvoteQuestion={onDownvoteQuestion}
        />
        <br />

        {
            loggedUser.isAdmin === true ? (
                <div>
                    <h1> Users </h1>
                    <UsersTable
                        users={users}
                        onBan={onBan}
                    />
                </div>
            ) : (<div></div>)
        }
    </div>
);

export default Main;