
import React from "react";
import user from "../../model/User";
import tag from "../../model/Tag";
import { Button } from "react-bulma-components/full";

const QuestionsTable = ({ questions, onAnswer, onDeleteQuestion, onUpvoteQuestion, onDownvoteQuestion }) => (
    <div>
        <table className="table" border="1">
            <thead>
                <tr>
                    <th> Id </th>
                    <th> User </th>
                    <th> Title </th>
                    <th> Text </th>
                    <th> Creation Date </th>
                    <th> Vote Count </th>
                    <th> Tags </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                    <th>  </th>
                </tr>
            </thead>
            <tbody>
                {
                    questions.map((question, index) => (
                        <tr key={index}>
                            <td className="has-text-centered"> {question.id} </td>
                            <td className="has-text-centered"> {user.toString(question.user)} </td>
                            <td className="has-text-centered"> {question.title} </td>
                            <td className="has-text-centered"> {question.text} </td>
                            <td className="has-text-centered"> {question.creationDate} </td>
                            <td className="has-text-centered"> {question.voteCount} </td>
                            <td className="has-text-centered"> {tag.toString(question.tags)} </td>
                            <td><button className="button is-link" onClick={() => onAnswer(index)}> Answer </button></td>
                            <td><button className="button is-warning" onClick={() => onDeleteQuestion(question.id)}> Delete </button></td>
                            <td><button className="button is-success" onClick={() => onUpvoteQuestion(question.id)}> Upvote </button></td>
                            <td><button className="button is-danger" onClick={() => onDownvoteQuestion(question.id)}> Downvote </button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>
);

export default QuestionsTable;