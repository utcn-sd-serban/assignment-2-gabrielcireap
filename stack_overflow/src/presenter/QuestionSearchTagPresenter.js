import question from "../model/question";
import QuestionsTablePresenter from "./QuestionsTablePresenter";

class QuestionSearchTagPresenter {

    onSearch() {
        question.searchByTag(question.state.newQuestion.title);
        question.changeNewQuestionProperty("title", "");
    }

    onChange(property, value) {
        question.changeNewQuestionProperty(property, value);
    }

    onAnswer(id) {
        window.location.assign("#/answer/" + id);
    }

    onUpvoteQuestion(id) {
        QuestionsTablePresenter.onUpvoteQuestion(id);
    }

    onDownvoteQuestion(id) {
        QuestionsTablePresenter.onDownvoteQuestion(id);
    }
}

const questionSearchTagPresenter = new QuestionSearchTagPresenter();
export default questionSearchTagPresenter;