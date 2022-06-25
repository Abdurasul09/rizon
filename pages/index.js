import Layout from "../src/components/Layout";
import {
    CardActionArea,
    CardMedia,
    Grid,
    List,
    ListItem,
    Typography,
    Card,
    CircularProgress
} from "@material-ui/core";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import useStyle from "../Utils/styles";
import Advertising from "../src/components/Advertising/Advertising";
import {Recommend} from "../src/components/Recommend/Recommend";
import {addToFavorite} from "../Utils/redux/actions/FavoriteAction";
import {useDispatch} from "react-redux";
import React from "react";
import api from "../api/globalApi";
import Banners from "../src/components/Banners/Banners";
import {New} from "../src/components/New/New";


const Home = ({products}) => {
    const dispatch = useDispatch()
    const classes = useStyle();


    return (
        <div>
            <Layout>
                {products ? (
                    <div>
                        <Advertising/>
                        <Recommend/>
                        <div className={classes.card}>
                            <Link href="#" passHref>
                                <a>
                                    <Typography
                                        py={2}
                                        className={classes.globalText}
                                    >
                                        Хиты продаж . . .
                                    </Typography>
                                </a>
                            </Link>
                            <Grid container spacing={5}>
                                {products.map(product => (
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
                        </div>
                        <Banners/>
                        <New/>
                    </div>
                ) : (
                    <CircularProgress/>
                )}
            </Layout>
        </div>
    )
}

export default Home;
export async function getServerSideProps() {
    const res = await api(`/products`)
    const products = await res.data.results
    return {props: {products}}
}