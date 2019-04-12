import question from "../model/question";

class QuestionSearchTagPresenter {

    onSearch() {
        question.searchByTag(question.state.newQuestion.title);
        question.changeNewQuestionProperty("title", "");
    }

    onChange(property, value) {
        question.changeNewQuestionProperty(property, value);
    }
}

const questionSearchTagPresenter = new QuestionSearchTagPresenter();
export default questionSearchTagPresenter;