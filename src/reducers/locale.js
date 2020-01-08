import { LOCALE_SET } from "../types";

export default (state = { lang: 'en' }, action) => {
    switch (action.type) {
        case LOCALE_SET:
            return action;
        default:
            return state;
    }
};