import React from 'react';
import EditIcon from "@mui/icons-material/Edit";
import {Button, Modal, IconButton, Typography, Box} from "@material-ui/core";
import useStyle from "../../../Utils/styles";

const Born  = ({user,handleChange, sendUser}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const classes = useStyle();

    return (
        <div>
            <Typography>
                <Typography> <strong>Дата рождения</strong></Typography>
                {user.birth_day}&nbsp;
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
                                Изменение номера телефона
                            </Typography>
                            <input
                                value={user.birth_day}
                                type="date"
                                name="birth_day"
                                onChange={handleChange}
                            />

                            <div style={{marginTop: "2rem"}}>
                                <Button
                                    variant={"outlined"}
                                    onClick={sendUser ? handleClose : ''}
                                >
                                    Ok
                                </Button>&nbsp;
                                <Button
                                    variant="outlined"
                                    onClick={handleClose}
                                >
                                    Отменить
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
            </Typography>
        </div>
    );
};

export default Born;