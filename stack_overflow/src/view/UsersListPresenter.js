import User from "../model/User"

class UsersListPresenter {

    onCreate() {
        User.addUser(
            User.state.newUser.id,
            User.state.newUser.username,
            User.state.newUser.password,
            User.state.newUser.email,
            User.state.newUser.score,
            User.state.newUser.isAdmin,
            User.state.newUser.isBanned
        );
        User.changeNewUserProperty("id", "");
        User.changeNewUserProperty("username", "");
        User.changeNewUserProperty("lastname", "");
        User.changeNewUserProperty("email", "");
        User.changeNewUserProperty("score", "");
        User.changeNewUserProperty("isAdmin", "");
        User.changeNewUserProperty("isBanned", "");
    }

    onChange(property, value) {
        User.changeNewUserProperty(property, value);
    }
}

const usersListPresenter = new UsersListPresenter();
export default usersListPresenter;