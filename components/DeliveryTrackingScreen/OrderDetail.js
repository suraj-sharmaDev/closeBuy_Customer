import React from 'react';
import {Linking} from 'react-native';
import styled from 'styled-components';
import Icon  from "react-native-vector-icons/MaterialCommunityIcons";
import Fonts from '../../constants/Fonts';
import Colors from '../../constants/Colors';
import OrderDetailModal from './OrderDetailModal';

const Container = styled.ScrollView`
	padding : 0px 10px;
`;
const Row = styled.View`
	border-top-color : ${Colors.semiDarkGreyColor};	
	flex-direction : row;	
	align-items : center;
`;
const View = styled.View`
	flex-direction : row;
`;
const DeliveryImage = styled.View`
	border-radius : 40px;
	border-width : 1px;
	border-color : ${Colors.greyColor};
	margin-right : 10px;
`;
const Text = styled.Text`
	font-family : ${Fonts.lightFont};
	text-align : center;
	text-transform : capitalize;
`;
const Button = styled.TouchableOpacity`
	justify-content : center;
	align-items : center;
	padding : 10px;
	width : 80%;
	border-radius : 10px;
	background-color : ${Colors.greenColor};
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	text-transform : capitalize;
`;
const CallButton = styled.TouchableOpacity``;
const OrderDetail = props =>{
	const [active, updateActive] = React.useState(false);

	const callDeliveryBoy = (mobile) => {
		Linking.openURL(`tel:${mobile}`);
	}
	let orderPlaced =false;
	let deliveryAssigned = false;
	let orderArriving = false;
	if(props.order.deliveryStatus==='pending'){
		orderPlaced = true;
	}else if(props.order.deliveryStatus==='accepted'){
		orderPlaced = true;
		deliveryAssigned = true;
	}else if(props.order.deliveryStatus==='picked'){
		orderPlaced = true;
		deliveryAssigned = true;		
		orderArriving = true;
	}
	let content = (
		<Container>
			<Row style={{ justifyContent:'space-between', borderTopWidth : 0.5, paddingTop : 10, paddingBottom : 10}}>
				{
					orderPlaced
					?
					<React.Fragment>
						<View style={{alignItems:'center'}}>
							<DeliveryImage>
								<Icon name="account" size={50} color={Colors.greyColor}/>
							</DeliveryImage>
							<Text style={{color : Colors.semiDarkGreyColor, fontSize : 15}}>
								{props.order.deliveryBoyName}
							</Text>
						</View>
						<CallButton activeOpacity={0.8} style={{padding : 12}} onPress={()=>callDeliveryBoy(props.order.deliveryBoyMobile)}>
							<Icon name="phone" size={24} color={Colors.greenColor} />
						</CallButton>
					</React.Fragment>										
					:					
					<React.Fragment>
						<DeliveryImage>
							<Icon name="account" size={50} color={Colors.greyColor}/>
						</DeliveryImage>
						<Text style={{color : Colors.semiDarkGreyColor, fontSize : 15}}>
							Waiting for dealer to accept your order
						</Text>
					</React.Fragment>										
				}
			</Row>
			<Row style={{justifyContent:'space-between', borderTopWidth : 0.5, paddingTop : 10}}>
				<View>
					<Icon name="basket" size={20} color={Colors.greenColor}/>
					<Text style={{fontSize : 18, marginLeft:10}}>Your Order Placed</Text>
				</View>
				<Icon 
					name={orderPlaced ? "check-circle" : "check-circle-outline"} 
					size={20} 
					color={orderPlaced ? Colors.greenColor : Colors.greyColor}
				/>
			</Row>
			<Row style={{justifyContent:'space-between', paddingTop : 10}}>
				<View>
					<Icon name="account-clock" size={20} color={Colors.greenColor}/>
					<Text style={{fontSize : 18, marginLeft:10}}>Delivery Boy Assigned</Text>
				</View>
				<Icon 
					name={deliveryAssigned?"check-circle":"check-circle-outline"} 
					size={20} 
					color={deliveryAssigned ? Colors.greenColor : Colors.greyColor}
				/>
			</Row>
			<Row style={{justifyContent:'space-between', paddingTop : 10}}>
				<View>
					<Icon name="truck-delivery" size={20} color={Colors.greenColor}/>
					<Text style={{fontSize : 18, marginLeft:10}}>Your order is arriving</Text>
				</View>
				<Icon 
					name={orderArriving?"check-circle":"check-circle-outline"} 
					size={20} 
					color={orderArriving ? Colors.greenColor : Colors.greyColor}
				/>
			</Row>
			<Row style={{justifyContent:'center', paddingTop : 10, height : 80}}>
				<Button onPress={()=>updateActive(true)}>
					<ButtonText style={{color : 'white'}}>View Order Details</ButtonText>
				</Button>
			</Row>
			<OrderDetailModal active={active} order={props.order} updateActive={()=>updateActive(!active)} />
		</Container>
	);
	return content;
}

export default OrderDetail;