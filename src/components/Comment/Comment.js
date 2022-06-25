import React, {useEffect, useState} from 'react';
import {
    Avatar,
    CircularProgress,
    IconButton,
    Link,
    TextField,
    Grid,
    List,
    ListItem,
    Typography
} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import {useSnackbar} from "notistack";
import useStyle from "../../../Utils/styles";
import Axios from "../../../api/Api";
import AnswerComment from "./AnswerComment";
import {ActionType} from "../../../Utils/redux/actions/types";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import api from "../../../api/globalApi";

const Comment = ({item}) => {
    const {userInfo} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [commentsPhoto, setCommentsPhoto] = useState()
    const {enqueueSnackbar} = useSnackbar();
    const [file, setFile] = useState("");


    const handleImageChange = (e) => {
        e.preventDefault();
        let readerBackground = new FileReader();
        let fileBackground = e.target.files[0];
        readerBackground.onloadend = () => {
            setFile(fileBackground);
        };
        readerBackground.readAsDataURL(fileBackground);
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        if(!file)return
        setLoading(true);
        const form = new FormData();
        form.append("description", comment)
        form.append("product", item.id)
        form.append("photos", file)
        try {
            await Axios.post("/comments", form)
            setLoading(false);
            enqueueSnackbar('Отзыв успешно отправлен!', {variant: 'success'});
            fetchReviews();
            setComment('')
        } catch (err) {
            setLoading(false);
            enqueueSnackbar("Error", {variant: 'error'});
        }
    };


    const getPhotos = async () => {
        try {
            const {data} = await api.get(`/comments-photo?catalog_id=${item.id}`)
            setCommentsPhoto(data)
        } catch (e) {
            console.log(e)
        }
    }

    const fetchReviews = async () => {
        try {
            const {data} = await Axios.get(`/comments?catalog_id=${item.id}`)
            setReviews(data.results);
            dispatch({type: ActionType.DELETE_COMMENT, payload: data.results})
            getPhotos()
        } catch (e) {
            console.log(e)
        }
    };

    useEffect(() => {
        getPhotos()
        fetchReviews()
    }, []);

    const handlerClickLike = async (id) => {
        try {
           await  Axios.post('/like-comment', {
                user: userInfo.id,
                comment: id,
            })
            fetchReviews()
        } catch (e) {
            console.log(e)
        }
    }

    const removeHandlerClick = async (id) => {
        try {
            await Axios.delete(`/like-comment/${id}`)
            fetchReviews()
        } catch (e) {
            console.log(e)
        }
    }

    const classes = useStyle();
    return (
        <div>
            <List>
                <div>
                    <Typography
                        component='h1'
                        variant='h1'
                    >
                        Фотографии пользователей
                    </Typography>
                </div>
                <div className={classes.flexStart}>
                    {
                        commentsPhoto ? (
                            commentsPhoto.results.map((item) => (
                                <div key={item} style={{margin: 2}}>
                                    <img
                                        src={item.photo}
                                        alt="Фотографии пользователей"
                                        width={150}
                                        height={150}
                                    />
                                </div>
                            ))
                        ) : (<h2>loading</h2>)
                    }
                </div>

                <div>
                    <Typography name="reviews" id="reviews" variant="h1" component='h1'>
                        Отзывы клиентов
                    </Typography>
                </div>
                <div>
                    {reviews.length === 0 && <ListItem>Нет обзора</ListItem>}
                </div>
                {reviews.map((review) => (
                    <div key={review.id}>
                        <Grid container>
                            <Grid item>
                                <div className={classes.flex}>
                                    <div>
                                        <Avatar>
                                            {review.avatar}
                                        </Avatar>
                                    </div>
                                    &nbsp;
                                    <div>
                                        <Typography>
                                            <strong>{review.user.username}</strong>
                                            <span className={classes.dataYear}>
                                                {review.created_at.substring(0, 10)}
                                            </span>
                                        </Typography>
                                    </div>
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div className={classes.comDesc}>
                                    <div className={classes.flex}>
                                        <Grid xs={12}>
                                            <div className={classes.flex}>
                                                <div>
                                                    <span>{review.description}</span>
                                                </div>
                                                <div>
                                                    <IconButton
                                                        onClick={() => review.liked ? (
                                                            removeHandlerClick(review.id)
                                                        ) : (
                                                            handlerClickLike(review.id)
                                                        )}>
                                                        <ThumbUpIcon
                                                            style={review.liked ? (
                                                                {color: 'crimson'}
                                                            ) : (
                                                                {color: '#bdbdbd'}
                                                            )}
                                                        />
                                                    </IconButton>
                                                    <span>{review.likes}</span>
                                                </div>
                                            </div>
                                            <div className={classes.childComment}>
                                                {review.children.map(item => (
                                                    <div key={item.id}>
                                                        {item ? (
                                                            <Typography pb={1}>
                                                                <strong>{item.user.username}</strong>
                                                                <span className={classes.dataYear}>
                                                                    {item.created_at.substring(0, 10)}
                                                                </span>
                                                            </Typography>
                                                        ) : ('')}
                                                        <Typography pl={1}>
                                                            {item.description}
                                                        </Typography>
                                                    </div>
                                                ))}
                                            </div>
                                            <AnswerComment comment={review} product={item}/>
                                        </Grid>
                                    </div>
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                ))}
                <div>
                    {userInfo ? (
                        <form onSubmit={submitHandler} className={classes.reviewForm}>
                            <Typography variant="h2" component='h2'>Оставьте свой отзыв</Typography>
                            <div>
                                <TextField
                                    fullWidth
                                    variant='standard'
                                    name="review"
                                    label="Введите комментарий"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                />
                            </div>
                            <div className={classes.flexCenter}>
                                <div>
                                    <button
                                        className='btn'
                                        type="submit"
                                    >
                                        Отправить
                                    </button>
                                    {loading && <CircularProgress/>}
                                </div>
                                <div>
                                    <ListItem>
                                        <label className="input-file">
                                            <input
                                                type="file"
                                                id="profile_pic"
                                                name="profile_pic"
                                                accept=".jpg, .jpeg, .png"
                                                onChange={(e) => handleImageChange(e)}
                                                className="fileInput"
                                            />
                                            Добавить фото
                                        </label>
                                    </ListItem>
                                </div>
                            </div>
                        </form>
                    ) : (
                        <Typography variant="h2">
                            Please{' '}
                            <Link href="/login">
                                login
                            </Link>{' '}
                            написать отзыв
                        </Typography>
                    )}
                </div>
            </List>
        </div>
    );
};

export default Comment;