import React from 'react';
import { FlatList } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import styled from 'styled-components';

import Icon from '../assets/images/icons';
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

const Container = styled.SafeAreaView`
  flex : 1;
  elevation : 26;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;  
  background-color : white;
  border-top-width : 1;
  border-top-color : ${Colors.boxShadowColor};
  border-top-left-radius : 20px;
  border-top-right-radius : 20px;  
  padding : 10px 20px;
`; 

const View = styled.View`
	flex-direction : row;
	align-items : center;
	justify-content : center;
`;
const MenuItem = styled.TouchableOpacity`
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	padding : 2px 0px;
	margin : 4px 0px;
`;
const Image = styled.Image`
  height: 20px;
  width: 20px;
  margin-right : 20px;
`;
const SubCategoryName = styled.Text`
	font-size : 18px;
	text-transform : capitalize;
	font-family  : ${Font.normalFont};
	color : ${Colors.darkGreyColor};	
`;

function Item({subCategory, index, navigation, selectedCategory})
{
	return(
		<MenuItem 
			activeOpacity={0.8}
			onPress={()=> navigation.navigate('Explore',{categoryData : selectedCategory, selectedId : subCategory.subCategoryId, index:index })}
		>
			<View>
				<Image source={Icon[subCategory.subCategoryIcon]} />
				<SubCategoryName>
					{subCategory.subCategoryName}
				</SubCategoryName>
			</View>
			<Entypo name="chevron-thin-right" size={22} style={{color : Colors.greyColor}}/>			
		</MenuItem>
	);
}
const SearchMenu = ({selectedCategory, selectedId, navigation}) => {
	const Title = selectedCategory.categoryName;
	const data = selectedCategory.subCategory;
	let content = (
	  <Container>
	      <FlatList
	      	numColumns={1}
	        data={data}
	        renderItem={({item, index}) => (
	          <Item
	            subCategory={item}
	            index={index} 
	            navigation = {navigation}
	            selectedCategory = {selectedCategory}
	          />
	        )}
	        keyExtractor={item => item.subCategoryId}
	        extraData={selectedId}
	      />	  
	  </Container>
	);
	return content;
}

export default React.memo(SearchMenu);