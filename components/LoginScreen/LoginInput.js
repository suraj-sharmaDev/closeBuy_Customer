import React from 'react';
import styled from 'styled-components';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";

const InputView = styled.View`
	margin-top: 10px;
	height: 50px;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	background-color: ${Color.searchBarColor};
	border-radius: 12px;
`;
const Code = styled.View`
	width: 50px;
	padding: 0px 2px 0px 10px;
`;
const Input = styled.TextInput`
	width: 90%;
`;
const Text = styled.Text`
	font-family  : ${Font.normalFont};
`;
const LoginInput = ({inputMobile}) =>{
	let content = (
		<InputView>
			<Code>
				<Text style={{color: Color.darkGreyColor, fontSize: 20}}>+91</Text>
			</Code>
			<Input
				placeholder="Enter Mobile Number"
				keyboardType="numeric"
				style={{fontSize: 16}}
				onChangeText={e => inputMobile(e)}
			/>
		</InputView>
	);
	return content;
}

export default LoginInput;