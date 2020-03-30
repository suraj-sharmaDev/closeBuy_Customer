import React from 'react';
import styled from 'styled-components';
import Icon from '../../assets/images/icons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const CategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content : center;
  width : 110px;
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
	font-size : 14px;
	font-family : ${Fonts.normalFont};
  color : ${Colors.darkGreyColor};
  padding : 0px 5px;
`;

const CategoryButton = props =>{
  let iconName = props.item.categoryName.replace(/[^A-Z0-9]+/ig, "_").toLowerCase();
  let content = (
    <CategoryItem onPress={()=>props.navigateToCategory(props.item)}>
      <Image source={Icon[iconName]} />
      <CategoryName numberOfLines={1}>{props.item.categoryName}</CategoryName>
    </CategoryItem>
  );
  return content;
}
export default CategoryButton;