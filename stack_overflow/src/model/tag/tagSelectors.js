export function toString(tag) {

    let s = "";
    tag.map(t => t.name).forEach(t => s = s + t + " ");
    return s;
}
