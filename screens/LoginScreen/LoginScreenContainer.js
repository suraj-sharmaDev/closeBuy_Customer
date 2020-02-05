import React, { Component } from "react";
import LoginScreenPresenter from "./LoginScreenPresenter";
import {Login} from "../../middleware/API"; 
import {AlertService} from '../../middleware/AlertService';

class LoginScreenContainer extends Component {
  static navigationOptions = {
    header : null
  };
  constructor(props){
    super(props);
  }
  componentWillMount(){
  }

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
    return (
      <LoginScreenPresenter
        login={this.onLogin}
        logout={this.onLogout}
      />
    );
  }
}

export default React.memo(LoginScreenContainer);