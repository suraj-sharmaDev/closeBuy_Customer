import React from 'react';
import styled from 'styled-components';
import Icon from '../../assets/images/icons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const CategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content : center;
  width : 100px;
  height : 60px;
  margin-vertical: 5px;
  margin-horizontal: 4px;
  border-radius : 5px;  
  background-color : ${Colors.searchBarColor};
`;

const Image = styled.Image`
  border-radius: 12px;
  height: 32px;
  width: 32px;
`;

const CategoryName = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
  color : ${Colors.darkGreyColor};
  padding : 0px 5px;
`;

const CategoryButton = props =>{
  let iconName = props.item.categoryName.toLowerCase().replace(' ', '_');
  let content = (
    <CategoryItem onPress={()=>props.navigateToCategory(props.item)}>
      <Image source={Icon[iconName]} />
      <CategoryName>{props.item.categoryName}</CategoryName>
    </CategoryItem>
  );
  return content;
}
export default CategoryButton;