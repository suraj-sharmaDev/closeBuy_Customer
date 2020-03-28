import React, { useEffect } from "react";
import { Platform } from 'react-native';

import styled from "styled-components";
import Color from "../../constants/Colors";

import ShopScreenLoader from '../../components/ShopScreen/ShopScreenLoader';
import ShopScreenHeader from "../../components/ShopScreen/ShopScreenHeader";
import ShopCategoryList from "../../components/ShopScreen/ShopCategoryList";
import FooterCard from "../../components/ShopScreen/FooterCard";
const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
  flex : 1;
`;

const ShopScreenPresenter = ({navigation, Shop }) => {
	const [categoryList, updateCategoryList] = React.useState(Shop);
	useEffect(()=>{
	},[])
	const navigateToCategory = (item) => {
		// This function used in version 2 is used instead for scroll
		item.shopId = Shop.dist_point_id;
		navigation.navigate('ShopCategory', {items : item});
	}
	const scroll = (categoryIndex, subCategoryName, itemIndex) => {
		// This function used in version 2 is used instead for scroll
		console.warn(categoryIndex, subCategoryName, itemIndex);
		// navigation.navigate('ShopCategory', {items : categoryList[categoryIndex], selected : subCategoryName, itemIndex : itemIndex});
	} 		
	let content = null;
	if(categoryList===null){
		content = <ShopScreenLoader />;
	}else {
		content = (
		  <Theme>
		  	<ShopScreenHeader
		  		shopId={Shop.dist_point_id}
				navigation={navigation}
				categoryList={categoryList}
				scroll={scroll}
				Shop={Shop}
		  	/>
		  	<ShopCategoryList 
				navigateToCategory={navigateToCategory}
				categoryList={categoryList}
		  	/>
			<FooterCard 
				loading={categoryList===null} 
				navigation={navigation} 
				scroll={scroll} 
				categoryList={categoryList}
			/>	  	
		   </Theme>
		);		
	}
	return content;
}

export default React.memo(ShopScreenPresenter);
