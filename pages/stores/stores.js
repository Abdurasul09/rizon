import React from 'react';
import Layout from "../../src/components/Layout";
import Buttons from "../../src/components/Common/Buttons/Buttons";
import api from "../../api/globalApi";
import {ListItem, Grid, Card, CardHeader} from "@material-ui/core";

const Stores = ({products}) => {
    return (
        <Layout title='Магызины'>
            <Buttons/>
            <Grid container spacing={5}>
                {products.map(el => (
                    <Grid item xs={12} md={4} key={el.id}>
                        <Card>
                            <ListItem>
                                <img
                                    src={el.logo}
                                    alt={el.name}
                                    width={50}
                                    height={50}
                                />
                                <CardHeader
                                    title={el.name}
                                    subheader={el.description}
                                />
                            </ListItem>
                            {el.images.map(item => (
                                <div key={item}>
                                    <img
                                        src={item}
                                        alt="products image"
                                        width={100}
                                        height={150}
                                    />
                                </div>
                            ))}
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Layout>
    );
};

export default Stores;

export async function getServerSideProps() {
    const res = await api(`/stores`)
    const products = await res.data.results
    return {props: {products}}
}