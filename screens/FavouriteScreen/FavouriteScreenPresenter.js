import React from 'react';
import {Platform} from 'react-native';
import styled from 'styled-components';

import Color from '../../constants/Colors';


const Theme = styled.View`
  background-color: ${Color.homeBackgroundColor};
  height : 100%;
`;
const ScrollView = styled.ScrollView`
  margin-bottom : 45px;
`;
const FavouriteScreenPresenter = ({navigation, ...props}) => {
  const [refresh, updateRefresh] = React.useState(false);
  let content = (
    <Theme>
    </Theme>
  );
  return content;
};

export default FavouriteScreenPresenter;