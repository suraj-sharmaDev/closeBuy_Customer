import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import SubCategoryButton from './SubCategoryButton';

const Container = styled.View`
	padding : 10px 10px;
`;

const ScrollMenu = props => {
	let content = (
		<Container>
			<FlatList
				data={props.subCategories}
				horizontal={true}
				renderItem={({item}) => (
					<SubCategoryButton 
						item={item} 
						selected={props.selected}
						updateSelected={props.updateSelected}
					/>
				)}
				keyExtractor={(item, index) => 'key'+index}
				extraData={props.selected}
			/>
		</Container>
	);
	return content;
}

export default ScrollMenu;