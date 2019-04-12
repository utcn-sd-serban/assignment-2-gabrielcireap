
import React from "react";
import user from "../../model/User";
import tag from "../../model/Tag";

const QuestionsTable = ({ questions }) => (
    <div>
        <table border="1">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> User </th>
                    <th> Title </th>
                    <th> Text </th>
                    <th> Creation Date </th>
                    <th> Vote Count </th>
                    <th> Tags </th>
                </tr>
            </thead>
            <tbody>
                {
                    questions.map((question, index) => (
                        <tr key={index}>
                            <td> {question.id} </td>
                            <td> {user.toString(question.user)} </td>
                            <td> {question.title} </td>
                            <td> {question.text} </td>
                            <td> {question.creationDate} </td>
                            <td> {question.voteCount} </td>
                            <td> {tag.toString(question.tags)} </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default QuestionsTable;