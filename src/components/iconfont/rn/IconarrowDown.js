/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconarrowDown = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M500.8 604.779L267.307 371.392l-45.227 45.27 278.741 278.613L779.307 416.66l-45.248-45.248z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconarrowDown.defaultProps = {
  size: 18,
};

export default IconarrowDown;
