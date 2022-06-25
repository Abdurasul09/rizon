import React, {useState} from 'react';
import SearchIcon from "@mui/icons-material/Search";
import useStyle from "../../Utils/styles";
import {useRouter} from "next/router";
import {Box, IconButton} from "@material-ui/core";
import {useDispatch} from "react-redux";
import {fetchPosts} from "../../Utils/redux/actions/fetchPosts";


const SearchPeage = () => {
    const router = useRouter()
    const [search, setSearch]=useState('')
    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault();
        router.push(`/search?query=${search}`);
    };

    const queryChangeHandler =  (key, value) => {
        let object = new URLSearchParams(window.location.search);
        object.set(key, value);
        let newURL = `${window.location.pathname}?${object.toString()}`;
        router.push(newURL);
        dispatch(fetchPosts(object));
    };

    const classes = useStyle();
    return (
        <Box
            className={classes.searchSection}
        >
            <form onSubmit={submitHandler} className={classes.searchForm}>
                <input
                    name="query"
                    className={classes.searchInput}
                    placeholder="Я ищу . . .  "
                    onChange={(e)=>setSearch(e.target.value)}
                />
                <IconButton
                    type="submit"
                    className={classes.iconButton}
                    aria-label="search"
                    onClick={() => queryChangeHandler("q", search)}
                >
                    <SearchIcon/>
                </IconButton>
            </form>
        </Box>
    );
};

export default SearchPeage;