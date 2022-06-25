import React from 'react';
import {Grid, List, ListItem,CardActionArea, Typography,CardMedia,Card} from "@material-ui/core";
import useStyle from "../../../Utils/styles";
import NextLink from "next/link";
import api from "../../../api/globalApi";
import {useEffect, useState} from "react";
import {addToFavorite} from "../../../Utils/redux/actions/FavoriteAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {useDispatch, useSelector} from "react-redux";

export const Recommend = () => {
    const [allProducts, setAllProducts] = useState({})
    const {posts} = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const classes = useStyle();

    useEffect(() => {
        if (posts[0]) {
            setAllProducts(posts)
        }
    }, [posts])
    const getRecommend = async () => {
        try {
            await api('/collections')
                .then(res => setAllProducts(res.data))
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
       getRecommend()
    },[])

    return (
        <div>
            <NextLink href="/rec" passHref>
                <a>
                    {allProducts.results?.map(el => (
                        <div  key={el.id}>
                            <Typography
                                py={2}
                                className={classes.globalText}
                            >
                                {el.name} . . .
                            </Typography>
                        </div>
                    ))}
                </a>
            </NextLink>
            <Grid container spacing={5}>
                {allProducts.results?.map(productItem => (
                    <>
                        {productItem.products.map(product => (
                            <Grid item md={3} sm={6} xs={12} key={product.id}>
                                <Card>
                                    <NextLink href={`/product/${product.id}`}>
                                        <CardActionArea className='productImage'>
                                            <CardMedia
                                                component="img"
                                                className={classes.productImage}
                                                image={product.image}
                                                title={product.title}
                                            />
                                            {product.discount ? (
                                                <span
                                                    className={classes.productDiscount}
                                                >
                                                -{product.discount}%
                                            </span>
                                            ) : (
                                                " "
                                            )}
                                            <span className='willLook'>
                                                Посмотреть
                                            </span>
                                        </CardActionArea>
                                    </NextLink>
                                    <List
                                        style={{paddingBottom: 0}}
                                    >
                                        <ListItem className={classes.priceFavoriteIcon}>
                                            <Typography
                                                className={classes.productTitle}
                                            >
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
                                                    <Typography pl={1}>
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
                            </Grid>
                        ))}
                    </>
                ))}
            </Grid>
        </div>
    );
}

