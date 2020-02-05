import React, { useState, useEffect } from 'react';
import { FlatList, View } from "react-native";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import ShopItem from './ShopItem';
const Container = styled.View`
	flex : 1;
	flex-direction : column;
	padding : 5px 20px 5px 10px;
`;
const Label = styled.Text`
	font-size : 18px;
	font-family : ${Font.normalFont};
	color : ${Colors.darkGreyColor};
`;

const Products = ({ dataList, available}) => {
	const [refresh, updateRefresh] = useState(true);
	useEffect(()=>{

	},[refresh])
	if(dataList)
	{
		let contentBody = [];
		var i = dataList.items.length;
		while(i--) {
			contentBody.push(
				<ShopItem
					key={i}
					data={dataList.items[i]}
					available={available}
				/>
			);
		}
		let content = (
			<Container>
			  <View>
				<Label style={{ textTransform:'capitalize'}}>
					{dataList.categoryName}
				</Label>
			  </View>
			  {contentBody}
			  <View>
			  </View>
			</Container>
		);
		return content;
	}
}

export default React.memo(Products);