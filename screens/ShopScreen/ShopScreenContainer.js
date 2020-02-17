import React, {Component} from 'react';
import {Text} from 'react-native';
import ShopScreenPresenter from './ShopScreenPresenter';

import LoadingScreen from '../../components/LoadingScreen';
import {ShopInformation} from '../../middleware/API';
import {AlertService} from '../../middleware/AlertService';

class ShopScreenContainer extends React.PureComponent {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {isLoading: true, Shop: {}};
  }
  componentDidMount() {
    // Ajax call will get Shop actually
    // const shopId = 1;
    const shopId = this.props.navigation.state.params.shopId;
    ShopInformation(shopId)
    .then((result)=>{
      this.setState({
        Shop : result,
        isLoading : false
      })
    })
    .catch((err)=>{
      AlertService('Error','An error occurred, sorry of inconvenience!', ()=>{});
    })
  }

  render() {
    if (this.state.isLoading) {
      return <LoadingScreen/>;
    } else {
      return (
        <ShopScreenPresenter navigation={this.props.navigation} Shop={this.state.Shop} />
      );
    }
  }
}

export default ShopScreenContainer;
