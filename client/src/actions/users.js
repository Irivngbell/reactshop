import axios from 'axios';
import { setAlert } from './alert';
import { UPDATE_USER, DESTROY_USER, GET_USERS, USER_UPDATED } from './types';
import { loadUser } from './auth';

export const getUsers = () => async dispatch => {
    try {
        const res = await axios.get('/api/users');

        dispatch({
            type: GET_USERS,
            payload: res.data,
        });
    } catch (e) {
        console.log(e.response);
        dispatch(setAlert(e.response.data.errors[0].msg, 'error'));
    }
};

export const updateUser = formData => async dispatch => {
    try {
        const res = await axios.patch('/api/users/update', formData);

        dispatch(loadUser());

        dispatch(setAlert('utilisateur a jour !', 'success'));
    } catch (e) {
        dispatch(setAlert(e.response.data.errors[0].msg, 'error'));
    }
};

export const assignRoleToUser = formData => async dispatch => {
    try {
        const res = await axios.post('/api/users/role', formData);

        const user = res.data.user;
        // Ajouter cet user au state
        dispatch({
            type: USER_UPDATED,
            payload: user,
        });

        dispatch(setAlert('Rôle attribué avec succès !', 'success'));
    } catch (e) {
        dispatch(setAlert(e.response.data.errors[0].msg, 'error'));
    }
};

export const destroyUser = formData => async dispatch => {
    try {
        await axios.delete(`/api/users/destroy`, { data: formData });

        // dispatch(getUsers());

        dispatch(setAlert('Bye Bye rôle !', 'success'));
    } catch (e) {
        dispatch(setAlert(e.response.data.msg, 'error'));
    }
};
