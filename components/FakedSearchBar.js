import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from 'native-base';
import Icon from "react-native-vector-icons/Feather";

import styled from "styled-components";
import Colors from "../constants/Colors";
import Font from "../constants/Fonts";

const SearchBarContainer = styled.View`
  flex : 1;
  flex-direction : row;  
  align-items : center;
`;
const Search = styled.TouchableOpacity`  
  elevation : 3;
  flex-direction : row;
  flex : 5;
  shadow-opacity: 0.1;
  shadow-radius: 2.14px;
  shadow-color: #606060;
  shadow-offset: 0px 1px;  
  border-radius : 7px;

  background-color : white;
  align-items : center;
  justify-content : center;
  margin : 20px 15px 0px 20px;
  padding-left : 10px;
  height : 40px;
`;
const InputFaked = styled.View`
  flex : 1;
`;

const Placeholder = styled.Text`
  margin-left : 5px;
  font-size : 14px;
  color : ${Colors.lightGreyColor};
`;

const FakedSearchBar = props => {
	return(
      <SearchBarContainer>
        <Search activeOpacity={0.6} onPress={()=>{props.navigation.navigate('SearchFetch')}}>
          <Icon name="search" size={16} color={Colors.lightGreyColor} />      
          <InputFaked>
            <Placeholder>Search for grocery, food, shop...</Placeholder>
          </InputFaked>
        </Search>
        {props.children}
      </SearchBarContainer>     
	);
}

export default FakedSearchBar;