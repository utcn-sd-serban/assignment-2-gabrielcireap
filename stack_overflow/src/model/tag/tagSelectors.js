import store from "../store/store";

export function toString(tag) {
    let s = "";
    tag.map(t => t.name).forEach(t => s += t + " ");
    return s;
}

export function isNew(tag) {
    let tagList = store.getState().tagState.tags.filter(t => t.name === tag.name);
    return tagList.length > 0 ? false : true;
}
