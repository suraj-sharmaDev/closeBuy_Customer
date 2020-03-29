import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import { Container, Content, View } from 'native-base';
import styled from "styled-components";
import {connect} from 'react-redux';

import Color from "../../constants/Colors";

import {SearchWithSubCategory} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';
import ExploreScreenLoader from '../../components/ExploreScreen/ExploreScreenLoader';
import ExploreScreenHeader from "../../components/ExploreScreenHeader";
import ScrollCategory from "../../components/ScrollCategory";
import ExploreMenu from "../../components/ExploreMenu";

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;

const Text = styled.Text``;
const ExploreScreenPresenter = ({navigation, ...props}) => {
  const [selectedId, setSelectedId] = useState(null); 
  const refresh = false;
  useEffect(() => {
    initialization();
  },[]);
  const initialization = () => {
    currentCategoryData = navigation.getParam('categoryData');
    currentId = navigation.getParam('selectedId');
    currentIndex = navigation.getParam('index');
    subCategoryId = currentCategoryData.subCategories[currentIndex].subCategoryId;          
    fetchProducts(subCategoryId);
  }
  const fetchProducts = (subCategoryId) => {
     let coordinates = JSON.stringify(props.address.savedAddresses[props.address.currentAddress].coordinate);
     SearchWithSubCategory(subCategoryId, coordinates)
     .then((result)=>{
      products = result;
      setSelectedId(subCategoryId);      
     })
     .catch((err)=>{
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
     })
  }
  const onSelect = (id, index) => {
    selectedCategory = currentCategoryData.subCategories[currentIndex];
    currentIndex = index;
    currentId = id;
    subCategoryId = selectedCategory.subCategoryId;          
    fetchProducts(subCategoryId);
  };

  let content = <ExploreScreenLoader />;
  if(selectedId!==null){
    content = (
      <Theme>
        <ExploreScreenHeader navigation={navigation} categoryName={currentCategoryData.categoryName}/>
        <ScrollCategory selected={selectedId} onSelect = {onSelect} data={currentCategoryData.subCategory}/>
        <ExploreMenu navigation={navigation} products={products} selectedId={selectedId}/>
      </Theme>
    );
  }
  return content;
};
const mapStateToProps = state => {
  return {
    address : state.address
  }
}
export default React.memo(connect(mapStateToProps,{})(ExploreScreenPresenter));
// export default React.memo(ExploreScreenPresenter);
