import store from "../store/store";

export function getNewQuestion() {
    return store.getState().questionState.newQuestion;
}

export function findById(id) {
    let questions = store.getState().questionState.questions;
    return questions.filter(question => question.id == id)[0];
}