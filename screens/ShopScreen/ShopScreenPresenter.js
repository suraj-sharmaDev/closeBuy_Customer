import React, { useEffect } from "react";
import { Platform } from 'react-native';

import styled from "styled-components";
import Color from "../../constants/Colors";

import ShopScreenHeaderButtons from "../../components/ShopScreen/ShopScreenHeaderButtons";
import SearchInShop from "../../components/ShopScreen/SearchInShop";
import ShopThumbnail from "../../components/ShopScreen/ShopThumbnail";
import ShopScreenBody from "../../components/ShopScreen/ShopScreenBody";
import FooterCard from "../../components/ShopScreen/FooterCard";
const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;
const ScrollView = styled.ScrollView``;
const View = styled.View``;
const Text = styled.Text``;

const ShopScreenPresenter = ({navigation, Shop }) => {
	let listRef = React.useRef(null); 
	const [isLoading, updateLoading] = React.useState(true);
	const [categoryList, updateCategoryList] = React.useState([]);
	const [searchActive, updateSearchActive] = React.useState(false); 	
	useEffect(()=>{

	})
	const listUpdater = (parentYPosition) => {
		if(categoryList.length===0){
			let pushData = [];
			let yPosition = parentYPosition;
			let itemHeight = 140;
			for(i=0,maxI=Shop.categories.length;i<maxI;i++){
				let newData = {categoryName : Shop.categories[i].categoryName, yPosition : yPosition, children : []};
				for(j=0, maxJ=Shop.categories[i].items.length;j<maxJ;j++)
				{
					let childData = {id:Shop.categories[i].items[j].product_id, itemName:Shop.categories[i].items[j].product_name, yPosition:yPosition};
					yPosition += itemHeight;
					newData.children.push(childData);
				}
				pushData.push(newData); 
			}
			updateCategoryList(pushData);
			updateLoading(false);			
		}
	}
	const scroll = (yPosition) => {
		updateSearchActive(false);
		listRef.scrollTo({
		    x: 0,
		    y: yPosition,
		    animated: true,
		});
	}
	let content = (
	  <Theme>
	    <ShopScreenHeaderButtons navigation={navigation} updateSearchActive={()=>updateSearchActive(!searchActive)}/>
	    <SearchInShop 
	    	data={categoryList} 
	    	scroll={scroll} 
	    	active={searchActive} 
	    	updateActive={()=>updateSearchActive(!searchActive)}
	    />
	  	<ScrollView ref={(ref)=>listRef=ref} showsVerticalScrollIndicator={false} removeClippedSubviews={true}>
		    { 
		    	//<ShopThumbnail image={Shop.image}/>
			}
		    <View onLayout={(e)=>listUpdater(e.nativeEvent.layout.y)}>
			    <ShopScreenBody 
			      	Shop={Shop}
			     	navigation={navigation} 
			    />	  		
			</View>
	  	</ScrollView>
		<FooterCard loading={isLoading} navigation={navigation} scroll={scroll} categoryList={categoryList}/>	  	
	   </Theme>
	);	
	return content;
}

export default React.memo(ShopScreenPresenter);
