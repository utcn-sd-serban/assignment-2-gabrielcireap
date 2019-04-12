import React, { Component } from "react";
import user from "../model/User";
import UsersList from "./UsersList";
import usersListPresenter from "../presenter/UsersListPresenter";

const mapUserStateToComponentState = userState => ({
    users: userState.users,
    id: userState.newUser.id,
    username: userState.newUser.username,
    password: userState.newUser.id,
    email: userState.newUser.id,
    score: userState.newUser.id,
    isAdmin: userState.newUser.id,
    isBanned: userState.newUser.id
});

export default class SmartUsersList extends Component {
    constructor() {
        super();
        this.state = mapUserStateToComponentState(user.state);
        this.listener = userState => this.setState(mapUserStateToComponentState(userState));
        user.addListener("change", this.listener);
    }

    componentWillUnmount() {
        user.removeListener("change", this.listener);
    }

    render() {
        return (
            <UsersList
                onCreate={usersListPresenter.onCreate}
                onChange={usersListPresenter.onChange}
                id={this.state.newUser.id}
                username={this.state.newUser.username}
                password={this.state.newUser.password}
                email={this.state.newUser.email}
                score={this.state.newUser.score}
                isAdmin={this.state.newUsere.isAdmin}
                isBanned={this.state.newUser.isBanned}
                users={this.state.newUser.users}
            />
        );
    }
}