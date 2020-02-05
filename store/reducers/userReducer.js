import { LOGIN, CREDENTIAL, VERIFY, LOGOUT, SUBSCRIBE, UPDATE_CUSTOMER } from '../actions/types';

const initalState = {
	userId : null,
	userName : '',
	userMobile : null,
	fcmToken : '',
	apiKey : '',
	loggedIn : false,
	verified : false
}

const subscribe = (state, data) => {
	newState = {...state};
	newState.fcmToken = data;
	return newState;
}
const updateCustomer = (state, data) => {
	newState = {...state};
	data.customerName!==null ? newState.userName = data.customerName : null;
	data.customerMobile!==null ? newState.userMobile = data.customerMobile : null;
	return newState;
}
const login = (state, data) => {
	newState = {...state};
	newState.userId = data.customerId;
	newState.userName = data.customerName;
	newState.userMobile = data.customerMobile;		
	newState.apiKey = data.apiKey;
	newState.loggedIn = true;
	return newState;
}
const credential = (state, name) => {
	newState = {...state};
	newState.userName = name;
	return newState;
} 
const verify = (state) => {
	newState = {...state};
	newState.verified = true;
	return newState;
} 
const logout = () => {
	newState = {	
		userId : '',
		userName : '',
		userMobile : 0,
		fcmToken : '',
		apiKey : '',
		loggedIn : false,
		verified : false
	};
	return newState;
}
const userReducer = (state=initalState, action) => {
	switch(action.type) {
		case LOGIN :
			return login(state, action.payload);
		case CREDENTIAL : 
			return credential(state, action.payload);		
        case VERIFY :
            return verify(state);
        case LOGOUT :
            return logout();
        case SUBSCRIBE :
        	return subscribe(state, action.payload);
        case UPDATE_CUSTOMER :
        	return updateCustomer(state, action.payload);
		default :
			return state;
	}
}

export default userReducer;