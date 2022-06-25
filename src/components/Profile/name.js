import React from 'react';
import {ListItem, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import {Button, Modal, TextField} from "@material-ui/core";
import Box from "@mui/material/Box";
import useStyle from "../../../Utils/styles";

const Name = ({user, handleChange, sendUser}) => {
    const [open, setOpen] = React.useState(false);

    const classes = useStyle();
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
            <Typography>
                <ListItem>
                    <Typography p={2}>
                        <strong>
                            {user.username}
                        </strong>
                    </Typography>
                    <IconButton size={"medium"}>
                        <EditIcon
                            color={"primary"}
                            fontSize={"small"}
                            onClick={handleOpen}
                        />
                    </IconButton>
                </ListItem>
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
                                Изменение name
                            </Typography>
                            <TextField
                                onChange={handleChange}
                                fullWidth
                                value={user.username}
                                name="username"
                                size="small"
                                inputProps={{type: "text"}}
                            />

                            <Typography pt={3}>
                                <Button
                                    onClick={sendUser ? handleClose : ''}
                                    variant={"outlined"}
                                >
                                    Ok
                                </Button>&nbsp;
                                <Button
                                    variant={"outlined"}
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

export default Name;