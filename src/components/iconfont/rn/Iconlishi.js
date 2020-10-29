/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconlishi = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 68.266667C266.922667 68.266667 68.266667 266.922667 68.266667 512s198.656 443.733333 443.733333 443.733333 443.733333-198.656 443.733333-443.733333S757.077333 68.266667 512 68.266667z m0 68.266666c207.36 0 375.466667 168.106667 375.466667 375.466667s-168.106667 375.466667-375.466667 375.466667S136.533333 719.36 136.533333 512 304.64 136.533333 512 136.533333z"
        fill={getIconColor(color, 0, '#444444')}
      />
      <Path
        d="M546.133333 307.2v206.5408l142.148267 126.344533-45.3632 51.029334L477.866667 544.392533V307.2z"
        fill={getIconColor(color, 1, '#00B386')}
      />
    </Svg>
  );
};

Iconlishi.defaultProps = {
  size: 18,
};

export default Iconlishi;
