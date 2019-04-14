import { EventEmitter } from "events";

class Tag extends EventEmitter {

    constructor() {
        super();
        this.state = {
            tags: [{
                id: 1,
                name: "tag1"
            }, {
                id: 2,
                name: "react"
            }, {
                id: 3,
                name: "js"
            }],
            newTag: {
                id: 4,
                name: "node"
            },
            currentIndex: 4
        };
    }

    addTag(name) {

        let tag = {
            id: this.state.currentIndex,
            name: name
        };

        this.state = {
            ...this.state,
            tags: this.state.tags.concat([tag]),
            currentIndex: this.state.currentIndex + 1
        };
        this.emit("change", this.state);

        return tag;
    }
    
    toString(tag) {

        let s = "";
        tag.map(t => t.name).forEach(t => s = s + t + " ");
        return s;
    }

    isNew(tag) {
        let filteredTags = this.state.tags.filter(t => t.name === tag);
        return filteredTags.length > 0 ? false : true;
    }
}

const tag = new Tag();
export default tag;