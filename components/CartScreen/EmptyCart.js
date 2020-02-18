import React from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const {height, width} = Dimensions.get('window');
const Container = styled.View`
	height : 100%;
	width : ${width};
	align-items : center;
	justify-content : flex-end;	
`;
const InfoBox = styled.View`
	height : 50%;
	align-items : center;
	justify-content : center;
`;
const Image = styled.Image``;
const InfoText = styled.Text`
	margin-top : 30px;
	font-size : 20px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.lightGreyColor};
`;
const EmptyCart = () => {
	let content = (
		<Container>
			<InfoBox>
				<InfoText>
					No Items in your cart
				</InfoText>
			</InfoBox>
			<Image 
				source={require('../../assets/images/empty-cart.png')} 
			/>			
		</Container>
	);
	return content;
}

export default EmptyCart;