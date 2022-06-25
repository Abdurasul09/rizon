import React from 'react';
import Layout from "../src/components/Layout";
import Buttons from "../src/components/Common/Buttons/Buttons";
import {List, ListItem, TextField, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import {useDispatch} from "react-redux";
import {ActionType} from "../Utils/redux/actions/types";
import useStyle from "../Utils/styles";
import PhoneIcon from '@mui/icons-material/Phone';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const Contact = () => {
    const {handleSubmit, control, formState: {errors},} = useForm();
    const dispatch = useDispatch()
    const submitHandler = (data) => {
        try {
            dispatch({type: ActionType.CHECKOUT_ADDRESS, payload: data})
            localStorage.setItem("formAddress", JSON.stringify(data))
        } catch (e) {
            console.log(e)
        }
    }
    const classes = useStyle();

    return (
        <Layout title='Контакт'>
            <Buttons/>
            <List className={classes.form}>
                <ListItem>
                    <div>
                        <Typography component='h1' variant='h1'>
                            Контакт-центр 24/7
                        </Typography>
                        <p>Свяжитесь с нами по электронной почте. Для этого заполните форму:</p>
                    </div>
                </ListItem>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    id="name"
                                    label='Ф.И.О'
                                    inputProps={{type: "name"}}
                                    error={Boolean(errors.name)}
                                    helperText={
                                        errors.name
                                            ? errors.name.type === 'minLength'
                                                ? 'zapolnite pole'
                                                : 'FIO is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="phone"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label='Телефон'
                                    id="phone"
                                    inputProps={{type: "phone"}}
                                    error={Boolean(errors.phone)}
                                    helperText={
                                        errors.phone
                                            ? errors.phone.type === 'minLength'
                                                ? 'zapolnite pole'
                                                : 'FIO is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="email"
                            control={control}
                            rules={{
                                required: true,
                            }}
                            render={({field}) =>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    label='Email'
                                    id="email"
                                    inputProps={{type: "email"}}
                                    error={Boolean(errors.email)}
                                    helperText={
                                        errors.email
                                            ? errors.email.type === 'minLength'
                                                ? 'zapolnite pole'
                                                : 'FIO is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <button
                            className='globalBtn'
                            type="submit"
                        >
                            Сохранит
                        </button>
                        &nbsp;
                        <button
                            className='globalBtn'
                            type="button"
                        >
                            Отмена
                        </button>
                    </ListItem>
                </form>
                <ListItem>
                    <div className={classes.flex}>
                        <span className={classes.contactPagePhone}>
                            <PhoneIcon fontSize={"small"} className={classes.iconSvg}/>
                        </span>
                        <div>
                            <p>+996 708 92 45 76</p>
                            <p>Позвонить по телефону</p>
                        </div>
                    </div>&nbsp;
                    <div className={classes.flex}>
                        <span className={classes.contactPageWhatsapp}>
                            <WhatsAppIcon fontSize={"small"} className={classes.iconSvg}/>
                        </span>
                        <div>
                            <p>+996 708 92 45 76</p>
                            <p>Написать онлайн</p>
                        </div>
                    </div>
                </ListItem>
            </List>
        </Layout>
    );
};

export default Contact;