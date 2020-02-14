import React from 'react';
import {Dimensions} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const {height, width} = Dimensions.get('window');
const Container = styled.View`
	height : ${height};
	width : ${width};
	align-items : center;
	justify-content : center;
`;
const InfoBox = styled.View`
	flex-direction : column;
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
				<Image source={require('../../assets/images/empty-cart.png')} />
				<InfoText>
					No Items in your cart
				</InfoText>
			</InfoBox>
		</Container>
	);
	return content;
}

export default EmptyCart;