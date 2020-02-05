import React from 'react';
import {FlatList} from 'react-native';
import styled from 'styled-components';
import ShopInfo from './ShopInfo';
import ItemCard from './ItemCard';
import CouponCard from './CouponCard';
import BillCard from './BillCard';

const Container = styled.View``;

const CartBody = props => {
	const totalAmountPreserver = (amount) => {
		totalAmount = amount;
	}
	const couponReedem = () => {
		props.navigation.navigate('CouponReedem', {totalAmount : totalAmount});
	}
	let content = (
		<Container>
			<ShopInfo
				shopId={props.store.shopId}
				navigation={props.navigation}
			/>
			{
				props.store.items.map((item, index)=>(
					<ItemCard
						key={index}
						info={item}
						store={props.store}
						refresh={props.refresh}
						onIncrement={props.onIncrement}
						onDecrement={props.onDecrement}
					/>
				))
			}
			<CouponCard couponReedem={couponReedem}/>
			<BillCard 
				store={props.store.items} 
				deliveryFee={props.deliveryFee} 
				discountAmount={props.discountAmount} 
				distance={props.distance}
				totalAmountPreserver={totalAmountPreserver}
			/>
		</Container>
	);
	return content;
};

export default CartBody;