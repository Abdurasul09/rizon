import {ActionType} from "../actions/types";

const initialState = {
    favorite: []
}


export const FavoriteReducer = (state = initialState, action) => {
    switch (action.type){
        case ActionType.ADD_TO_FAVORITE: {
            const findProduct = state.favorite.find(el => el.id === action.payload.id)
            if (findProduct) {
                return {
                    ...state, favorite: state.favorite.map(el => el.id === action.payload.id ?
                        {...el, color: "red"} : el)
                }
            }
            return {...state, favorite: [...state.favorite, {...action.payload, color: 'red'}]};
        }
        default:
            return state
    }
}