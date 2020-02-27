import React, { useEffect } from "react";
import { Platform } from 'react-native';

import styled from "styled-components";
import Color from "../../constants/Colors";

import ShopScreenLoader from '../../components/ShopScreen/ShopScreenLoader';
import ShopScreenHeader from "../../components/ShopScreen/ShopScreenHeader";
import ShopCategoryList from "../../components/ShopScreen/ShopCategoryList";
import ShopScreenBody from "../../components/ShopScreen/ShopScreenBody";
import FooterCard from "../../components/ShopScreen/FooterCard";
const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
  flex : 1;
`;

const ShopScreenPresenter = ({navigation, Shop }) => {
	const [categoryList, updateCategoryList] = React.useState(null);
	useEffect(()=>{
		createCategoryList();
	},[])
	const createCategoryList = () => {
		let categories = [];
		for(var i=0, maxI=Object.keys(Shop.categories).length; i<maxI; i++){
			let newData = {categoryName : Shop.categories[i].title, sectionIndex : i, children : []};			
			for(var j=0, maxJ=Object.keys(Shop.categories[i].data).length; j<maxJ; j++){
				let childData = {
					id:Shop.categories[i].data[j].product_id, 
					name:Shop.categories[i].data[j].product_name, 
					subCategoryName:Shop.categories[i].data[j].sub_category_name,
					price : Shop.categories[i].data[j].product_price,
					image : Shop.categories[i].data[j].product_image_path,
					stock : parseInt(Shop.categories[i].data[j].product_stock),
					shopAvailable : parseInt(Shop.online_status), 
					shopId : Shop.categories[i].data[j].dist_point_id,
					extras : Shop.categories[i].data[j].extras,
					sectionIndex:i,
					itemIndex : Math.floor(j/2)
				};
				newData.children.push(childData);				
			}
			categories.push(newData); 
		}
		updateCategoryList(categories);
	}
	const navigateToCategory = (categoryIndex, subCategoryName, itemIndex) => {
		// This function used in version 2 is used instead for scroll
		navigation.navigate('ShopCategory', {items : categoryList[categoryIndex], selected : subCategoryName, itemIndex : itemIndex});
	}
	const scroll = (sectionIndex, itemIndex) => {
		// updateSearchActive(false);
		_list.scrollToLocation({
         animated: true,
         sectionIndex: sectionIndex,
         itemIndex: itemIndex
		})
	}
	_listRef = (ref) => {
		_list = ref;
	}		
	let content = null;
	if(categoryList===null){
		content = <ShopScreenLoader />;
	}else {
		content = (
		  <Theme>
		  	<ShopScreenHeader
				navigation={navigation}
				categoryList={categoryList}
				scroll={navigateToCategory}
				Shop={Shop}
		  	/>
		  	<ShopCategoryList 
		  		navigation={navigation}
				categoryList={categoryList}
		  	/>
		  	{
				// <ShopScreenBody 
				// 	Shop={Shop.categories} 
				// 	available={Shop.online_status}
				// 	navigation={navigation} 
				// />
		  	}
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
