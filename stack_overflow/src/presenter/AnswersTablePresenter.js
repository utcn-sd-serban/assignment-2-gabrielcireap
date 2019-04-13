import question from "../model/question";
import user from "../model/User";
import answer from "../model/answer";
import vote from "../model/Vote";

class AnswersTablePresenter {

    onCreate(selectedQuestion) {
        
        answer.addAnswer(
            user.state.loggedUser,
            selectedQuestion,
            answer.state.newAnswer.text,
            new Date(Date.now()).toLocaleDateString('en-GB'),
            0
        );
        
        answer.changeNewAnswerProperty("text", "");
    }

    onChange(property, value) {
        answer.changeNewAnswerProperty(property, value);
    }

    onEditAnswer(id) {
        
        let currentAnswer = answer.findById(id);
        currentAnswer.text = answer.state.newAnswer.text;

        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password) {
            answer.editAnswer(currentAnswer);
        } else {
            throw "You are not the author of the answer!";
        }
        answer.changeNewAnswerProperty("text", "");
    }

    onDeleteAnswer(id) {

        let currentAnswer = answer.findById(id);
        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password) {
            answer.deleteAnswer(currentAnswer);
        } else {
            throw "You are not the author of the answer!";
        }
    }

    onUpvoteAnswer(answerId) {
        let currentAnswer = answer.findById(answerId);

        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password) {
            throw "Cannot vote your own question!";
        } else {
            let currentVote = vote.findByAnswerId(currentAnswer.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === true) {
                    throw "You cannot vote twice!";
                } else {
                    currentVote[0].isUpvote = true;
                    vote.update(currentVote[0]);
                    answer.upvote(currentAnswer, 2);
                }

            } else {
                vote.addVote(undefined, currentAnswer, user.state.loggedUser, true);
                answer.upvote(currentAnswer, 1);
            }
        }
    }

    onDownvoteAnswer(answerId) {
        let currentAnswer = answer.findById(answerId);

        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password) {
            throw "Cannot vote your own question!";
        } else {
            let currentVote = vote.findByAnswerId(currentAnswer.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === false) {
                    throw "You cannot vote twice!";
                } else {
                    currentVote[0].isUpvote = false;
                    vote.update(currentVote[0]);
                    answer.downvote(currentAnswer, 2);
                }

            } else {
                vote.addVote(undefined, currentAnswer, user.state.loggedUser, false);
                answer.downvote(currentAnswer, 1);
            }
        }
    }
}

const answersTablePresenter = new AnswersTablePresenter();
export default answersTablePresenter;