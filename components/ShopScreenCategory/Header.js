import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components';
import Entypo from "react-native-vector-icons/Entypo";
import SearchIcon from "react-native-vector-icons/Feather";
import {height, width} from '../../constants/Layout';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';

import SearchInShop from "../ShopScreen/SearchInShop";

const Container = styled.View`
 	elevation:5;
	background-color : white;
	border-bottom-color : ${Colors.greyColor};
  	border-bottom-width : 1.6;
  	border-bottom-left-radius : 20px;
  	border-bottom-right-radius : 20px;  
  	padding-bottom : 10px;
  	shadow-opacity: 0.46;
  	shadow-radius: 11.14px;
  	shadow-color: #000;
  	shadow-offset: 5px 5px;
`;

const HeaderButtons = styled.View`
	flex-direction : row;
  	padding-bottom : 15px;	
	justify-content : space-between;
	align-items : center;
`;
const BackButton = styled.TouchableOpacity`
	width : 40px;
`;

const MenuButton = styled.TouchableOpacity`
	width : 40px;
`;
const Label = styled.Text`
	font-family : ${Fonts.normalFont};
	font-size : 20px;
	color : ${Colors.darkGreyColor};
	padding : 0px 0px 5px 10px;
`;

const Header = props => {
	const [searchActive, updateSearchActive] = React.useState(false);	
	let content = (
		<Container>
			<HeaderButtons>
		    	<View style={{flex:1}}>
			    	<BackButton onPress={()=>props.navigation.goBack()}>
			          <Entypo name="chevron-left" size={30} color={Colors.greenColor}/>
			        </BackButton>      
			    </View>
		        <MenuButton onPress={()=>updateSearchActive(!searchActive)}>
		          <SearchIcon name="search" size={26} color={Colors.greenColor}/>
		        </MenuButton>
			</HeaderButtons>
			<Label>{props.title}</Label>
			<SearchInShop
				data={[props.items]}
				scroll={props.scroll}
				active={searchActive}
				updateActive={() => updateSearchActive(!searchActive)}
			/>			
		</Container>
	);
	return content;
}

export default Header;