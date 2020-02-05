import React from 'react';
import { Platform, BackHandler, Dimensions, Alert } from 'react-native';
import {connect} from 'react-redux';
import styled from 'styled-components';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import {PlacesAutoFetch} from "../../middleware/API";
import {AlertService} from '../../middleware/AlertService';
import {selectAddress} from "../../store/actions/address";

import AddressInput from '../../components/LocationSelectionScreen/AddressInput';
import AddressLists from '../../components/LocationSelectionScreen/AddressLists';

const {height, width} = Dimensions.get('window');
const Container = styled.View`
  padding : 10px 0px;
`;

const LocationSelectionScreenPresenter = props => {
  const [searchTerm, updateSearchTerm] = React.useState('');
  const [fetchedPredictions, updateFetchedPredictions] = React.useState(null);
  const currentAddress = props.address.savedAddresses[props.address.currentAddress]
  React.useEffect(() => {
    backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );
    return () => {
      backHandler.remove();
    };
  },[]);

  const handleBackPress = (logic) => {
    //This is most important Logic for the application
    //We don't want to go back to home page when there is no saved addresses
    //Otherwise home page will basically display Loading forever and ever
    //We can choose one more logic by using withNavigationFocus to call fetchShop everytime
    //component is focused but this will lead to uncecessary renders 
    if(!currentAddress){
      AlertService('No Saved Addresses','Save a address and let us find offers in your location!', ()=>{});
      return true;
    }else{
      if(logic===undefined){
        //when hardware backbutton clicked
        return false;
      }else{
        //when ui back button clicked
        props.navigation.goBack();
      }
    }
  };

  const clearSearch = () => {
    updateSearchTerm('');
    updateFetchedPredictions(null);
  }
  const doSearch = (text) => {
    if(text.length > 3){
      PlacesAutoFetch(text)
      .then((result)=>{
        updateFetchedPredictions(result);
      })
      .catch((err)=>{
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
      })
    }
  }

  const onCurrentLocationSelect = () => {
    if (props.navigation.getParam('screen') !== 'ManageAddress') {
      props.navigation.navigate('LocationPickerMap');
    } else {
      props.navigation.navigate('LocationPickerMap',{screen : 'ManageAddress'});
    }
  }
  const onSavedLocationSelect = (place_id) => {
    props.onSelectAddress(place_id);
    props.navigation.goBack();
  }
  const onSearchedLocationSelect = (place_id) => {
    props.navigation.navigate('LocationPickerMap', {placeId : place_id});
  }

  let content = (
    <Container>
      <AddressInput
        handleBackPress={handleBackPress}
        searchTerm={searchTerm}
        updateSearchTerm={(text)=>updateSearchTerm(text)}
        doSearch={doSearch}
        clearSearch={clearSearch}
      />
      <AddressLists
        fetchedPredictions={fetchedPredictions}
        onCurrentLocationSelect={onCurrentLocationSelect}
        onSearchedLocationSelect={onSearchedLocationSelect}
        onSavedLocationSelect={onSavedLocationSelect}
        address={props.address}
      />
    </Container>
  );
  return content;
}

const mapStateToProps = state => {
  return {
    address: state.address,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onSelectAddress: data => {
      dispatch(selectAddress(data));
    }
  };
};
export default React.memo(connect(
  mapStateToProps,
  mapDispatchToProps
)(LocationSelectionScreenPresenter));


