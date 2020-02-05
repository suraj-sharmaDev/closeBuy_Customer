import React, {Component} from 'react';
import {connect} from 'react-redux';
import {incItem, decItem, trackStart, trackEnd, statusUpdate} from '../../store/actions/cart';
import CartScreenPresenter from './CartScreenPresenter';
import {withNavigationFocus} from 'react-navigation';

import NetworkServiceOffline from '../../components/NetworkServiceOffline';
import NetworkService from '../../middleware/NetworkService';

class CartScreenContainer extends Component {
	static navigationOptions = {
		header: null,
	};
	constructor(props) {
		super(props);
		this.state = {
			distance : 10,
			deliveryFee : 20,
	  		isOnline : null			
		}
	}
    componentWillMount()
    {
    	NetworkService(true, this.serviceUpdate);
    }
    serviceUpdate = (state) => {
  	  this.setState({
  	    	isOnline : state
  	  })
    }
    componentWillUnMount(){
  	   NetworkService(false, ()=>{});  	
    }	
	onIncrement = (data) => {
		this.props.incrementItem(data);
	};

	onDecrement = productId => {
		this.props.decrementItem(productId);
	};
	render() {
		let focused = this.props.isFocused;
		//To save memory leakage we see whether current screen is focused or not
		//but the screen should be active in background when tracking is enabled
	  	if(this.state.isOnline){
		    return <CartScreenPresenter
					focused={focused}
					navigation={this.props.navigation}
					userId={this.props.user.userId}
					userMobile={this.props.user.userMobile}
					store={this.props.cart}
					address={this.props.address}
					onIncrement={this.onIncrement}
					onDecrement={this.onDecrement}
					trackDelivery={this.props.onTrackStart}
					completeDelivery={this.props.onTrackEnd}
					onStatusUpdate={this.props.onStatusUpdate}
					distance={this.state.distance}
					deliveryFee={this.state.deliveryFee}
			/>
	  	}else{
	  		return <NetworkServiceOffline />;
	  	}		
		// if(focused || this.props.cart.tracking){
		// 	return (
		// 		<CartScreenPresenter
		// 			focused={focused}
		// 			navigation={this.props.navigation}
		// 			userId={this.props.userId}
		// 			store={this.props.cart}
		// 			address={this.props.address}
		// 			onIncrement={this.onIncrement}
		// 			onDecrement={this.onDecrement}
		// 			trackDelivery ={this.props.onTrackStart}
		// 			completeDelivery={this.props.onTrackEnd}
		// 			onStatusUpdate={this.props.onStatusUpdate}
		// 	        distance={this.state.distance}
	 //                deliveryFee = {this.state.deliveryFee}				
		// 		/>
		// 	);
		// }else{
		// 	return null;
		// }
	}
}

const mapStateToProps = state => {
	return {
		user : state.user,
		cart: state.cart,
		address: state.address
	};
};
const mapDispatchToProps = dispatch => {
	return {
		incrementItem: data => {
			dispatch(incItem(data));
		},
		decrementItem: productId => {
			dispatch(decItem(productId));
		},
		onTrackStart: (data) => {
			dispatch(trackStart(data));
		},
		onTrackEnd: (data) => {
			dispatch(trackEnd(data));
		},		
	    onStatusUpdate: data => {
	      dispatch(statusUpdate(data));
	    },		
	};
};
export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(withNavigationFocus(CartScreenContainer));