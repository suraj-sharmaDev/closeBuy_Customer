import React from 'react';
import { FlatList } from "react-native";
import Entypo from "react-native-vector-icons/Entypo";
import styled from 'styled-components';
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 10px 20px;
`; 

const MenuItem = styled.TouchableOpacity`
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	padding : 2px 0px;
	margin : 4px 0px;
`;

const SubCategoryName = styled.Text`
	font-size : 18px;
	text-transform : capitalize;
	font-family  : ${Font.boldFont};
	color : ${Colors.darkGreyColor};	
`;

// function Item({subCategory, index, navigation, selectedCategory})
// {
// 	return(
// 		<MenuItem 
// 			style={{ flex : index%2==0 ? 2 : 3, backgroundColor : index%2==0 ? Colors.leftBoxColor : Colors.rightBoxColor}}
// 			activeOpacity={0.8}
// 			onPress={()=> navigation.navigate('Explore',{categoryData : selectedCategory, selectedId : subCategory.subCategoryId, index:index })}
// 		>
// 			<SubCategoryName>
// 				{subCategory.subCategoryName}
// 			</SubCategoryName>
// 		</MenuItem>
// 	);
// }

function Item({subCategory, index, navigation, selectedCategory})
{
	return(
		<MenuItem 
			activeOpacity={0.8}
			onPress={()=> navigation.navigate('Explore',{categoryData : selectedCategory, selectedId : subCategory.subCategoryId, index:index })}
		>
			<SubCategoryName>
				{subCategory.subCategoryName}
			</SubCategoryName>
			<Entypo name="chevron-thin-right" size={22} style={{color : Colors.darkGreyColor}}/>			
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