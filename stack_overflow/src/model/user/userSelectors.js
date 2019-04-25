import store from "../store/store";

export function getLoggedUser() {
    let userState = store.getState().userState;
    return userState.loggedUser;
};