import React from 'react';
import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const View = styled.View``;
const AddressRow = styled.TouchableOpacity`
	padding : 10px;
	flex-direction : row;
	align-items : flex-start;
`;
const Address = styled.Text`
	text-transform : uppercase;
	font-family : ${Font.boldFont};
	color : ${Color.blackColor};
	font-size : 15px;
`;
const AddressDetail = styled.Text`
	font-family : ${Font.lightFont};
	font-size : 15px;
`;

const AddressView = ({address, place_id, type, onLocationSelect, ...props}) => {
	let IconName;
	let addressTitle;
	let addressInfo;
	let content;
	if(type==='SavedLocation')
	{
		addressTitle = address.savedAs;
		addressInfo = address.houseDetail+','+address.landmark;
		if(address.savedAs === 'Home'){
			IconName="home-outline";
		}else if(address.savedAs === 'Work'){
			IconName="briefcase-outline";
		}else{
			IconName="map-marker-outline";
		}
	}else{
		addressTitle = address.structured_formatting.main_text;
		IconName = "map-marker-outline";
		addressInfo = address.structured_formatting.secondary_text;
	}
	content = (
		<AddressRow onPress={()=>onLocationSelect(place_id)}>
			<View style={{marginRight: 10}}>
				<Icon name={IconName} size={22} />
			</View>
			<View style={{flexDirection: 'column'}}>
				<Address>{addressTitle}</Address>
				<View style={{marginTop: 5, width: '95%'}}>
					<AddressDetail>{addressInfo}</AddressDetail>
				</View>
			</View>
		</AddressRow>
	);
	return content;
}
export default AddressView;