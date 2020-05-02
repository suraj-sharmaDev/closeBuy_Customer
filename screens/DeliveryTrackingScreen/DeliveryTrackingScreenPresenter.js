import React from "react";
import { AppState, Platform, PermissionsAndroid, Dimensions, Keyboard, Linking } from 'react-native';
import styled from "styled-components";

import {GetOrderDetails, CompleteOrder } from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';

import MapDisplay from "../../components/DeliveryTrackingScreen/MapDisplay";
import MapDisplaySelfPickup from "../../components/DeliveryTrackingScreen/MapDisplaySelfPickup";
import OrderDetail from "../../components/DeliveryTrackingScreen/OrderDetail";
import OrderDetailSelfPickup from "../../components/DeliveryTrackingScreen/OrderDetailSelfPickup";

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Theme = styled.View`
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const DeliveryTrackingScreenPresenter = (props) => {
  appState = 'active';
  let region = props.userLocation.savedAddresses[props.userLocation.currentAddress].coordinate;
  const userLocation = {...region, latitudeDelta : LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA};
  let markers = {
            userMarker: {
              latitude: parseFloat(userLocation.latitude),
              longitude: parseFloat(userLocation.longitude),
            },
            deliveryMarker: {
              latitude : props.cart.deliveryCoordinate!==null ? parseFloat(props.cart.deliveryCoordinate.latitude) : null,
              longitude : props.cart.deliveryCoordinate!==null ? parseFloat(props.cart.deliveryCoordinate.longitude) : null
            },
            distributorMarker : {
              latitude : props.cart.shopCoordinate!==null ? parseFloat(props.cart.shopCoordinate.latitude) : null,
              longitude : props.cart.shopCoordinate!==null ? parseFloat(props.cart.shopCoordinate.longitude) : null              
            }
  };
  React.useEffect(() => {
    timeOut = null;
    AppState.addEventListener('change', handleAppStateChange);
    return()=>{
    clearTimeout(timeOut);
    AppState.removeEventListener('change', handleAppStateChange);      
    }
  }, []);

  const openNativeMaps = () => {
    const origin = `${markers.distributorMarker.latitude},${markers.distributorMarker.longitude}`;    
    const destination = `${markers.userMarker.latitude},${markers.userMarker.longitude}`;
    let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        return Linking.openURL(url);
      } else {
        //install google maps
      }
    });
  }

  const completeSelfPickUp = () => {
    let formData = new FormData();
    formData.append('customerId', props.userId);
    formData.append('orderId', props.cart.orderId);
    CompleteOrder(formData)
    .then((result)=>{
      props.completeDelivery();
    })
    .catch((err)=>{
      AlertService(
        'Error',
        'An error occurred, sorry of inconvenience!',
        () => {},
      );
    })
  }

  const handleAppStateChange = (nextAppState) => {
    //if app came from background to foreground
    if(appState.match(/inactive|background/) && nextAppState === 'active') {
      //make API calls to get latest info on current order
      GetOrderDetails(props.cart.orderId)
        .then(result => {
          props.onStatusUpdate(result.reason.delivery_status);
          if (result.reason.delivery_status === 'completed') {
            props.completeDelivery();
          }
        })
        .catch(err => {
          AlertService(
            'Error',
            'An error occurred, sorry of inconvenience!',
            () => {},
          );
        });
    }
    appState = nextAppState;
  }
  //Below this line are codes for rendering content
  //the condition is checked to make sure the loading of coordinates
  //has happened
  if(props.cart.paymentType=='SELF_PICKUP'){
    // _map = markers.deliveryMarker!==null ?
    //     <MapDisplaySelfPickup 
    //       userLocation={userLocation}
    //       markers={markers}
    //       openNativeMaps={openNativeMaps}
    //     />
    //     :
    //     <Text>Loading</Text>

    _orderDetail = <OrderDetailSelfPickup order={props.cart} openNativeMaps={openNativeMaps} completeSelfPickUp={completeSelfPickUp}/>
  }else{
    // _map = markers.deliveryMarker!==null ?
    //     <MapDisplay 
    //       userLocation={userLocation}
    //       markers={markers}
    //     />
    //     :
    //     <Text>Loading</Text>

    _orderDetail = <OrderDetail order={props.cart}/>
  }
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    {
      // _map 
    }
    {_orderDetail}
  </Theme>
  );
  return content;  
};
export default React.memo(DeliveryTrackingScreenPresenter);
