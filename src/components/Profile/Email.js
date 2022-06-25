import React, {useEffect, useState} from 'react';
import {Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {Button, Modal, TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import useStyle from "../../../Utils/styles";


const Email = ({user, handleChange, sendUser}) => {
    const [open, setOpen] = React.useState(false);
    const [chengEmail, setChengEmail] = useState({})
    useEffect(() => {
        setChengEmail(JSON.parse(localStorage.getItem('chengUser')))
    },[])



    const classes = useStyle();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            <Typography>
                <Typography> <strong>E-mail</strong></Typography>
                {user ? user.email : chengEmail.email}&nbsp;
                <IconButton size={"medium"}>
                    <EditIcon
                        color={"primary"}
                        fontSize={"small"}
                        onClick={handleOpen}
                    />
                </IconButton>
                <Modal
                    keepMounted
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="keep-mounted-modal-title"
                    aria-describedby="keep-mounted-modal-description"
                >
                    <Box className={classes.modal}>
                        <form>
                            <Typography
                                id="keep-mounted-modal-title"
                                variant="h6" component="h2"
                                pb={2}
                            >
                                Изменение e-mail
                            </Typography>
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                value={user.email}
                                name="email"
                                label="E-mail"
                                id="outlined-size-small"
                                size="small"
                                inputProps={{type: "email"}}
                            />

                            <Typography pt={3}>
                                <Button
                                    onClick={sendUser ? handleClose : ''}
                                    variant={"outlined"}
                                >
                                    Ok
                                </Button>&nbsp;
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                >
                                    Отменить
                                </Button>
                            </Typography>
                        </form>
                    </Box>
                </Modal>
            </Typography>
        </div>
    );
};

export default Email;