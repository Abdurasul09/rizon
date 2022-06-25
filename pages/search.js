import React from 'react';
import Layout from "../src/components/Layout";
import ProductItem from "../src/components/ProductItem";
import {addToCartHandler} from "../Utils/redux/actions/CartAction";
import {useSelector} from "react-redux";

const Search = () => {
    const {posts} = useSelector(state => state.posts)
    return (
        <Layout>
            <ProductItem
                product={posts}
                addToCartHandler={addToCartHandler}
            />
        </Layout>
    );
};

export default Search;
