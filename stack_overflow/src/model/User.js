import { EventEmitter } from "events";

class User extends EventEmitter{

    constructor() {
        super();
        this.state = {
            users: [{
                id: 1,
                username: "user1",
                password: "pass1",
                email: "email1",
                score: 0,
                isAdmin: true,
                isBanned: false,
            }, {
                id: 2,
                username: "user2",
                password: "pass2",
                email: "email2",
                score: 0,
                isAdmin: false,
                isBanned: false,
            }],
            newUser: {
                id: 3,
                username: "",
                password: "",
                email: "",
                score: 0,
                isAdmin: false,
                isBanned: false,
            },

            loggedUser: {
                id: 2,
                username: "user2",
                password: "pass2",
                email: "email2",
                score: 0,
                isAdmin: false,
                isBanned: false,
            },

            currentIndex: 3
        };
    }

    addUser(username, password, email, score, isAdmin, isBanned) {
        this.state = {
            ...this.state,
            users: this.state.users.concat([{
                id: this.state.currentIndex,
                username: username,
                password: password,
                email: email,
                score: score,
                isAdmin: isAdmin,
                isBanned: isBanned
            }])
        };
        this.state.currentIndex = this.state.currentIndex + 1;
        this.emit("change", this.state);
    }

    changeNewUserProperty(property, value) {
        this.state = {
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [property]: value
            }
        };
        this.emit("change", this.state);
    }

    updateScore(user, scores) {
        let index = this.state.users.indexOf(user);
        if (index == -1) {      //logged user branch
            let logUser = this.state.users.filter(u => u.username === user.username && u.password === user.password)[0];
            logUser.score = logUser.score + scores;
        } else {
            this.state.users[index].score = this.state.users[index].score + scores;
        }
        
        this.emit("change", this.state);
    }

    toString(user) {
        return "User(" + user.username + ", " + user.score + ", " + (user.isAdmin  === true ? "admin" : "non-admin") + ")";
    }
}

const user = new User();
export default user;