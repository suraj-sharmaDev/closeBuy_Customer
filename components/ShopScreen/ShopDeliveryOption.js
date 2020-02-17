import React from 'react';
import {Dimensions} from 'react-native';
import styled from "styled-components";
import Entypo from "react-native-vector-icons/Entypo";
import {connect} from 'react-redux';

import Fonts from "../../constants/Fonts";
import Colors from "../../constants/Colors";
import {height, width} from '../../constants/Layout';

const Container = styled.View`
	flex-direction : column;
	padding : 10px 10px 10px 10px;
	border-bottom-width : 1;
	border-bottom-color : ${Colors.greyColor};				
`;
const View = styled.View``;
const Label = styled.Text`
  font-size : 12px;
  font-family  : ${Fonts.normalFont};
  color : ${Colors.lightGreyColor};	
`;
const Address = styled.Text`
	font-size : 15px;
	font-family  : ${Fonts.normalFont};
	color : ${Colors.blackColor};
	width : ${width * 0.7};
`;
const Button = styled.TouchableOpacity`
	padding : 0px 3px;
`;
const Change = styled.Text`
	font-size : 15px;
    font-family  : ${Fonts.normalFont};
	color : ${Colors.greenColor};
`;
const ShopDeliveryOption = ({ navigation, ...props }) => {
	React.useEffect(()=>{
	},[])
	const houseDetail = props.address.savedAddresses[props.address.currentAddress].houseDetail;
	const landmark = props.address.savedAddresses[props.address.currentAddress].landmark;
	const address = `${houseDetail}, ${landmark}`;
	let content = (
		<Container>
			<View>
				<Label>DELIVERING TO</Label>			
			</View>
			<View style={{flexDirection:'row', justifyContent : 'space-between'}}>
				<View style={{flexDirection:'row', alignItems : 'center'}}>
					<Entypo name="check" size={15} color={Colors.greenColor}/>			
					<Address numberOfLines={1}>{address}</Address>	
				</View>
				{
					// <Button onPress={()=>navigation.navigate('LocationSelector')}>
					// 	<Change>Change</Change>
					// </Button>
				}
			</View>
		</Container>
	);
	return content;
}
const mapStateToProps = state => {
	return {
		address : state.address,
	}
}
export default React.memo(connect(mapStateToProps,{})(ShopDeliveryOption));