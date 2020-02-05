import React, { useState, useEffect } from "react";
import { Platform, FlatList, TouchableHighlight } from 'react-native';
import { Container, Content, View } from 'native-base';
import styled from "styled-components";
import {connect} from 'react-redux';

import Color from "../../constants/Colors";

import {Search} from '../../middleware/API';
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
    searchTerm = currentCategoryData.subCategory[currentIndex].subCategoryName;          
    fetchProducts(searchTerm);
  }
  const fetchProducts = (searchTerm) => {
     let coordinates = JSON.stringify(props.address.savedAddresses[props.address.currentAddress].coordinate);
     Search(searchTerm, coordinates)
     .then((result)=>{
      products = result.products;
      setSelectedId(currentId);      
     })
     .catch((err)=>{
        AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
     })
  }
  const onSelect = (id, index) => {
    selectedCategory = currentCategoryData.subCategory[currentIndex];
    currentIndex = index;
    currentId = id;
    searchTerm = currentCategoryData.subCategory[currentIndex].subCategoryName;          
    fetchProducts(searchTerm);
  };

  let content = <ExploreScreenLoader />;
  if(selectedId!==null){
    content = (
      <Container>
        <Content> 
          <ExploreScreenHeader navigation={navigation} categoryName={currentCategoryData.categoryName}/>
          <ScrollCategory selected={selectedId} onSelect = {onSelect} data={currentCategoryData.subCategory}/>
          <ExploreMenu navigation={navigation} products={products} selectedId={selectedId}/>
        </Content>
      </Container>
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
