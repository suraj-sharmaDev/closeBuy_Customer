import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import styled from "styled-components";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Container = styled.View`
	margin-top : 10px;
`;
const View = styled.View``;
const Row = styled.View`
	flex-direction : row;
	justify-content : space-between;
	align-items : center;
	margin-vertical : 3px;
`;
const Header = styled.View`
	margin-vertical : 5px;
`;
const BoldText = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 16px;
	text-transform : capitalize;
`;
const Text = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 15px;
	text-transform : capitalize;
`;
const BillView = styled.View`
	margin-top : 10px;
	padding-bottom : 4px;
	flex-direction : row;
	justify-content : space-between;
	border-bottom-width : 1px;
	border-bottom-color : ${Colors.greyColor};
	align-items : center;
`;
const Item = ({item}) => {
	return (
		<BillView>
			<View>
				<Text>{item.name}</Text>
				<Text>{item.qty} x {item.price}</Text>
			</View>
			<View>			
				<Text>{item.qty * item.price}</Text>
			</View>
		</BillView>
	);
}
const BillDetail = ({bill, totalAmount}) => {
	total = 0;
	bill = JSON.parse(bill);
	let content = (
		<Container>
			<Header>
				<BoldText>Your Order</BoldText>
			</Header>
			<View>
				{
					bill.map((b, index)=>{
						total+=b.qty*b.price
						return <Item item={b} key={index}/>
					})
				}
				{
					//Then using the total we have to check how much customer actually paid
					//to calculate discount i.e total > total amount
					total>totalAmount 
					?
					<View>
						<Row>
							<BoldText>Total Price</BoldText>
							<BoldText>{total}</BoldText>							
						</Row>
						<Row>
							<BoldText>Discount</BoldText> 
							<BoldText>{total-totalAmount}</BoldText>						
						</Row>
						<Row>
							<BoldText>You paid</BoldText> 
							<BoldText>{totalAmount}</BoldText>
						</Row>
					</View>
					:
					<BillView>
						<Text>You paid : {total}</Text>
					</BillView>
				}
			</View>
		</Container>
	);

	return content;
}

export default BillDetail;