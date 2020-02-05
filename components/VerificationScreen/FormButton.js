import React from 'react';
import { Platform, Dimensions } from 'react-native';
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import {AlertService} from '../../middleware/AlertService';

const {height, width} = Dimensions.get('window');

const Container = styled.View``;
const InfoText= styled.Text`
	margin-top : 20px;
	width : ${width*0.7};
	color : ${Colors.lightGreenColor};
	font-size : 14px;
	font-family : ${Fonts.normalFont};
`;
const ButtonGroup = styled.View`
	margin-top : 10px;
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
`;
const ChangeMobileButton = styled.TouchableOpacity`
	padding : 5px 2px;
	border-width : 1px;
	border-color : ${Colors.lightGreenColor};
	align-items : center;
`;
const ChangeText = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.lightGreenColor};
`;
const ResendButton = styled.TouchableOpacity`
	padding : 5px 0px;
	border-width : 1px;
	width : 100px;
	align-items : center;
`;
const ResendText = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
`;
const SubmitButton = styled.TouchableOpacity`
	margin-top : 30px;	
	padding : 10px 0px;
	background-color : ${Colors.greenColor};
	flex-direction : row;
	justify-content : center;
	align-items : center;
`;
const ButtonText = styled.Text`
	color : white;
	font-size : 20px;
	font-family : ${Fonts.normalFont};
`;

const FormButton = props => {
	const [resendEnable, updateResendEnable] = React.useState(false);
	React.useEffect(()=>{
		timer = setTimeout(()=>{
			updateResendEnable(true)
		},50000);
		return ()=>{
			clearTimeout(timer);
		}
	},[])
	const handleResend = () => {
		if(resendEnable){
			props.handleResend();
		}
	}
	const handleChangeNumber = () => {
		AlertService('Change Number', 'Are you Sure?', props.handleChangeNumber);
	}
	let content = (
		<Container>
			<InfoText>If you don't receive OTP in 2 minutes, click on Resend OTP</InfoText>
			<ButtonGroup>
				<ResendButton 
					onPress={handleResend} 
					style={{ borderColor : resendEnable?Colors.greenColor:Colors.disabledGreenColor}}
					disabled={!resendEnable}
				>
					<ResendText style={{color : resendEnable?Colors.greenColor : Colors.greyColor}}>Resend OTP</ResendText>
				</ResendButton>
				<ChangeMobileButton onPress={handleChangeNumber}>
					<ChangeText>Change Number</ChangeText>
				</ChangeMobileButton>				
			</ButtonGroup>
			<SubmitButton onPress={props.handleSubmit}>
				<ButtonText>Submit</ButtonText>
			</SubmitButton>
		</Container>
	);
	return content;
}

export default FormButton;