import React from 'react';
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Common/Buttons/Buttons";
import {Grid, Card, List, ListItem, Typography} from "@material-ui/core";

const Checkouttotal = () => {
    return (
        <Layout title='Оформление заказa'>
         <Buttons/>
            <List>
                <ListItem>
                    <Typography variant='h1' component='h1'>
                        Оформление заказa
                    </Typography>
                </ListItem>
                <ListItem>
                    <Grid container>
                        <Grid item xs={12} md={4}>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <Card>
                                <List>
                                    <ListItem>
                                        <Grid item xs={12} md={4}>
                                            <Typography variant='h1'>
                                                Итого:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={8}>
                                            <Typography variant='h2'>
                                                {/*{product?.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(1)} coм*/}
                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid item xs={12} md={10}>
                                            <Typography>
                                                Товары:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Typography>
                                                {/*{product?.reduce((a, c) => a + c.quantity, 0)} шт*/}
                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                    <ListItem>
                                        <Grid item xs={12} md={10}>
                                            <Typography>
                                                Скидки:
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} md={2}>
                                            <Typography>
                                                10%
                                            </Typography>
                                        </Grid>
                                    </ListItem>
                                </List>
                            </Card>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
        </Layout>
    );
};

export default Checkouttotal;