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
                id: "",
                username: "",
                password: "",
                email: "",
                score: "",
                isAdmin: "",
                isBanned: "",
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
            }]),
            currentIndex: this.state.currentIndex + 1
        };
        this.emit("changeUser", this.state);
    }

    changeNewUserProperty(property, value) {
        this.state = {
            ...this.state,
            newUser: {
                ...this.state.newUser,
                [property]: value
            }
        };
        this.emit("changeUser", this.state);
    }

    updateScore(user, scores) {
        
        let oldUser = this.state.users.filter(u => u.id == user.id);
        let index = this.state.users.indexOf(oldUser[0]);
        let users = this.state.users.concat([]);
       
        users[index] = {
            ...this.state.users[index],
            score: this.state.users[index].score + scores
        };

        this.state = {
            ...this.state, 
            users: users
        };
        
        this.emit("changeUser", this.state);
    }

    login(username, password) {
        return this.state.users.filter(user => user.username === username && user.password === password);
    }

    findById(id) {
        return this.state.users.filter(user => user.id === id)[0];
    }

    ban(user) {
        let index = this.state.users.indexOf(user);
        let users = this.state.users.concat([]);

        users[index] = {
            ...this.state.users[index],
            isBanned: true
        };

        this.state = {
            ...this.state,
            users: users
        }

        this.emit("changeUser", this.state);
    }

    toString(user) {
        return "User(" + user.username + ", " + user.score + ", " + (user.isAdmin === true ? "admin" : "non-admin") +
                ", " + (user.isBanned === true ? "banned" : "not banned") + ")";
    }
}

const user = new User();
export default user;