import question from "../model/question";
import QuestionsTablePresenter from "./QuestionsTablePresenter";

class QuestionSearchPresenter {

    onSearch() {
        question.searchByTitle(question.state.newQuestion.title);
        question.changeNewQuestionProperty("title", "");
    }

    onChange(property, value) {
        question.changeNewQuestionProperty(property, value);
    }

    onAnswer(id) {
        window.location.assign("#/answer/" + id);
    }

    onDeleteQuestion(id) {
        QuestionsTablePresenter.onDeleteQuestion(id);
    }

    onUpvoteQuestion(id) {
        QuestionsTablePresenter.onUpvoteQuestion(id);
    }

    onDownvoteQuestion(id) {
        QuestionsTablePresenter.onDownvoteQuestion(id);
    }
}

const questionSearchPresenter = new QuestionSearchPresenter();
export default questionSearchPresenter;