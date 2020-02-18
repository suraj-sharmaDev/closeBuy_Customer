import React from 'react';
import styled from "styled-components";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {AlertService} from '../../middleware/AlertService';
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const Container = styled.View`
	padding : 10px;
`;
const View = styled.View``;
const Text = styled.Text`
	font-family : ${Font.boldFont};
`;
const AddressRow = styled.View`
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
const ButtonRow = styled.View`
	padding-bottom : 15px;
	flex-direction : row;
	justify-content : space-around;
	margin-top : 10px;
	border-bottom-width : 1px;
	border-bottom-color : ${Color.greyColor};
`;
const Button = styled.TouchableOpacity``;
const EditText = styled.Text`
	text-transform : uppercase;
	font-family : ${Font.boldFont};
	font-size : 15px;
	color : ${Color.greenColor};
`;
const DeleteText = styled.Text`
	text-transform : uppercase;
	font-family : ${Font.boldFont};
	font-size : 15px;
	color : ${Color.redColor};
`;
const AddressView = ({address, index, ...props}) => {
	let IconName;
	let addressInfo = address.coordinate.reverseAddress.title+', '+address.houseDetail+','+address.landmark;
	if(address.savedAs === 'home'){
		IconName="home-outline";
	}else if(address.savedAs === 'work'){
		IconName="briefcase-outline";
	}else{
		IconName="map-marker-outline";
	}

	const deleteAddress = () => {
	    AlertService('Delete', 'Are you sure?', ()=>props.deleteAddress(address, index));		
	}
	let content = (
		<Container>
			<AddressRow>
				<View style={{ marginRight : 10 }}>
					<Icon name= {IconName} size={22}/>
				</View>
				<View style={{ flexDirection : 'column', width:'70%' }}>
					<Address>{address.savedAs}</Address>
					<View style={{	marginTop : 5, width : '100%'}}>
						<AddressDetail numberOfLines={2}>{addressInfo}</AddressDetail>
					</View>
				</View>
			</AddressRow>
			<ButtonRow>
				<Button onPress={()=>props.navigation.navigate('LocationPickerMap',{editAddress:address, screen : 'ManageAddress'})}>
					<EditText>Edit</EditText>
				</Button>
				<Button>
					<Text>|</Text>
				</Button>
				<Button onPress={()=>deleteAddress()}>
					<DeleteText>Delete</DeleteText>
				</Button>
			</ButtonRow>
		</Container>
	);
	return content;
}
export default AddressView;