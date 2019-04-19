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
            new Date(Date.now()).toLocaleDateString(),
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

    onDeleteQuestion(id) {

        if (user.state.loggedUser.isAdmin === true) {
            let selectedQuestion = question.findById(id);
            question.delete(selectedQuestion);
        } else {
            window.alert("Only admins can delete questions!");
        }
    }

    onEditQuestion() {

        console.log(user.state.loggedUser);
        if (user.state.loggedUser.isAdmin === true) {
            let newQuestion = {
                id: question.state.newQuestion.tags,
                title: question.state.newQuestion.title,
                text: question.state.newQuestion.text
            };

            question.edit(newQuestion);
        } else {
            window.alert("Only admins can edit questions!");
        }
        
        question.changeNewQuestionProperty("title", "");
        question.changeNewQuestionProperty("text", "");
        question.changeNewQuestionProperty("tags", "");
    }

    onUpvoteQuestion(questionId) {
        let currentQuestion = question.findById(questionId);

        if (currentQuestion.user.username === user.state.loggedUser.username && currentQuestion.user.password === user.state.loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = vote.findByQuestionId(currentQuestion.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === true) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = true;
                    vote.update(currentVote[0]);
                    user.updateScore(currentQuestion.user, 7);
                    question.upvote(currentQuestion, 2);
                }

            } else {
                vote.addVote(currentQuestion, undefined, user.state.loggedUser, true);
                user.updateScore(currentQuestion.user, 5);
                question.upvote(currentQuestion, 1);
            }
        }
    }

    onDownvoteQuestion(questionId) {
        let currentQuestion = question.findById(questionId);

        if (currentQuestion.user.username === user.state.loggedUser.username && currentQuestion.user.password === user.state.loggedUser.password) {
            window.alert("Cannot vote your own question!");
        } else {
            let currentVote = vote.findByQuestionId(currentQuestion.id, user.state.loggedUser.id);
            if (currentVote.length > 0) {

                if (currentVote[0].isUpvote === false) {
                    window.alert("You cannot vote twice!");
                } else {
                    currentVote[0].isUpvote = false;
                    vote.update(currentVote[0]);
                    user.updateScore(currentQuestion.user, -7);
                    question.downvote(currentQuestion, 2);
                }

            } else {
                vote.addVote(currentQuestion, undefined, user.state.loggedUser, false);
                user.updateScore(currentQuestion.user, -2);
                question.downvote(currentQuestion, 1);
            }
        }
    }
}

function createTags(tags) {
    if (tags.length === 0) {
        return [];
    }

    let tagArray = tags.split(",");
    tagArray = tagArray.filter(t => tag.isNew(t) === true);
    tagArray = tagArray.map(t => tag.addTag(t));
    return tagArray;
}

const questionTablePresenter = new QuestionTablePresenter();
export default questionTablePresenter;