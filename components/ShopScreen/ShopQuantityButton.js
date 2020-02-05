import React, { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {incItem, decItem} from '../../store/actions/cart';
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";

import CustomizeList from './CustomizeList';
import {AlertService} from '../../middleware/AlertService'; 
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const View = styled.View``;

const ButtonContainer = styled.View`
	flex-direction : row;
	padding : 0px 5px;
	height : 25px;
	width : 80px;
	border-width : 1;
	border-color : ${Colors.greenColor};
	border-radius : 20px;
`;
const DefaultButtonContainer = styled.TouchableOpacity`
	flex-direction : row;
	padding : 0px 5px;
	height : 25px;
	width : 60px;
	border-width : 1;
	border-color : ${Colors.greenColor};
	border-radius : 20px;
`;
const DefaultButtonView = styled.View`
	flex : 1;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Button = styled.TouchableOpacity`
	flex : 1;
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const Quantity = styled.View`
	flex : 2;
	flex-direction : row;
	align-items : center;
	justify-content : center;	
	background-color : ${Colors.greenColor};
`;

const QuantityText = styled.Text`
	font-family : ${Font.normalFont};
	color : white;
`;
const Label = styled.Text`
	font-family : ${Font.normalFont};
	color : ${Colors.greenColor};
`;

const ShopQuantityButton = ({item, ...props }) => {
	const [selected, setSelected] = useState(null);
	const [active, updateActive] = useState(false);

	useEffect(()=>{
		if(Object.keys(props.cart).length > 0 && !props.cart.tracking){
			setSelected(props.cart.items.find((s)=>(s.id == item.id)))
		} 
	})

	const onCustomiseHandler = (data) => {
		if(data.name==='none'){
			onIncrement(item.shopId, item.id, item.name, item.price);
		}else{
			name = `${item.name} ${data.name}`;
			price = parseInt(item.price) + parseInt(data.amount);
			onIncrement(item.shopId, item.id, name, price);			
		}
	}

	const onIncrement = (shopId, productId, name, price) => {
		if(shopId===props.cart.shopId || props.cart.shopId===''){
			if(ButtonDisabled){
				AlertService('Tracking','Your already have an order in progress!', ()=>{});
			}else{
				props.incrementItem({
					shopId: shopId,
					productId: productId,
					name: name,
					price: price,
				});
			}
		}else{
			AlertService('Cart Not Empty','Your cart contains items from other shop. \n Replace it?!', ()=>{
				props.incrementItem({
					shopId: shopId,
					productId: productId,
					name: name,
					price: price,
				});
			});			
		}
	};

	const onDecrement = productId => {
		if(ButtonDisabled){
			AlertService('Tracking','Your already have an order in progress!', ()=>{});
		}else{
			props.decrementItem(productId);
		}
	};
	let ButtonDisabled = props.cart.tracking ? true : false;
	let content = null;
	if(selected!=null)
	{
		content = (
			<ButtonContainer>
				<Button onPress={()=>{onDecrement(item.id)}}>
					<Entypo name="minus" color={Colors.greenColor} />
				</Button>
				<Quantity>
					<QuantityText>{selected.qty}</QuantityText>
				</Quantity>
				<Button onPress={()=>{onIncrement(item.shopId, item.id, item.name, item.price)}}>
					<Entypo name="plus" color={Colors.greenColor} />
				</Button>
			</ButtonContainer>
		);
	}
	else
	{
		content = (
			<React.Fragment>
				<DefaultButtonContainer 
					onPress={()=>{item.extras!==null ? updateActive(true) : onIncrement(item.shopId, item.id, item.name, item.price)}}
				>
					<View style={{flex:1, flexDirection :'row', alignItems : 'center', jusitfyContent : 'center'}}>
						<Label>Add</Label>
						<DefaultButtonView>
							<Entypo name="plus" color={Colors.greenColor} />
						</DefaultButtonView>
					</View>
				</DefaultButtonContainer>
				{
					item.extras!==null
					?
					<CustomizeList 
						extras={JSON.parse(item.extras)} 
						active={active} 
						updateActive={()=>updateActive(!active)}
						onCustomiseHandler={onCustomiseHandler}
					/>
					:
					null
				}
			</React.Fragment>
		);
	}
	return content;
}

const mapStateToProps = state => {
  return {
    cart: state.cart,
  };
};
const mapDispatchToProps = dispatch => {
  return {
    incrementItem: data => {
      dispatch(incItem(data));
    },
    decrementItem: productId => {
      dispatch(decItem(productId));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ShopQuantityButton);

// export default ShopQuantityButton;