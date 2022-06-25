import React from 'react';
import NextLink from "next/link";
import {useRouter} from "next/router";

const Buttons = () => {
    const router = useRouter()
    return (
        <div className='btns'>
            <NextLink href="">
                <button
                    className='btnCart'
                    onClick={() => router.back()}
                >
                  Назад
                </button>
            </NextLink>
            <NextLink href="/">
                <button className='btnCart'>
                    Главная
                </button>
            </NextLink>
        </div>
    );
};

export default Buttons;