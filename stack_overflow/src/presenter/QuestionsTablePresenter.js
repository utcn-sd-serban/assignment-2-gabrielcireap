import question from "../model/question";
import user from "../model/User";
import tag from "../model/Tag";

class QuestionTablePresenter {
    
    onCreate() {

        let tags = createTags(question.state.newQuestion.tags);

        question.addQuestion(
            user.state.loggedUser,
            question.state.newQuestion.title,
            question.state.newQuestion.text,
            new Date(Date.now()).toLocaleDateString('en-GB'),
            0,
            tags
        );
        
        question.changeNewQuestionProperty("title", "");
        question.changeNewQuestionProperty("text", "");
        question.changeNewQuestionProperty("tags", "");
    }

    onChange(property, value) {
        question.changeNewQuestionProperty(property, value);
    }

    onAnswer(id) {
        window.location.assign("#/answer/" + id);
    }
}

function createTags(tags) {
    let tagArray = tags.split(",");
    tagArray = tagArray.filter(t => tag.isNew(t) === true);
    tagArray = tagArray.map(t => tag.addTag(t));
    return tagArray;
}

const questionTablePresenter = new QuestionTablePresenter();
export default questionTablePresenter;