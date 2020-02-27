import React, {Component} from 'react';
import ShopScreenCategoryPresenter from './ShopScreenCategoryPresenter';
import LoadingScreen from '../../components/LoadingScreen';

const DATA = {
  categoryName : 'Grocery',
  children : [
    {
      id : 1,
      name : 'tilopia',
      image : 'https://dummyimage.com/300',
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null
    },
    {
      id : 2,
      name : 'Vala',
      image : 'https://dummyimage.com/300',      
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null      
    },
    {
      id : 3,
      name : 'Chala',
      image : 'https://dummyimage.com/300',
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null
    },
    {
      id : 4,
      name : 'lung fish',
      image : 'https://dummyimage.com/300',      
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null      
    },
    {
      id : 5,
      name : 'shark',
      image : 'https://dummyimage.com/300',
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null
    },
    {
      id : 6,
      name : 'dolphin',
      image : 'https://dummyimage.com/300',      
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null      
    },        
    {
      id : 7,
      name : 'sth',
      image : 'https://dummyimage.com/300',
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null
    },
    {
      id : 8,
      name : 'mth',
      image : 'https://dummyimage.com/300',      
      subCategoryName : 'fish',
      price : 100,
      shopId : 1,
      extras : null      
    },            
    {
      id : 9,
      name : 'Sun Feast',
      image : 'https://dummyimage.com/300',      
      subCategoryName : 'Packed Food',
      price : 100,
      shopId : 1,
      extras : null      
    },
    {
      id : 10,
      name : 'Parle G',
      image : 'https://dummyimage.com/300',      
      subCategoryName : 'Packed Food',
      price : 100,
      shopId : 1,
      extras : null      
    }            
  ]
}
class ShopScreenCategoryContainer extends React.PureComponent {
  static navigationOptions = {header: null};

  constructor(props) {
    super(props);
    this.state = {
      items: this.props.navigation.state.params.items,
      selected : this.props.navigation.state.params.selected,
      itemIndex : this.props.navigation.state.params.itemIndex
    };    
    // this.state = {items: DATA};        
  }

  render() {
    return (
      <ShopScreenCategoryPresenter 
        navigation={this.props.navigation} 
        items={this.state.items}
        selected={this.state.selected}
        itemIndex={this.state.itemIndex} 
      />
    );
  }
}

export default ShopScreenCategoryContainer;
