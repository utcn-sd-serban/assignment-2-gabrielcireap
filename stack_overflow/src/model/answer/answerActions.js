import { ADD_ANSWER } from "./answerActionTypes.js";
import { CHANGE_NEW_ANSWER_PROPERTIES } from "./answerActionTypes.js";
import { DELETE } from "./answerActionTypes.js";
import { EDIT } from "./answerActionTypes.js";
import { UPVOTE } from "./answerActionTypes.js";
import { DOWNVOTE } from "./answerActionTypes.js";

export function addAnswer(user, question, text, creationDate, voteCount) {

    let payload = {
        user,
        question,
        text,
        creationDate,
        voteCount
    };

    return {
        type: ADD_ANSWER,
        payload
    };
}

export function changeNewAnswerProperty(property, value) {

    let payload = {
        property,
        value
    };

    return {
        type: CHANGE_NEW_ANSWER_PROPERTIES,
        payload
    };
}

export function deleteAnswer(answer) {

    let payload = {
        answer
    };

    return {
        type: DELETE,
        payload
    };
}

export function editAnswer(answer) {

    let payload = {
        answer
    };

    return {
        type: EDIT,
        payload
    };
}

export function searchByTitle(title) {

    let payload = {
        title
    };

    return {
        type: SEARCH_BY_TITLE,
        payload
    };
}

export function upvote(answer, count) {

    let payload = {
        answer,
        count
    };

    return {
        type: UPVOTE,
        payload
    };
}

export function downvote(answer, count) {

    let payload = {
        answer,
        count,
    };

    return {
        type: DOWNVOTE,
        payload
    };
}