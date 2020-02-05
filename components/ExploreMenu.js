import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Font from "../constants/Fonts";

import ProductItem from './ExploreScreen/ProductItem';

const Container = styled.SafeAreaView`
	flex: 1;
	padding: 20px 10px 20px 10px;
`;

const MenuItem = styled.TouchableOpacity`
	align-items: center;
	justify-content: center;
	height: 100px;
	border-radius: 5px;
	background-color: blue;
	margin-vertical: 10px;
	margin-horizontal: 10px;
`;

const SubCategoryName = styled.Text`
	font-size: 16px;
	font-family  : ${Font.normalFont};
`;

const BigWarningText = styled.Text`
	font-size: 30px;
	font-family  : ${Font.normalFont};
	color: ${Colors.lightGreyColor};
`;
const View = styled.View``;

const ExploreMenu = ({navigation, products, selectedId}) => {
	let content = null;
	if (Object.keys(products).length===0) {
		content = (
			<Container>
				<View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
					<BigWarningText>No Items Found!</BigWarningText>
				</View>
			</Container>
		);
	} else {
		content = (
			<Container>
				<FlatList
					numColumns={2}
					data={products}
					renderItem={({item, index}) => (
						<ProductItem data={item} navigation={navigation} />
					)}
					keyExtractor={item => item.product_id}
					extraData={selectedId}
				/>
			</Container>
		);
	}
	return content;
};

export default React.memo(ExploreMenu);
