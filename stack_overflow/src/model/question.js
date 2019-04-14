import user from "./User";
import tag from "./Tag";
import { EventEmitter } from "events";

class Question extends EventEmitter {

    constructor() {
        super();
        this.state = {
            questions: [{
                id: 1,
                user: user.state.users[0],
                title: "title1",
                text: "text1",
                creationDate: new Date(Date.now()).toLocaleDateString(),
                voteCount: 0,
                tags: [tag.state.tags[0]]
            }, {
                id: 2,
                user: user.state.users[0],
                title: "ceva titlu",
                text: "ceva text",
                creationDate: new Date(Date.now()).toLocaleDateString(),
                voteCount: 0,
                tags: [tag.state.tags[0], tag.state.tags[1]]
            }, {
                id: 3,
                user: user.state.users[0],
                title: "title 2",
                text: "question 3 text",
                creationDate: new Date(Date.now()).toLocaleDateString(),
                voteCount: 0,
                tags: [tag.state.tags[1], tag.state.tags[2]]
            }],
            newQuestion: {
                id: "",
                user: user.state.users[1],
                title: "",
                text: "",
                creationDate: "",
                voteCount: "",
                tags: []
            },

            searchedQuestions: [],
            currentIndex: 4
        };
    }

    addQuestion(user, title, text, creationDate, voteCount, tags) {
        this.state = {
            ...this.state,
            questions: this.state.questions.concat([{
                id: this.state.currentIndex,
                user: user,
                title: title,
                text: text,
                creationDate: creationDate,
                voteCount: voteCount,
                tags: tags
            }]),
            currentIndex: this.state.currentIndex + 1
        };
        this.emit("changeQuestion", this.state);
    }

    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("changeQuestion", this.state);
    }

    sort(questions) {
        questions.sort((a, b) => (a.creationDate > b.creationDate) ? 1 : ((b.creationDate > a.creationDate) ? -1 : 0));
        return questions;
    }

    delete(question) {
        let index = this.state.questions.indexOf(question);
        this.state.questions.splice(index, 1);
        this.emit("changeQuestion", this.state);
    }

    edit(question) {
        for (let i = 0; i < this.state.questions.length; i++) {
            if (this.state.questions[i].id == question.id) {
                this.state.questions[i].text = question.text;
                this.state.questions[i].title = question.title;
                break;
            }
        }
        this.emit("changeQuestion", this.state);
    }

    searchByTitle(title) {
        this.state.searchedQuestions = this.state.questions.filter(question => question.title.includes(title));
        this.emit("changeQuestion", this.state);
    }

    searchByTag(tag) {
        this.state.searchedQuestions = [];
        for (let i = 0; i < this.state.questions.length; i++) {
            for (let j = 0; j < this.state.questions[i].tags.length; j++) {
                if (this.state.questions[i].tags[j].name === tag) {
                    this.state.searchedQuestions.push(this.state.questions[i]);
                }
            }
        }

        this.emit("changeQuestion", this.state);
    }

    findById(id) {
        return this.state.questions.filter(question => question.id == id)[0];
    }

    toString(question) {
        return "Question(" + question.title + ", " + question.text + ", " + user.toString(question.user) + ")";
    }

    upvote(question, count) {
        let index = this.state.questions.indexOf(question);
        this.state.questions[index].voteCount = this.state.questions[index].voteCount + count;
        this.emit("changeQuestion", this.state);
    }

    downvote(question, count) {
        let index = this.state.questions.indexOf(question);
        this.state.questions[index].voteCount = this.state.questions[index].voteCount - count;
        this.emit("changeQuestion", this.state);
    }
}

const question = new Question();
export default question;