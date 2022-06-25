import {ActionType} from "../actions/types";

const init_state={
    posts:[]
}

export const fetchPostsReducer=(state= init_state, action)=>{
    switch (action.type){
        case ActionType.FETCH_POSTS:
            return{...state, posts: action.payload}
        default:
            return state
    }
}