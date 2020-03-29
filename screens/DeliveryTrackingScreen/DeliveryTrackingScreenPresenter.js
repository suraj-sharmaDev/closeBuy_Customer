import React from "react";
import { AppState, Platform, PermissionsAndroid, Dimensions, Keyboard } from 'react-native';
import styled from "styled-components";

import {GetOrderDetails} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';

import MapDisplay from "../../components/DeliveryTrackingScreen/MapDisplay";
import OrderDetail from "../../components/DeliveryTrackingScreen/OrderDetail";

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
  let map = markers.deliveryMarker!==null ?
      <MapDisplay 
        userLocation={userLocation}
        markers={markers}
      />
      :
      <Text>Loading</Text>
  let content = (
  <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
    {
    map
    }
    <OrderDetail order={props.cart}/>
  </Theme>
  );
  return content;  
};
export default React.memo(DeliveryTrackingScreenPresenter);
