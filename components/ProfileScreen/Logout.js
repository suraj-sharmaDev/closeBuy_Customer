import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {connect} from 'react-redux';

import {AlertService} from '../../middleware/AlertService';
import {logout} from '../../store/actions/user';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";

const Button = styled.TouchableOpacity`
	margin : 6px 0px;
	padding : 4px 2px;
	border-width : 1.2px;
	border-color : ${Colors.lightGreyColor};
	border-radius : 7px;
	flex-direction : row;
	align-items : center;
	justify-content : space-between;
`;
const ButtonText = styled.Text`
	font-size : 16px;
	font-family  : ${Fonts.boldFont};
	color : ${Colors.lightGreyColor};
	text-transform : uppercase;	
`;

const Logout = (props) => {
	const logoutHandler = () => {
		AlertService('Logout', 'Are you sure you want to logout?',props.logoutHandler)
	}
	let content = (
		<Button activeOpacity={0.6} onPress={logoutHandler}>
			<ButtonText>Logout</ButtonText>
			<Icon name="power-standby" size={26} color={Colors.lightGreyColor}/>
		</Button>
	);
	return content;
}

const mapStateToProps = state => {
	return {
		user : state.user,
	}
}
const mapDispatchToProps = dispatch => {
  return {
    logoutHandler: () => {
      dispatch(logout());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Logout);