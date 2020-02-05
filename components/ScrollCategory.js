import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, } from 'react-native';
import styled from "styled-components";
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 20px 10px 10px 10px;
`; 

const CategoryItem = styled.TouchableOpacity`
  flex : 1;
  flex-direction : column;
  align-items : center;
  justify-content : center;
  width : 100px;
  margin-vertical: 5px;
  margin-horizontal: 4px;
  border-radius : 5px;  
`;

const Image = styled.Image`
  border-radius: 12px;
  height: 60px;
  width: 60px;
`;

const CategoryName = styled.Text`
	font-size : 16px;
	font-family : ${Font.normalFont};
`;

function Item({ info, index, selected, onSelect }) 
{
  id = info.categoryId ? info.categoryId : info.subCategoryId;
  name = info.categoryName ? info.categoryName : info.subCategoryName;
  let content = (
    <CategoryItem 
    onPress={() => onSelect(info.categoryId ? info.categoryId : info.subCategoryId, index)} activeOpacity={0.8}
    style={{ backgroundColor : selected==id ? Colors.greenColor : Colors.searchBarColor, height : info.src ? 100 : 50}}
    >
      {info.src ? <Image source = {info.src}/> : null }
      <CategoryName style={{color : selected == id ? Colors.searchBarColor : Colors.blackColor}}>
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