import React from "react";
import { Platform, Dimensions, ScrollView } from 'react-native';
import styled from "styled-components";
import Color from "../../constants/Colors";
import Header from "../../components/ManageAddressScreen/Header";
import ScreenBody from "../../components/ManageAddressScreen/ScreenBody";
import Footer from "../../components/ManageAddressScreen/Footer";
const {height, width} = Dimensions.get('window');

const Theme = styled.View`
  background-color : ${Color.homeBackgroundColor};
`;

const ManageAddressScreenPresenter = ({navigation, store}) => {
  let content = (
    <Theme>
      <Header navigation={navigation}/>
      <ScrollView>
	      <ScreenBody store={store.savedAddresses} navigation={navigation}/>
	  </ScrollView>
	  <Footer navigation={navigation}/>
    </Theme>
  );
  return content;
};

export default React.memo(ManageAddressScreenPresenter);
