import question from "../model/question";
import user from "../model/User";
import answer from "../model/answer";

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
}

const answersTablePresenter = new AnswersTablePresenter();
export default answersTablePresenter;