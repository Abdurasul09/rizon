import React from 'react';
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TelegramIcon from '@mui/icons-material/Telegram';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import Footer from "./Footer";
import {Typography, Container} from "@material-ui/core";
import useStyle from "../../../Utils/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";


const Contact = () => {
    const classes = useStyle();
    return (
        <>
            <section className='contact'>
                <Container>
                    <div className='contact__content'>
                        <div className='contact__content__logo'>
                            <Typography className={classes.brand}>
                                <span className={classes.brandR}>r</span>izon
                            </Typography>
                            <div className='contact__content__logo__text'>
                                ONE CLICK - международный интернет-магазин одежды, обуви, электроники,
                                детских
                                товаров,
                                товаров для дома и других товаров.
                            </div>
                        </div>
                        <div className='contact__content__buyers'>
                            <h3>Покупателям</h3>
                            <h4>Как сделать заказ</h4>
                            <h4>Способы оплаты</h4>
                            <h4>Доставка</h4>
                            <h4>Возврат товара</h4>
                            <h4>Возврат денежных средств</h4>
                            <h4>Правила продажи</h4>
                            <h4>Правила пользования торговой площадкой</h4>
                        </div>

                        <div className='contact__content__shop'>
                            <h3>Магазин</h3>
                            <h4>О нас</h4>
                            <h4>Реквизиты</h4>
                            <h4>Партнерам</h4>
                        </div>

                        <div className='contact__content__sotSet'>
                            <h3>Мы в соцсетях</h3>
                            <div className='contact__content__sotSet__sets'>
                                <div>
                                   <span className={classes.contactPagePhone}>
                                       <TelegramIcon fontSize={"small"} className={classes.iconSvg}/>
                                   </span>
                                </div>
                                <div>
                                   <span className={classes.contactPageWhatsapp}>
                                       <WhatsAppIcon fontSize={"small"} className={classes.iconSvg}/>
                                   </span>
                                </div>
                                <div>
                                   <span className={classes.contactPageInstagram}>
                                       <InstagramIcon fontSize={"small"} className={classes.iconSvg}/>
                                   </span>
                                </div>
                                <div>
                                   <span className={classes.contactPagePhone}>
                                       <FacebookIcon fontSize={"small"} className={classes.iconSvg}/>
                                   </span>
                                </div>
                            </div>
                        </div>

                        <div className='contact__content__addressSection'>
                            <div>
                                <h3>Адрес</h3>
                                <div className='contact__content__addressSection__address'>
                                    <AddLocationAltIcon/>
                                    <p>
                                        г. Бишкек, ул. Токтогула 125/1
                                        Бизнес-центр «Авангард» 1 и 2 этажи
                                    </p>
                                </div>
                            </div>

                            <div>
                                <h3>Контакты</h3>
                                <div className='contact__content__addressSection__phone'>
                                    <LocalPhoneIcon/>
                                    <p>
                                        0550 01 22 08 <br/>
                                        0770 01 22 08
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </section>
            <Footer/>
        </>
    );
};

export default Contact;