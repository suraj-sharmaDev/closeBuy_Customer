import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {AlertService} from '../../middleware/AlertService';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";

const Container = styled.TouchableOpacity`
	padding : 10px 0px;
	background-color : ${Color.greenColor};
	flex-direction : row;
	justify-content : center;
	align-items : center;
	position : absolute;
	bottom : 0px;
	width : 100%;
`;
const Text = styled.Text`
	color : white;
	font-size : 20px;
	font-family  : ${Font.normalFont};
	margin-right : 10px;
`;

const ProceedCard = props => {
	const confirmation = () => {
		if(props.deliveryAvail==0)
		{
			AlertService('Proceed','Cash on Delivery (COD) not Available!\n\nDo you wish to proceed with self pickup?', 
						props.onPlaceOrder);
		}
		else{
			AlertService('Proceed','Do you wish to procced with this order?', props.onPlaceOrder);			
		}
	}
	let content = (
		<Container activeOpacity={0.6} onPress={confirmation}>
			<Text>Proceed Order</Text>
			<Icon name="arrow-right-drop-circle" style={{ color : 'white', fontSize:22}}/>
		</Container>
	);
	return content;
};

export default ProceedCard;