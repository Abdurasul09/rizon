import React, {useEffect, useState} from 'react';
import {CardActionArea, CardMedia, Grid, List, ListItem, Typography,Link,Card} from "@material-ui/core";
import NextLink from "next/link";
import useStyle from "../Utils/styles";
import api from "../api/globalApi";
import {grey} from "@material-ui/core/colors";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../Utils/redux/actions/FavoriteAction";
import {useDispatch, useSelector} from "react-redux";

const Newcollection = ({products}) => {
    const classes = useStyle();
    const [allProducts, setAllProducts] = useState(products)
    const dispatch = useDispatch()
    const {posts} = useSelector(state => state.posts)

    useEffect(() => {
        if (posts[0]) {
            setAllProducts(posts)
        }
    }, [posts])

    return (
        <div>
            <NextLink href="/newcollection" passHref>
                <Link>
                    <Typography
                        className={classes.brand}
                        py={2}
                    >
                        Новинки
                    </Typography>
                </Link>
            </NextLink>
            {products ? (
                <Grid container spacing={5}>
                    {allProducts.map(product => (
                        <Grid item md={3} key={product.id}>
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
                                <List style={{paddingBottom: 0}}>
                                    <ListItem className={classes.priceFavoriteIcon}>
                                        <Typography sx={{ color: grey[600] }}>
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
                                                <Typography pl={2}>
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
            ) : (<h1>Loading . . . </h1>)}
        </div>
    );
};

export default Newcollection;


export async function getServerSideProps() {
    const res = await api(`/products`)
    const products = await res.data.results
    return {props: {products}}
}