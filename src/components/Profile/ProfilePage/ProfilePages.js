import React from 'react';
import {Grid, List, ListItem, Typography} from "@material-ui/core";
import NextLink from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import ReviewsIcon from "@mui/icons-material/Reviews";
import useStyle from "../../../../Utils/styles";

const ProfilePages = () => {
    const classes = useStyle();

    return (
            <div className={classes.proFileBtns}>
                <div className={classes.flexStart}>
                    <Typography pr={2}>
                        <NextLink href="/profile">
                            <a className={classes.profileItems}>
                                <HomeIcon fontSize="small"/>&nbsp;Главная
                            </a>
                        </NextLink>
                    </Typography>
                    <Typography pr={2}>
                        <NextLink href="/purchases">
                            <a className={classes.profileItems}>
                                <ShoppingBagIcon fontSize="small"/>&nbsp;Покупки
                            </a>
                        </NextLink>
                    </Typography>
                    <Typography pr={2}>
                        <NextLink href="">
                            <a className={classes.profileItems}>
                                <ReviewsIcon fontSize="small"/>&nbsp;Отзывы
                            </a>
                        </NextLink>
                    </Typography>
                </div>
            </div>
    );
};

export default ProfilePages;