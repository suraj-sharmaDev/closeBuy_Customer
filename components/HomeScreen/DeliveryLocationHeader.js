import React from "react";
import { Platform } from 'react-native';
import { View, Text, Button } from 'native-base';
import styled from "styled-components";
import Icon from "react-native-vector-icons/MaterialIcons";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";
const Container = styled.View`
  elevation:12;
  background-color : white;
  border-bottom-color : ${Color.greyColor};
  border-bottom-width : 1.6;
  border-bottom-left-radius : 12px;
  border-bottom-right-radius : 12px;  
  padding : 5px;
  padding-bottom : 10px;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
`;
const Location = styled.TouchableOpacity`
  flex-direction : row;
  padding-bottom : 5px;
`;
const Straightline = styled.View`
  width : 100%;
  border-bottom-color : ${Color.lightGreenColor};
  border-bottom-width : 1;
`;
const InfoBox = styled.View`
  flex:1;
  flex-direction : column;
  padding-left : 5px;
`;

const Title = styled.Text`
  font-size : 12px;
  color : ${Color.lightGreyColor};
  font-family  : ${Font.normalFont};
`;

const Address = styled.Text`
  font-size : 13px;
  color : ${Color.blackColor};
  font-family  : ${Font.normalFont};
  margin-top : 0px;
  text-transform : uppercase;
`;
const DeliveryLocationHeader = ({ navigation, currentAddress }) => {
  let addressInfo= currentAddress.savedAs;
  React.useEffect(()=>{
  },[]) 
  let content = (
    <Container>
      <Location onPress={() => navigation.navigate('LocationSelector')}>
        <Icon
          name="location-on"
          size={26}
          color={Color.darkGreenColor}
          style={{paddingTop: 6}}
        />
        <InfoBox>
          <Title>Delivery Location</Title>
          <Address numberOfLines={1}>
            {addressInfo}
          </Address>
        </InfoBox>
        {
          // <Icon
          //   name="new-releases"
          //   size={25}
          //   color={Color.blackColor}
          //   style={{paddingTop: 10}}
          // />
        }
      </Location>
      <View style={{paddingLeft:25, paddingRight:25}}>
        <Straightline />
      </View>
    </Container>
  );
  return content;
}

export default DeliveryLocationHeader;
