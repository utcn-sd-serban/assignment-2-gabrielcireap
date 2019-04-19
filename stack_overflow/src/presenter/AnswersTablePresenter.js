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

        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password
            || user.state.loggedUser.isAdmin === true) {
            answer.editAnswer(currentAnswer);
        } else {
            window.alert("You are neither the author nor an admin!");
        }
        answer.changeNewAnswerProperty("text", "");
    }

    onDeleteAnswer(id) {

        let currentAnswer = answer.findById(id);
        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password
            || user.state.loggedUser.isAdmin === true) {
            answer.deleteAnswer(currentAnswer);
        } else {
            window.alert("You are neither the author nor the admin!");
        }
    }

    onUpvoteAnswer(answerId) {
        let currentAnswer = answer.findById(answerId);

        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = vote.findByAnswerId(currentAnswer.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === true) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = true;
                    vote.update(currentVote[0]);
                    user.updateScore(currentAnswer.user, 12);
                    user.updateScore(user.state.loggedUser, 1);
                    answer.upvote(currentAnswer, 2);
                }

            } else {
                vote.addVote(undefined, currentAnswer, user.state.loggedUser, true);
                user.updateScore(currentAnswer.user, 10);
                answer.upvote(currentAnswer, 1);
            }
        }
    }

    onDownvoteAnswer(answerId) {
        let currentAnswer = answer.findById(answerId);

        if (currentAnswer.user.username === user.state.loggedUser.username && currentAnswer.user.password === user.state.loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = vote.findByAnswerId(currentAnswer.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === false) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = false;
                    vote.update(currentVote[0]);
                    user.updateScore(currentAnswer.user, -12);
                    user.updateScore(user.state.loggedUser, -1);
                    answer.downvote(currentAnswer, 2);
                }

            } else {
                vote.addVote(undefined, currentAnswer, user.state.loggedUser, false);
                user.updateScore(currentAnswer.user, -2);
                user.updateScore(user.state.loggedUser, -1);
                answer.downvote(currentAnswer, 1);
            }
        }
    }
}

const answersTablePresenter = new AnswersTablePresenter();
export default answersTablePresenter;