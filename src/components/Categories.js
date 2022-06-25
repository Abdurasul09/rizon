import React, {useEffect, useState} from 'react';
import {
    ListItem,
    ListItemIcon,
    CardActionArea,
    CardMedia

} from "@material-ui/core";
import api from "../../api/globalApi";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import useStyle from "../../Utils/styles";
import NextLink from 'next/link'

const Categories = ({active, setActive}) => {
    const [category, setCategory] = useState({})
    useEffect(() => {
        api("categories/")
            .then(res => setCategory(res.data))
    }, [])

    const classes = useStyle();

    return (
        <div
            className={active ? "menu active" : "menu"}
            onClick={() => setActive(false)}
        >
            <div className="menu__blur"/>
            <div className="menu__content">
                {category.results?.map((item, index) => (
                    <ul className="side" key={item.id}>
                        <li className="menu__list">
                            <ListItem
                                button key={item}
                                className={classes.flex}
                            >
                                <div className={classes.flex}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? (
                                            <img
                                                src={item.icon}
                                                alt="icon"
                                            />
                                        ) : (
                                            <img
                                                src={item.icon}
                                                alt="icon"
                                            />
                                        )}
                                    </ListItemIcon>
                                    <NextLink href={`/catalog/${item.name}`}>
                                        <a>{item.name}</a>
                                    </NextLink>
                                </div>
                                <ul className="menu__drop">
                                    <div className={classes.categoryChildren}>
                                        <div>
                                            {item.children.map(el => (
                                                <li className={classes.flex1} key={el.id}>
                                                    <NextLink  href="">
                                                        <a>{el.name}</a>
                                                    </NextLink>
                                                </li>
                                            ))}
                                        </div>
                                        <CardActionArea className={classes.cardActionArea}>
                                            <CardMedia
                                                className={classes.cardActionArea}
                                                component="img"
                                                image={item.photo}
                                                title={item.name}
                                            />
                                        </CardActionArea>
                                    </div>
                                </ul>
                                <ArrowForwardIosRoundedIcon
                                    fontSize="inherit"
                                    color="secondary"
                                />
                            </ListItem>
                        </li>
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default Categories;