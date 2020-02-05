import React from 'react';
import styled from 'styled-components';
import Color from '../../constants/Colors';
import Font from "../../constants/Fonts";

const Container = styled.View`
  elevation:1;
  height : 100px;
  border-bottom-color : ${Color.greyColor};
  border-bottom-width : 1.6;
  border-bottom-left-radius : 12px;
  border-bottom-right-radius : 12px;  
  padding-bottom : 15px;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;  
`;
const HeaderView = styled.View`
	padding : 30px 0px 0px 10px;
`;
const HeaderTitle = styled.Text`
	font-size : 22px;
	font-family  : ${Font.boldFont};
`;
const CartDescp = styled.Text`
	font-size : 16px;
	font-family  : ${Font.normalFont};
	color : ${Color.darkGreyColor};
`;
const CartHeader = props => {
	const Counter = () => {
		let count = 0;
		props.store.items.map(d => {
			count+=d.qty;
		});
		return count; 
	}	
	let content = (
		<Container>
			<HeaderView>
				<HeaderTitle>My Cart</HeaderTitle>
				<CartDescp>Cart Items {Counter()}</CartDescp>
			</HeaderView>
		</Container>
	);
	return content;
}

export default CartHeader;