import React from 'react';
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import styled from "styled-components";
import Color from "../constants/Colors";
import ProductItem from "./ExploreScreen/ProductItem";
import EmptyScreen from './EmptyScreen';
const Container = styled.SafeAreaView`
  flex : 1;
  padding : 20px 0px 20px 10px;
`; 
const DataContainer = styled.View``;
const Text = styled.Text``;
const ItemsContainer = props => {
	const itemContainer = (
	  <DataContainer>
	      <FlatList
	        data={props.data}
			numColumns={2}	        
	        renderItem={({ item }) => (
	          <ProductItem
	            navigation = {props.navigation}	          
	            data = {item}
	          />
	        )}
	        keyExtractor={item => item.product_id}
	        extraData={props.data}
	      />
	  </DataContainer> 
	);
	return itemContainer;
}

const SearchStaticResultItems = props => {
	React.useEffect(()=>{
	},[]);

	const content = (
		<Container>
		{
			Object.keys(props.data).length > 0
			?
			<ItemsContainer data={props.data} navigation={props.navigation}/>
			:
			<EmptyScreen />
		}
		</Container>
	);
	return content;
}

const mapStateToProps = state => ({
	search : state.search
})

export default React.memo(connect(mapStateToProps, [])(SearchStaticResultItems));