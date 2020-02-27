import React from "react";
import { Platform } from 'react-native';
import styled from "styled-components";
import {height, width} from '../../constants/Layout';
import Colors from "../../constants/Colors";
import LoadingScreen from '../../components/LoadingScreen';

import Header from '../../components/ShopScreenCategory/Header';
import ScrollMenu from '../../components/ShopScreenCategory/ScrollMenu';
import ScreenBody from '../../components/ShopScreenCategory/ScreenBody';
import FooterCard from "../../components/ShopScreen/FooterCard";

const Theme = styled.View`
  background-color : ${Colors.homeBackgroundColor};
  flex : 1;
`;

const ShopScreenCategoryPresenter = ({navigation, items, ...props }) => {
	const [selected, setSelected] = React.useState(null);
	const flatListRef = React.useRef();	
	// const [selectedSubCategory, setSelectedSubCategory] = React.useState(null);
	React.useEffect(()=>{
		createSubCategories();
	},[]);
	const createSubCategories = () => {
		subCategoriesFormatted = {};
		subCategories = [];
		items.children.map((i)=>{
			if(i.subCategoryName in subCategoriesFormatted){
				//subcategory name already exist then push 
				//data into it
				subCategoriesFormatted[i.subCategoryName].push(i);
			}else{
				//if subcategory name doesn't exist then create an empty array with that
				subCategories.push(i.subCategoryName);
				subCategoriesFormatted[i.subCategoryName] = [];
				subCategoriesFormatted[i.subCategoryName].push(i);
			}
		});
		if(props.selected){
			selectedSubCategory = subCategoriesFormatted[props.selected];
			// setSelectedSubCategory(subCategoriesFormatted[props.selected]);
			setSelected(props.selected);
		}else{
			selectedSubCategory = subCategoriesFormatted[subCategories[0]];
			// setSelectedSubCategory(subCategoriesFormatted[subCategories[0]]);
			setSelected(subCategories[0]);			
		}
	}
	const updateSelectedCategory = (subCategoryName) => {
		selectedSubCategory = subCategoriesFormatted[subCategoryName];
		// setSelectedSubCategory(subCategoriesFormatted[subCategoryName]);
		setSelected(subCategoryName);
	}
	const _scrollTo = (sectionIndex, subCategoryName, itemIndex) => {
		if(itemIndex!==undefined && itemIndex > 2){
			flatListRef.current.scrollToIndex({ animated: true, index: itemIndex });
		}
	}
	if(selected===null){
		content = <LoadingScreen />
	}else{
		content = (
			<Theme>
				<Header 
					title={items.categoryName} 
					navigation={navigation}
					items={items}
					scroll={_scrollTo}
				/>
				<ScrollMenu 
					subCategories={subCategories} 
					selected={selected}
					updateSelected={updateSelectedCategory}
				/>				
				<ScreenBody 
					selectedSubCategory = {selectedSubCategory}
					selected={selected}
					itemIndex={props.itemIndex}
					flatListRef={flatListRef}
					_scrollTo={_scrollTo}
				/>
				<FooterCard 
					navigation={navigation} 
				/>	  					
			</Theme>
		);
	}
	return content;	
}

export default React.memo(ShopScreenCategoryPresenter);
