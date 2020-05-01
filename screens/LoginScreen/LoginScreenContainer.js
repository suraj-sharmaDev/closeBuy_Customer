import React, { Component } from "react";
import GeolocationService from '../../middleware/GeolocationService';
import LoginScreenPresenter from "./LoginScreenPresenter";
import {Login, GeoName} from "../../middleware/API"; 
import {AlertService} from '../../middleware/AlertService';

class LoginScreenContainer extends Component {
  static navigationOptions = {
    header : null
  };
  constructor(props){
    super(props);
    this.state = {
      isLoading : false,
      country : 'IN'
    }
  }
  componentDidMount(){
    // GeolocationService(true, ()=>{}, this.getCurrentLocation, false);
  }
  getCurrentLocation = (data) => {
    //find user geographic location to find the country of residence
    GeoName(data.latitude,data.longitude)
    .then((result)=>{
      this.setState({
        isLoading : false,
        country : result
      })
    })
    .catch((err)=>{
      console.log(err)
    })
  };
  onLogin = (mobile) => {
    let formData = new FormData();
    formData.append('mobile', mobile);
    //Call the API
    Login(formData)
    .then((value)=>{
      if(value.error){
        AlertService('Failed', 'Your Login Information is incorrect',()=>{});
      }else{
        value.customerMobile=mobile;
        this.props.loginHandler(value);
      }
    })
    .catch((err)=>AlertService('Error', 'Please check your Internet connection and try again!',()=>{}));
  }

  onLogout = () => {
  this.props.logoutHandler();
  }
  render() {
    if(!this.state.isLoading){
      return (
        <LoginScreenPresenter
          login={this.onLogin}
          logout={this.onLogout}
          country={this.state.country}
        />
      );
    }else{
      return null
    }
  }
}

export default React.memo(LoginScreenContainer);