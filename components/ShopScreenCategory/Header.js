import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
  elevation:5;
  background-color : white;
  border-bottom-color : ${Colors.greyColor};
  border-bottom-width : 1.6;
  border-bottom-left-radius : 20px;
  border-bottom-right-radius : 20px;  
  padding : 10px;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;
`;

const HeaderButtons = styled.View`
  width : 100%;
  flex-direction : row;
`;

const BackButton = styled.TouchableOpacity`
  width : 40px;
`;

const MenuButton = styled.TouchableOpacity`
  width : 40px;
`;

const Text = styled.Text`
  padding : 5px 20px;
  font-size : 18px;
  font-family  : ${Font.normalFont};
  color : ${Colors.darkGreyColor};
`;

const Header = props => {
  let content = (
    <Container>
      <HeaderButtons>
        <View>
          <BackButton onPress={()=>props.navigation.goBack()}>
            <Entypo name="chevron-left" size={30} color={Colors.greenColor}/>
          </BackButton>              
        </View>
        <MenuButton>
        </MenuButton>
      </HeaderButtons>
      <Text>{props.title}</Text>
    </Container>
  );
  return content;
}

export default Header;