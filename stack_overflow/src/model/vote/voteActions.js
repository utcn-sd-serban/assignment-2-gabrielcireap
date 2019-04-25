import { ADD_VOTE } from "./voteActionTypes";
import { UPDATE } from "./voteActionTypes";

export function addVote(question, answer, user, isUpvote) {
    
    return {
        action: ADD_VOTE,
        payload: {
            question,
            answer,
            user,
            isUpvote
        }
    };
}

export function update(vote) {
    return {
        action: UPDATE,
        payload: {
            vote
        }
    };
}