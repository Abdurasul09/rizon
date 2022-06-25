import React, {useEffect, useState} from 'react';
import api from "../api/Api";
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Common/Buttons";
import {Card, CardActionArea, CardMedia, Grid, List, ListItem, Typography} from "@material-ui/core";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../Utils/redux/actions/FavoriteAction";
import useStyle from "../Utils/styles";
import {useDispatch} from "react-redux";

const Stock = () => {
    const [stock, setStock] = useState()
    const dispatch = useDispatch()
    const classes = useStyle();


    const getStock = async () => {
        try {
            const res = await api.get(`/products?discount=${true}`)
            setStock(res.data)
        }catch (e){
            console.log(e)
        }
    }
    useEffect(()=>{
        getStock()
    },[])

    return (
        <Layout title='Aкция'>
            <Buttons/>
            {stock ? (
                <Grid container spacing={5}>
                    {stock.results.map(product => (
                        <Grid item md={3} sm={6} xs={12} key={product.id}>
                            <Card>
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
                        </Grid>
                    ))}
                </Grid>
            ) : (null)}
        </Layout>
    );
};

export default Stock;