import { EventEmitter } from "events";
import user from "./User";
import question from "./question";
import answer from "./answer";
    
class Vote extends EventEmitter {

    constructor() {
        super();
        this.state = {
            votes: [],
            currentIndex: 4
        };
    }

    addVote(question, answer, user, isUpvote) {

        let vote = {
            id: this.state.currentIndex,
            question: question,
            answer: answer,
            user: user,
            isUpvote: isUpvote,
        };

        this.state = {
            ...this.state,
            votes: this.state.votes.concat([vote]),
            currentIndex: this.state.currentIndex + 1
        };
        this.emit("change", this.state);
    }

    update(vote) {
        let oldVote = this.state.votes.filter(v => v.id == vote.id);
        let index = this.state.votes.indexOf(oldVote);
        let votes = this.state.votes.concat([]);
        votes[index] = vote;

        this.state = {
            ...this.state,
            votes: votes
        };
        
        this.emit("change", this.state);
    }

    findByQuestionId(questionId, userId) {
        let votes = this.state.votes.filter(vote => vote.question != undefined).filter(vote => vote.question.id === questionId && vote.user.id === userId);
        return votes.length > 0 ? votes : []
    }

    findByAnswerId(answerId, userId) {
        let votes = this.state.votes.filter(vote => vote.answer != undefined).filter(vote => vote.answer.id === answerId && vote.user.id === userId);
        return votes.length > 0 ? votes : []
    }
}

const vote = new Vote();
export default vote;