import React from "react";
import { Dimensions, View } from 'react-native';
import MapView from "react-native-maps";
import styled from "styled-components";

import CustomMap from '../../constants/CustomMap.json';
import MapTools from './MapTools';

const MapContainer = styled.View` 
  height : 100%;
  z-index : 14;
`;
const {height, width} = Dimensions.get('window');
const MapDisplay = (props) => {
  const [show, updateShow] = React.useState(true);
  const screenCheck = (event) => {
    if(event.nativeEvent.layout.height < height*0.4) updateShow(false);
    else updateShow(true);
  }
  let content = (
    <MapContainer onLayout={event=> screenCheck(event)}>
      <MapView
        style={{ height : '100%'}}
        minZoomLevel={10}
        ref={props._mapRef}
        initialRegion={props.userLocation}
        showsUserLocation = {true}
        onRegionChangeComplete={props.onRegionChange}
      />
      {
        show 
        ?
          <MapTools />
        :
          null
      }
    </MapContainer>  
  );
  return content;
};

export default MapDisplay;
