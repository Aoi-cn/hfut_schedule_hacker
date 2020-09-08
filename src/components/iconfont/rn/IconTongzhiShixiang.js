/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconTongzhiShixiang = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 511.6m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#0089FF')}
      />
      <Path
        d="M463.8 692c0 26.3 21.3 47.5 47.5 47.5 26.3 0 47.5-21.3 47.5-47.5 0-26.3-21.3-47.5-47.5-47.5-26.2-0.1-47.5 21.2-47.5 47.5zM465.9 311.2c0 26.3 21.3 47.6 47.5 47.6 26.3 0 47.6-21.3 47.6-47.5v-0.1c0-26.3-21.3-47.5-47.5-47.5-26.4 0-47.6 21.3-47.6 47.5z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M705.3 629l-26.6-79.9v-95.2c0-92-74.6-166.6-166.6-166.6s-166.6 74.6-166.6 166.6v95.2L318.7 629c-10.3 31 12.7 62.8 45.4 62.8h295.7c32.7 0.2 55.8-31.8 45.5-62.8z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </Svg>
  );
};

IconTongzhiShixiang.defaultProps = {
  size: 18,
};

export default IconTongzhiShixiang;
