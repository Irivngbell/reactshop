import { CREATE_ARTICLE, GET_ARTICLES } from '../actions/types';

/**
 *
 * @type {{articles: *[]}}
 */
const initialState = {
    articles: [],
};

export default function articles(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ARTICLES:
            return {
                ...state,
                articles: payload,
            };
        case CREATE_ARTICLE:
            return {
                ...state,
                articles: [...state.articles, payload.article],
            };
        default:
            return state;
    }
}
