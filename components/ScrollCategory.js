import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, } from 'react-native';
import styled from "styled-components";

import Icon from '../assets/images/icons';
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 10px;
`; 

const CategoryItem = styled.TouchableOpacity`
  flex-direction : column;
  align-items : center;
  justify-content : center;
  width : 80px;
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

const CategoryName = styled.Text`
	font-size : 16px;
	font-family : ${Font.normalFont};
  padding : 0px 5px;
`;

function Item({ info, index, selected, onSelect }) 
{
  id = info.categoryId ? info.categoryId : info.subCategoryId;
  name = info.categoryName ? info.categoryName : info.subCategoryName;
  icon = info.categoryIcon ? info.categoryIcon : info.subCategoryIcon;
  let content = (
    <CategoryItem 
    onPress={() => onSelect(info.categoryId ? info.categoryId : info.subCategoryId, index)} activeOpacity={0.8}
    style={{ backgroundColor : selected==id ? Colors.greenColor : Colors.searchBarColor}}
    >
      {
        icon ? <Image source={Icon[icon]} /> : null 
      }
      <CategoryName numberOfLines={1} style={{color : selected == id ? Colors.searchBarColor : Colors.blackColor}}>
        {name}
      </CategoryName>
    </CategoryItem>
  );
  return content;
}

const ScrollCategory = ({selected, onSelect, data}) => (
    <Container>
      <FlatList
        data={data}
        horizontal = {true}
        showsHorizontalScrollIndicator={false}        
        renderItem={({ item, index }) => (
          <Item
            info={item}
            index={index}
            selected={selected}
            onSelect = {onSelect}
          />
        )}
        keyExtractor={item => (item.categoryId ? item.categoryId : item.subCategoryId)}
        extraData={selected}
      />
    </Container>
);

export default React.memo(ScrollCategory);