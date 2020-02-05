import React from "react";
import AntDesign  from "react-native-vector-icons/AntDesign";
import Colors from "../../constants/Colors";
import styled from 'styled-components';
import {connect} from 'react-redux';

const Container = styled.View`
	flex-direction : row;
`;
const Badge = styled.View`
	height : 18px;
	width : auto;
	padding : 4px;
	border-radius : 9px;
	background-color : ${Colors.greenColor};
	margin-top : -5px;
	align-items : center;
	justify-content : center;
`;
const Text = styled.Text`
	color : white;
	font-size : 12px;
`;
const CartBadge = ({name, focused, ...props}) => {
	if(props.cart.tracking===false){
		IconName = name; 
	}else{
		IconName = 'enviromento'
	}
	return (
		<Container>
			<AntDesign
				name={IconName}
				size={22}
				style={{marginBottom: -3}}
				color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
			/>
			{
				props.cart.items.length > 0 && props.cart.tracking===false
				?
				<Badge>
					<Text>{props.cart.items.length}</Text>
				</Badge>				
				:
				null
			}
		</Container>
	);
};

const mapStateToProps = state => {
	return {
		cart: state.cart,
	};
};

export default connect(
	mapStateToProps,
	{},
)(CartBadge);

