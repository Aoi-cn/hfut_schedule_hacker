/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconTongzhiChengji = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M511.3 511.6m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#FE543E')}
      />
      <Path
        d="M722.8 711.2H302.2c-17.5 0-31.8-14.3-31.8-31.8V544.3c0-3.4 0.5-6.7 1.6-9.8 5.1-15.6 21.7-24.3 37.7-20.4L505 562.3c5 1.2 10.2 1.2 15.3 0L715.4 514c15.9-3.9 32.6 4.8 37.7 20.4 1 3.1 1.6 6.4 1.6 9.8v135.2c-0.1 17.5-14.4 31.8-31.9 31.8z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <Path
        d="M503.7 529.5c5 1.2 10.2 1.2 15.3 0l185.5-45.8V345.4c0-17.6-14.4-32-32-32h-320c-17.6 0-32 14.4-32 32v138.9l183.2 45.2z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <Path
        d="M597.5 398.1h-170c-8.2 0-15-6.7-15-15v-2c0-8.2 6.7-15 15-15h170c8.2 0 15 6.7 15 15v2c0 8.2-6.7 15-15 15z"
        fill={getIconColor(color, 3, '#FE543E')}
      />
    </Svg>
  );
};

IconTongzhiChengji.defaultProps = {
  size: 18,
};

export default IconTongzhiChengji;
