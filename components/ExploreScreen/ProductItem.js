import React from 'react';
import styled from "styled-components";
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";

const View = styled.View`

`;
const ItemContainer = styled.View`
	flex-direction : row;
	align-items : center;
	padding : 10px 10px;
`;
const ItemDetailView = styled.TouchableOpacity`
	flex-direction : row;
	align-items : center;	
`;
const ImageView = styled.View`
	width : 100px;
	height : 100px;
	border-radius : 7px;
	background-color : ${Colors.preLoadingColor};
`;
const ItemImage = styled.Image`
	width : 100px;
	height : 100px;
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

const ProductItem = ({ navigation, data }) => {
	let content = null;
	content = (
		<ItemContainer onLayout={(event) => {console.warn(event.nativeEvent.layout.height)}}>
			<ItemDetailView onPress={()=>navigation.navigate('Shop', {shopId : data.dist_point_id})}>
				<ImageView>
					<ItemImage 
						source={{ uri : data.image}}
					/>			
				</ImageView>
				<View style={{alignItems : 'flex-start'}}>
					<ItemName numberOfLines={1} ellipsizeMode = 'tail'>{data.dist_point_name}</ItemName>
					<ItemSubCategory>{data.rating}</ItemSubCategory>
				</View>
			</ItemDetailView>
		</ItemContainer>
	);
	return content;
}

export default React.memo(ProductItem);