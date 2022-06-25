import React, {useEffect, useState} from 'react';
import Axios from "../../../api/Api";
import {Card, CardActionArea, CardMedia, List, ListItem, Typography} from "@material-ui/core";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../../Utils/redux/actions/FavoriteAction";
import useStyle from "../../../Utils/styles";
import {useDispatch} from "react-redux";
import Slider from "react-slick";

const RecentlyViewed = () => {
    const [viewedProducts, setViewedProducts] = useState({})
    const dispatch = useDispatch()
    const classes = useStyle();

    console.log('viewedProducts', viewedProducts)
    const getViewedProducts = async () => {
        try {
            const res = await Axios.get('/viewed_products')
            setViewedProducts(res.data)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getViewedProducts()
    }, [])
    const settings2 = {
        dots: false,
        infinite: true,
        arrows:true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1
    };

    return (
        <section className='viewed_product'>
                <div className="viewed_product_content">
                    <Slider {...settings2}>
                        {viewedProducts.results?.map(product => (
                            <div key={product.id}>
                                <Card style={{margin: '10px'}}>
                                    <Link href={`/product/${product.id}`}>
                                        <CardActionArea className='productImage'>
                                            <CardMedia
                                                component="img"
                                                className={classes.productImage}
                                                image={product.image}
                                                title={product.title}
                                            />
                                            {product.discount ? (
                                                <span className={classes.productDiscount}>
                                                           -{product.discount}%
                                                        </span>
                                            ) : (
                                                " "
                                            )}
                                            <span className='willLook'>
                                                        Посмотреть
                                                    </span>
                                        </CardActionArea>
                                    </Link>
                                    <List style={{paddingBottom: 0}}>
                                        <ListItem className={classes.priceFavoriteIcon}>
                                            <Typography className={classes.productTitle}>
                                                {product.title}
                                            </Typography>
                                            <FavoriteBorderIcon
                                                onClick={() => dispatch(addToFavorite(product))}
                                                className={classes.favoriteBorderIconHover}
                                            />
                                        </ListItem>
                                        <ListItem>
                                            {product.discount_price ? (
                                                <div className={classes.flex}>
                                                    <Typography>
                                                        <strong>{product.discount_price} coм</strong>
                                                    </Typography>
                                                    <Typography>&nbsp;
                                                        <del style={{color: "grey", fontSize: '13px'}}>
                                                            {product.price} coм
                                                        </del>
                                                    </Typography>
                                                </div>
                                            ) : (
                                                <Typography>
                                                    <strong>
                                                        {product.price} coм
                                                    </strong>
                                                </Typography>
                                            )}
                                        </ListItem>
                                    </List>
                                </Card>
                            </div>
                        ))}
                    </Slider>
                </div>
        </section>
    );
};

export default RecentlyViewed;