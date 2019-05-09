import store from "../model/store/store";
import * as questionActions from "../model/question/questionActions";
import * as questionSelectors from "../model/question/questionSelectors";
import QuestionsTablePresenter from "./QuestionsTablePresenter";

class QuestionSearchPresenter {

    onSearch() {
        let newQuestion = questionSelectors.getNewQuestion();

        store.dispatch(questionActions.searchByTitle(newQuestion.title));
        store.dispatch(questionActions.changeNewQuestionProperty("title", ""));
    }

    onChange(property, value) {
        store.dispatch(questionActions.changeNewQuestionProperty(property, value));
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