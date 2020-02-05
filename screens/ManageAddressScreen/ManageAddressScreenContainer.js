import React, { Component } from "react";
import {connect} from 'react-redux';
import ManageAddressScreenPresenter from "./ManageAddressScreenPresenter";

class ManageAddressScreenContainer extends Component {
  static navigationOptions = {
    header : null
  };

  render() {
    return <ManageAddressScreenPresenter 
    		store={this.props.address}
    		navigation={this.props.navigation}/>;
  }
}

const mapStateToProps = state => {
	return {
		address: state.address,
	};
};
const mapDispatchToProps = dispatch => {
	return {}
};
export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageAddressScreenContainer);