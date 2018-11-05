import { LIBRARY_SEARCHTEXT_CHANGED } from '../actions/types';

const INITIAL_STATE = {
    data: [],
    error: null,
    searchBarText: ''
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case LIBRARY_SEARCHTEXT_CHANGED:
            return { ...state, searchBarText: action.payload };

        default: 
            return state;
    }
};