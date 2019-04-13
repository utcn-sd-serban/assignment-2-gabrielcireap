
import React from "react";
import user from "../../model/User";
import question from "../../model/question";
import answer from "../../model/answer";

const AnswersTable = ({ answers, onEditAnswer, onDeleteAnswer }) => (
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
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
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
                            <td><button onClick={() => onEditAnswer(answer.id)}> Edit </button></td>
                            <td><button onClick={() => onDeleteAnswer(answer.id)}> Delete </button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default AnswersTable;