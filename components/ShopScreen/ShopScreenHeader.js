import React from 'react';
import styled from 'styled-components';

import {height, width} from '../../constants/Layout';
import ShopScreenHeaderButtons from "./ShopScreenHeaderButtons";
import SearchInShop from "./SearchInShop";
import ShopInfoCard from "./ShopInfoCard";
import ShopDeliveryOption from "./ShopDeliveryOption";

const View = styled.View``;

const ShopScreenHeader = ({Shop,...props}) => {
	const [searchActive, updateSearchActive] = React.useState(false);
	let content = (
		<React.Fragment>
			<ShopScreenHeaderButtons
				navigation={props.navigation}
				active={searchActive}
				updateActive={() => updateSearchActive(!searchActive)}
			/>
			<ShopInfoCard 
				name={Shop.dist_point_name} 
				category={Shop.dist_category} 
				rating={Shop.rating}
			/>	
			<ShopDeliveryOption 
				navigation={props.navigation} 
			/>	
			<SearchInShop
				shopId={props.shopId}
				searchHandler={props.searchHandler}
				active={searchActive}
				updateActive={() => updateSearchActive(!searchActive)}
			/>
		</React.Fragment>
	);
	return content;
}

export default ShopScreenHeader;