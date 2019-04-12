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
}

const answersTablePresenter = new AnswersTablePresenter();
export default answersTablePresenter;