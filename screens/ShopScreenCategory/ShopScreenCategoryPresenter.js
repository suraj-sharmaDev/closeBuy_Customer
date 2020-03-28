import React from "react";
import { Platform } from 'react-native';
import styled from "styled-components";

import AbortController from '../../middleware/AbortController';
import {ShopStocksBySubCategory} from '../../middleware/API';
import {height, width} from '../../constants/Layout';
import Colors from "../../constants/Colors";

import LoadingScreen from '../../components/LoadingScreen';
import Header from "../../components/ShopScreenCategory/Header";
import SubCategoryList from "../../components/ShopScreenCategory/SubCategoryList";
import ProductsList from "../../components/ShopScreenCategory/ProductsList";
import FooterCard from "../../components/ShopScreenCategory/FooterCard";

const Theme = styled.View`
  background-color : ${Colors.homeBackgroundColor};
  flex : 1;
`;

const ShopScreenCategoryPresenter = ({navigation, items, ...props }) => {
	const [selected, setSelected] = React.useState({
		selected : null,
		collections : {}
	});
	React.useEffect(()=>{
		abortController = new AbortController();		
		updateSelected(items.subCategories[0]['subCategoryId']);
		return () => {
			abortController._abort();
		}
	},[]);

	const updateSelected = (subCategoryId) => {
		//to speed up the process and lower api calls we store the api results
		//locally and everytime user changes the catgeory we check if the data is stored locally
		//else get data and store
		if(selected.collections[subCategoryId]===undefined){
			ShopStocksBySubCategory(items.shopId, subCategoryId)
			.then((result)=>{
		    	if(!abortController._signal()){
					global.products = result;	    	
					if(selected.selected!==subCategoryId){
						let data = {
							selected : subCategoryId,
							collections : selected.collections
						}
						data.collections[subCategoryId] = result;  
						setSelected(data);
					}
		    	}
			})
			.catch((error)=>{
				console.warn('error');
			})
		}else{
			global.products = selected.collections[subCategoryId];
			let data = {
				selected : subCategoryId,
				collections : selected.collections
			}			
			setSelected(data);			
		}
	}
	_listRef = (ref) => {
		_list = ref;
	}
	const scroll = (sectionIndex, itemIndex) => {
		// updateSearchActive(false);
		_list.scrollToLocation({
         animated: true,
         sectionIndex: sectionIndex,
         itemIndex: itemIndex
		})
	}
	if(selected.selected===null){
		content = <LoadingScreen />
	}else{
		content = (
			<Theme>
				<Header 
					navigation={navigation}
					title={items.categoryName}
				/>
				<SubCategoryList 
					subCategories={items.subCategories}
					selected={selected.selected}
					setSelected={updateSelected}
				/>
				<ProductsList 
					products={global.products}
					selected={selected.selected}
				/>
				<FooterCard 
					scroll={scroll}
					productList={selected.collections[selected.selected]}
					navigation={navigation} 
				/>	  					
			</Theme>
		);
	}
	return content;	
}

export default React.memo(ShopScreenCategoryPresenter);
