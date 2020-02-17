import React from 'react';
import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
const Container = styled.View`
	flex-direction : row;
	align-items : center;
	padding : 0px 10px;	
	border-bottom-width : 1;
	border-bottom-color : ${Colors.greyColor};
`;

const View = styled.View`
  flex : 1;
  justify-content : center;
`;

const ShopName = styled.Text`
  font-size : 30px;
  font-family  : ${Font.normalFont};
  color : ${Colors.blackColor};
`;
const Category = styled.Text`
  margin-top : -5px;
  font-size : 16px;
  font-family  : ${Font.normalFont};  
  color : ${Colors.lightGreyColor};
`;
const RatingBox = styled.View`
  flex-direction : row;
  align-items : center;
  justify-content : center;
  padding : 2px 4px;
  background-color : ${Colors.greenColor};
  border-radius : 3px;
`;

const RatingText = styled.Text`
  color : white;
  font-size : 16px;
  font-family  : ${Font.normalFont};    
`;
const ShopInfoCard = ({name, category, rating}) => {
	let content = (
		<Container>
			<View>
				<ShopName>{name}</ShopName>
				<Category>{category}</Category>			
			</View>
			<RatingBox>
        <Icon name="star" style={{ color :'white', fontSize:12}}/>
				<RatingText>{rating}</RatingText>
			</RatingBox>
		</Container>
	);
	return content;
}

export default React.memo(ShopInfoCard);