import {Step, StepLabel, Stepper} from '@material-ui/core';
import React, {useEffect, useState} from 'react';
import useStyle from "../../../Utils/styles";

const CheckoutWizard = ({status}) => {
    const [activeStep, setActiveStep] = useState(0)
    const [lable, setLable] = useState({})
    const classes = useStyle();
    useEffect(() => {
        if (!status) return
        console.log("hhh")
        if (status === "accepted") {
            setActiveStep(1)
            setLable({title: 'Заказ принят'})
        } else if (status === "courier") {
            setActiveStep(2)
            setLable({title: 'Курьер взял заказ', desc: 'Осуществляется доставка'})
        } else if (status === "delivered") {
            setActiveStep(3)
            setLable({title: 'Доставлен', desc: 'Спасибо за доверие! Будем рады вашим отзывам Oneclick!'})
        } else if (status === "cancelled") {
            setActiveStep(0)
        }
    }, [status])

    return (
        <div className={classes.flexColumn}>
            <div className={classes.stepper}>
                <div>
                    <h2>{lable.title}</h2>
                    <p>{lable?.desc}</p>
                </div>
            </div>
            <Stepper
                className={classes.transparentBackgroud}
                activeStep={activeStep}
                alternativeLabel
            >
                {['Заказ принят', 'Курьер взял заказ', 'Доставлено'].map(
                    (step) => (
                        <Step key={step}>
                            <StepLabel>{step}</StepLabel>
                        </Step>
                    )
                )}
            </Stepper>
        </div>
    );
}

export default CheckoutWizard