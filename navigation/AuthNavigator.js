import React from 'react';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';

import GeolocationService from '../middleware/GeolocationService';
import {AlertService} from '../middleware/AlertService';
import {Initialize} from '../middleware/API';

import {retrieveAddress} from '../store/actions/address';
import {retrieveCart, trackStart} from '../store/actions/cart';

import LoginNavigator from "./LoginNavigator";
import AppNavigator from "./AppNavigator";


const AuthNavigator = (props) => {
	const [initialized, updateInitialized] = React.useState(null);
	React.useEffect(()=>{
		//After login is done we have to refresh our localstorage
		//for saved addresses and other details stored in cloud
		SplashScreen.hide();
		GeolocationService(true, ()=>{}, onLocation, false);
		//This hides splash screen on app start
		return ()=>{
			GeolocationService(false, ()=>{}, onLocation, false);
			updateInitialized('unmounted');
		}
	},[])

	const onLocation = (data) => {
		coordinates = data;
	}
	const appInitializer = async() => {
		if(initialized===null ){
			Initialize(props.user.userId)
				.then(async result => {
					if (result.error) {
						//If there are no saved addresses
						// updateInitialized('initialized');
					} else {
						//if saved addresses found in server save it in app for use
						if(!result.address.error){
							result.address.reason.coordinates = coordinates;
						}
						await props.onRetrieveData(result);
						//along with get geolocation and change current
						updateInitialized('initialized');
					}
				})
				.catch(err => {
			        AlertService('Error', 'Please check your internet!', ()=>{});
					updateInitialized('api_error');
				});
		}
	}

	let content = null;
	if(props.user.loggedIn && props.user.verified && props.user.userName){
		//initialize app only when user has been verified and not already initialized
		appInitializer();
		if(initialized === 'initialized'){
			content = <AppNavigator />;
		}
	}else{
		content = <LoginNavigator />;
	}

	return content;
};

const mapStateToProps = state =>{
	return {
		user : state.user,
	}
}
const mapDispatchToProps = dispatch => {
  return {
    onRetrieveData : data => {
      if(data.address.error===false){
      	  //insert addresses saved in database
	      dispatch(retrieveAddress(data.address.reason));
      }if(data.cart.error===false || data.recentOrder.error === false){
      	  //insert items to cart fetched from database
      	  //if recentOrders also exist then add that too
      	  let payload = {
      	  		cart : data.cart.error===false ? data.cart.reason : [], 
      	  		recentOrder : data.recentOrder.error===false ? data.recentOrder.reason : []
      	  	};
		  dispatch(retrieveCart(payload));      	  
      }if(data.order.error===false){
      	//if order was created call necessary functions
          dispatch(trackStart(data.order.reason));
      }
    },
  }
};
export default React.memo(connect(mapStateToProps, mapDispatchToProps)(AuthNavigator));