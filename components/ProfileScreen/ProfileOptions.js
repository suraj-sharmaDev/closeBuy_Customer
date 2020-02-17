import React from 'react';
import {ToastAndroid, Linking} from 'react-native';
import styled from "styled-components";
import Colors from "../../constants/Colors";

import ProfileOptionTab from "./ProfileOptionTab";

const Container = styled.View`
	padding : 5px 20px;	
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

function customerSupport(){
	Linking.openURL(`tel:${7994505594}`)	
}
const ProfileOptions = ({navigation}) => (
	<Container>
		<ProfileOptionTab
			iconName="unread"
			optionText="Recent Orders"
			navigation={() => navigation.navigate('ManageAddress')}
		/>
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
		<ProfileOptionTab
			iconName="phone"
			optionText="Customer Care"
			navigation={customerSupport}
		/>		
	</Container>
);

export default ProfileOptions;