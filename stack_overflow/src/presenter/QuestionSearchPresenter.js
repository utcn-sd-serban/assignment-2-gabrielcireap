import question from "../model/question";

class QuestionSearchPresenter {

    onSearch() {
        question.searchByTitle(question.state.newQuestion.title);
        question.changeNewQuestionProperty("title", "");
    }

    onChange(property, value) {
        question.changeNewQuestionProperty(property, value);
    }
}

const questionSearchPresenter = new QuestionSearchPresenter();
export default questionSearchPresenter;