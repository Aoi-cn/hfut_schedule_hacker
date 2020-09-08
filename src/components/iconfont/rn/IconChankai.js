/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconChankai = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#04D8B7')}
      />
      <Path
        d="M693 367.4h-76.3l-32.4-48.6c-3.5-5.8-9.3-9.3-16.2-9.3H454.7c-6.9 0-12.7 3.5-16.2 9.3l-32.4 48.6h-76.3c-31.2 0-57.8 25.4-57.8 57.8v231.3c0 31.2 25.4 57.8 57.8 57.8h364.3c31.2 0 57.8-25.4 57.8-57.8V425.3c-1.1-32.4-26.5-57.9-58.9-57.9z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M512 542m-94.8 0a94.8 94.8 0 1 0 189.6 0 94.8 94.8 0 1 0-189.6 0Z"
        fill={getIconColor(color, 2, '#04D8B7')}
      />
      <Path
        d="M512 542m-56.7 0a56.7 56.7 0 1 0 113.4 0 56.7 56.7 0 1 0-113.4 0Z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
    </Svg>
  );
};

IconChankai.defaultProps = {
  size: 18,
};

export default IconChankai;
