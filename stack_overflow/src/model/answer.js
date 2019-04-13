import user from "./User";
import question from "./question";
import { EventEmitter } from "events";

class Answer extends EventEmitter {

    constructor() {
        super();
        this.state = {
            answers: [{
                id: 1,
                user: user.state.users[0],
                question: question.state.questions[0],
                text: "answer1",
                creationDate: "12/22/1997",
                voteCount: 0
            }, {
                id: 2,
                user: user.state.users[0],
                question: question.state.questions[0],
                text: "answer2",
                creationDate: "12/22/1997",
                voteCount: 0
            }, {
                id: 3,
                user: user.state.users[0],
                question: question.state.questions[2],
                text: "answer3",
                creationDate: "12/22/1997",
                voteCount: 2
            }],
            newAnswer: {
                id: "",
                user: "",
                question: "",
                text: "",
                creationDate: "",
                voteCount: ""
            },
            
            currentIndex: 4
        };
    }

    addAnswer(user, question, text, creationDate, voteCount) {
        this.state = {
            ...this.state,
            answers: this.state.answers.concat([{
                id: this.state.currentIndex,
                user: user,
                question: question,
                text: text,
                creationDate: creationDate,
                voteCount: voteCount
            }]),
            currentIndex: this.state.currentIndex + 1
        };
        this.emit("change", this.state);
    }

    editAnswer(answer) {
        for (let i = 0; i < this.state.answers.length; i++) {
            if (answer.id === this.state.answers[i].id) {
                this.state.answers[i].text = answer.text;
            }
        }
        this.emit("change", this.state);
    }

    deleteAnswer(answer) {
        let index = this.state.answers.indexOf(answer);
        this.state.answers.splice(index, 1);
        this.emit("change", this.state);
    }

    changeNewAnswerProperty(property, value) {
        this.state = {
            ...this.state,
            newAnswer: {
                ...this.state.newAnswer,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    findByQuestion(question) {
        return this.state.answers.filter(answer => answer.question === question);
    }

    findById(id) {
        return this.state.answers.filter(answer => answer.id === id)[0];
    }

    sort() {
        this.state.answers.sort((a, b) => (a.voteCount > b.voteCount) ? 1 : ((b.voteCount > a.voteCount) ? -1 : 0));
        this.emit("change", this.state);
    }
}

const answer = new Answer();
export default answer;