import React from 'react';
import Layout from "../src/components/Layout";
import {Link, List, ListItem, TextField, Typography} from "@material-ui/core";
import useStyle from "../Utils/styles";
import NextLink from 'next/link'
import {ActionType} from "../Utils/redux/actions/types";
import {useForm, Controller} from "react-hook-form";
import {useSnackbar} from 'notistack';
import {useDispatch} from "react-redux";
import api from "../api/globalApi"
import Buttons from "../src/components/Common/Buttons/Buttons";

const Register = () => {
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const dispatch = useDispatch();
    const submitHandler = async ({name, email, password, confirmPassword}) => {
        closeSnackbar();
        if (password !== confirmPassword) {
            enqueueSnackbar("passwords dont match", {variant: "error"})
            return;
        }
        try {
            const {data} = await api.post("registration/", {
                username: name,
                email,
                password,
                password2: confirmPassword
            })
            enqueueSnackbar(data.username + " url send in email", {variant: "success"})
            dispatch({type: ActionType.USER_INFO, payload: data})
            console.log(data)
            localStorage.setItem("userInfo", JSON.stringify({name, email, password, confirmPassword}))
        } catch (err) {
            enqueueSnackbar(err.message, {variant: "error"})
        }
    }
    const classes = useStyle()

    return (
        <Layout title="Регистраця">
            <Buttons/>
            <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
            >
                <List>
                    <ListItem>
                        <Typography component="h1" variant='h1'>
                            Регистраця
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="name"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 2
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    inputProps={{type: "name"}}
                                    error={Boolean(errors.name)}
                                    helperText={errors.name ? errors.name.type === 'minLength'
                                            ? 'Name length is more then 1'
                                            : 'Name is required'
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
                            defaultValue=""
                            rules={{
                                required: true,
                                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                            }}

                            render={({field}) =>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="email"
                                    label="email"
                                    inputProps={{type: "email"}}
                                    error={Boolean(errors.email)}
                                    helperText={errors.email ? errors.email.type === 'pattern'
                                            ? 'Email is not valid'
                                            : 'Email is required'
                                        : ''
                                    }
                                    {...field}
                                />
                            }

                        />

                    </ListItem>
                    <ListItem>
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6
                            }}
                            render={({field}) =>
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="password"
                                    label="password"
                                    inputProps={{type: "password"}}
                                    error={Boolean(errors.password)}
                                    helperText={
                                        errors.password
                                            ? errors.password.type === 'minLength'
                                                ? 'Password length is more then 5'
                                                : 'Password is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            }
                        />
                    </ListItem>
                    <ListItem>
                        <Controller
                            name="confirmPassword"
                            control={control}
                            defaultValue=""
                            rules={{
                                required: true,
                                minLength: 6,
                            }}
                            render={({field}) => (
                                <TextField
                                    variant="filled"
                                    fullWidth
                                    id="confirmPassword"
                                    label="Confirm Password"
                                    inputProps={{type: 'password'}}
                                    error={Boolean(errors.confirmPassword)}
                                    helperText={
                                        errors.confirmPassword
                                            ? errors.confirmPassword.type === 'minLength'
                                                ? 'Confirm Password length is more than 5'
                                                : 'Confirm  Password is required'
                                            : ''
                                    }
                                    {...field}
                                />
                            )}
                        />
                    </ListItem>
                    <ListItem>
                        <button
                            className='globalBtn'
                            type="submit"
                        >
                            Регистраця
                        </button>
                    </ListItem>
                    <ListItem>
                        <Typography pr={1}>У вас уже есть аккаунт?</Typography>
                        <NextLink href="/login" passHref>
                            <Link>Login</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
};

export default Register;