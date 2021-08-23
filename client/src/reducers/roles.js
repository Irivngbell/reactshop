import { CREATE_ROLE, GET_ROLES } from '../actions/types';
/**
 *
 * @type {{roles: *[]}}
 */
const initialState = {
    roles: [],
};

export default function categories(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ROLES:
            return {
                ...state,
                roles: payload,
            };
        case CREATE_ROLE:
            return {
                ...state,
                roles: [...state.roles, payload.category],
            };

        default:
            return state;
    }
}
