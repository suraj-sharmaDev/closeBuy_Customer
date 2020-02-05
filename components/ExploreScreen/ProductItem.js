import React from 'react';
import styled from "styled-components";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const View = styled.View`

`;
const ItemContainer = styled.View`
	flex : 0.5;
	flex-direction : row;
	align-items : center;
	padding : 10px 10px;
`;
const ItemDetailView = styled.TouchableOpacity`
	flex : 2;
	flex-direction : column;
`;
const ImageView = styled.View`
	width : 100px;
	height : 120px;
	border-radius : 7px;
	background-color : ${Colors.preLoadingColor};
`;
const ItemImage = styled.Image`
	width : 100px;
	height : 120px;
	border-radius : 7px;
`;
const ItemName = styled.Text`
	font-size : 16px;
	width : 75%;
	font-family  : ${Font.normalFont};
	color : ${Colors.blackColor};
`;
const ItemSubCategory = styled.Text`
  font-size : 15px;
  font-family  : ${Font.normalFont};
  color : ${Colors.blackColor};
`;

const ProductItem = ({ navigation, data }) => {
	let content = (
		<ItemContainer>
			<ItemDetailView onPress={()=>navigation.navigate('Shop', {shopId : data.dist_point_id})}>
				<ImageView>
					<ItemImage 
						source={{ uri : data.product_image_path}}
					/>			
				</ImageView>
				<View style={{alignItems : 'flex-start'}}>
					<ItemName numberOfLines={1} ellipsizeMode = 'tail'>{data.name}</ItemName>
					<ItemSubCategory>Rs {data.price}</ItemSubCategory>
				</View>
			</ItemDetailView>
		</ItemContainer>
	);
	return content;
}

export default React.memo(ProductItem);