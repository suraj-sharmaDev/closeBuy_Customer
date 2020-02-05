import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";

const View = styled.View``;

const Button = styled.TouchableOpacity`
	flex-direction: row;
	align-items: center;
	padding: 5px;
	border-radius: 10px;
`;
const Text = styled.Text`
	font-family  : ${Font.normalFont};
`;

const LoginButton = (props) => {
	let content = (
		<View style={{marginTop: 'auto'}}>
			<Button 
				onPress={props.loginHandler} 
				disabled={props.disabled}
				style={{ backgroundColor : props.disabled ? Color.disabledGreenColor : Color.greenColor}}
			>
				<View
					style={{
						flex: 1.25,
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}>
					<Text style={{color: 'white', fontSize: 20}}>Continue</Text>
				</View>
				<View
					style={{
						flex: 0.75,
						flexDirection: 'row',
						justifyContent: 'flex-end',
					}}>
					<Icon name="arrow-right-drop-circle" size={25} style={{color: 'white'}} />
				</View>
			</Button>
		</View>
	);
	return content;
}

export default LoginButton; 