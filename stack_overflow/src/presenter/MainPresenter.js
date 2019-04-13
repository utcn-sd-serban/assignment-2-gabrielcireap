import QuestionsTablePresenter from "./QuestionsTablePresenter";

class MainPresenter {

    onAskQuestion() {
        window.location.assign("#/ask");
    }

    onSearchQuestionTitle() {
        window.location.assign("#/search-title");
    }

    onSearchQuestionTag() {
        window.location.assign("#/search-tag");
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

const mainPresenter = new MainPresenter();
export default mainPresenter;