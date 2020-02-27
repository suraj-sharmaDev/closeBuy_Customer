import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import CategoryButton from './CategoryButton';

const Container = styled.View`
	padding : 10px;
`;
const Label = styled.Text`
	font-size : 16px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.darkGreyColor};	
	margin-bottom : 10px;
`;
const ShopCategoryList = ({categoryList, ...props}) => {
	let content = (
		<Container>
			<Label>Categories</Label>
			<FlatList
				numColumns={4}
				data={categoryList}
				renderItem={({item}) => (
					<CategoryButton item={item} navigation={props.navigation} />
				)}
				keyExtractor={(item, index) => 'key'+index}
				extraData={categoryList}
			/>
		</Container>
	);
	return content;
}

export default ShopCategoryList;