import React from 'react';
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Common/Buttons/Buttons";
import {List, ListItem, Typography} from "@material-ui/core";
import useStyle from "../Utils/styles";

const About = () => {
    const classes = useStyle();

    return (
        <Layout title='O нас'>
            <Buttons/>
            <List className={classes.about}>
                <span className={classes.aboutLineFirstPoint}/>
                <div className={classes.aboutLine}>
                    <ListItem>
                        <div>
                            <Typography component='h1' variant='h1' style={{margin: 0, fontSize: 40}}>
                                Добро пожаловать на
                            </Typography>
                            <Typography component='h1' variant='h1' className={classes.aboutBrand}>
                                <span className={classes.brandR}>r</span>izon
                            </Typography>
                        </div>
                    </ListItem>
                    <ListItem>
                        <p>17 лет мы стремимся сделать для Вас шопинг удобным и доступным</p>
                    </ListItem>
                </div>
                <ListItem style={{display: "flex", alignItems: "center"}}>
                    <Typography component='h1' variant='h1' style={{margin: 0, fontSize: 30}}>
                        ЧТО ТАКОЕ
                    </Typography>&nbsp;
                    <Typography component='h1' variant='h1' className={classes.aboutBrand}>
                        <span className={classes.brandR}>r</span>izon
                    </Typography>
                </ListItem>
                <span className={classes.aboutLineSecondPoint}/>
            </List>
        </Layout>
    );
};

export default About;