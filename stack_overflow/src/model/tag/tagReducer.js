import { ADD_TAG } from "./tagActionTypes";

const initialState = {
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

function tagReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TAG:
            return addTag(state, action.payload);
    }
    return state;
};

function addTag(state, payload) {

    let tag = {
        id: state.currentIndex,
        name: payload.name
    };

    let newState = {
        ...state,
        tags: state.tags.concat([tag]),
        currentIndex: state.currentIndex + 1
    };

    return newState;
}

export default tagReducer;