import React from 'react';
import {Card , Typography} from "@material-ui/core";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import useStyle from "../../../Utils/styles";

const SubTotal = ({cart}) => {
    const userInfo = useSelector(state => state.user.userInfo)
    const classes = useStyle();
    const router = useRouter();
    const checkoutHandler = () => {
        if (userInfo) {
            router.push("/checkout")
        } else {
            router.push("/login")
        }
    }
    return (
        <div>
            {cart ? (
                <Card>
                    <div style={{padding: 10}}>
                        <div className={classes.flex}>
                            <Typography variant="h2">
                                Итого
                            </Typography>
                            <Typography>
                                {cart?.reduce((a, c) => a + c.quantity * c.price, 0).toFixed(1)} coм
                            </Typography>
                        </div>
                        <div className={classes.flex}>
                            <span>Количество</span>
                            <span>
                            {cart.reduce((a, c) => a + c.quantity, 0)}
                        </span>
                        </div>
                        <div style={{paddingTop: 10}} className={classes.flex}>
                            <span>Товары, 1шт.</span>
                            <span>
                            {cart.map(el => (
                                <span key={el.id}>
                                    {el.price} сом
                                </span>
                            ))}
                        </span>
                        </div>
                        {cart.discount ? (
                            <div className={classes.flex}>
                                <span>Скидки</span>
                                <span style={{color: "gray"}}>
                                    -{cart.discount}%
                                </span>
                            </div>

                        ) : (
                            " "
                        )}
                        <div style={{marginTop: 10}}>
                            <button
                                className='globalBtn'
                                onClick={checkoutHandler}
                            >
                                Проверить
                            </button>
                        </div>
                    </div>
                </Card>
            ) : (
                ''
            )}

        </div>
    );
};

export default SubTotal;