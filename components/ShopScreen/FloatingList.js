import React from 'react';
import { Dimensions } from 'react-native';
import Modal from "react-native-modal";
import styled from 'styled-components';
import Entypo from "react-native-vector-icons/Entypo";
import Color from "../../constants/Colors";
import Font from "../../constants/Fonts";

const {height, width}=Dimensions.get('window');
const Container = styled.View`
	background-color : white;
	min-height : 40px;
	max-height : ${height*0.6};
	width : ${width*0.6};
	padding : 5px 10px;
	flex-direction : column;
	justify-content : center;
	align-items : flex-start;
	border-radius : 10px;
	border-width : 1px;
	border-color : ${Color.greenColor};
`;
const View = styled.View``;
const ListItem = styled.TouchableOpacity`
	width : 100%;
	flex-direction : row;
	justify-content : space-between;
	align-items : flex-start;
`;
const Label = styled.Text`
	color : ${Color.darkGreyColor};
	text-transform : capitalize;
	font-size : 22px;
	font-family : ${Font.normalFont};
`;
const FloatingList = ({active, scroll, categoryList, updateActive}) => {
	const onCategorySelect = (yPosition) => {
		updateActive();
		scroll(yPosition);
	}
	let modalBody = (<Label>Nothing!</Label>);
	if(categoryList.length!==0){
		modalBody = (
			categoryList.map((category, index)=>(
				<ListItem key={index} onPress={()=>onCategorySelect(category.yPosition)}>
					<Label>{category.categoryName}</Label>
					<View>
						<Entypo name="chevron-right" size={30} color={Color.greenColor} />
					</View>
				</ListItem>
			))
		);
	}
	let content=(
		<Modal
		isVisible={active}
		onBackdropPress={updateActive}
		animationInTiming={50}
		animationOutTiming={50}
		deviceWidth={width}
		deviceHeight={height}
		backdropColor={'white'}
		backdropOpacity={0.6}
		style={{ justifyContent:'flex-end', alignItems:'center', paddingBottom : 25}}>
			<Container>
				{modalBody}
			</Container>
		</Modal>
	);
	return content;
}

export default FloatingList;