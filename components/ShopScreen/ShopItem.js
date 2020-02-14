import React from 'react';
import styled from "styled-components";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import ShopQuantityButton from "./ShopQuantityButton";

const View = styled.View``;
const ItemContainer = styled.View`
	flex : 1;
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	padding : 10px 5px;
`;
const ItemDetailView = styled.View`
	flex : 2;
	flex-direction : row;
`;
const ImageView = styled.View`
  	background-color : ${Colors.preLoadingColor};  
	width : 100px;
	height : 120px;
	border-radius : 7px;	
`;
const ItemImage = styled.Image`
	width : 100px;
	height : 120px;
	border-radius : 7px;
`;
const ItemName = styled.Text`
  font-size : 16px;
  font-family  : ${Font.normalFont};
  color : ${Colors.blackColor};
`;
const ItemSubCategory = styled.Text`
  font-size : 15px;
  font-family  : ${Font.normalFont};
  color : ${Colors.blackColor};
`;
const ItemPrice = styled.Text`
  font-family  : ${Font.normalFont};
`;
const Button = styled.TouchableOpacity``;
const Text = styled.Text`
	font-size : 12px;
	font-family : ${Font.lightFont};
	color : ${Colors.lightGreyColor};
`;

const ShopItem = ({ data, available }) => {
	let content = (
		<ItemContainer>
			<ItemDetailView>
				<ImageView>
					<ItemImage source={{ uri : data.product_image_path }}/>			
				</ImageView>
				<View style={{textAlign:'left', marginLeft:10}}>
					<ItemName>{data.product_name}</ItemName>
					<ItemSubCategory>In {data.sub_category_name}</ItemSubCategory>
					<View style={{ flexDirection : 'row'}}>
						<ItemPrice 
							style={{
									fontSize : 12,
									color : Colors.lightGreyColor,
									textDecorationLine: 'line-through',
								    textDecorationStyle: 'solid',
								    textDecorationColor: '#000'
							}}
						>
							Rs {Math.round(data.product_price*1.05)}
						</ItemPrice>
						<ItemPrice
							style={{
									fontSize : 12,
									color : Colors.greenColor,
									marginLeft : 2
							}}
						>
							5% off
						</ItemPrice>
					</View>
					<ItemPrice style={{ fontSize : 15}}>Rs {data.product_price}</ItemPrice>					
				</View>
			</ItemDetailView>
			{
				(available==='1' && data.product_stock!=='0')
				?
				<ShopQuantityButton 
					item={{shopId : data.dist_point_id , 
						   id : data.product_id, 
						   name : data.product_name, 
						   price : data.product_price*0.95,
						   extras : data.extras
						}} 
				/>				
				:
				<Button activeOpacity={1}>
					<Text>Not Available</Text>
				</Button>
			}
		</ItemContainer>
	);
	return content;
}

export default React.memo(ShopItem);