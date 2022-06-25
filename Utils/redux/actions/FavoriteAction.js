import {ActionType} from "./types";


export const removeFromFavorite = (item) => {
    return {type: ActionType.REMOVE_FROM_FAVORITE, payload: item.id}
}

export const addToFavorite = (product) => {
    return {type: ActionType.ADD_TO_FAVORITE, payload: product}
}