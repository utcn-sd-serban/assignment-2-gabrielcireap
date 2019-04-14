import React, { Component } from "react";
import LoginPresenter from "../../presenter/LoginPresenter";
import user from "../../model/User";
import Login from "./Login";

const mapUserStateToComponentState = userState => ({
    username: userState.newUser.username,
    password: userState.newUser.password,
    email: userState.newUser.login
});

export default class SmartLoginTable extends Component {

    constructor() {
        super();
        this.state = mapUserStateToComponentState(user.state);
        this.listener = userState => this.setState(mapUserStateToComponentState(userState));
        user.addListener("changeUser", this.listener);
    }

    componentWillUnmount() {
        user.removeListener("changeUser", this.listener);
    }

    render() {
        return (

            <div>
                <h2> Login </h2>
                <Login
                    username={this.state.username}
                    password={this.state.password}
                    email={this.state.email}
                    onChange={LoginPresenter.onChange}
                    onLogin={LoginPresenter.onLogin}
                    onRegister={LoginPresenter.onRegister}
                />
            </div>
        );
    }
}