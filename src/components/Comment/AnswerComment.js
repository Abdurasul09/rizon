import React from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TextField,Typography,AccordionDetails,AccordionSummary,Accordion} from "@material-ui/core";
import {useState} from "react";
import Axios from "../../../api/Api";
import {useSnackbar} from "notistack";

export default function AnswerComment({comment, product}) {
    const [answer, setAnswer] = useState('')
    const {enqueueSnackbar} = useSnackbar();

    const submitHandler = async (e) => {
        e.preventDefault()
        try {
            await Axios.post("/comments",
                {
                    parent: comment.id,
                    description: answer,
                    product: product.id,
                })
            enqueueSnackbar('Oтвет успешно отправлен!', {variant: 'success'});
        }catch (e){
            console.log(e)
            enqueueSnackbar("Error", {variant: 'error'});
        }
    }

    return (
        <div>
            <Accordion
                variant={'outlined'}
                style={{border: "none", background: "none"}}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography color='#7582EBFF'>Ответить</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <form onSubmit={submitHandler}>
                        <div>
                            <TextField
                                fullWidth
                                id="outlined-multiline-static"
                                label="Написать  ответ"
                                multiline
                                size="small"
                                rows={4}
                                variant="outlined"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                            />
                        </div>
                        <button
                            className='btn'
                            type="submit"
                        >
                            Отправить
                        </button>
                    </form>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}
