import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import SignUpReducer from './SignUpReducer';

export default combineReducers({
    auth: AuthReducer,
    sign_up: SignUpReducer,
});