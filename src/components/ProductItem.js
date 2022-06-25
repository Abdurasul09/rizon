import {
    Card,
    CardActionArea,
    CardMedia, Grid, List, ListItem,
    Typography,
} from '@material-ui/core';
import React from 'react';
import Buttons from "./Common/Buttons/Buttons";
import Link from "next/link";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../Utils/redux/actions/FavoriteAction";
import useStyle from "../../Utils/styles";
import {useDispatch} from "react-redux";

export default function ProductItem({product}) {
    const classes = useStyle();
    const dispatch = useDispatch()
    console.log(product)
    return (
        <div>
            <Buttons/>
            <div>
                <Grid container spacing={5}>
                    {product.map(product => (
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

        </div>
    );
}