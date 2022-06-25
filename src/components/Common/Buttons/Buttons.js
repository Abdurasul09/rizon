import React from 'react';
import NextLink from "next/link";

const Buttons = () => {
    return (
        <div className='btns'>
            <NextLink href="#">
                <button className='btnCart'>
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