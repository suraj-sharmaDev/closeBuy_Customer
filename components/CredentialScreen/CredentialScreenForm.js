import React from 'react';
import {Dimensions} from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const {height, width} = Dimensions.get('window');
const Container = styled.View`
	height : ${height};
	width : ${width};
	padding : 10px;
`;
const IntroView = styled.View`
	padding : 10px;
	border-width : 1px;
	border-color : ${Colors.greyColor};
`;
const IntroText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 16px;
`;
const InfoText = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 12px;
	color : ${Colors.redColor};
`;
const FormView = styled.View`
	margin-top : 20px;
	align-items : center;
	justify-content : center;
`;
const Input = styled.TextInput`
	width : 100%;
	padding : 7px 10px;
	border-width : 1px;
	border-color : ${Colors.lightGreenColor};
	font-family : ${Fonts.boldFont};
	font-size : 14px;	
`;
const Button = styled.TouchableOpacity`
	width : 100%;
	padding : 10px 8px;	
	align-items : center;
	justify-content : center;	
	margin-top : 10px;
	border-radius : 7px;
	background-color : ${Colors.greenColor}
`;
const ButtonText = styled.Text`
	font-family : ${Fonts.normalFont};
	color : white;
	font-size : 14px;
	text-transform : uppercase;
`;
const CredentialScreenForm = props => {
	const [userName, updateUserName] = React.useState('');
	React.useEffect(()=>{},[]);

	const changeHandler = (text) => {
		updateUserName(text);
	}
	let content = (
		<Container>
			<FormView>
				<Input 
					placeholder = "Enter your name"
					onChangeText={e => changeHandler(e)}					
				/>
				<Button onPress={()=>props.clickHandler(userName)}>
					<ButtonText>Submit</ButtonText>
				</Button>
			</FormView>
		</Container>
	);
	return content;
}

export default CredentialScreenForm;