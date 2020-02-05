import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, Text, } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";

import ShopDetailCard from "./ShopDetailCard";

const Container = styled.SafeAreaView`
  flex : 1;
  padding : 20px 0px 20px 10px;
`; 

export default function ShopList({Shops, refresh, navigation}) {
  React.useEffect(()=>{

  },[])
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
        keyExtractor={item => item.dist_point_id}
        extraData={refresh}
      />
    </Container>
  );
}

