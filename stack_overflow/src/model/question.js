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
        let questions = this.state.questions.concat([]);
        questions.splice(index, 1);

        this.state = {
            ...this.state,
            questions: questions
        };
        
        this.emit("changeQuestion", this.state);
    }

    edit(question) {
        let oldQuestion = this.state.questions.filter(q => q.id == question.id);
        let index = this.state.questions.indexOf(oldQuestion[0]);
        let questions = this.state.questions.concat([]);
        questions[index] = {
            ...this.state.questions[index],
            title: question.title,
            text: question.text
        };
        
        this.state = {
            ...this.state,
            questions: questions
        };
        
        this.emit("changeQuestion", this.state);
    }

    searchByTitle(title) {
        let searchedQuestions = this.state.questions.filter(question => question.title.includes(title));
        this.state = {
            ...this.state, 
            searchedQuestions: searchedQuestions
        };

        this.emit("changeQuestion", this.state);
    }

    searchByTag(tag) {
        let searchedQuestions = [];
        for (let i = 0; i < this.state.questions.length; i++) {
            for (let j = 0; j < this.state.questions[i].tags.length; j++) {
                if (this.state.questions[i].tags[j].name === tag) {
                    searchedQuestions.push(this.state.questions[i]);
                }
            }
        }

        this.state = {
            ...this.state,
            searchedQuestions: searchedQuestions
        };

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
        let questions = this.state.questions.concat([]);
        
        for (let i = 0; i < questions.length; i++) {

            let questionUser = user.state.users.filter(u => questions[i].user.id === u.id)[0];
            if (i != index) {
                questions[i] = {
                    ...this.state.questions[i],
                    user: questionUser
                };
            } else {
                questions[index] = {
                    ...this.state.questions[index],
                    user: questionUser,
                    voteCount: this.state.questions[index].voteCount + count
                };
            }
        }

        this.state = {
            ...this.state,
            questions
        };

        this.emit("changeQuestion", this.state);
    }

    downvote(question, count, score) {
        let index = this.state.questions.indexOf(question);
        let questions = this.state.questions.concat([]);

        for (let i = 0; i < questions.length; i++) {

            let questionUser = user.state.users.filter(u => questions[i].user.id === u.id)[0];
            if (i != index) {
                questions[i] = {
                    ...this.state.questions[i],
                    user: questionUser
                };
            } else {
                questions[index] = {
                    ...this.state.questions[index],
                    user: questionUser,
                    voteCount: this.state.questions[index].voteCount - count
                };
            }
        }

        this.state = {
            ...this.state,
            questions
        };

        this.emit("changeQuestion", this.state);
    }
}

const question = new Question();
export default question;