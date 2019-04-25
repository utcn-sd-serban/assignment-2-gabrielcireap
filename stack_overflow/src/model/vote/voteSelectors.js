import store from "../store/store";

export function findByQuestionId(questionId, userId){
    let votes = store.getState().voteState.votes;
    return votes.filter(vote => vote.question.id == questionId && vote.user.id == userId);
}

export function findByAnswerId(answerId, userId) {
    let votes = store.getState().voteState.votes;
    return votes.filter(vote => vote.answer.id == answerId && vote.user.id == userId);
}
