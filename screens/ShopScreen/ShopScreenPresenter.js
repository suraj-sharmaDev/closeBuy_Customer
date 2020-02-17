import React, { useEffect } from "react";
import { Platform } from 'react-native';

import styled from "styled-components";
import Color from "../../constants/Colors";

import ShopScreenLoader from '../../components/ShopScreen/ShopScreenLoader';
import ShopScreenHeader from "../../components/ShopScreen/ShopScreenHeader";
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
		for(var i=0; i<Object.keys(Shop.categories).length; i++){
			let newData = {categoryName : Shop.categories[i].title, sectionIndex : i, children : []};			
			for(var j=i; j<Object.keys(Shop.categories[i].data).length; j++){
				let childData = {
					id:Shop.categories[i].data[j].product_id, 
					itemName:Shop.categories[i].data[j].product_name, 
					sectionIndex:i,
					itemIndex:j
				};
				newData.children.push(childData);				
			}
			categories.push(newData); 
		}
		updateCategoryList(categories);
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
	let content = (
	  <Theme>
	  	<ShopScreenHeader
			navigation={navigation}
			categoryList={categoryList}
			scroll={scroll}
			Shop={Shop}
	  	/>
		<ShopScreenBody 
			Shop={Shop.categories} 
			available={Shop.online_status}
			navigation={navigation} 
		/>
		<FooterCard 
			loading={categoryList===null} 
			navigation={navigation} 
			scroll={scroll} 
			categoryList={categoryList}
		/>	  	
	   </Theme>
	);		
	if(categoryList===null){
		return <ShopScreenLoader />;
	}else {
		return content;
	}
}

export default React.memo(ShopScreenPresenter);
