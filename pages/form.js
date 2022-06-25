import React from 'react';
import {List, TextField, Button, ListItem, Typography} from "@material-ui/core";
import {Controller, useForm} from "react-hook-form";
import Layout from "../src/components/Layout";
import {useDispatch} from "react-redux";
import {ActionType} from "../Utils/redux/actions/types";
import Buttons from "../src/components/Common/Buttons/Buttons";
import useStyle from "../Utils/styles";

const Form = () => {
    const {handleSubmit, control, formState: {errors},} = useForm();
    const dispatch = useDispatch()
    const submitHandler = (data) => {
        try {
            dispatch({type: ActionType.CHECKOUT_ADDRESS, payload: data})
            localStorage.setItem("formAddress", JSON.stringify(data))
        }catch (e) {
            console.log(e)
        }
    }
    const classes = useStyle();


    return (
        <Layout title='Адресс'>
            <Buttons/>
            <List className={classes.form}>
                <ListItem>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <Typography variant='h1' component='h1'>Мои адреса</Typography>
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
                                name="address"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field}) =>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label='Адрес'
                                        id="address"
                                        inputProps={{type: "address"}}
                                        error={Boolean(errors.address)}
                                        helperText={
                                            errors.address
                                                ? errors.address.type === 'minLength'
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
                                name="entrance"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field}) =>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label='Подьезд'
                                        id="entrance"
                                        inputProps={{type: "entrance"}}
                                        error={Boolean(errors.entrance)}
                                        helperText={
                                            errors.entrance
                                                ? errors.entrance.type === 'minLength'
                                                    ? 'zapolnite pole'
                                                    : 'FIO is required'
                                                : ''
                                        }
                                        {...field}
                                    />
                                }
                            />
                            <Controller
                                name="flor"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field}) =>
                                    <TextField
                                        style={{margin: 5}}
                                        variant="outlined"
                                        fullWidth
                                        id="flor"
                                        label='Этаж'
                                        inputProps={{type: "flor"}}
                                        error={Boolean(errors.flor)}
                                        helperText={
                                            errors.flor
                                                ? errors.flor.type === 'minLength'
                                                    ? 'zapolnite pole'
                                                    : 'FIO is required'
                                                : ''
                                        }
                                        {...field}
                                    />
                                }
                            />
                            <Controller
                                name="intercom"
                                control={control}
                                rules={{
                                    required: true,
                                }}
                                render={({field}) =>
                                    <TextField
                                        variant="outlined"
                                        fullWidth
                                        label='Домофон'
                                        id="intercom"
                                        inputProps={{type: "intercom"}}
                                        error={Boolean(errors.intercom)}
                                        helperText={
                                            errors.intercom
                                                ? errors.intercom.type === 'minLength'
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
                            <Button
                                variant="contained"
                                type="submit"
                                fullWidth
                                color="primary"
                            >
                                        Сахранит
                            </Button>&nbsp;
                            <Button
                                fullWidth
                                variant="contained"
                                type="button"
                                color="primary"
                            >
                                Отмена
                            </Button>
                        </ListItem>
                    </form>
                </ListItem>
            </List>
        </Layout>
    );
};

export default Form;