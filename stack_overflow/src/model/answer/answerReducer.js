import { ADD_ANSWER } from "./answerActionTypes.js";
import { CHANGE_NEW_ANSWER_PROPERTIES } from "./answerActionTypes.js";
import { DELETE } from "./answerActionTypes.js";
import { EDIT } from "./answerActionTypes.js";
import { UPVOTE } from "./answerActionTypes.js";
import { DOWNVOTE } from "./answerActionTypes.js";
import user from "../User";
import question from "../question";

const initialState = {
    answers: [{
        id: 1,
        user: user.state.users[0],
        question: question.state.questions[0],
        text: "answer1",
        creationDate: "12/22/1997",
        voteCount: 0
    }, {
        id: 2,
        user: user.state.users[0],
        question: question.state.questions[0],
        text: "answer2",
        creationDate: "12/22/1997",
        voteCount: 0
    }, {
        id: 3,
        user: user.state.users[0],
        question: question.state.questions[2],
        text: "answer3",
        creationDate: "12/22/1997",
        voteCount: 2
    }],
    newAnswer: {
        id: "",
        user: "",
        question: "",
        text: "",
        creationDate: "",
        voteCount: ""
    },

    currentIndex: 4
};

function answerReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_ANSWER:
            return addAnswer(state, action.payload);
        case CHANGE_NEW_ANSWER_PROPERTIES:
            return changeNewAnswerProperty(state, action.payload);
        case DELETE:
            return deleteAnswer(state, action.payload);
        case EDIT:
            return editAnswer(state, action.payload);
        case UPVOTE:
            return upvote(state, action.payload);
        case DOWNVOTE:
            return downvote(action.payload);
    }
    return state;
};

function addAnswer(state, payload) {
    let newState = {
        ...state,
        answers: state.answers.concat([{
            id: state.currentIndex,
            user: payload.user,
            question: payload.question,
            text: payload.text,
            creationDate: payload.creationDate,
            voteCount: payload.voteCount
        }]),
        currentIndex: state.currentIndex + 1
    };

    return newState;
}

function editAnswer(state, payload) {
    let oldAnswer = state.answers.filter(a => a.id === payload.answer.id)[0];
    let index = state.answers.indexOf(oldAnswer);
    let answers = state.answers.concat([]);
    answers[index] = {
        ...state.answers[index],
        text: payload.answer.text
    }

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function deleteAnswer(state, payload) {
    let index = state.answers.indexOf(payload.answer);
    let answers = state.answers.concat([]);
    answers.splice(index, 1);

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function changeNewAnswerProperty(state, payload) {
    let newState = {
        ...state,
        newAnswer: {
            ...state.newAnswer,
            [payload.property]: payload.value
        }
    };

    return newState;
}

function upvote(state, payload) {
    let index = state.answers.indexOf(payload.answer);
    let answers = state.answers.concat([]);
    answers[index] = {
        ...state.answers[index],
        voteCount: state.answers[index].voteCount + payload.count
    }

    let newState = {
        ...state,
        answers
    }

    return newState;
}

function downvote(state, payload) {
    let index = state.answers.indexOf(payload.answer);
    let answers = state.answers.concat([]);
    answers[index] = {
        ...state.answers[index],
        voteCount: state.answers[index].voteCount - payload.count
    }

    let newState = {
        ...state,
        answers
    }

    return newState;
}

export default answerReducer;