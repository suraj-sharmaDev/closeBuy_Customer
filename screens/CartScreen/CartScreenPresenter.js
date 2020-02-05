import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';

import {AddCart, PlaceOrder} from "../../middleware/API";
import {AlertService} from '../../middleware/AlertService';

import Color from '../../constants/Colors';
import EmptyCart from '../../components/CartScreen/EmptyCart';
import CartHeader from '../../components/CartScreen/CartHeader';
import CartBody from '../../components/CartScreen/CartBody';
import ProceedCard from '../../components/CartScreen/ProceedCard';

import DeliveryTrackingScreen from "../../screens/DeliveryTrackingScreen"; //when tracking has begun cart screen should be replaced by this screen 

const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
  height : 100%;
`;
const ScrollView = styled.ScrollView`
  margin-bottom : 45px;
`;
const Text = styled.Text``;
const CartScreenPresenter = ({navigation, store, address, ...props}) => {
  let content = null;
  const [refresh, updateRefresh] = React.useState(false);
  React.useEffect(() => {
    updateRefresh(!refresh);
  }, [store]);

  const prepareForm = () => {
    formData = new FormData();
    formData.append('customerId', props.userId);
    formData.append('customerMobile', props.userMobile);
    formData.append('distPointId', store.shopId);
    //stringify JSON data for php usage
    formData.append('items', JSON.stringify(store.items));
    return formData;
  }

  const onIncrement = data => {
    props.onIncrement(data);
    AddCart(prepareForm())
      .then(result => {
        updateRefresh(!refresh);        
      })
      .catch(err => {
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
      });
  };
  const onDecrement = productId => {
    index = store.items.findIndex(obj => obj.id === productId); 
    sizeOfRedux = Object.keys(store.items).length;
    pdtQty = store.items[index].qty;
    //since redux filter is slower to process we have to
    //have this logic
    //--to be fixed in future versions      
    props.onDecrement(productId);
    if(sizeOfRedux == 1 && pdtQty == 1){
      data = new FormData();
      data.append('customerId', props.userId);
      data.append('distPointId', store.shopId);
      //stringify JSON data for php usage
      data.append('items', JSON.stringify([]));
    }else{
      data = prepareForm();
    }
    AddCart(data)
      .then(result => {
        updateRefresh(!refresh);
      })
      .catch(err => {
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
      });
  };
  const onPlaceOrder = () => {
    let data = prepareForm();
    data.append('deliveryAddress', JSON.stringify(address.savedAddresses[address.currentAddress]));
    data.append('paymentType', 'COD');
    data.append('couponCode', store.couponCode);    
    PlaceOrder(formData)
    .then((result)=>{
      props.trackDelivery(result.orderDetail);
    })
    .catch((err)=>{
      AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
    })
  }
  //We need to see if there is any items in cart or not
  //For empty cart
  if(store.shopId===""){
    content = (
      <Theme>
        <EmptyCart />
      </Theme>
    );
  }
  //When tracking is enabled
  else if(store.tracking===true){
    content = (
      <DeliveryTrackingScreen 
        cart={store} 
        userLocation={address} 
        focused={props.focused}
        onStatusUpdate={props.onStatusUpdate}
        completeDelivery={props.completeDelivery}
      />
    );
  }
  //When items are added in cart after tracking is disabled or when order is completed or delivered
  else{
    content = (
      <Theme>
        <CartHeader store={store}/>
        <ScrollView>
          <CartBody
            navigation={navigation}
            store={store}
            onIncrement={onIncrement}
            onDecrement={onDecrement}
            distance={props.distance}
            deliveryFee = {props.deliveryFee}
            discountAmount = {store.discountAmount}
            refresh = {refresh}
          />
        </ScrollView>
        <ProceedCard onPlaceOrder={onPlaceOrder}/>
      </Theme>
    );
  }
  return content;
};

export default CartScreenPresenter;