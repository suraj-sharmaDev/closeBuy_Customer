import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Collapsible from 'react-native-collapsible';
import styled from 'styled-components';
import Colors from "../../constants/Colors";
import Font from "../../constants/Fonts";
import {connect} from 'react-redux';

import ProfileOptionTab from "./ProfileOptionTab";
import RecentOrderedItem from "./RecentOrderedItem";

const Container = styled.View`
	padding : 0px 20px;	
`;

const RecentOrderCard = (props) => {
	let content = null;
	const [collapsed, updateCollapsed] = React.useState(true);

	content = (
		<Container>
			<ProfileOptionTab
				iconName="unread"
				optionText="Recent Orders"
				navigation={() => updateCollapsed(!collapsed)}
			/>
			<Collapsible collapsed={collapsed} align="center">
				<FlatList
					data={props.recentOrders}
					renderItem={({item}) => (
						<RecentOrderedItem item={item} navigation={props.navigation} />
					)}
					keyExtractor={item => item.id}
					extraData={props.recentOrders}
				/>
			</Collapsible>
		</Container>
	);
	return content;
}	

const mapStateToProps = state => {
	return {
		recentOrders : state.cart.recentOrders,
	}
}
export default connect(mapStateToProps,{})(RecentOrderCard);