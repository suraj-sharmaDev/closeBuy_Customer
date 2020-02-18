import React, { useEffect } from "react";
import { SectionList } from "react-native";
import styled from "styled-components";

import Colors from "../../constants/Colors";
import Fonts from "../../constants/Fonts";
import ShopItem from './ShopItem';

const Container = styled.View`
	flex : 1;
`;
const View = styled.View``;
const Label = styled.Text`
	font-size : 18px;
	font-family : ${Fonts.normalFont};
	color : ${Colors.darkGreyColor};
`;
const ShopScreenBody = ({ Shop, available, navigation }) => {
	useEffect(()=>{
	},[]);

	const renderSectionHeader = ({section}) => {
		return (
			<Label style={{ textTransform:'capitalize'}}>
				{section.title}
			</Label>
		);
	};

	const renderListFooter = () => {
		return <View style={{paddingBottom : 100}} />
	};	

	const extractKey = ({product_id}) => product_id	
	
	let content = (
		<Container>
	      <SectionList
	      	ref={_listRef}
	        sections={Shop}
			renderItem={({item}) => (
				<ShopItem
					data={item}
					available={available}
				/>
			)}
	        renderSectionHeader={renderSectionHeader}
	        ListFooterComponent={renderListFooter}
			getItemLayout={(data, index) => (
			    {length: 140, offset: 140 * index, index}
			  )}	        
	        onScrollToIndexFailed={()=>{}}
	        keyExtractor={extractKey}
	      />
		</Container>
	);
	return content;
}

export default React.memo(ShopScreenBody);