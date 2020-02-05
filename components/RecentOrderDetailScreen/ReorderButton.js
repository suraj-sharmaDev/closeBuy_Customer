import React from 'react';
import styled from 'styled-components';

import {width} from '../../constants/Layout';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
	margin-top : 30px;
	align-items : center;
	justify-content : center;
`;
const Button = styled.TouchableOpacity`
	width : ${width*0.6};
	padding : 8px 10px;
	background-color : ${Colors.lightGreenColor};	
	align-items : center;
	justify-content : center;
	border-radius : 7px;
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 15px;
	color : white;
`;

const ReorderButton = (props) => {
	let content = (
		<Container>
			<Button onPress={props.clickHandler} activeOpacity={0.5}>
				<ButtonText>Reorder</ButtonText>
			</Button>
		</Container>
	);
	return content;
}

export default ReorderButton;