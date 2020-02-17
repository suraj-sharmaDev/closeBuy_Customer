import React from 'react';
import { Dimensions, View } from "react-native";
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";
import SearchIcon from "react-native-vector-icons/Feather";
import Colors from "../../constants/Colors";

const HeaderButtons = styled.View`
  flex-direction : row;
  padding : 10px 10px 5px 10px;
  background-color : white;    
`;

const BackButton = styled.TouchableOpacity`
	width : 40px;
`;

const MenuButton = styled.TouchableOpacity`
	width : 40px;
`;

const ShopScreenHeaderButtons = ({navigation, updateActive}) => {
	let content = (
	    <HeaderButtons>
	    	<View style={{flex:1}}>
		    	<BackButton onPress={()=>navigation.goBack()}>
		          <Entypo name="chevron-left" size={30} color={Colors.greenColor}/>
		        </BackButton>      
		    </View>
	        <MenuButton onPress={updateActive}>
	          <SearchIcon name="search" size={26} color={Colors.greenColor}/>
	        </MenuButton>
	    </HeaderButtons>
	);
	return content;
}

export default React.memo(ShopScreenHeaderButtons);