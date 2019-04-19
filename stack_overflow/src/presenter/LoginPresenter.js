import user from "../model/User";
class LoginPresenter {

    onLogin() {

        let currentUser = user.login(user.state.newUser.username, user.state.newUser.password);
        if (currentUser.length > 0) {

            if (currentUser[0].isBanned === true) {
                window.alert("User has been banned!");
            } else {
                user.state.loggedUser = currentUser[0];
                window.location.assign("#/index");
            }
        } else {
            window.alert("Account does not exist!");
        }

        
        user.changeNewUserProperty("username", "");
        user.changeNewUserProperty("password", "");
        user.changeNewUserProperty("email", "");
    }

    onRegister() {

        let currentUser = user.login(user.state.newUser.username, user.state.newUser.password);
        if (currentUser.length > 0) {
            window.alert("User already exists!");
        } else {
            user.addUser(user.state.newUser.username, user.state.newUser.password, user.state.newUser.email, 0, false, false);
        }
        
        user.changeNewUserProperty("username", "");
        user.changeNewUserProperty("password", "");
        user.changeNewUserProperty("email", "");
    }

    onChange(property, value) {
        user.changeNewUserProperty(property, value);
    }
}

const loginPresenter = new LoginPresenter();
export default loginPresenter;