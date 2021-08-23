import axios from 'axios';
import { setAlert } from './alert';
import {
    GET_ARTICLES,
    ARTICLES_ERROR,
    CREATE_ARTICLE,
    UPDATE_ARTICLE,
    DESTROY_ARTICLE,
} from './types';

export const getArticles = () => async dispatch => {
    try {
        const res = await axios.get('/api/articles');

        dispatch({
            type: GET_ARTICLES,
            payload: res.data,
        });
    } catch (e) {
        console.log(e);
        dispatch({
            type: ARTICLES_ERROR,
            payload: { msg: e },
        });
    }
};

export const createArticle = formData => async dispatch => {
    try {
        const res = await axios.post('/api/articles/create', formData);

        dispatch({
            type: CREATE_ARTICLE,
            payload: res.data,
        });

        dispatch(setAlert('article cree !', 'success'));
    } catch (e) {
        console.log(e);
        dispatch({
            type: ARTICLES_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status },
        });
    }
};

export const updateArticle = formData => async dispatch => {
    try {
        await axios.patch('/api/articles/update', formData);

        dispatch(getArticles());

        dispatch(setAlert('article a jour !', 'success'));
    } catch (e) {
        console.log(e);
        dispatch({
            type: ARTICLES_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status },
        });
    }
};

export const destroyArticle = formData => async dispatch => {
    try {
        await axios.delete(`/api/articles/destroy`, { data: formData });

        dispatch(getArticles());

        dispatch(setAlert('Bye Bye article !', 'success'));
    } catch (e) {
        console.log(e);
        dispatch({
            type: ARTICLES_ERROR,
            payload: { msg: e.response.statusText, status: e.response.status },
        });
    }
};
