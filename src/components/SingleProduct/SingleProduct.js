import React from 'react';
import {Button, Grid, List, ListItem, Typography,Avatar} from "@material-ui/core";
import {addToCartHandler} from "../../../Utils/redux/actions/CartAction";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import {addToFavorite} from "../../../Utils/redux/actions/FavoriteAction";
import useStyle from "../../../Utils/styles";
import {useDispatch} from "react-redux";

const SingleProduct = ({singleProduct}) => {
    const classes = useStyle();
    const dispatch = useDispatch()

    return (
        <div className={classes.section}>
            <List>
                <ListItem>
                    <Typography
                        component="h1"
                        variant="h1"
                    >
                        <strong>{singleProduct?.title}</strong>
                    </Typography>
                </ListItem>
            </List>
            <Grid container spacing={1}>
                <Grid item md={6} xs={12}>
                    <List>
                        <ListItem>
                            <Grid item xs={4}>
                                <div>
                                    <img
                                        alt={singleProduct.title}
                                        src={singleProduct.image}
                                        width={500}
                                        height={640}
                                    />
                                </div>
                            </Grid>
                        </ListItem>
                    </List>
                </Grid>
                <Grid item xs={12} md={5}>
                    <List>
                        <ListItem>
                            <Typography
                                component="h1"
                                variant="h1"
                                style={{margin: 0, fontSize:'x-large'}}
                            >
                                <strong>
                                    {singleProduct.price} coм
                                </strong>
                            </Typography>
                            <Typography pl={2}>
                                <del style={{color: "grey", fontSize: '18px'}}>
                                    {singleProduct.price} coм
                                </del>
                            </Typography>
                        </ListItem>
                        <ListItem>
                            <Grid item xs={3}>
                                <Typography
                                    style={{fontSize: 'x-large'}}
                                >
                                    Скидка:
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                {singleProduct.discount ? (
                                    <Avatar
                                        className={classes.globalColorYellow}
                                    >
                                        <Typography style={{color: "gray"}}>
                                            -{singleProduct.discount}%
                                        </Typography>
                                    </Avatar>
                                ) : (
                                    " "
                                )}
                            </Grid>
                        </ListItem>
                        <ListItem>
                            <Grid item xs={1}>
                                <Typography
                                    style={{fontSize: 'x-large'}}
                                >
                                    Цвет:
                                </Typography>
                            </Grid>
                            <Grid item xs={1}>
                                {/*{currentProduct.color ? (*/}
                                {/*    <Typography*/}
                                {/*        pl={2}*/}
                                {/*        color='#009688'>*/}
                                {/*        {currentProduct.color}*/}
                                {/*    </Typography>*/}
                                {/*) : (" ")}*/}
                            </Grid>
                        </ListItem>
                        {/*<Typography pl={2} pt={1}>Размер: {sizes} </Typography>*/}
                        <ListItem style={{marginBottom: 10}}>
                            {/*<form className={classes.flex}>*/}
                            {/*    {singleItem?.sizes.map(itemSize => (*/}
                            {/*        <div key={itemSize} className='form_radio_btn'>*/}
                            {/*            <label*/}
                            {/*                key={itemSize.size}*/}
                            {/*                htmlFor={`${itemSize.size}`}*/}
                            {/*                // style={{*/}
                            {/*                //     borderColor: sizes === itemSize.size ? "red" : null,*/}
                            {/*                //     color: sizes === itemSize.size ? "red" : null*/}
                            {/*                // }}*/}
                            {/*            >*/}
                            {/*                <input*/}
                            {/*                    type="radio"*/}
                            {/*                    // onChange={onChangeValue}*/}
                            {/*                    id={`${itemSize.size}`}*/}
                            {/*                    name="inputRadios"*/}
                            {/*                    value={`${itemSize.size}`}*/}
                            {/*                />*/}
                            {/*                {itemSize.size}*/}
                            {/*            </label>*/}
                            {/*        </div>*/}
                            {/*    ))}*/}
                            {/*</form>*/}
                        </ListItem>
                        <ListItem>
                            <Button
                                size={"large"}
                                variant="contained"
                                color={"primary"}
                                onClick={() => {
                                    // singleItem.size = size
                                    dispatch(addToCartHandler(singleProduct))
                                }
                                }
                            >
                                Добавить в корзину
                            </Button>&nbsp;
                            <Avatar
                                className={classes.globalColorYellow}
                            >
                                <FavoriteBorderIcon
                                    onClick={() => dispatch(addToFavorite(singleProduct))}
                                    className={classes.favoriteBorderIconHover}
                                />
                            </Avatar>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
        </div>
    );
};

export default SingleProduct;