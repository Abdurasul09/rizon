import {useEffect, useState} from 'react';
import Slider from "react-slick";
import api from "../../../api/globalApi";
import React from "react";

const Advertising = () => {
    const settings = {
        dots: false,
        infinite: true,
        speed: 900,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: Boolean,
    };

    const [abc, setAbc] = useState([])
    useEffect(() => {
        api('/abc')
            .then(res => setAbc(res.data))
    }, [])
    return (
        <section className='advertising'>
            <div className="advertising__content">
                <Slider {...settings}>
                    {abc.results?.map(el => (
                        <div className="hover12 column" key={el.id}>
                            <div>
                                <figure>
                                    <img
                                        alt='banner image'
                                        src={el.photo}
                                    />
                                </figure>
                            </div>
                        </div>

                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default Advertising;
