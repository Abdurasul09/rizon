import React, {useEffect, useState} from 'react';
import NextLink from "next/link";
import Layout from "../../src/components/Layout";
import useStyle from "../../Utils/styles";
import {
    Avatar,
    CircularProgress,
    IconButton,
    Grid,
    List,
    Typography
} from "@material-ui/core";
import {useDispatch} from "react-redux";
import api from "../../api/globalApi";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../Utils/redux/actions/FavoriteAction";
import Comment from "../../src/components/Comment/Comment";
import Image from 'next/image';
import {addToCartHandler, addToCartProductPrice} from "../../Utils/redux/actions/CartAction";
import ShareIcon from '@mui/icons-material/Share';
import {useSnackbar} from "notistack";
import Modal from "../../src/components/Ocno";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Buttons from "../../src/components/Common/Buttons/Buttons";
import TelegramIcon from "@mui/icons-material/Telegram";

const ProductScreen = ({product}) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [clickedImg, setClickedImg] = useState(0)
    const [currentProduct, setCurrentProduct] = useState()
    const [cartProduct, setCartProduct] = useState(currentProduct)
    const [size, setSize] = useState([])
    const [modalActive, setModalActive] = useState(false)
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();


    const sendUrl = `https://mui.com/store/previews/onepirate/`

    console.log('currentProduct', currentProduct)
    console.log('product', product)
    console.log(currentProduct)

    useEffect(() => {
        if (!currentProduct) return
        setCartProduct(currentProduct)
    }, [size])

    useEffect(() => {
        product?.products.slice(0, 1).map((item) => {
            item.title = product.title
            item.quantity = 0
            item.price = product.price
            item.discount = product.discount
            setCurrentProduct(item)
        })
        dispatch(addToCartProductPrice(product))
    }, [product])

    const buy = () => {
        closeSnackbar();
        if (!size) {
            enqueueSnackbar("Выберите размер", {variant: 'error'})
            return
        }
        try {
            enqueueSnackbar('ТОВАРЫ В КОРЗИНЕ', {variant: 'success'})
            cartProduct.sizes = size
            return dispatch(addToCartHandler(cartProduct))
        } catch (e) {
            console.log(e)
        }
    }
    const addToFav = (product) => {
        try {
            enqueueSnackbar('ТОВАРЫ В ИЗБРАННОЕ', {variant: 'success'})
            return dispatch(addToFavorite(product))
        } catch (e) {
            console.log(e)
        }
    }
    return (
        <Layout
            title={product.title}
            description={product.description}
        >
            {product ? (
                <>
                    <div className={classes.section}>
                        <Buttons/>
                        <div>
                            <Typography
                                component="h1"
                                variant="h1"
                            >
                                <strong>{product.title}</strong>
                            </Typography>
                        </div>
                        <Grid container spacing={1}>
                            <Grid item md={6} xs={10}>
                                <div className={classes.flex}>
                                    <Grid item md={2} xs={2}>
                                        <div className={classes.idSmalImage}>
                                            {currentProduct?.images.map((item, idx) => (
                                                <List key={idx}>
                                                    <Image
                                                        src={item.image}
                                                        width={78}
                                                        alt={item.title}
                                                        height={100}
                                                        onClick={() => {
                                                            setClickedImg(idx)
                                                        }}
                                                    />
                                                </List>
                                            ))}
                                        </div>
                                    </Grid>
                                    <Grid item md={10}>
                                        <div>
                                            <img
                                                alt={currentProduct?.images[clickedImg].title}
                                                src={currentProduct?.images[clickedImg].image}
                                                className={classes.idProductGlobalImg}
                                            />
                                        </div>
                                    </Grid>
                                </div>
                                {product.description ? (
                                    <div className={classes.idProdDescriptions}>
                                        <h1>
                                            Описание
                                        </h1>
                                        {/*<div*/}
                                        {/*    dangerouslySetInnerHTML={{*/}
                                        {/*        __html: `${product.description}`*/}
                                        {/*    }}/>*/}
                                        {product.description}
                                    </div>
                                ) : ('')}
                            </Grid>
                            <Grid item md={6} xs={12}>
                                <div>
                                    <div className={classes.flexStart}>
                                        <Grid item md={3} xs={4}>
                                            <Typography
                                                component="h1"
                                                variant="h1"
                                                style={{margin: 0}}
                                            >
                                                <strong>
                                                    {product.price} coм
                                                </strong>
                                            </Typography>
                                        </Grid>
                                        <Grid item md={2} xs={4}>
                                            <Typography>
                                                <del style={{color: "grey", fontSize: '18px'}}>
                                                    {product.price} coм
                                                </del>
                                            </Typography>
                                        </Grid>
                                    </div>
                                    <div className={classes.flexStart}>
                                        <Grid item md={2} xs={4}>
                                            <Typography>Скидка:</Typography>
                                        </Grid>
                                        <Grid item md={2} xs={4}>
                                            {product.discount ? (
                                                <Avatar
                                                    className={classes.globalColorYellow}
                                                >
                                                    <Typography style={{color: "gray"}}>
                                                        -{product.discount}%
                                                    </Typography>
                                                </Avatar>
                                            ) : (
                                                " "
                                            )}
                                        </Grid>
                                    </div>
                                    <div className={classes.flexStart} style={{margin: '15px 0 10px 0'}}>
                                        <Grid item md={2} xs={2}>
                                            <Typography>Цвет:</Typography>
                                        </Grid>
                                        <Grid item md={2} xs={1}>
                                            {currentProduct?.color ? (
                                                <span className={classes.idProductColorSize}>
                                                    {currentProduct.color}
                                                </span>
                                            ) : (" ")}
                                        </Grid>
                                    </div>
                                    <div className={classes.flexStart}>
                                        {product.products.map((item, id) => (
                                            <div
                                                onClick={() => setCurrentProduct(item)}
                                                key={id}
                                                style={{margin: 2}}
                                            >
                                                <Image
                                                    alt={item.images[0].title}
                                                    src={item.images[0].image}
                                                    width={78}
                                                    height={100}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={classes.outlined}/>
                                    <div style={{margin: '15px 0 10px 0'}}>
                                        <Typography pl={2} pt={1}>Размер: {size ? (
                                            <span className={classes.idProductColorSize}>
                                                {size}
                                            </span>
                                        ) : (
                                            <span className={classes.idProductColorSize}
                                            >
                                                Не выброно
                                            </span>
                                        )}</Typography>
                                    </div>
                                    <div style={{marginBottom: 15}}>
                                        <form className={classes.flexStart}>
                                            {currentProduct?.sizes.map((itemSize,id) => (
                                                <div key={id} className='form_radio_btn'>
                                                    <label
                                                        key={id}
                                                        style={{
                                                            backgroundColor: size === itemSize.size ? "#0a0c0c" : null,
                                                            color: size === itemSize.size ? "#ffffff" : null
                                                        }}
                                                    >
                                                        <input
                                                            type="radio"
                                                            onChange={(e) => setSize(e.target.value)}
                                                            id={`${itemSize.size}`}
                                                            name="inputRadios"
                                                            value={`${itemSize.size}`}
                                                        />
                                                        {itemSize.size}
                                                    </label>
                                                </div>
                                            ))}
                                        </form>
                                    </div>
                                    <div className={classes.flexCenter}>
                                        <button
                                            className='btnCart'
                                            onClick={() => {
                                                buy()
                                            }}
                                        >
                                            Добавить в корзину
                                        </button>
                                        <button
                                            className='btnFav'
                                            onClick={() => addToFav(product)}
                                        >
                                            <FavoriteBorderIcon fontSize={"small"}/>&nbsp; Избранное
                                        </button>
                                    </div>
                                    <div/>
                                    <div className={classes.idProductStore}>
                                        <div>
                                            <p className={classes.idProductStoreArticle}>
                                                Артикул: 65634576527
                                            </p>
                                            <p className={classes.idProductStoreArticle}>
                                                Продавец: Алиса Анарбаева
                                            </p>
                                        </div>
                                        <div className={classes.flexStart}>
                                            <NextLink href={`/stores/${product.id}`}>
                                                <a>
                                                    <button className='btnFav'>
                                                        Перейти в магазине
                                                    </button>
                                                </a>
                                            </NextLink>&nbsp;
                                            <IconButton
                                                onClick={() => setModalActive(true)}
                                            >
                                                <ShareIcon/>
                                            </IconButton>
                                        </div>
                                    </div>
                                </div>
                            </Grid>
                            <div className={classes.idProdDescriptionsMd}>
                                <h2 style={{color: 'gray', paddingTop: '-5px'}}>
                                    Описание
                                </h2>
                                <Typography dangerouslySetInnerHTML={{__html: product.description}}/>
                            </div>
                        </Grid>
                        <div>
                            <Typography component='h1' variant='h1'>С товаром рекомендуют</Typography>
                        </div>
                    </div>
                    <Comment item={product}/>
                    <Modal active={modalActive} setActive={setModalActive}>
                        <Typography component='h1' variant='h1'>Поделиться</Typography>
                        <div>
                            <div className={classes.flexStart}>
                                <div>
                                    <span className={classes.contactPagePhone}>
                                        <TelegramIcon fontSize={"large"} className={classes.iconSvg}/>
                                    </span>
                                </div>
                                <div style={{margin: "15px"}}>
                                    <span className={classes.contactPageWhatsapp}>
                                        <NextLink href='https://www.whatsapp.com/'>
                                            <a>
                                                <WhatsAppIcon fontSize={"large"} className={classes.iconSvg}/>
                                            </a>
                                        </NextLink>
                                    </span>
                                </div>
                                <div>
                                    <span className={classes.contactPageInstagram}>
                                        <NextLink href='https://www.instagram.com/'>
                                            <a>
                                                <InstagramIcon fontSize={"large"} className={classes.iconSvg}/>
                                            </a>
                                        </NextLink>
                                    </span>
                                </div>
                                <div style={{margin: "15px"}}>
                                    <span className={classes.contactPagePhone}>
                                        <NextLink href='https://www.facebook.com/'>
                                             <a>
                                                 <FacebookIcon fontSize={"large"} className={classes.iconSvg}/>
                                             </a>
                                        </NextLink>
                                    </span>
                                </div>
                            </div>
                            <div style={{margin: "15px 0"}} className={classes.flex}>
                                <input
                                    type="text"
                                    className='url'
                                    value={sendUrl}
                                    onChange={(e)=>console.log(e)}
                                />
                                <button className='btnCart'
                                        onClick={async (event) => await navigator.clipboard.writeText(sendUrl)}
                                >
                                    Копировать
                                </button>
                            </div>
                        </div>
                    </Modal>
                </>
            ) : (
                <CircularProgress/>
            )}
        </Layout>
    );
};

export async function getServerSideProps({params}) {
    const res = await api(`/products/${params.id}`)
    const product = await res.data
    return {
        props: {product},
    }
}

export default ProductScreen;

