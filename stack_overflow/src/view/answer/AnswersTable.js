
import React from "react";
import user from "../../model/User";
import question from "../../model/question";
import answer from "../../model/answer";

const AnswersTable = ({ answers, onUpvoteAnswer, onDownvoteAnswer }) => (
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> User </th>
                    <th> Question </th>
                    <th> Text </th>
                    <th> Creation Date </th>
                    <th> Vote Count </th>
                </tr>
            </thead>
            <tbody>
                {
                    answers.map((answer, index) => (
                        <tr key={index}>
                            <td> {answer.id} </td>
                            <td> {user.toString(answer.user)} </td>
                            <td> {question.toString(answer.question)}</td>
                            <td> {answer.text} </td>
                            <td> {answer.creationDate} </td>
                            <td> {answer.voteCount} </td>
                            <td> <button onclick={() => onUpvoteAnswer(index)}> Upvote </button> </td>
                            <td> <button onclick={() => onDownvoteAnswer(index)}> Downvote </button> </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default AnswersTable;