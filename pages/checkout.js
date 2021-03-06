import React, {useEffect, useState} from 'react';
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Common/Buttons";
import {Grid, List, TextField, Card, ListItem, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import NextLink from 'next/link'
import useStyle from "../Utils/styles";
import {useForm} from "react-hook-form";
import Axios from "../api/Api";
import {ActionType} from "../Utils/redux/actions/types";
import {useRouter} from "next/router";

const Checkout = () => {
    const {handleSubmit} = useForm();
    const {orderProduct} = useSelector(state => state.order);
    const {userInfo} = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [address, setAddress] = useState({})
    const [cashPaymentActive, setCashPaymentActive] = useState(false)
    const [active, setActive] = useState(false)
    const [delivery, setDelivery] = useState('')
    const [phone, setPhone] = useState('')
    const [payment, setPayment] = useState('')
    const [sendProduct, setSendProduct] = useState({})
    const [totalPrice, setTotalPrice] = useState('')
    const [product, setProduct] = useState([])
    const [formAddress, setFormAdderss] = useState({})
    const router = useRouter()
    const classes = useStyle();


    useEffect(() => {
        setAddress(JSON.parse(localStorage.getItem('address')))
        setProduct(JSON.parse(localStorage.getItem('cart')))
        setFormAdderss(JSON.parse(localStorage.getItem('formAddress')))
        setDelivery(JSON.parse(localStorage.getItem('delivery')))
    }, [])

    useEffect(() => {
        product.map(el => (
            setSendProduct(el)
        ))
        setTotalPrice(product?.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(1))
    }, [product])

    const submitHandler = async () => {
        try {
            await Axios.post('/orders', {
                delivery: delivery,
                payment: payment,
                address: formAddress.address,
                phone: phone,
                products: [{
                    product: sendProduct.id,
                    qt: sendProduct.quantity,
                    size: sendProduct.sizes,
                    color: sendProduct.color
                }],
                total: totalPrice,
                username: userInfo.username,
                floor: formAddress.flor,
                intercom: formAddress.intercom,
                entrance: formAddress.entrance
            })
        } catch (e) {
            console.log(e)
        }
    }

    const Order = (data) => {
        try {
            dispatch({type: ActionType.ORDER_TRUE, payload: data})
            localStorage.setItem('delivery', JSON.stringify(delivery))
            router.push('/form')
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <Layout>
            <Buttons/>
            <form onSubmit={handleSubmit(submitHandler)}>
                <Grid container spacing={1}>
                    <Grid item xs={12} md={7}>
                        <List>
                            <ListItem>
                                <Typography component='h1' variant='h1'>
                                    <strong>
                                        ???????????????????? ????????????
                                    </strong>
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Typography component='h2' variant='h2'>
                                    C?????????? ????????????????
                                </Typography>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item md={5}>
                                        <Typography
                                            variant='h2'
                                            component='h2'
                                        >
                                            ??????????????
                                        </Typography>
                                        <button className='btnFav'>
                                            <span className='free'>
                                                <label onClick={() => Order('courier')} key="????????????????">
                                                    <input
                                                        // onClick={() => setPay(" ?????????????? ")}
                                                        type="radio"
                                                        onChange={(e) => setDelivery(e.target.value)}
                                                        name="inputRadios"
                                                        value='paid'
                                                    />
                                                    ????????????????
                                                </label>
                                            </span>
                                        </button>
                                    </Grid>
                                    <Grid item cs={12} md={2} className={classes.reviewItem}/>
                                    <Grid item md={3}>
                                        <Typography variant='h2' component='h2'>????????????????????</Typography>
                                        <div className={classes.flex1}>
                                            <NextLink href='/issuepoint'>
                                                <a style={{textDecoration: 'none'}}>
                                                    <button className='btnFav'>
                                                        ???????? ????????????
                                                    </button>
                                                </a>
                                            </NextLink>
                                            <div className='free deliverFree'>
                                                <label key="???????????????? ???????????? ???? ???????????? ????????????">
                                                    <input
                                                        onClick={() => Order('courier')}
                                                        type="radio"
                                                        onChange={(e) => setDelivery(e.target.value)}
                                                        name="inputRadios"
                                                        value='free'
                                                    />
                                                    ????????????????
                                                    <p style={{fontSize: '0.4rem'}}>???????????? ???? ???????????? ????????????</p>
                                                </label>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </ListItem>
                            {orderProduct === "courier" ? (

                                <div>
                                    {formAddress ? (
                                            <List>
                                                <ListItem>
                                                    <Typography variant='h1' component='h1'>?????? ????????????</Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography>??.??.??:</Typography>
                                                    <Typography pl={2}>{formAddress.name}</Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography>??????????????:</Typography>
                                                    <Typography pl={2}>{formAddress.phone}</Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography>??????????:</Typography>
                                                    <Typography pl={2}>{formAddress.address}</Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography>??????????????:</Typography>
                                                    <Typography pl={2}>{formAddress.flor}</Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography>????????:</Typography>
                                                    <Typography pl={2}>{formAddress.entrance}</Typography>
                                                </ListItem>
                                                <ListItem>
                                                    <Typography>??????????????:</Typography>
                                                    <Typography pl={2}>{formAddress.intercom}</Typography>
                                                </ListItem>
                                            </List>
                                        ): (null)}
                                </div>
                            ) : (
                                <List>
                                    <Typography variant='h1' component='h1'>?????? ???????????? ??????????</Typography>
                                    <p className={classes.address}>
                                        {address.name}
                                    </p>
                                </List>
                            )}
                            <List>
                                <ListItem>
                                    <Typography component='h1' variant='h2' id='#chek'>
                                        ???????????? ????????????
                                    </Typography>
                                </ListItem>
                                <ListItem className={classes.flexStart}>
                                    <div className='checkboxPaymentCart'>
                                        <div className='payWithCart'>
                                            <label>
                                                ????
                                                <input
                                                    type="radio"
                                                    onChange={(e) => setPayment(e.target.value)}
                                                    name="inputRadios"
                                                    value='cash'
                                                />
                                                <span
                                                    onClick={() => cashPaymentActive ? setCashPaymentActive(false) : setCashPaymentActive(true)}
                                                    className='spanPayCart'
                                                >
                                                            ??????????????????????????????
                                                        </span>
                                            </label>
                                        </div>
                                        <div className='payWithCart'>
                                            <label key="Mbank">
                                                <img
                                                    src='https://play-lh.googleusercontent.com/dsfiyTKElmAxtD0QhvuXdfHGhWsbnDW7vTC_dYdeN9yKTv9xs8_HyHz1O8c9f6uvrQ'
                                                    alt="mbank"
                                                    width={12}
                                                />
                                                <input
                                                    type="radio"
                                                    onChange={(e) => setPayment(e.target.value)}
                                                    name="inputRadios"
                                                    value='m_bank'

                                                />
                                                <span
                                                    onClick={() => active ? setActive(false) : setActive(true)}
                                                    className='spanPayCart'
                                                >
                                                            Mbank
                                                        </span>
                                            </label>
                                        </div>
                                        <div className='payWithCart'>
                                            <label key="??! ????????????">
                                                <input
                                                    type="radio"
                                                    onChange={(e) => setPayment(e.target.value)}
                                                    name="inputRadios"
                                                    value='o_maney'

                                                />
                                                <img
                                                    src="https://cms.timbu.com/storage/photos/O!-1562927890.png"
                                                    alt="?????????????? ????! ??????????????"
                                                    width={15}
                                                />
                                                <span
                                                    onClick={() => active ? setActive(false) : setActive(true)}
                                                    className='spanPayCart'
                                                >
                                                            ????! ??????????????
                                                        </span>
                                            </label>
                                        </div>
                                        <div className='payWithCart'>
                                            <label key="Balance.kg">
                                                <img
                                                    src="https://play-lh.googleusercontent.com/xN4NjulPfpO6gChBLWSdqH30mfzikW1mCwxvHx5Qp2TI-59E5p0e3SqU67VaI5whpF0"
                                                    alt="?????????????? ??Balance.kg??"
                                                    width={15}
                                                />
                                                <input
                                                    type="radio"
                                                    onChange={(e) => setPayment(e.target.value)}
                                                    name="inputRadios"
                                                    value='balance_kg'

                                                />
                                                <span
                                                    onClick={() => active ? setActive(false) : setActive(true)}
                                                    className='spanPayCart'
                                                >
                                                            ??Balance.kg??
                                                        </span>
                                            </label>
                                        </div>
                                        <div className='payWithCart'>
                                            <label key="MegaPay">
                                                <img
                                                    src="https://play-lh.googleusercontent.com/jNzcWphuFaZAOV-M8ufJqpPHwdXpQrMA8jHScmRuLrYKfPT1RWJk10UiTP5F1XtExy2f"
                                                    width={15}
                                                    alt="MegaPay"
                                                />
                                                <input
                                                    type="radio"
                                                    onChange={(e) => setPayment(e.target.value)}
                                                    name="inputRadios"
                                                    value='mega_pay'

                                                />
                                                <span
                                                    onClick={() => active ? setActive(false) : setActive(true)}
                                                    className='spanPayCart'
                                                >
                                                            MegaPay
                                                        </span>
                                            </label>
                                        </div>
                                        <div className='payWithCart'>
                                            <label key="??????????">
                                                <img
                                                    src="https://elsom.kg/wp-content/uploads/2020/12/logo-Elsom-RGB-72.png"
                                                    alt="??????????"
                                                    width={15}
                                                />
                                                <input
                                                    type="radio"
                                                    onChange={(e) => setPayment(e.target.value)}
                                                    name="inputRadios"
                                                    value='el_som'

                                                />
                                                <span
                                                    onClick={() => active ? setActive(false) : setActive(true)}
                                                    className='spanPayCart'
                                                >
                                                             ??????????
                                                        </span>
                                            </label>
                                        </div>
                                    </div>
                                </ListItem>
                                <List className={cashPaymentActive ? "block" : 'none'}>
                                    <ListItem>
                                        <Typography variant='h2' component='h2'>
                                            ???????????? ?????????????????? ??????????????
                                        </Typography>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={12} md={5}>
                                                <label>
                                                    ?????????? ??: <input
                                                    className='phone'
                                                    type='phone'
                                                    placeholder='+996 xx xx xx'
                                                    onChange={(e) => setPayment(e.target.value)}
                                                />
                                                </label>
                                            </Grid>
                                            <Grid item xs={12} md={4} className={classes.flexCenter}>
                                                <label>
                                                    ?????? ??????????: <input
                                                    type='radio'
                                                    onChange={(e) => setPayment(e.target.value)}
                                                />
                                                </label>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </List>
                                <List className={active ? "block" : 'none'}>
                                    <ListItem>
                                        <Typography variant='h2' component='h2'>
                                            MBank Online ???? ?????????? ????????????????????
                                        </Typography>
                                    </ListItem>
                                    <div>
                                        <Grid container className={classes.flexCenter}>
                                            <Grid item xs={12} md={1} style={{paddingLeft: 10}}>
                                                <span className={classes.exclamatory}>!</span>
                                            </Grid>
                                            <Grid item xs={12} md={8}>
                                                <span className={classes.payCartTitle}>
                                                     ?????????????????????? ?????????????????? ?????????????????? ?????? ???????????? ?????????? 990 ??????.
                                                     ???????????? ???? ???????????????? ?????? ???????????? ?????????? 990 ?????? ???????????????? ????????????????
                                                     ???????????????? Namba Food.
                                                </span>
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={12} md={3}>
                                            <span style={{fontSize: 14}}>
                                                ?????????????? ?????? ??????????
                                                ????????????????:
                                            </span>
                                            </Grid>
                                            <Grid item xs={12} md={5}>
                                                <TextField
                                                    variant="outlined"
                                                    type='phone'
                                                    placeholder='+996 xxx xxx xxx'
                                                    onChange={(e) => setPhone(e.target.value)}
                                                />
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid container>
                                            <Grid item xs={12} md={9}>
                                            <span style={{fontSize: '.7rem'}}>
                                               ?????? ?????????? ?????????????????? ???????????? ???? ???????????? ?????????? Nambafood.
                                               ???????? ?????????? ???????????? MBank Online ???????????????????? ???? ????????????????, ???? ???????????????? ??????.
                                            </span><br/>
                                                <span style={{fontSize: '.7rem'}}> ?????? ???????????? ???????? ???????????????? - ???????????????????? ????????????????</span>
                                            </Grid>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </List>
                        </List>
                    </Grid>
                    <Grid xs={12} md={2}/>
                    <Grid item xs={12} md={3}>
                        <Card>
                            <List>
                                <ListItem className={classes.flex}>
                                    <div>
                                        <Typography variant='h1'>
                                            ??????????:
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography variant='h2'>
                                            {product?.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(1)} co??
                                        </Typography>
                                    </div>
                                </ListItem>
                                <ListItem className={classes.flex}>
                                    <div>
                                        <Typography>
                                            ????????????:
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                            {product?.reduce((a, c) => a + c.quantity, 0)} ????
                                        </Typography>
                                    </div>
                                </ListItem>
                                <ListItem className={classes.flex}>
                                    <div>
                                        <Typography>
                                            ????????????:
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography>
                                            10%
                                        </Typography>
                                    </div>
                                </ListItem>
                                <ListItem>
                                    <button
                                        className='globalBtn'
                                        type='submit'
                                    >
                                        <NextLink href='/checkouttotal'>
                                            <a>
                                                ????????????????
                                            </a>
                                        </NextLink>
                                    </button>
                                </ListItem>
                                <ListItem>
                                    <Typography style={{fontSize: '12px'}} color={"gray"}>
                                        ???????????????? ?? ?????????????????? ???????????? ?????????????????????? ???????????????? ?????????????????? ?? ?????????????????? ????????????????
                                    </Typography>
                                </ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </Layout>
    );
};

export default Checkout;
