import React, {useEffect, useState} from 'react';
import api from "../api/globalApi";
import {Grid, List, ListItem, Typography} from "@material-ui/core";
import {Map, Placemark, YMaps} from "react-yandex-maps";
import useStyle from "../Utils/styles";
import {useDispatch} from "react-redux";
import {ActionType} from "../Utils/redux/actions/types";
import {useRouter} from "next/router";


const Issuepoint = () => {
    const classes = useStyle();
    const [locations, setLocations] = useState()
    const [address, setAddress] = useState()
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        const getLocations = async () => {
            try {
                const res = await api.get('/locations')
                setLocations(res.data)
                setAddress([res.data.results[0].lat, res.data.results[0].lon])
            } catch (e) {
                console.log(e)
            }
        }
        getLocations()
    }, [])

    const addAddress = (el) => {
        setAddress([el.lat, el.lon])
        dispatch({type: ActionType.ADD_LOCATION, payload: el})
        localStorage.setItem('address', JSON.stringify(el))
        router.push('/checkout')
    }




    return (
        <div>
            <List>
                <Typography variant='h3' component='h3' style={{padding: 10}}>
                    Выберите пункт выдачи
                </Typography>
                <div className={classes.categoryChildren}>
                    <Grid item xs={12} md={5}>
                        {locations?.results?.map(el => (
                            <ListItem key={el.id}>
                                <div>
                                    <p onClick={() => addAddress(el)}>{el.name}</p>
                                </div>
                            </ListItem>
                        ))}
                    </Grid>
                    <Grid item xs={12} md={2}/>
                    <Grid item xs={12} md={5}>
                        {address ? (
                                <div className='location'>
                                    <YMaps>
                                        <Map
                                            defaultState={{
                                                center: [address[0], address[1]],
                                                zoom: 15,
                                            }}
                                        >
                                            <Placemark geometry={[address[0], address[1]]}/>
                                        </Map>
                                    </YMaps>
                                </div>
                            ) : (
                                <h2>loading</h2>
                        )}
                    </Grid>
                </div>
            </List>
        </div>
    );
};

export default Issuepoint;
