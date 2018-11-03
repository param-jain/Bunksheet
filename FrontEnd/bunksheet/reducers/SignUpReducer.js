import { 
    SIGNUP_EMAIL_CHANGED, 
    SIGNUP_PASSWORD_CHANGED, 
    SIGNUP_VERIFY_PASSWORD_CHANGED,
} from '../actions/types';

const INITIAL_STATE = { 
    email: '',  
    emailTouched: false, 
    password: '',
    passwordTouched: false,
    verifyPassword: '',
    verifyPasswordTouched: false,
    isAuthenticating: false,
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type) {

        case SIGNUP_EMAIL_CHANGED:
            return { ...state, email: action.payload, emailTouched: true };

        case SIGNUP_PASSWORD_CHANGED:
            return { ...state, password: action.payload, passwordTouched: true };

        case SIGNUP_VERIFY_PASSWORD_CHANGED:
            return { ...state, verifyPassword: action.payload, verifyPasswordTouched: true };

        default: 
            return state;
    }
};