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
		navigation.navigate('ShopCategory', {items : item, 
											 categoryId : item.categoryId, 
											 onlineStatus : Shop.online_status, 
											 deliveryAvailability : Shop.delivery_avail});
	}
	const searchHandler = (data) => {
		// This function used in version 2 is used instead for scroll
		let found = -1;
		let categories = Shop.categories;
		let categoryLength = Object.keys(categories).length;
		for(var i =0; i<categoryLength; i++){
			if(categories[i].categoryId == data.categoryId){
				found = i;
				break;
			}
		}
		let item = Shop.categories[found];
		item.shopId = Shop.dist_point_id;
		navigation.navigate('ShopCategory', {items : item, categoryId : item.categoryId,
											 subCategoryId : data.subCategoryId, 
											 subCategoryChildId : data.subCategoryChildId,
											 onlineStatus : Shop.online_status
											});
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
				searchHandler={searchHandler}
				Shop={Shop}
		  	/>
		  	<ShopCategoryList 
				navigateToCategory={navigateToCategory}
				categoryList={categoryList}
		  	/>
			<FooterCard 
				loading={categoryList===null} 
				navigation={navigation} 
				scroll={searchHandler} 
				categoryList={categoryList}
			/>	  	
		   </Theme>
		);		
	}
	return content;
}

export default React.memo(ShopScreenPresenter);
