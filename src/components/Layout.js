import React, {useEffect, useState} from 'react';
import Contact from "./Footer/Contact";
import {
    AppBar,
    Badge,
    Button,
    Container,
    Link,
    ThemeProvider,
    Switch,
    Toolbar,
    CssBaseline,
    IconButton, Typography,
} from '@material-ui/core';
import Head from 'next/head'
import NextLink from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import useStyle from "../../Utils/styles";
import {createTheme, Menu, MenuItem,} from "@material-ui/core";
import {ActionType} from "../../Utils/redux/actions/types";
import {useRouter} from "next/router";
import Search from "./Header/Search";
import Burger from "./Header/Burger";
import {useDispatch, useSelector} from "react-redux";
import Categories from "./Categories";
import {Basket} from "../../Utils/svg";
import api from "../../api/globalApi";
import PhoneIcon from '@mui/icons-material/Phone';
import SearchModal from "../searchModal";
import {fetchPosts} from "../../Utils/redux/actions/fetchPosts";


const Layout = ({title, children, description}) => {
        const router = useRouter();
        const dispatch = useDispatch();
        const [modalActive, setModalActive] = useState(false)
        const {darkMode} = useSelector(state => state.mode)
        const {cart} = useSelector(state => state.cart)
        const {favorite} = useSelector(state => state.favorite)
        const [anchorEl, setAnchorEl] = useState(null)
        const [user, setUser] = useState('')
        const [search, setSearch]=useState('')
        const classes = useStyle();

        const theme = createTheme({
            breakpoints: {
                values: {
                    xxs: 0, // small phone
                    xs: 412, // phone
                    sm: 540, // tablets
                    md: 900, // small laptop
                    lg: 1200, // desktop
                    xl: 1536 // large screens
                }
            },
            typography: {
                h1: {
                    fontSize: '1.6rem',
                    fontWeight: 400,
                    margin: '1rem 0',
                },
                h2: {
                    fontSize: '1.4rem',
                    fontWeight: 400,
                    margin: '1rem 0',
                },
            },
            palette: {
                type: darkMode ? 'dark' : 'light',
                primary: {
                    main: '#7582EBFF',
                },
                secondary: {
                    main: '#faaf00',
                },
            },
        });

        useEffect(() => {
            const mode = JSON.parse(localStorage.getItem("mode"));
            dispatch({type: !mode ? ActionType.DARK_MODE_OF : ActionType.DARK_MODE_ON});
        }, [])


        const darkModeChangeHandler = () => {
            dispatch({type: darkMode ? ActionType.DARK_MODE_OF : ActionType.DARK_MODE_ON});
            const newDarkMode = !darkMode;
            localStorage.setItem("mode", newDarkMode);
        };

        const loginClickHandler = (e) => {
            setAnchorEl(e.currentTarget);
        };
        const loginMenuCloseHandler = () => {
            setAnchorEl(null);
        };
        const logoutClickHandler = () => {
            setAnchorEl(null);
            dispatch({type: ActionType.USER_LOGOUT});
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            localStorage.removeItem('userInfo');
            localStorage.removeItem('shippingAddress');
            router.push('/');
        };
        const [menuActive, setMenuActive] = useState(false)
        const getUser = async () => {
            try {
                const parse = JSON.parse(localStorage.getItem("access"));
                const res = await api.get("user/", {
                    headers: {authorization: `Bearer ${parse}`}
                })
                setUser(res.data)
                dispatch({type: ActionType.USER_INFO, payload: res.data})
            } catch (e) {
                setUser('')
            }
        }
        useEffect(() => {
            getUser()
        }, [anchorEl])

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(search)
        router.push(`/search?query=${search}`);
    };



    const queryChangeHandler =  (key, value) => {
        let object = new URLSearchParams(window.location.search);
        object.set(key, value);
        let newURL = `${window.location.pathname}?${object.toString()}`;
        router.push(newURL);
        console.log(search)
        dispatch(fetchPosts(search));
    };


        return (
            <div>
                <Head>
                    <title>{title ? `${title} -Интернет магазин || One click` : "Интернет магазин || One click"}</title>
                    {description && <meta name="description" content={description}/>}
                    <link rel="icon" href="/images/logo.svg"/>
                </Head>

                <ThemeProvider theme={theme}>
                    <CssBaseline/>
                    <AppBar
                        position="fixed"
                        className={classes.navbar}
                    >
                        <Toolbar>
                            <Burger active={menuActive} setActive={setMenuActive}/>
                            <div className={classes.grow}/>
                            <NextLink href="/" passHref>
                                <Typography className={classes.layoutBrand}>
                                    <span className={classes.brandR}>r</span>izon
                                </Typography>
                            </NextLink>
                            <Search/>
                            <div className={classes.grow}/>
                            <div className={classes.cardTitleIcon}>
                                <Switch
                                    color="secondary"
                                    size="medium"
                                    checked={darkMode}
                                    onChange={darkModeChangeHandler}
                                />
                                <NextLink href="#" passHref>
                                    <a>
                                        <IconButton className={classes.iconSvg}>
                                            <PhoneIcon/>
                                        </IconButton>
                                    </a>
                                </NextLink>
                                <NextLink href="/favorite" passHref>
                                    <a>
                                        {favorite.length > 0 ? (
                                            <IconButton>
                                                <Badge
                                                    color={"secondary"}
                                                    badgeContent={favorite.length}
                                                >
                                                    <FavoriteBorderIcon className={classes.iconSvg}/>
                                                </Badge>
                                            </IconButton>
                                        ) : (
                                            <IconButton>
                                                <FavoriteBorderIcon className={classes.iconSvg}/>
                                            </IconButton>
                                        )}
                                    </a>
                                </NextLink>
                                <NextLink href="/cart" passHref>
                                    <a>
                                        {cart?.length > 0 ? (
                                            <IconButton className={classes.iconSvg}>
                                                <Badge color="secondary" badgeContent={cart?.length}>
                                                    <Basket/>
                                                </Badge>
                                            </IconButton>
                                        ) : (
                                            <IconButton className={classes.iconSvg}>
                                                <Basket/>
                                            </IconButton>
                                        )}
                                    </a>
                                </NextLink>
                                {user ? (
                                    <>
                                        <Button
                                            className={classes.navbarBtn}
                                            aria-controls="simple-menu"
                                            aria-haspopup="true"
                                            onClick={loginClickHandler}
                                        >
                                            {user.username}
                                        </Button>
                                        <Menu
                                            id="basic-menu"
                                            anchorEl={anchorEl}
                                            open={Boolean(anchorEl)}
                                            onClose={loginMenuCloseHandler}
                                        >
                                            <MenuItem
                                                onClick={loginMenuCloseHandler}
                                            >
                                                <NextLink href="/profile">
                                                    <a>Мой раздел</a>
                                                </NextLink>
                                            </MenuItem>
                                            <MenuItem onClick={loginMenuCloseHandler}>
                                                <NextLink href="/about">
                                                    <a> О нас</a>
                                                </NextLink>
                                            </MenuItem>
                                            <MenuItem onClick={logoutClickHandler}>Выход</MenuItem>
                                            <MenuItem onClick={loginMenuCloseHandler}>
                                                <NextLink href="/contact">
                                                    <a>Контакты</a>
                                                </NextLink>
                                            </MenuItem>
                                        </Menu>
                                    </>
                                ) : (
                                    <NextLink href="/login" passHref>
                                        <Link>
                                            <PersonOutlineOutlinedIcon style={{fontSize: "x-large"}}/>
                                        </Link>
                                    </NextLink>
                                )}
                            </div>
                            <div
                                className={classes.layoutSearchIcon}
                                onClick={() => setModalActive(true)}
                            >
                                <SearchIcon/>
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Container>
                        {children}
                    </Container>
                    <Contact/>
                    <Categories active={menuActive} setActive={setMenuActive}/>
                    <SearchModal active={modalActive} setActive={setModalActive}>
                        <form onSubmit={submitHandler} className={classes.searchForm}>
                            <input
                                name="query"
                                className={classes.searchInput}
                                placeholder="Я ищу . . .  "
                                onChange={(e)=>setSearch(e.target.value)}
                            />
                            <IconButton
                                type="submit"
                                className={classes.iconButton}
                                aria-label="search"
                                onClick={() => queryChangeHandler("q", search)}
                            >
                                <SearchIcon/>
                            </IconButton>
                        </form>
                    </SearchModal>
                    {/*<div className={classes.navbarIcons}>*/}
                    {/*    <Switch*/}
                    {/*        color="success"*/}
                    {/*        size="medium"*/}
                    {/*        // checked={darkMode}*/}
                    {/*        // onChange={darkModeChangeHandler}*/}
                    {/*    />*/}
                    {/*    <NextLink href="#" passHref>*/}
                    {/*        <a>*/}
                    {/*            <IconButton className={classes.iconSvg}>*/}
                    {/*                <PhoneIcon/>*/}
                    {/*            </IconButton>*/}
                    {/*        </a>*/}
                    {/*    </NextLink>*/}
                    {/*    <NextLink href="/favorite" passHref>*/}
                    {/*        <a>*/}
                    {/*            {favorite.length > 0 ? (*/}
                    {/*                <IconButton>*/}
                    {/*                    <Badge*/}
                    {/*                        color={"secondary"}*/}
                    {/*                        badgeContent={favorite.length}*/}
                    {/*                    >*/}
                    {/*                        <FavoriteBorderIcon className={classes.iconSvg}/>*/}
                    {/*                    </Badge>*/}
                    {/*                </IconButton>*/}
                    {/*            ) : (*/}
                    {/*                <IconButton>*/}
                    {/*                    <FavoriteBorderIcon className={classes.iconSvg}/>*/}
                    {/*                </IconButton>*/}
                    {/*            )}*/}
                    {/*        </a>*/}
                    {/*    </NextLink>*/}
                    {/*    <NextLink href="/cart" passHref>*/}
                    {/*        <a>*/}
                    {/*            {cart?.length > 0 ? (*/}
                    {/*                <IconButton className={classes.iconSvg}>*/}
                    {/*                    <Badge color="secondary" badgeContent={cart?.length}>*/}
                    {/*                        <Basket/>*/}
                    {/*                    </Badge>*/}
                    {/*                </IconButton>*/}
                    {/*            ) : (*/}
                    {/*                <IconButton className={classes.iconSvg}>*/}
                    {/*                    <Basket/>*/}
                    {/*                </IconButton>*/}
                    {/*            )}*/}
                    {/*        </a>*/}
                    {/*    </NextLink>*/}
                    {/*    {user ? (*/}
                    {/*        <>*/}
                    {/*            <Button*/}
                    {/*                className={classes.navbarBtn}*/}
                    {/*                aria-controls="simple-menu"*/}
                    {/*                aria-haspopup="true"*/}
                    {/*                onClick={loginClickHandler}*/}
                    {/*            >*/}
                    {/*                /!*{user.username}*!/*/}
                    {/*                erlan*/}
                    {/*            </Button>*/}
                    {/*            <Menu*/}
                    {/*                id="basic-menu"*/}
                    {/*                anchorEl={anchorEl}*/}
                    {/*                open={Boolean(anchorEl)}*/}
                    {/*                onClose={loginMenuCloseHandler}*/}
                    {/*            >*/}
                    {/*                <MenuItem*/}
                    {/*                    onClick={loginMenuCloseHandler}*/}
                    {/*                >*/}
                    {/*                    <NextLink href="/profile">*/}
                    {/*                        <a>Profile</a>*/}
                    {/*                    </NextLink>*/}
                    {/*                </MenuItem>*/}
                    {/*                <MenuItem onClick={loginMenuCloseHandler}>My account</MenuItem>*/}
                    {/*                <MenuItem onClick={logoutClickHandler}>Logout</MenuItem>*/}
                    {/*            </Menu>*/}
                    {/*        </>*/}
                    {/*    ) : (*/}
                    {/*        <NextLink href="/login" passHref>*/}
                    {/*            <Link>*/}
                    {/*                <PersonOutlineOutlinedIcon style={{fontSize: "x-large"}}/>*/}
                    {/*            </Link>*/}
                    {/*        </NextLink>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </ThemeProvider>
            </div>
        );
    }
;

export default Layout;
