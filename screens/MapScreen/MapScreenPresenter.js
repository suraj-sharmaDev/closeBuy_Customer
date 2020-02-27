import React from "react";
import { Platform, PermissionsAndroid, Animated, Dimensions, Keyboard } from 'react-native';
import styled from "styled-components";
import Geolocation from 'react-native-geolocation-service';
import {connect} from 'react-redux';

import {AddAddress, PlaceDetails, ReverseLookup} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';

import GeolocationService from '../../middleware/GeolocationService';

import {saveAddress, editAddress} from '../../store/actions/address';
import MapDisplay from "../../components/MapScreen/MapDisplay";
import MapInput from "../../components/MapScreen/MapInput";
import Color from "../../constants/Colors";

const {height, width} = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
  height : ${height};
  width : ${width};
`;
const Text = styled.Text``;

const MapScreenPresenter = ({navigation, ...props}) => {
  const [userLocation, updateUserLocation] = React.useState(null);
  let mapHeight = new Animated.Value(height * 0.5);
  let formHeight = new Animated.Value(height* 0.5);
  let mapAnimationStyle = { height : mapHeight};  
  let formAnimationStyle = { height : formHeight};    
  React.useEffect(() => {
    getCurrentLocation();
    return ()=>{
      GeolocationService(false, onPermissionDenial, onLocation);      
    }
  }, []);

  const onPermissionDenial = () => {
    navigation.goBack();
  }

  const onLocation = (data, source=null) => {
    // find the address from api call and update that too
    ReverseLookup(data)
    .then((result)=>{
      data.reverseAddress = result;
      data.latitudeDelta = LATITUDE_DELTA;
      data.longitudeDelta = LONGITUDE_DELTA;    
      if (data !== userLocation && userLocation !== null && source ===null) {
        _map.animateToRegion(data, 1000);
        updateUserLocation(data);
      } else {
        updateUserLocation(data);
      }      
    })
    .catch((err)=>{
        AlertService('Error','An error occurred while reverse geocoding your address!', ()=>{});
        updateUserLocation(data);        
    })
  }
  getCurrentLocation = () => {
    houseAddr = '';
    landmarkAddr = '';
    saveAs = '';
    isEdit = false;
    if(navigation.getParam('placeId')){
      PlaceDetails(navigation.getParam('placeId'))
      .then((resultData)=>{
        data = {
          latitude : resultData.result.geometry.location.lat,
          longitude : resultData.result.geometry.location.lng
        }
        onLocation(data);
      })
      .catch((err)=>{
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
      })
    }
    else if(navigation.getParam('editAddress')){
      let address = navigation.getParam('editAddress');
      data = {
        latitude : address.coordinate.latitude,
        longitude : address.coordinate.longitude
      }
      houseAddr = address.houseDetail;
      landmarkAddr = address.landmark;
      saveAs = address.savedAs;
      isEdit = true;
      onLocation(data);
    }
    else{
      GeolocationService(true, onPermissionDenial, onLocation);
    }
  }

  const onRegionChange = props => {
    region = {
      latitude : props.latitude, 
      longitude : props.longitude,
    };
    onLocation(region, 'map');
    // console.warn('changing...');
    // updateUserLocation();
  }
  const _mapRef = (ref) => {
    _map = ref;
  }
  const inputFocused = () => {
    Animated.parallel([
      Animated.timing(mapHeight,{
        toValue : 0,
        duration : 350,
      }),
      Animated.timing(formHeight,{
        toValue : height-10,
        duration : 350
      })      
    ]).start();    
  }
  const inputBlurred = () => {
    Animated.parallel([
      Animated.timing(mapHeight,{
        toValue : height*0.5,
        duration : 350
      }),
      Animated.timing(formHeight,{
        toValue : height*0.5,
        duration : 350
      })      
    ]).start();    
  }    
  const addressSave = (data) => {
    let insertAddress = {'savedAs':data.locationType,'coordinate' : userLocation, 'houseDetail' : data.house, 'landmark' : data.landmark};
    let formData = new FormData();
    formData.append('customerId', props.user.userId);
    formData.append('type', data.locationType);
    formData.append('address', JSON.stringify(insertAddress));
    // Save the address in cloud
    AddAddress(formData)
    .then((result)=>{
      // Then save/edit the address in local storage
      if(navigation.getParam('editAddress')){
        props.onEditAddress(insertAddress);
      }else{
        props.onSaveAddress(insertAddress);
      }
      // After saving the address navigate to respective pages
      if (navigation.getParam('screen') !== 'ManageAddress') {
        navigation.navigate('Home');
      } else {
        navigation.navigate('Tabs');
      }      
    })
    .catch((err)=>AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{}));
  }

  //Above this line are codes for functions
  //Below this line are codes for rendering content
  let content = null;
  let map = null;
  if(userLocation!==null)
  {
    map = (
      <Animated.View style={mapAnimationStyle}>
        <MapDisplay
          _mapRef={_mapRef}
          userLocation={userLocation}
          onRegionChange={onRegionChange}
        />
      </Animated.View>
    );
    content = (
      <Theme stickyHeaderIndices={[0]} showsVerticalScrollIndicator={false}>
        {map}
        <MapInput
          userLocation = {userLocation}
          address={props.address}
          saveAs={saveAs}
          houseAddr={houseAddr}
          landmarkAddr={landmarkAddr}
          inputFocused={inputFocused}
          inputBlurred={inputBlurred}
          addressSave={addressSave}
          isEdit={isEdit}
        />
      </Theme>
    );
  }
  return content;
};

const mapStateToProps = state => {
  return {
    user : state.user,
    address: state.address,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSaveAddress: data => {
      dispatch(saveAddress(data));
    },
    onEditAddress: data => {
      dispatch(editAddress(data));
    }
  };
};
export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MapScreenPresenter));

// export default MapScreenPresenter;
