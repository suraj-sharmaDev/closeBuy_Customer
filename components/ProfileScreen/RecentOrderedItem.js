import React from 'react';
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import CategoryIcon from "./CategoryIcon";

const Container = styled.TouchableOpacity`
	flex : 1;
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
	height : 60px;
	background-color : ${Colors.greenColor};
	padding : 0px 20px;
	margin-top : 5px;
	border-radius : 12px;
`;
const View = styled.View``;

const ItemName = styled.Text`
	font-size : 18px;
	color : white;
	font-family  : ${Font.normalFont};
`;
const ShopName = styled.Text`
	font-size : 12px;
	color : white;
	font-family  : ${Font.normalFont};
`;
const ItemPrice = styled.Text`
	font-size : 18px;
	color : white;
	font-family  : ${Font.normalFont};
`;
const RecentOrderedItem = ({item, navigation}) => {
	React.useEffect(()=>{
	},[])
	const recentOrderHandler = () => {
		navigation.navigate('RecentOrderDetail',{'item':item});
	}
	let content = (
		<Container activeOpacity={0.6} onPress={recentOrderHandler}>
			<View>	
				<CategoryIcon subCategoryName={(item.dist_category).toLowerCase()} size={32}/>
			</View>
			<View>
				<ItemName>{item.dist_point_name}</ItemName>
				<ShopName>{item.pickup_address}</ShopName>
			</View>
			<View>
				<ItemPrice>Rs {parseInt(item.total_amount)+20}</ItemPrice>
			</View>
		</Container>
	)
	return content;
};

export default RecentOrderedItem;