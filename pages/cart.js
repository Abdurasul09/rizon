import React, {useEffect} from 'react';
import Layout from "../src/components/Layout";
import {
    Grid, Link,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Table,
} from "@material-ui/core";
import NextLink from "next/link";
import useStyle from "../Utils/styles";
import {DecFromCart, DeleteFromCart, getCart, addToCartHandler} from "../Utils/redux/actions/CartAction";
import {useDispatch, useSelector} from "react-redux";
import SubTotal from "../src/components/Cart/SubTotal";
import Buttons from "../src/components/Common/Buttons/Buttons";
import {Delete, Minus, Plus} from "../Utils/svg";


const CartScreen = () => {
    const dispatch = useDispatch();
    const {cart} = useSelector(state => state.cart);
    const classes = useStyle();

    useEffect(() => {
        dispatch(getCart(JSON.parse(localStorage.getItem('cart'))))
    }, [])
    return (
        <div className={classes.cartScreen}>
            <Layout title="Shopping cart">
                <Buttons/>
                <Typography component="h1" variant="h1">Корзина({
                    cart ? (
                        cart.length
                    ) : (
                        0
                    )
                })</Typography>
                {!cart ? (
                    <>
                        <h2>Корзина пуста!</h2>
                        <NextLink href="/"><Link>Ходить по магазинам</Link></NextLink>
                    </>
                ) : (
                    <Grid container spacing={1}>
                        <Grid item md={8} xs={12}>
                            <TableContainer className={classes.cartTableContainer}>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Изображение</TableCell>
                                            <TableCell>Имя</TableCell>
                                            <TableCell align="center">Количество</TableCell>
                                            <TableCell align="center">Цена</TableCell>
                                            <TableCell align="center">Удалит</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {cart.map(el => (
                                            <TableRow key={el.id}>
                                                <TableCell>
                                                    {el.images.slice(0, 1).map(item => (
                                                        <div key={item.id}>
                                                            <NextLink
                                                                href={`/product/${el.id}`}
                                                                passHref
                                                            >
                                                                <img
                                                                    src={item.image}
                                                                    alt='Хлопковая футболка-поло с короткими рукавами для мальчика'
                                                                    width={100}
                                                                    height={120}
                                                                    style={{objectFit: "contain"}}
                                                                />
                                                            </NextLink>
                                                        </div>
                                                    ))}
                                                </TableCell>
                                                <TableCell>
                                                    <NextLink href={`/product/${el.id}`} passHref>
                                                        <Typography>
                                                            {el.title}
                                                        </Typography>
                                                    </NextLink>
                                                    <Typography className={classes.cartPrice}>
                                                        <span>Размер:</span>&nbsp;{el.sizes}
                                                    </Typography>
                                                    <Typography className={classes.cartPrice}>
                                                        <span>Цвет:</span>&nbsp;{el.color}
                                                    </Typography>
                                                </TableCell>
                                                <TableCell align="center">
                                                    <div className={classes.flex}>
                                                        {el.quantity === 1 ? (
                                                            <div>
                                                                <Minus/>
                                                            </div>
                                                        ) : (

                                                            <div
                                                                disabled={el.quantity === 1}
                                                                className={classes.cartDel}
                                                                onClick={() => dispatch(DecFromCart(el.id))}
                                                            >
                                                                <Minus/>
                                                            </div>
                                                        )}
                                                        <span className={classes.cartQuantity}>{el.quantity}</span>
                                                        <div
                                                            className={classes.cartDel}
                                                            onClick={() => dispatch(addToCartHandler(el))}
                                                        >
                                                            <Plus/>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell align="center">
                                                    {cart.map(el => (
                                                        <span key={el.id}>
                                                            {el.price} сом
                                                        </span>
                                                    ))}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <span
                                                        className={classes.cartDel}
                                                        onClick={() => (dispatch(DeleteFromCart(el)))}
                                                    >
                                                        <Delete/>
                                                    </span>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <div className={classes.cartMd}>
                                <div className={classes.cartTableBodyMd}>
                                    {cart?.map(el => (
                                        <div key={el.id}>
                                            <div className={classes.flexStart}>
                                                <div>
                                                    {el.images.slice(0, 1).map(item => (
                                                        <div key={item.id}>
                                                            <NextLink
                                                                href={`/product/${el.id}`}
                                                                passHref
                                                            >
                                                                <img
                                                                    src={item.image}
                                                                    alt='Хлопковая футболка-поло с короткими рукавами для мальчика'
                                                                    width={100}
                                                                    height={120}
                                                                    style={{objectFit: "contain"}}
                                                                />
                                                            </NextLink>
                                                        </div>
                                                    ))}
                                                </div>
                                                <div>
                                                    <NextLink href={`/product/${el.id}`} passHref>
                                                        <Typography>
                                                            {el.title}
                                                        </Typography>
                                                    </NextLink>
                                                    <Typography className={classes.cartPrice}>
                                                        <span>Размер:</span>&nbsp;{el.sizes}
                                                    </Typography>
                                                    <Typography className={classes.cartPrice}>
                                                        <span>Цвет:</span>&nbsp;{el.color}
                                                    </Typography>
                                                </div>
                                            </div>
                                            <div style={{marginTop: 15}} className={classes.flex}>
                                                <div className={classes.flex}>
                                                    <div
                                                        className={classes.cartDel}
                                                        onClick={() => dispatch(DecFromCart(el.id))}
                                                    >
                                                        <Minus/>
                                                    </div>
                                                    <span className={classes.cartQuantity}>{el.quantity}</span>
                                                    <div
                                                        className={classes.cartDel}
                                                        onClick={() => dispatch(addToCartHandler(el))}
                                                    >
                                                        <Plus/>
                                                    </div>
                                                </div>
                                                <div>
                                                         <span
                                                             className={classes.cartDel}
                                                             onClick={() => (dispatch(DeleteFromCart(el)))}
                                                         >
                                                             <Delete/>
                                                         </span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Grid>
                        <Grid item md={1} xs={12}/>
                        <Grid item md={3} xs={12}>
                            <SubTotal cart={cart}/>
                        </Grid>
                    </Grid>
                )}
            </Layout>
        </div>

    );
};

// export default dynamic(() => Promise.resolve(CartScreen), {ssr: false});
export default CartScreen;