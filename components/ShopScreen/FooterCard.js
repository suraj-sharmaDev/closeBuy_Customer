import React from 'react';
import {Keyboard} from 'react-native';
import styled from "styled-components";
import {connect} from 'react-redux';
import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import ProceedCard from './ProceedCard';
import FloatingButton from './FloatingButton';
import FloatingList from './FloatingList';

const Container = styled.View`
	width : 100%;
	position : absolute;
	bottom : 46px;
	flex-direction : column;
	align-items : center;
	justify-content : center;
`;
const TrackView = styled.TouchableOpacity`
	width : 100%;
	background-color : ${Colors.lightGreenColor};
	padding : 10px;
	align-items : center;
	justify-content : center;
`;
const Text = styled.Text`
	font-family : ${Fonts.boldFont};
	font-size : 14px;
	color : white;
`;

const FooterCard = props => {
	const [active, updateActive] = React.useState(false);	
	const [show, updateShow] = React.useState(true);
	React.useEffect(()=>{
	    keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', hideFooter);    
	    keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', showFooter);
	    return()=>{
	      keyboardDidShowListener.remove();
	      keyboardDidHideListener.remove();
	    }        		
	})	
	const showFooter = () => {
		updateShow(true);
	}
	const hideFooter = () => {
		updateShow(false);
	}
	let content = null;
	if(!props.loading && show && !props.tracking){
		content = (
			<Container>
				<FloatingList active={active} scroll={props.scroll} categoryList={props.categoryList} updateActive={()=>updateActive(!active)}/>
				<FloatingButton updateActive={()=>updateActive(!active)}/>
				<ProceedCard {...props}/>
			</Container>
		);
	}else if(show){
		content = (
			<Container>
				<TrackView activeOpacity={0.6} onPress={()=>props.navigation.navigate('CartStack')}>
					<Text>Track Your Current Order</Text>
				</TrackView>
			</Container>
		);
	}
	return content;
}
const mapStateToProps = state => {
	return {
		tracking : state.cart.tracking
	}
}
export default connect(mapStateToProps,{})(FooterCard);