import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from "styled-components";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Product = styled.TouchableOpacity`
  flex-direction : row;
  height : 110px;
  margin-vertical: 5px;
  margin-horizontal: 5px;  
`;

const InfoBox = styled.View`
  width : 60%;
  padding : 0px 20px
`;

const TopBox = styled.View`
  width : 100%;
  flex-direction : column;
  border-bottom-width : 0.5px;
  border-bottom-color : ${Color.lightGreyColor};
  padding-bottom : 10px;  
`;

const BottomBox = styled.View`
  padding-top : 5px;
  flex-direction : row;
`;

const RatingContainer = styled.View`
  flex : 1;
`;

const RatingBox = styled.View`
  flex-direction : row;
  justify-content : center;
  align-items : center;
  width : 30px;
  padding : 3px 5px;
  background-color : ${Color.greenColor};
  border-radius : 3px;
`;

const RatingText = styled.Text`
  font-size : 12px;
  font-family  : ${Font.normalFont};  
  color : white;
`;

const PriceText = styled.Text`
  font-size : 14px;
  font-family  : ${Font.normalFont};  
  color : ${Color.lightGreyColor};  
`;
const ImageView = styled.View`
  border-radius: 12px;
  background-color : ${Color.preLoadingColor};  
  height: 90px;
  width: 120px;
`;
const Image = styled.Image`
  border-radius: 12px;
  height: 90px;
  width: 120px;
`;

const Name = styled.Text`
  font-size : 19px;
  font-family  : ${Font.normalFont};
  color : ${Color.darkGreyColor};
`;

const Category = styled.Text`
  font-size : 14px;
  font-family  : ${Font.normalFont};  
  color : ${Color.lightGreyColor};
`;

const ShopDetailCard = ({ info, navigation }) => {
  distance = info.distance * 1.06;
  return (
    <Product activeOpacity={0.8} onPress={()=>navigation.navigate('Shop', {shopId : info.dist_point_id})}>
      <ImageView>
        <Image source ={{ uri : info.image }} style={{opacity : info.online_status==='1' ? 1 : 0.4}}/>
      </ImageView>
      <InfoBox style={{opacity : info.online_status==='1' ? 1 : 0.6}}>
        <TopBox>
          <Name ellipsizeMode='tail' numberOfLines={1}>{info.dist_point_name}</Name>
          <Category>{info.dist_category}</Category>                
        </TopBox>
        <BottomBox>
          <RatingContainer>
            <RatingBox>
              <Icon name="star" style={{ color :'white', fontSize:12}}/>
              <RatingText>{info.rating}</RatingText>
            </RatingBox>
          </RatingContainer>
          <PriceText>{distance.toFixed(1)} km</PriceText>                    
        </BottomBox>
      </InfoBox>
    </Product>
  );
}

export default ShopDetailCard;