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
        debugger;
        window.location.assign("#/answer/" + id);
    }
}

const mainPresenter = new MainPresenter();
export default mainPresenter;