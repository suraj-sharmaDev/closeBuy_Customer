import React from 'react';
import {ToastAndroid} from 'react-native';
import styled from "styled-components";
import Colors from "../../constants/Colors";

import ProfileOptionTab from "./ProfileOptionTab";

const Container = styled.View`
	padding-top : 5px;
`;

function comingSoon(){
  ToastAndroid.showWithGravityAndOffset(
    'Will be Activated soon!',
    ToastAndroid.SHORT,
    ToastAndroid.BOTTOM,
    25,
    50,
  );  
}

const ProfileOptions = ({navigation}) => (
	<Container>
		<ProfileOptionTab
			iconName="location-pin"
			optionText="My Delivery Address"
			navigation={() => navigation.navigate('ManageAddress')}
		/>
		<ProfileOptionTab
			iconName="wallet"
			optionText="My Wallet"
			navigation={comingSoon}
		/>
		<ProfileOptionTab
			iconName="heart"
			optionText="Favourites"
			navigation={comingSoon}
		/>
		<ProfileOptionTab
			iconName="slideshare"
			optionText="Referrals"
			navigation={comingSoon}
		/>		
		<ProfileOptionTab
			iconName="bell"
			optionText="Notifications"
			navigation={comingSoon}
		/>
	</Container>
);

export default ProfileOptions;