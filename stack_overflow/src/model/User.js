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
            }
        };
    }

    addUser(id, username, password, email, score, isAdmin, isBanned) {
        this.state = {
            ...this.state,
            users: this.state.users.concat([{
                id: id,
                username: username,
                password: password,
                email: email,
                score: score,
                isAdmin: isAdmin,
                isBanned: isBanned
            }])
        };
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

    toString(user) {
        return "User(" + user.username + ", " + user.score + ", " + user.isAdmin + ")";
    }
}

const user = new User();
export default user;