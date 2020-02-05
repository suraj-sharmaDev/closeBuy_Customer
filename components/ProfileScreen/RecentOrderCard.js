import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import {connect} from 'react-redux';

import RecentOrderedItem from "./RecentOrderedItem";

const Container = styled.View`
`;

const Header = styled.View`
	flex-direction : row;
	justify-content : space-between;
`;
const BigText = styled.Text`
	font-size : 22px;
	font-family  : ${Font.boldFont};
	color : ${Colors.darkGreyColor};
`;

const Button = styled.TouchableOpacity``;
const SmallText = styled.Text`
	font-size : 18px;
	font-family  : ${Font.boldFont};
	color : ${Colors.darkGreyColor};
`;
const RecentOrderView = styled.View`
	padding : 10px 10px;
`;
const InfoView = styled.View`
	background-color : ${Colors.greenColor};
	padding : 4px 20px;
	margin-top : 5px;
	border-radius : 12px;
	justify-content : center;
	align-items : center;
	margin-bottom : 30px;
`;
const InfoText = styled.Text`
	font-size : 18px;
	font-family  : ${Font.boldFont};
	color : white;
`;
const RecentOrderCard = (props) => {
	let content = null;
	if(Object.keys(props.recentOrders).length > 0){
		content = (
			<Container>
				<Header>
					<BigText>Recent orders</BigText>
					<Button activeOpacity={0.8}>
						<SmallText>See all</SmallText>
					</Button>		
				</Header>
				<RecentOrderView>
				    <FlatList
			         data={props.recentOrders}
			         renderItem={({ item }) => (
						<RecentOrderedItem item={item} navigation={props.navigation}/>
			         )}
			         keyExtractor={item => item.id}
			         extraData={props.recentOrders}
			        />			
				</RecentOrderView>
			</Container>		
		);
	}else{
		content = (
			<Container>
				<Header>
					<BigText>Recent orders</BigText>
				</Header>
				<InfoView>
					<InfoText>No Recent Orders</InfoText>
				</InfoView>
			</Container>
		);				
	}
	return content;
}	

const mapStateToProps = state => {
	return {
		recentOrders : state.cart.recentOrders,
	}
}
export default connect(mapStateToProps,{})(RecentOrderCard);