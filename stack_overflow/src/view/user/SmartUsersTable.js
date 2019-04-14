import React, { Component } from "react";
import user from "../../model/User";
import UsersTable from "./UsersTable";
import UsersTablePresenter from "../../presenter/UsersTablePresenter";

const mapUserStateToComponentState = userState => ({
    users: userState.users,
    loggedUser: userState.loggedUser
});

export default class SmartUsersTable extends Component {
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
                <h2> Users </h2>
                <UsersTable
                    users={this.state.users}
                    onBan={UsersTablePresenter.onBan}
                />
            </div>
        );
    }
}