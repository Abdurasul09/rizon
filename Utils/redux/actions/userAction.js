import {ActionType} from "./types";

export const UserAction = (users) => {
    return{type: ActionType.CHANGE_USER, payload: users.payload}
}

export const SaveUser = (user) => {
    return{
        type: ActionType.SAVE_USERS, payload: user.payload
    }
}

export const userEmailAction = (email) => {
    return {
        type: ActionType.EMAIL_HANDLER,
        email
    }
}