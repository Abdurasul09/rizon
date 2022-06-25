import React, {useEffect, useState} from 'react';
import Layout from "../src/components/Layout";
import useStyle from "../Utils/styles";
import {Button, FormControl, FormControlLabel, Modal, Radio, Box,
    RadioGroup, Card, Grid, List, ListItem, Typography, Avatar,
} from "@material-ui/core";
import Email from "../src/components/Profile/Email";
import Phone from "../src/components/Profile/Phone";
import ProfilePages from "../src/components/Profile/ProfilePage/ProfilePages";
import Axios from "../api/Api";
import Born from "../src/components/Profile/born";
import Name from "../src/components/Profile/name";
import {AvatarCamera} from "../Utils/svg";
import {useSnackbar} from "notistack";
import {useRouter} from "next/router";

const Profile = () => {
    const classes = useStyle();
    const [file, setFile] = useState("");
    const {enqueueSnackbar, closeSnackbar} = useSnackbar();
    const [open, setOpen] = useState(false);
    const router = useRouter()
    const [inputs, setInputs] = useState({
        avatar: "",
        birth_day: "",
        email: "",
        gender: "",
        username: "",
        phone: "",
    })

    const getUser = async () => {
        try {
          const res= await Axios.get("user/")
            console.log(res)
            if(res){
            setInputs(res.data)}else {
                router.push('/')
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        getUser()
    }, [])

    const handleChange = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value})
    }

    const handleImageChange = (e) => {
        e.preventDefault();
        let readerBackground = new FileReader();
        let fileBackground = e.target.files[0];
        readerBackground.onloadend = () => {
            setFile(fileBackground);
        };
        readerBackground.readAsDataURL(fileBackground);
    };


    const sendUser = async (data) => {
        try {
            await Axios.patch("user/", data)
        } catch (e) {
            console.log(e)
        }
    }

    const handleSubmit = async () => {
        closeSnackbar()
        const form = new FormData();
        if (file) {form.append("avatar", file)}
        form.append("birth_day", inputs.birth_day)
        form.append("email", inputs.email)
        form.append("gender", inputs.gender)
        form.append("username", inputs.username)
        form.append("phone", inputs.phone)
        try {
            await Axios.put('/user/', form)
            setFile('')
            enqueueSnackbar('Профил успешно сахронен', {variant: 'success'})
            getUser()
        } catch (e) {
            console.log(e)
        }
    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick =async () => {
        try {
        await  Axios.delete('/user')
            handleClose(false);
            router.push('/')
        } catch (e) {
            console.log(e)
        }
    }


    return (
        <Layout title="Личные данные">
            <Grid>
                <ProfilePages/>
                <Grid>
                    <Typography component="h4" variant="h4" pb={3}>
                        Личные данные
                    </Typography>
                    <Card item md={3} xs={12}>
                        <List>
                            <div className={classes.profileAvatar}>
                                <div>
                                    <div className={classes.profileAvatarImg}>
                                        <Avatar
                                            className={classes.avatar}
                                            src={inputs.avatar}
                                            alt="Travis Howard"/>
                                        <label className="input__file__camera"
                                        >
                                            <input
                                                type="file"
                                                id="profile_pic"
                                                name="profile_pic"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(e) => handleImageChange(e)}
                                                className="fileInput"
                                            />
                                            <span className={classes.avatarCaemera}>
                                                <AvatarCamera/>
                                            </span>
                                        </label>
                                    </div>
                                </div>
                                <div>
                                    <Name
                                        sendUser={sendUser}
                                        handleChange={handleChange}
                                        name="username"
                                        user={inputs}
                                    />
                                </div>
                            </div>
                            <div className={classes.profileItems}>
                                <Email
                                    sendUser={sendUser}
                                    handleChange={handleChange}
                                    name="email"
                                    user={inputs}
                                />
                                <Phone
                                    sendUser={sendUser}
                                    handleChange={handleChange}
                                    name="phone"
                                    user={inputs}
                                />
                                <Born
                                    sendUser={sendUser}
                                    handleChange={handleChange}
                                    name="phone"
                                    user={inputs}
                                />
                                <Typography>
                                    <FormControl
                                        value={inputs.gender}
                                        name="gender"
                                    >
                                        <Typography><strong>Пол</strong></Typography>
                                        <RadioGroup
                                            name="gender"
                                            row
                                            value={inputs.gender}
                                            onChange={handleChange}
                                        >
                                            <FormControlLabel
                                                label='Male'
                                                control={<Radio/>}
                                                value='Male'
                                            />
                                            <FormControlLabel
                                                label='Female'
                                                control={<Radio/>}
                                                value='Female'

                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </Typography>
                            </div>
                            <ListItem>
                                <button className='btn' onClick={() => handleSubmit()}>Сахранит</button>
                            </ListItem>
                        </List>
                    </Card>

                    <Card item md={3} xs={12} className={classes.deleteProfile}>
                        <List>
                            <ListItem>
                                <Typography><strong>Удаление личного кабинета</strong></Typography>
                            </ListItem>
                            <ListItem>
                                <Typography className={classes.profileTypography}>Как только ваш личный кабинет будет
                                    удален, Вы автоматически выйдете из системы и больше не сможете войти в этот
                                    аккаунт.</Typography>
                            </ListItem>
                            <ListItem>
                                <Button
                                    variant="text"
                                    color={"primary"}
                                    onClick={handleOpen}
                                    size={"small"}
                                >
                                    Удаление личного кабинета
                                </Button>
                                <Modal
                                    keepMounted
                                    open={open}
                                    onClose={handleClose}
                                    aria-labelledby="keep-mounted-modal-title"
                                    aria-describedby="keep-mounted-modal-description"
                                >
                                    <Box className={classes.modal}>
                                        <Typography id="keep-mounted-modal-description" sx={{mt: 2}}>
                                            Действительно хотите удалить аккаунт или нет?
                                        </Typography>
                                        <Typography pt={3}>
                                            <Button
                                                onClick={() => handleClick()}
                                                variant="outlined"
                                            >
                                                Да
                                            </Button>&nbsp;
                                            <Button
                                                onClick={handleClose}
                                                variant="outlined"
                                            >
                                                Нет
                                            </Button>
                                        </Typography>
                                    </Box>
                                </Modal>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>

        </Layout>
    );
};

export default Profile;