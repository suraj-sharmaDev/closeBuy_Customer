import React from 'react';
import { FlatList, View } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";

import ShopDetailCard from "./ShopDetailCard";

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 20px 0px 20px 10px;
`; 

export default function ShopList({Shops, refresh, navigation}) {
  React.useEffect(()=>{

  },[]);
  const renderListFooter = () => {
    return <View style={{paddingBottom : 100}} />
  };    
  return (
    <Container>
      <FlatList
        data={Shops}
        horizontal = {false}
        renderItem={({ item }) => (
          <ShopDetailCard
            info = {item}
            navigation = {navigation}
          />
        )}
        ListFooterComponent={renderListFooter}
        keyExtractor={item => item.dist_point_id}
        extraData={refresh}
      />
    </Container>
  );
}

