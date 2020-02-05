import React, { Component } from 'react';
import { Container } from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import {configureStore, persistor} from './store/store';
import AuthNavigator from "./navigation/AuthNavigator";
import GeneralStatusBar from "./components/GeneralStatusBar";

export default class App extends Component
{
  constructor(props)
  {
    super(props);
  }
  render()
  {
    return(
      <Container>
        <GeneralStatusBar backgroundColor="#FFFFFF" barStyle="dark-content"/>
        <Provider store = { configureStore }>
          <PersistGate loading={null} persistor={persistor}>
            <AuthNavigator />
          </PersistGate>        
        </Provider>
      </Container>
    );
  }
}