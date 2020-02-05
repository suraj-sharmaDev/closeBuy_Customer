import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import styled from "styled-components";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
	margin-top : 10px;
`;
const InfoBox = styled.View`
	padding : 10px 0px;
	border-bottom-width : 1px;
	border-bottom-color : ${Colors.lightGreyColor};
`;
const BoldText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	text-transform : capitalize;
`;
const Text = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 14px;
	text-transform : capitalize;
`;

const Address = ({ shopInfo, deliveryAddress }) => {
	deliveryAddress = JSON.parse(deliveryAddress);
	savedAs = deliveryAddress.savedAs;
	addressDetail = `${deliveryAddress.houseDetail}, ${deliveryAddress.landmark}`;
	let content = (
		<Container>
			<InfoBox>
				<BoldText>{shopInfo.shopName}</BoldText>
				<Text>{shopInfo.shopAddress}</Text>
			</InfoBox>
			<InfoBox>
				<BoldText>Delivered to {savedAs}</BoldText>
				<Text>{addressDetail}</Text>
			</InfoBox>
		</Container>
	);
	return content;
}

export default Address;