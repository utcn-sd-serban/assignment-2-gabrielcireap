import question from "../model/question";

class QuestionSearchPresenter {

    onSearch() {
        question.searchByTag(question.state.newQuestion.tags);
        question.changeNewQuestionProperty("title", "");
    }

    onChange(property, value) {
        question.changeNewQuestionProperty(property, value);
    }
}

const questionSearchPresenter = new QuestionSearchPresenter();
export default questionSearchPresenter;