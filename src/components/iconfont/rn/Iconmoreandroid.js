/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconmoreandroid = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M417.696 224c0-52.928 43.072-96 96-96s96 43.072 96 96-43.072 96-96 96S417.696 276.928 417.696 224z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <Path
        d="M417.696 512c0-52.928 43.072-96 96-96s96 43.072 96 96-43.072 96-96 96S417.696 564.928 417.696 512z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <Path
        d="M417.696 800c0-52.928 43.072-96 96-96s96 43.072 96 96-43.072 96-96 96S417.696 852.928 417.696 800z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </Svg>
  );
};

Iconmoreandroid.defaultProps = {
  size: 18,
};

export default Iconmoreandroid;
