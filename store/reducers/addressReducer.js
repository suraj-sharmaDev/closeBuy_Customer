import { RETRIEVE_ADDRESS, SAVE_ADDRESS, EDIT_ADDRESS, DELETE_ADDRESS, SELECT_ADDRESS, SERVICE_UNAVAILABLE } from '../actions/types';
// const initialState = {
// 	currentAddress: 0,
// 	savedAddresses: [
// 		{
// 			savedAs: 'Home',
// 			coordinate: {latitude: 10.0458737, longitude: 76.318553},
// 			houseDetail: 'House',
// 			landmark: 'Near benelli',
// 		},
// 		{
// 			savedAs: 'Work',
// 			coordinate: {latitude: 10.2458737, longitude: 76.418553},
// 			houseDetail: 'Lorem ipsum dolor sit amet',
// 			landmark: 'consectetur adipisicing elit. Perspiciatis earum',
// 		},
// 		{
// 			savedAs: 'Other',
// 			coordinate: {latitude: 10.4458737, longitude: 76.518553},
// 			houseDetail: 'Lorem ipsum dolor sit amet',
// 			landmark: 'consectetur adipisicing elit. Perspiciatis earum',
// 		},
// 	],
// };
const initialState = {
	currentAddress : 0,
	savedAddresses: [],
	serviceUnavailable : false
};

const onServiceUnavailable = (state, data) => {
	let newState = {...state};
	newState.serviceUnavailable = data;
	return newState;
}
const onRetrieveAddress = (state, data) => {
	let newState = {currentAddress : 0, savedAddresses : []};
	newState.serviceUnavailable = state.serviceUnavailable;
	if(data.home!==null){
		newState.savedAddresses.push(JSON.parse(data.home));
	}
	if(data.work!==null){
		newState.savedAddresses.push(JSON.parse(data.work));		
	}
	if(data.other!==null){
		otherAddr = JSON.parse(data.other);
		if(otherAddr.length !== undefined){
			//if there are multiple values in other address JSON
			otherAddr.map((addr)=>{
				newState.savedAddresses.push(addr);
			})
		}else{
			newState.savedAddresses.push(otherAddr);
		}
	}
	return newState;
}
const onSaveAddress = (state, data) => {
	let newState = {...state};
	if(newState.currentAddress===null) newState.currentAddress = 0; //When app initialized for first time
	newState.savedAddresses.push(data);
	return newState;
}
const onEditAddress = (state, data) => {
	let newState = {...state};
	let index = newState.savedAddresses.findIndex((addr)=>(addr.savedAs===data.savedAs));
	newState.savedAddresses[index] = data;
	return newState;
}
const onDeleteAddress = (state, index) => {
	let newState = {...state};
	console.warn(index);
	return newState;	
}
const onSelectAddress = (state, index) => {
	let newState = {...state};
	newState.currentAddress = index;
	return newState;		
}
const addressReducer = (state = initialState, action) => {
  switch(action.type) {
  	case RETRIEVE_ADDRESS : 
  		return onRetrieveAddress(state, action.payload);
  	case SAVE_ADDRESS : 
  		return onSaveAddress(state, action.payload);
  	case EDIT_ADDRESS :
  		return onEditAddress(state, action.payload);
  	case DELETE_ADDRESS :
  		return onDeleteAddress(state, action.payload);
  	case SELECT_ADDRESS : 
  		return onSelectAddress(state, action.payload);
  	case SERVICE_UNAVAILABLE :
  		return onServiceUnavailable(state, action.payload);
    default:
      return state;
  }
}

export default addressReducer;