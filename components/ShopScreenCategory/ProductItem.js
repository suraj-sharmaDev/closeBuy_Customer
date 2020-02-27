import React from 'react';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import ShopQuantityButton from '../ShopScreen/ShopQuantityButton';

const Container = styled.View`
	width : 45%;
	justify-content : center;
	margin-top : 10px;
	margin-bottom : 15px;	
`;
const Image = styled.Image`
	width : 100%;
	height : 140px;
	border-radius : 7px;
`;
const View = styled.View`
	flex-direction : row;
	align-items : center;
`;
const ItemName = styled.Text`
	text-transform : capitalize;
	font-family : ${Fonts.normalFont};
	font-size : 15px;
	color : ${Colors.darkGreyColor};
`;
const ItemPrice = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 15px;	
	color : ${Colors.darkGreyColor};
`;
const StockInfo = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 12px;	
	color : ${Colors.darkGreyColor};
`;
const ProductItem = props => {
	let content = (
		<Container style={{marginLeft : props.index%2!=0 ? 'auto' : 0}}>
			<View>
				<Image 
					source={{uri:props.item.image}} 
					resizeMode='cover'
				/>
			</View>
			<View>
				<ItemName numberOfLines={1}>{props.item.name}</ItemName>
			</View>
			<View style={{justifyContent:'space-between'}}>
				<ItemPrice>Rs {props.item.price}</ItemPrice>
				{
					props.item.shopAvailable!==0 && props.item.stock!==0
					?
					<ShopQuantityButton 
						item={props.item}
					/>
					:
					<StockInfo>Not Available</StockInfo>
				}
			</View>
		</Container>
	);
	return content;
}

export default ProductItem;