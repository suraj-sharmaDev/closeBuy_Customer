import React from "react";
import { Platform, ScrollView } from 'react-native';
import {connect} from 'react-redux';
import styled from "styled-components";

import {height, width} from '../../constants/Layout';
import {subscribe} from '../../store/actions/user';
import {updateTrackCoordinate, trackEnd, statusUpdate} from '../../store/actions/cart';
import {serviceUnavailable} from '../../store/actions/address';

import {GetAllShops} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';
import NotificationService from '../../middleware/NotificationService';

import HomeScreenLoader from "../../components/HomeScreen/HomeScreenLoader";
import ServiceOutOfRange from "../../components/ServiceOutOfRange";
import DeliveryLocationHeader from "../../components/HomeScreen/DeliveryLocationHeader";
import OffersPresenter from "../../components/HomeScreen/OffersPresenter";
import ShopListWithSearchBar from "../../components/HomeScreen/ShopListWithSearchBar";
import Color from "../../constants/Colors";

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;
const View = styled.View`
  height : ${height};
  width : ${width};
`;

const HomeScreenPresenter = ({navigation, ...props}) => {
  const currentAddress = props.address.savedAddresses[props.address.currentAddress]
  const [isLoading, updateLoading] = React.useState(null);
  React.useEffect(()=>{
    if(isLoading===null)
    {
      NotificationService(props.user.userId, onDataNotifs);
    }
    fetchShops();
    return()=>{}
  },[currentAddress])

  const onDataNotifs = (data) => {
    //When data notifications arrive
    //deliver them accordingly
    if(data.type==='rejected'){
      AlertService('Order Cancelled', 'Dealer could not accept your order now!', ()=>{});
      props.onTrackEnd();   
    }
    else if(data.type==='accepted'){
      parsedData = JSON.parse(JSON.parse(data.payload).from);
      let region={
        latitude : parseFloat(parsedData.latitude),
        longitude : parseFloat(parsedData.longitude)
      }
      props.onUpdateTrack(region);
    }
    else if(data.type==='coordinates'){
      parsedData = JSON.parse(data.payload);      
      let region={
        latitude : parseFloat(parsedData.latitude),
        longitude : parseFloat(parsedData.longitude)
      }
      props.onUpdateTrack(region);
    }else if(data.type==='delivery_message'){
      if(data.payload === 'completed'){
        props.onTrackEnd();
      }else{
        props.onStatusUpdate(data.payload);
      }
    }
  }
  const fetchShops = () => {
    if(!currentAddress){
      navigation.navigate('LocationSelector');      
    }else{
      updateLoading(true);      
      //Fetch the shops from server if delivery Location Available
      GetAllShops(JSON.stringify(currentAddress.coordinate))
      .then((result)=>{
        if(result.error){
          if(typeof outOfRange=='undefined'){
            outOfRange=true;
            props.onServiceUnavailable(true);          
            updateLoading(false);
          }
          else
          {
            if(!outOfRange){
              //if outofRange has already been set don't set again
              outOfRange=true;
              props.onServiceUnavailable(true);
              updateLoading(false);                          
            }
          }
        }
        else
        {
          outOfRange=false;
          Offers = result.offers;
          Shops = result.shops;
          props.onServiceUnavailable(false);          
          updateLoading(false);
        }
      })
      .catch((err)=>{
        outOfRange=true;
        props.onServiceUnavailable(true);          
        updateLoading(false);        
        AlertService('Error', 'An Error Occurred, Sorry for inconvenience!', ()=>{});
      })
    }
  }
  let content = null;
  if(isLoading || isLoading===null){
    content = (<HomeScreenLoader />);    
  }
  else
  {
    //Two cases will arrive if service out of range or not
    if(outOfRange){
      content=(
          <ServiceOutOfRange />
      );
    }
    else
    {
      content=(
          <ScrollView>
            <OffersPresenter OfferData={Offers} navigation={navigation}/>
            <ShopListWithSearchBar Shops={Shops} navigation={navigation}/>
          </ScrollView>
      );
    }
  }
  return (
    <Theme>
      <DeliveryLocationHeader navigation={navigation} currentAddress={currentAddress}/>
      {content}
    </Theme>
  );
};

const mapStateToProps = state => {
  return {
    address: state.address,
    user : state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onUpdateTrack: data => {
      dispatch(updateTrackCoordinate(data));
    },
    onStatusUpdate: data => {
      dispatch(statusUpdate(data));
    },
    onTrackEnd: ()=>{
      dispatch(trackEnd());
    },
    onServiceUnavailable: (data)=>{
      dispatch(serviceUnavailable(data))
    }
  };
};

export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreenPresenter));
