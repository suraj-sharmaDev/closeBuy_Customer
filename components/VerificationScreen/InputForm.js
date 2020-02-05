import React from 'react';
import styled from 'styled-components';
import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import {AlertService} from '../../middleware/AlertService';
import InputFields from './InputFields';
import FormButton from './FormButton';

const Container = styled.SafeAreaView`
	padding : 20px 10px;
`;
const HeaderText = styled.Text`
	text-transform : uppercase;
	text-align : center;
	font-size : 20px;
	font-family : ${Fonts.boldFont};
	color : ${Colors.darkGreyColor};
	border-bottom-width : 1px;
	border-bottom-color : ${Colors.greyColor};
`;

const InputForm = ({ handleVerify, handleResendOtp, handleChangeNumber }) => {
	refs = [];
	otp = [];
	React.useEffect(()=>{},[]);
	const handleSubmit = () => {
		otpCode = otp.join('');
		if(otpCode.length === 4) {
			handleVerify(otpCode);
		}else{
			AlertService('Incomplete!','Please fill all 4 fields.', ()=>{});
		}
	}
	let content = (
		<Container>
			<HeaderText>OTP Verification</HeaderText>
			<InputFields handleSubmit={handleSubmit}/>
			<FormButton 
				handleResend={handleResendOtp} 
				handleSubmit={handleSubmit} 
				handleChangeNumber={handleChangeNumber}
			/>
		</Container>
	);

	return content;
}

export default React.memo(InputForm);