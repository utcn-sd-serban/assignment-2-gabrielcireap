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
                text: "",
                creationDate: "12/22/1997",
                voteCount: 0,
                tags: [tag.state.tags[0]]
            }, {
                id: 2,
                user: user.state.users[0],
                title: "ceva titllu",
                text: "",
                creationDate: "12/22/1997",
                voteCount: 0,
                tags: [tag.state.tags[0], tag.state.tags[1]]
            }, {
                id: 3,
                user: user.state.users[0],
                title: "title 2",
                text: "",
                creationDate: "12/22/1997",
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
        this.emit("change", this.state);
    }

    changeNewQuestionProperty(property, value) {
        this.state = {
            ...this.state,
            newQuestion: {
                ...this.state.newQuestion,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    sort() {
        this.state.questions.sort((a, b) => (a.creationDate.getTime() > b.creationDate.getTime()) ? 1 : ((b.creationDate.getTime() > a.creationDate.getTime()) ? -1 : 0));
        this.emit("change", this.state);
    }

    searchByTitle(title) {
        this.state.searchedQuestions = this.state.questions.filter(question => question.title.includes(title));
        this.emit("change", this.state);
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

        this.emit("change", this.state);
    }

    findById(id) {
        return this.state.questions.filter(question => question.id === id)[0];
    }

    toString(question) {
        return "Question(" + question.title + ", " + question.text + ", " + user.toString(question.user) + ")";
    }

    upvote(question, count) {
        let index = this.state.questions.indexOf(question);
        this.state.questions[index].voteCount = this.state.questions[index].voteCount + count;
        this.emit("change", this.state);
    }

    downvote(question, count) {
        let index = this.state.questions.indexOf(question);
        this.state.questions[index].voteCount = this.state.questions[index].voteCount - count;
        this.emit("change", this.state);
    }
}

const question = new Question();
export default question;