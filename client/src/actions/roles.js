import axios from 'axios';
import { setAlert } from './alert';
import { GET_ROLES, CREATE_ROLE } from './types';

// CREATE, READ, UPDATE, DELETE
export const getRoles = () => async dispatch => {
    try {
        const res = await axios.get('/api/roles');

        dispatch({
            type: GET_ROLES,
            payload: res.data,
        });
    } catch (e) {
        console.log(e.response);
        dispatch(setAlert(e.response.data.msg, 'error'));
    }
};

export const createRole = formData => dispatch => {
    axios
        .post('/api/roles/create', formData)
        .then(res => {
            dispatch({
                type: CREATE_ROLE,
                payload: res.data,
            });

            dispatch(setAlert(res.data.msg, 'success'));
        })
        .catch(e => dispatch(setAlert(e.response.data.msg, 'error')));
};

export const updateRole = formData => async dispatch => {
    try {
        await axios.patch('/api/roles/update', formData);

        dispatch(getRoles());

        dispatch(setAlert('rôle a jour !', 'success'));
    } catch (e) {
        dispatch(setAlert(e.response.data.errors[0].msg, 'error'));
    }
};

export const destroyRole = formData => async dispatch => {
    try {
        await axios.delete(`/api/roles/destroy`, { data: formData });

        dispatch(getRoles());

        dispatch(setAlert('Bye Bye rôle !', 'success'));
    } catch (e) {
        dispatch(setAlert(e.response.data.msg, 'error'));
    }
};
