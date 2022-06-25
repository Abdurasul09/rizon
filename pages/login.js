import React, { useEffect} from 'react';
import Layout from "../src/components/Layout";
import {Link, List, ListItem, TextField, Typography} from "@material-ui/core";
import useStyle from "../Utils/styles";
import NextLink from 'next/link'
import {ActionType} from "../Utils/redux/actions/types";
import {useRouter} from "next/router";
import {useForm, Controller} from "react-hook-form";
import {useSnackbar} from 'notistack';
import {useDispatch} from "react-redux";
import api from "../api/globalApi";
import Buttons from "../src/components/Common/Buttons/Buttons";

const Login = () => {
    const {
        handleSubmit,
        control,
        formState: {errors},
    } = useForm();

    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const router = useRouter();
    const token = router.query.token
    const dispatch = useDispatch();

    useEffect(() => {
        if (!token) {
            return
        }
        api.get(`verify-email/${token}`)
    }, [token])

    const submitHandler = async ({email, password}) => {
        closeSnackbar();
        try {
            const {data} = await api.post('token/', {email, password})
            dispatch({type: ActionType.USER_LOGIN, payload: data})
            localStorage.setItem("access", JSON.stringify(data.access))
            localStorage.setItem("refresh", JSON.stringify(data.refresh))
            router.push('/');
        } catch (err) {
            enqueueSnackbar(err.message, {variant: "error"})
        }
    }
    const classes = useStyle()
    return (
        <Layout title="Login">
            <Buttons/>
            <form
                className={classes.form}
                onSubmit={handleSubmit(submitHandler)}
            >
                <Typography component="h1" variant='h1'>
                    Login
                </Typography>
                <List>
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
                                    variant="outlined"
                                    fullWidth
                                    id="Email"
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
                                    className={classes.textField}
                                    label="пароль"
                                    variant="outlined"
                                    fullWidth
                                    id="password"
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
                        <button
                            className='globalBtn'
                            type="submit">
                            Login
                        </button>
                    </ListItem>
                    <ListItem>
                        <Typography>Dont have an account ?</Typography>&nbsp;
                        <NextLink href="/register" passHref>
                            <Link>Register</Link>
                        </NextLink>
                    </ListItem>
                </List>
            </form>
        </Layout>
    );
};


export default Login;