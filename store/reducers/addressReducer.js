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
const current_address = (data) => {
	currentCoords = data.coordinates;
	homeAddr = data.home;
	workAddr = data.work;
	otherAddr = JSON.parse(data.other);
	distance = [];
	if(homeAddr!==null){
		distance.push(haversine_distance(currentCoords, JSON.parse(homeAddr).coordinate));
	}if(workAddr!==null){
		distance.push(haversine_distance(currentCoords, JSON.parse(workAddr).coordinate));
	}
	if(otherAddr!==null){
		if(otherAddr.constructor === Array){
			//if multidimensional array
			otherAddr.map((other)=>{
				distance.push(haversine_distance(currentCoords, other.coordinate));
			})
		}else{
			//if single object
			distance.push(haversine_distance(currentCoords, otherAddr.coordinate));
		}
	}
	unSortedDistance = [...distance]; 
	return unSortedDistance.indexOf(distance.sort(function(a, b){return a-b})[0]);
	
	function haversine_distance(coords1, coords2){
		var dLat = toRad(coords2.latitude - coords1.latitude);
		var dLon = toRad(coords2.longitude - coords1.longitude);
		var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(toRad(coords1.latitude)) *
				Math.cos(toRad(coords2.latitude)) *
				Math.sin(dLon / 2) *
				Math.sin(dLon / 2);

		return 12742 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	}
    function toRad(x) {
        return x * Math.PI / 180;
    }
}

const onRetrieveAddress = (state, data) => {
	let selectedAddress = data.coordinates!==null ? current_address(data) : 0;
	let newState = {
		currentAddress : selectedAddress!==-1 ? selectedAddress : 0, 
		savedAddresses : []
	};
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
	newState.savedAddresses = newState.savedAddresses.filter((address, i)=>i!==index)
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