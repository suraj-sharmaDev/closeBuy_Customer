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
const InfoImage = styled.Image`
	width : 150px;
	height : 120px;
`;
const InfoText = styled.Text`
	font-size : 18px;
	font-family : ${Fonts.normalFont};
`;
const EmptyCart = () => {
	let content = (
		<Container>
			<InfoBox>
				<Icon name='emoji-sad' size={150} color={Colors.greyColor} />
				<InfoText>
					No Items in your cart
				</InfoText>
			</InfoBox>
		</Container>
	);
	return content;
}

export default EmptyCart;