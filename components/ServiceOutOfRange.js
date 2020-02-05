import React from 'react';
import styled from 'styled-components';
import {height, width} from '../constants/Layout';
import Fonts from '../constants/Fonts';

const Container = styled.View`
	height : ${height};
	width : ${width};
	align-items : center;
	justify-content : center;
`;
const Image = styled.Image``;
const ErrorText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
`;
const InfoText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 14px;
`;

const ServiceOutOfRange = () => {
	let content = (
		<Container>
			<Image source={require('../assets/images/service_out_of_range.png')} />
			<ErrorText>Service out of range</ErrorText>
			<InfoText>We are soon reaching you!</InfoText>
		</Container>
	);
	return content;
}

export default ServiceOutOfRange;