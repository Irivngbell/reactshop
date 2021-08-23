import { CREATE_CATEGORY, GET_CATEGORIES } from '../actions/types';
/**
 *
 * @type {{categories: *[]}}
 */
const initialState = {
    categories: [],
};

export default function categories(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_CATEGORIES:
            return {
                ...state,
                categories: payload,
            };
        case CREATE_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, payload.category],
            };

        default:
            return state;
    }
}
