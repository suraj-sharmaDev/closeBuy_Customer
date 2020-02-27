import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import ProductItem from './ProductItem';

const Container = styled.View`
  min-height : 100%;
  height : auto;
  elevation : 16;
  shadow-opacity: 0.46;
  shadow-radius: 11.14px;
  shadow-color: #000;
  shadow-offset: 5px 5px;  
  background-color : white;
  border-top-width : 1;
  border-top-color : ${Colors.boxShadowColor};
  border-top-left-radius : 20px;
  border-top-right-radius : 20px;  
  padding : 10px 20px 0px 20px;
`;
const View = styled.View``;

const ScreenBody = props => {
	React.useEffect(()=>{
		props._scrollTo(null, null, props.itemIndex);
	},[props.itemIndex]);

	const renderListFooter = () => {
		return <View style={{paddingBottom: 170}} />
	}	
	let content = (
		<Container>
			<FlatList
				ref={props.flatListRef}
				data={props.selectedSubCategory}
				numColumns={2}
				renderItem={({item, index}) => (
					<ProductItem 
						index={index}
						item={item} 
					/>
				)}
				getItemLayout={(data, index) => (
				    {length: 185.5, offset: 185.5 * index, index}
				  )}	        				
				keyExtractor={item => 'key'+item.id}
			    ListFooterComponent={renderListFooter}
				showsVerticalScrollIndicator={false}
				extraData={props.selected}
			/>
		</Container>
	);
	return content;
}

export default ScreenBody;