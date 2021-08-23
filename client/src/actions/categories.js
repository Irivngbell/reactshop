import axios from 'axios';
import { setAlert } from './alert';
import { GET_CATEGORIES, CREATE_CATEGORY } from './types';

export const getCategories = () => async dispatch => {
    try {
        const res = await axios.get('/api/categories');

        dispatch({
            type: GET_CATEGORIES,
            payload: res.data,
        });
    } catch (e) {
        console.log(e.response);
        dispatch(setAlert(e.response.data.msg, 'error'));
    }
};

export const createCategory = formData => async dispatch => {
    // axios
    //     .post('/api/categories/create', formData)
    //     .then(res =>
    //         dispatch({
    //             type: CREATE_CATEGORY,
    //             payload: res.data,
    //         })
    //     )
    //     .catch(e => dispatch(setAlert(e.response.data.msg, 'error')));

    try {
        const res = await axios.post('/api/categories/create', formData);
        console.log(res);
        dispatch({
            type: CREATE_CATEGORY,
            payload: res.data,
        });

        dispatch(setAlert(res.data.msg, 'success'));
    } catch (e) {
        dispatch(setAlert(e.response.data.msg, 'error'));
    }
};

export const updateCategory = formData => async dispatch => {
    try {
        await axios.patch('/api/categories/update', formData);

        dispatch(getCategories());

        dispatch(setAlert('categorie a jour !', 'success'));
    } catch (e) {
        console.log(e);
        dispatch(setAlert(e.response.data.msg, 'error'));
    }
};

export const destroyCategory = formData => async dispatch => {
    try {
        await axios.get(`/api/categories/destroy?id=${formData}`);

        dispatch(getCategories());

        dispatch(setAlert('Bye Bye categorie !', 'success'));
    } catch (e) {
        console.log(e);
        dispatch(setAlert(e.response.data.msg, 'error'));
    }
};
