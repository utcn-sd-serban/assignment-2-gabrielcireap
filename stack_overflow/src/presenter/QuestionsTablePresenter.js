import question from "../model/question";
import user from "../model/User";
import tag from "../model/Tag";
import vote from "../model/Vote";

class QuestionTablePresenter {
    
    onCreate() {

        let tags = createTags(question.state.newQuestion.tags);

        question.addQuestion(
            user.state.loggedUser,
            question.state.newQuestion.title,
            question.state.newQuestion.text,
            new Date(Date.now()).toLocaleDateString('en-GB'),
            0,
            tags
        );
        
        question.changeNewQuestionProperty("title", "");
        question.changeNewQuestionProperty("text", "");
        question.changeNewQuestionProperty("tags", "");
    }

    onChange(property, value) {
        question.changeNewQuestionProperty(property, value);
    }

    onAnswer(id) {
        window.location.assign("#/answer/" + id);
    }

    onUpvoteQuestion(questionId) {
        let currentQuestion = question.findById(questionId);

        if (currentQuestion.user.username === user.state.loggedUser.username && currentQuestion.user.password === user.state.loggedUser.password) {
            throw "Cannot vote your own question!";
        } else {
            let currentVote = vote.findByQuestionId(currentQuestion.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === true) {
                    throw "You cannot vote twice!";
                } else {
                    currentVote[0].isUpvote = true;
                    vote.update(currentVote[0]);
                    question.upvote(currentQuestion, 2);
                    user.updateScore(currentQuestion.user, 7);
                }

            } else {
                vote.addVote(currentQuestion, undefined, user.state.loggedUser, true);
                question.upvote(currentQuestion, 1);
                user.updateScore(currentQuestion.user, 5);
            }
        }
    }

    onDownvoteQuestion(questionId) {
        let currentQuestion = question.findById(questionId);

        if (currentQuestion.user.username === user.state.loggedUser.username && currentQuestion.user.password === user.state.loggedUser.password) {
            throw "Cannot vote your own question!";
        } else {
            let currentVote = vote.findByQuestionId(currentQuestion.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === false) {
                    throw "You cannot vote twice!";
                } else {
                    currentVote[0].isUpvote = false;
                    vote.update(currentVote[0]);
                    question.downvote(currentQuestion, 2);
                    user.updateScore(currentQuestion.user, -7);
                }

            } else {
                vote.addVote(currentQuestion, undefined, user.state.loggedUser, false);
                question.downvote(currentQuestion, 1);
                user.updateScore(currentQuestion.user, -2);
            }
        }
    }
}

function createTags(tags) {
    let tagArray = tags.split(",");
    tagArray = tagArray.filter(t => tag.isNew(t) === true);
    tagArray = tagArray.map(t => tag.addTag(t));
    return tagArray;
}

const questionTablePresenter = new QuestionTablePresenter();
export default questionTablePresenter;