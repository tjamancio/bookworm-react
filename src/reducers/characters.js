import { createSelector } from "reselect";

export default (state = {}, action) => {
    switch (action.type) {
        default:
            return state;
    }
};

const charactersHashSelector = state => state.characters;
export const charactersSelector = createSelector(charactersHashSelector, hash => Object.values(hash));