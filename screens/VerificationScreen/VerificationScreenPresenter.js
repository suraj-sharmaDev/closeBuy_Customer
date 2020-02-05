import React from "react";
import { Platform, Dimensions, BackHandler } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";

import {Verify, GenerateOtp} from "../../middleware/API";
import {AlertService} from '../../middleware/AlertService';

import InputForm from '../../components/VerificationScreen/InputForm';

const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;

const VerificationScreenPresenter = ({user, verifiedHandler, changeNumber}) => {

  React.useEffect(()=>{
  },[])

  const handleVerify = (otpCode) => {
    //First check if otpCode is valid or not
    let formData = new FormData();
    formData.append('customerId', user.userId);
    formData.append('otp', otpCode);
    Verify(formData)
    .then((result)=>{
      if(result.error){
        AlertService('OTP Error','Wrong OTP entered, Do you want another OTP?', handleResendOtp);
      }else{
        verifiedHandler();
      }
    })
    .catch((err)=>AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{}));
  }
  const handleResendOtp = () => {
    GenerateOtp(user.userId)
    .then((result)=>{
      AlertService('Notice','You will receive new OTP shortly!', ()=>{})
    })
    .catch((err)=>AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{}))
  }
  const handleChangeNumber = () => {
    changeNumber();
  }
  let content = (
    <Theme>
      <InputForm 
        handleVerify={handleVerify} 
        handleResendOtp={handleResendOtp} 
        handleChangeNumber={handleChangeNumber}
      />
    </Theme>
  );
  return content;
};

export default React.memo(VerificationScreenPresenter);
