import React from 'react';
import styled from 'styled-components';
import Icon from '../../assets/images/icons';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

const SubCategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content : center;
  min-width : 80px;
  width : auto;
  height : 60px;
  margin-vertical: 5px;
  margin-horizontal: 4px;
  border-radius : 5px;  
`;

const Image = styled.Image`
  border-radius: 12px;
  height: 32px;
  width: 32px;
`;

const SubCategoryName = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
  padding : 0px 5px;
  text-transform : capitalize;
`;

const SubCategoryButton = props =>{
  let iconName = props.item.toLowerCase().replace(' ', '_');
  if(props.selected===props.item){
    backgroundColor = Colors.greenColor;
    color = 'white';    
  }else{
    backgroundColor = Colors.searchBarColor;
    color = Colors.darkGreyColor;
  }

  let content = (
    <SubCategoryItem onPress={()=>{props.updateSelected(props.item)}} style={{backgroundColor}}>
      <Image source={Icon[iconName]} />
      <SubCategoryName numberOfLines={1} style={{color}}>{props.item}</SubCategoryName>
    </SubCategoryItem>
  );
  return content;
}
export default SubCategoryButton;