import { ADD_QUESTION } from "./questionActionTypes";
import { CHANGE_NEW_QUESTION_PROPERTIES } from "./questionActionTypes";
import { DELETE_QUESTION } from "./questionActionTypes";
import { EDIT_QUESTION } from "./questionActionTypes";
import { SEARCH_BY_TITLE } from "./questionActionTypes";
import { SEARCH_BY_TAG } from "./questionActionTypes";
import { UPVOTE_QUESTION } from "./questionActionTypes";
import { DOWNVOTE_QUESTION } from "./questionActionTypes";

const initialState = {
    questions: [{
        id: 1,
        user: {
            id: 1,
            username: "user1",
            password: "pass1",
            email: "email1",
            score: 0,
            isAdmin: true,
            isBanned: false,
        },
        title: "title1",
        text: "text1",
        creationDate: new Date(Date.now()).toLocaleDateString(),
        voteCount: 0,
        tags: [{
            id: 1,
            name: "tag1"
        }]
    }, {
        id: 2,
        user: {
            id: 1,
            username: "user1",
            password: "pass1",
            email: "email1",
            score: 0,
            isAdmin: true,
            isBanned: false,
        },
        title: "ceva titlu",
        text: "ceva text",
        creationDate: new Date(Date.now()).toLocaleDateString(),
        voteCount: 0,
        tags: [{
            id: 1,
            name: "tag1"
        }, {
            id: 2,
            name: "react"
        }]
    }, {
        id: 3,
        user: {
            id: 1,
            username: "user1",
            password: "pass1",
            email: "email1",
            score: 0,
            isAdmin: true,
            isBanned: false,
        },
        title: "title 2",
        text: "question 3 text",
        creationDate: new Date(Date.now()).toLocaleDateString(),
        voteCount: 0,
        tags: [{
            id: 3,
            name: "js"
        }, {
            id: 2,
            name: "react"
        }]
    }],

    newQuestion: {
        id: "",
        user: "",
        title: "",
        text: "",
        creationDate: "",
        voteCount: "",
        tags: []
    },

    searchedQuestions: [],
    currentIndex: 4
};

function questionReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_QUESTION:
            return addQuestion(state, action.payload);
        case CHANGE_NEW_QUESTION_PROPERTIES:
            return changeNewQuestionProperty(state, action.payload);
        case DELETE_QUESTION:
            return deleteQuestion(state, action.payload);
        case EDIT_QUESTION:
            return editQuestion(state, action.payload);
        case SEARCH_BY_TITLE:
            return searchByTitle(state, action.payload);
        case SEARCH_BY_TAG:
            return searchByTag(state, action.payload);
        case UPVOTE_QUESTION:
            return upvote(state, action.payload);
        case DOWNVOTE_QUESTION:
            return downvote(state, action.payload);
    }
    return state;
};

function addQuestion(state, payload) {
    let newState = {
        ...state,
        questions: state.questions.concat([{
            id: state.currentIndex,
            user: payload.user,
            title: payload.title,
            text: payload.text,
            creationDate: payload.creationDate,
            voteCount: payload.voteCount,
            tags: payload.tags
        }]),
        currentIndex: state.currentIndex + 1
    };

    return newState;
}

function changeNewQuestionProperty(state, payload) {
    let newState = {
        ...state,
        newQuestion: {
            ...state.newQuestion,
            [payload.property]: payload.value
        }
    };

    return newState;
}

function deleteQuestion(state, payload) {
    let index = state.questions.indexOf(payload.question);
    let questions = state.questions.concat([]);
    questions.splice(index, 1);

    let newState = {
        ...state,
        questions: questions
    };

    return newState;
}

function editQuestion(state, payload) {
    console.log(state);
    console.log(payload);
    debugger;
    let oldQuestion = state.questions.filter(q => q.id == payload.question.id)[0];
    let index = state.questions.indexOf(oldQuestion);
    let questions = state.questions.concat([]);
    questions[index] = {
        ...state.questions[index],
        title: payload.question.title,
        text: payload.question.text
    };

    let newState = {
        ...state,
        questions: questions
    };

    return newState;
}

function searchByTitle(state, payload) {
    let searchedQuestions = state.questions.filter(question => question.title.includes(payload.title));
    let newState = {
        ...state,
        searchedQuestions: searchedQuestions
    };

    return newState;
}

function searchByTag(state, payload) {
    let searchedQuestions = [];
    for (let i = 0; i < state.questions.length; i++) {
        for (let j = 0; j < state.questions[i].tags.length; j++) {
            if (state.questions[i].tags[j].name === payload.tag) {
                searchedQuestions.push(state.questions[i]);
            }
        }
    }

    let newState = {
        ...state,
        searchedQuestions: searchedQuestions
    };

    return newState;
}

function upvote(state, payload) {
    let index = state.questions.indexOf(payload.question);
    let questions = state.questions.concat([]);
    questions[index] = {
        ...questions[index],
        voteCount: state.questions[index].voteCount + payload.count
    };

    let newState = {
        ...state,
        questions
    };

    return newState;
}

function downvote(state, payload) {
    let index = state.questions.indexOf(payload.question);
    let questions = state.questions.concat([]);
    questions[index] = {
        ...questions[index],
        voteCount: state.questions[index].voteCount - payload.count
    };

    let newState = {
        ...state,
        questions
    };

    return newState;
}

export default questionReducer;