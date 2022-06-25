import React from 'react';
import CopyrightIcon from "@mui/icons-material/Copyright";
import {Container} from "@material-ui/core";

const Footer = () => {
    return (
        <>
            <div className='footer'>
                <Container>
                    <span><CopyrightIcon/> 2018-2021 “ONE CLICK”</span>
                    <p>Все права защищены</p>
                </Container>
            </div>
        </>
    );
};

export default Footer;