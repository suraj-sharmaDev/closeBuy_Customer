import React, {Component} from 'react';
import ShopScreenCategoryPresenter from './ShopScreenCategoryPresenter';
import LoadingScreen from '../../components/LoadingScreen';

const DATA = {
  "shopId" : 2,
  "categoryName": "Beverages",
  "categoryId": "4",
  "subCategories": [
    {
      "subCategoryId": "19",
      "subCategoryName": "Coffee",
      "subCategoryChild": [
        {
          "subCategoryChildName": "Instant Coffee",
          "subCategoryChildId": "61"
        }
      ]
    },
    {
      "subCategoryId": "18",
      "subCategoryName": "Tea",
      "subCategoryChild": [
        {
          "subCategoryChildName": "Leaf & Dust Tea",
          "subCategoryChildId": "58"
        }
      ]
    },
    {
      "subCategoryId": "22",
      "subCategoryName": "Fruit Juices & Drinks",
      "subCategoryChild": [
        {
          "subCategoryChildName": "Juices",
          "subCategoryChildId": "69"
        }
      ]
    }
  ]
}
class ShopScreenCategoryContainer extends React.PureComponent {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      items : this.props.navigation.state.params.items,
      categoryId : this.props.navigation.state.params.categoryId,
      subCategoryId : this.props.navigation.state.params.subCategoryId!=undefined ? this.props.navigation.state.params.subCategoryId : null,
      subCategoryChildId :  this.props.navigation.state.params.subCategoryChildId!=undefined ? this.props.navigation.state.params.subCategoryChildId : null,
      onlineStatus : this.props.navigation.state.params.onlineStatus
    };
    // this.state = {
    //   items : DATA
    // };
  }

  render() {
    return (
      <ShopScreenCategoryPresenter 
        parentProps={this.state}
        navigation={this.props.navigation} 
      />
    );
  }
}

export default ShopScreenCategoryContainer;
