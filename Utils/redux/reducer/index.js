import {combineReducers} from "redux";
import {CartReducer} from "./cartReducer";
import {FavoriteReducer} from "./favoriteReducer";
import {ModeReducer} from "./modeReducer";
import {LoginReducer} from "./loginReducer";
import {PaymentMethodReducer} from "./paymentReducer";
import {ChangeUserReducer} from "./changeUserReducer";
import {fetchPostsReducer} from "./fetchPosts";
import {Comments} from "./comments";
import {Location} from './location'
import {orderReducer} from "./order";
import {checkoutAddress} from "./checkoutAddress";

export default combineReducers({
    cart: CartReducer,
    favorite: FavoriteReducer,
    mode: ModeReducer,
    user: LoginReducer,
    payment: PaymentMethodReducer,
    changeUser: ChangeUserReducer,
    posts: fetchPostsReducer,
    com: Comments,
    address: Location,
    order: orderReducer,
    addressForm: checkoutAddress,
})