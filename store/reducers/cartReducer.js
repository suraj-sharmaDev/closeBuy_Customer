import { RETRIEVE_CART, INC_ITEM, DEC_ITEM, DISCOUNT, TRACK_START, STATUS_UPDATE, TRACK_END, UPDATE_TRACK_COORDINATE } from '../actions/types';

const initialState = {
  shopId : "",
  items : [],
  recentOrders : [],
  couponCode : '',
  discountAmount : 0,
  discountPercentage : 0,
  discountMinOrderAmount : 0,
  discountMaxAmount : 0,
  totalAmount : 0,
  tracking : false,
  orderId : 0,
  shopCoordinate : null,
  shopDeliveryAvailability : null,
  paymentType : null,
  deliveryCoordinate : null,
  deliveryStatus : null,
  deliveryBoyName : '',
  deliveryBoyMobile : 0
};

const onRetrieveCart = (state, data) => {
  let newState = {
    shopId : Object.keys(data.cart).length > 0 ? data.cart.dist_point_id : "",
    items : Object.keys(data.cart).length > 0 ? JSON.parse(data.cart.items_added) : [],
    recentOrders : Object.keys(data.recentOrder).length > 0 ? data.recentOrder : state.recentOrders,    
    couponCode : '',
    discountAmount : 0,
    discountPercentage : 0,
    discountMinOrderAmount : 0,
    discountMaxAmount : 0,
    totalAmount : 0,    
    tracking : false,
    orderId : 0,  
    shopCoordinate : null,
    shopDeliveryAvailability : Object.keys(data.cart).length > 0 ? data.cart.delivery_avail : null,
    deliveryCoordinate : null,
    deliveryStatus : null,
    deliveryBoyName : '',
    deliveryBoyMobile : 0
  }
  return newState;
}

const onDiscount = (state, data) => {
  let newState = {...state};
  newState.couponCode = data.couponCode;
  newState.discountAmount = data.discountAmount;
  newState.discountPercentage = data.discountPercentage;
  newState.discountMinOrderAmount = data.minOrderAmount;
  newState.discountMaxAmount = data.maxDiscountAmount;
  return newState;
}

const onIncrement =(state, data)=> {
  let newState = {...state};
  if(newState.shopId === "" && newState.items.length ===0 )
  {
    //when new data is coming in
    newState.shopId = data.shopId;
    newState.shopDeliveryAvailability = data.deliveryAvail;
    newObj = { id : data.productId, name : data.name, price : data.price, qty : 1 };
    newState.items.push(newObj);    
  }
  else if(newState.shopId!==data.shopId){
    //when customer add items from another shop
    newState.shopId = data.shopId;
    newState.shopDeliveryAvailability = data.deliveryAvail;
    newState.couponCode = '';
    newState.totalAmount = 0;
    newState.discountAmount = 0;
    newState.discountPercentage = 0;
    newState.discountMinOrderAmount = 0;
    newState.discountMaxAmount = 0;
    newState.items = [];
    newObj = { id : data.productId, name : data.name, price : data.price, qty : 1 };
    newState.items.push(newObj);        
  }
  else
  {
    //When data has already been added
    index = newState.items.findIndex(obj => obj.id === data.productId);
    if(index>-1)
    {
      newState.items[index].qty++;
      //also have to affect discount amount too
      if(newState.couponCode!==''){
        let amount = 0;
        newState.items.map(s=>{
          amount+=s.price*s.qty;
        })
        if(amount>newState.discountMinOrderAmount){
          discountAmount = amount*0.01*newState.discountPercentage;
          if(discountAmount>newState.discountMaxAmount) newState.discountAmount = newState.discountMaxAmount;
          else newState.discountAmount = Math.round(discountAmount);
        }
      }
    }
    else
    {
      newObj = { id : data.productId, name : data.name, price : data.price, qty : 1 };
      newState.items.push(newObj);
    }    
  }
  return newState;
};
const onDecrement =(state, productId)=> {
  let newState = {...state};
  index = newState.items.findIndex(obj => obj.id === productId); 
  if(newState.items[index].qty>1)
  {
    newState.items[index].qty--;
    //also have to affect discount amount too
    if(newState.couponCode!==''){
      let amount = 0;
      newState.items.map(s=>{
        amount+=s.price*s.qty;
      })
      if(amount>newState.discountMinOrderAmount){
        discountAmount = amount*0.01*newState.discountPercentage;
        if(discountAmount>newState.discountMaxAmount) newState.discountAmount = newState.discountMaxAmount;
        else newState.discountAmount = Math.round(discountAmount);
      }else{
        newState.discountAmount = 0;
      }
    }    
  }else{
    if(Object.keys(newState.items).length == 1)
    {
      newState.shopId = "";
      newState.items = [];
      newState.couponCode = '';
      newState.totalAmount = 0;
      newState.discountAmount = 0;
      newState.discountPercentage = 0;
      newState.discountMinOrderAmount = 0;
      newState.discountMaxAmount = 0;      
    }else {
      newState.items = newState.items.filter((d)=>(d.id!=productId));
    }
  }
  return newState;
};
const onTrackStart = (state, data) => {
  let newState = {...state}; 
  newState.shopId = data.dist_point_id;
  newState.items = JSON.parse(data.items_added);
  newState.couponCode = '';    
  newState.discountAmount = 0;
  newState.totalAmount = data.total_amount;    
  newState.tracking = true;
  newState.orderId = data.id;    
  newState.deliveryCoordinate = JSON.parse(data.deliveryBoy_coordinates);
  newState.shopCoordinate = JSON.parse(data.distribution_point_coordinates);
  newState.paymentType = data.payment_type;
  newState.deliveryStatus = data.delivery_status;        
  newState.deliveryBoyName = data.deliveryBoy_name;
  newState.deliveryBoyMobile = data.deliveryBoy_mobile;
  return newState;
}
const onOrderStatusUpdate = (state, status) => {
  let newState = {...state};
  newState.deliveryStatus = status;
  return newState;
}
const onTrackEnd = () => {
  const initialState = {
    shopId : "",
    items : [],
    recentOrders : [],
    couponCode : '',
    discountAmount : 0,
    discountPercentage : 0,
    discountMinOrderAmount : 0,
    discountMaxAmount : 0,
    totalAmount : 0,
    tracking : false,
    orderId : 0,
    shopCoordinate : null,
    shopDeliveryAvailability : null,
    paymentType : null,
    deliveryCoordinate : null,
    deliveryStatus : null,
    deliveryBoyName : '',
    deliveryBoyMobile : 0
  };  
  return initialState;
}
const onUpdateTrackCoordinate = (state, data) => {
  const newState = {...state};
  newState.deliveryCoordinate = data;
  newState.deliveryStatus = data.deliveryStatus ? data.deliveryStatus : newState.deliveryStatus;
  return newState;
}
const cartReducer = (state = initialState, action) => {
  switch(action.type) {
    case RETRIEVE_CART:
      return onRetrieveCart(state, action.payload);
    case INC_ITEM:
      return onIncrement(state, action.payload);
    case DEC_ITEM:
      return onDecrement(state, action.payload);
    case DISCOUNT:
      return onDiscount(state, action.payload);    
    case TRACK_START:
      return onTrackStart(state, action.payload);
    case STATUS_UPDATE:
      return onOrderStatusUpdate(state, action.payload);
    case TRACK_END:
      return onTrackEnd();    
    case UPDATE_TRACK_COORDINATE:
      return onUpdateTrackCoordinate(state, action.payload);
    default:
      return state;
  }
}

export default cartReducer;