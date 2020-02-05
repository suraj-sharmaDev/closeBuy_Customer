import React, { useEffect } from "react";
import { FlatList, Text } from "react-native";
import styled from "styled-components";
import ShopScreenLoader from './ShopScreenLoader';
import ShopInfoCard from "./ShopInfoCard";
import ShopDeliveryOption from "./ShopDeliveryOption";
import Products from "./Products";

const Container = styled.View`
	flex-direction : column;
	height : auto;
	padding-bottom : 200px;
`;
const Button = styled.TouchableOpacity``;
const ShopScreenBody = ({ Shop, navigation, onIncrement, onDecrement }) => {
	const [isLoading, updateLoading] = React.useState(true);
	useEffect(()=>{
		updateLoading(false);
	},[]);
	let content = (
		<Container>
			<ShopInfoCard name={Shop.dist_point_name} category={Shop.dist_category} rating={Shop.rating}/>	
			<ShopDeliveryOption navigation={navigation} />
			{
				<FlatList
					data={Shop.categories}
					renderItem={({item}) => (
						<Products dataList={item} available={Shop.online_status}/>
					)}
					keyExtractor={item => item.categoryName}
				/>	
			}	
		</Container>
	);
	if(isLoading){
		return <ShopScreenLoader />;
	}else {
		return content;
	}
}

export default React.memo(ShopScreenBody);