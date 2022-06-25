import React, {useEffect, useState} from 'react';
import {YMaps,Map,Placemark} from "react-yandex-maps";
import api from "../../api/globalApi";

const Map1 = () => {
    const [map, setMap] = useState({})
    useEffect(() => {
        api.get('/locations')
            .then(res => setMap(res))
    },[])
    console.log(map)
    return (
        <div>
            <YMaps>
                <Map
                    defaultState={{
                        center: [55.751574, 37.573856],
                        zoom: 5,
                    }}
                >
                    <Placemark geometry={[55.684758, 37.738521]} />
                </Map>
            </YMaps>
        </div>
    );
};

export default Map1;