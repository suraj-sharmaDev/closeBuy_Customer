import React from 'react';
import { Platform, Dimensions } from 'react-native';
import styled from "styled-components";
import AddressView from './AddressView';
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
	padding-top : 10px;
	padding-bottom : 100px;
`;
const View = styled.View``;
const InfoBox = styled.View`
	background-color : ${Color.separateViewColor};
	padding : 20px 10px 10px 10px;
`;
const InfoText = styled.Text`
	font-size : 13px;
	font-family : ${Font.normalFont};	
	text-transform : uppercase;
`;
const ScreenBody = ({store, ...props}) => {
	let content = (
		<Container>
			<InfoBox>
				<InfoText>Saved Address</InfoText>
			</InfoBox>
			<View>
			{
				store.map((s, index)=>(<AddressView key={index} address={s} index={index} navigation={props.navigation}/>))
			}
			</View>
		</Container>
	);
	return content;
}

export default ScreenBody;