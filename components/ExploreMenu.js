import React, {useEffect} from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import Colors from '../constants/Colors';
import Font from "../constants/Fonts";

import ProductItem from './ExploreScreen/ProductItem';

const Container = styled.View`
  min-height : 100%;
  height : auto;
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
	const renderListFooter = () => {
		return <View style={{paddingBottom: 100}} />
	}
	if (Object.keys(products).length===0) {
		content = (
			<Container>
				<View style={{alignItems: 'center', justifyContent: 'center'}}>
					<BigWarningText>No Items Found!</BigWarningText>
				</View>
			</Container>
		);
	} else {
		content = (
			<Container>
				<FlatList
					numColumns={2}
					showsVerticalScrollIndicator={false}
					data={products}
					contentContainerStyle={{ paddingBottom: 140}}
					renderItem={({item, index}) => (
						<ProductItem data={item} navigation={navigation} />
					)}
			        ListFooterComponent={renderListFooter}					
					keyExtractor={item => item.product_id}
					extraData={selectedId}
				/>
			</Container>
		);
	}
	return content;
};

export default React.memo(ExploreMenu);
