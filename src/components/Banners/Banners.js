import React from 'react';
import {Grid, List, ListItem} from "@material-ui/core";

const Banners = () => {
    return (
        <div>
            <List>
                <ListItem style={{padding: '3rem 0'}}>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <div className="hover column">
                                <figure>
                                    <img
                                        alt='banner image'
                                        src='https://images.wbstatic.net/bners1/gor_dress_sarofan.jpg'
                                    />
                                </figure>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <div className="hover column">
                                <div>
                                    <figure>
                                        <img
                                            alt='banner image'
                                            src='https://images.wbstatic.net/bners1/main_poloska_cap_838384757575.jpg'
                                        />
                                    </figure>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </div>
    );
};

export default Banners;