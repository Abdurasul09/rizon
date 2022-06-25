import '../src/styles/index.scss'
import {useEffect} from "react";
import {SnackbarProvider} from "notistack";
import {store} from "../Utils/redux/Store";
import {Provider} from "react-redux";
import {createWrapper} from "next-redux-wrapper"
import '../src/styles/index.scss'

function App({Component, pageProps}) {
    useEffect(() => {
        const jssStyles = document.querySelector("#jss-server-side")
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles)
        }
    }, []);

    return (
        <SnackbarProvider anchorOrigin={{vertical: "top", horizontal: "center"}}>
            <Provider store={store}>
                <Component {...pageProps} />
            </Provider>
        </SnackbarProvider>
    )
}


const makestore = () => store;
const wrapper = createWrapper(makestore)

export default wrapper.withRedux(App)