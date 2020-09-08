/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconWodeGuanyu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M452.9 193.1l-248 180.2c-35.3 25.7-50.1 71.2-36.6 112.7L263 777.6c13.5 41.5 52.2 69.7 95.9 69.7h306.6c43.7 0 82.4-28.1 95.9-69.7L856.1 486c13.5-41.5-1.3-87-36.6-112.7l-248-180.2c-35.4-25.6-83.3-25.6-118.6 0z"
        fill={getIconColor(color, 0, '#C0F5EB')}
      />
      <Path
        d="M665.4 887.3H358.8c-61.2 0-115-39.1-133.9-97.3l-94.7-291.6c-18.9-58.2 1.6-121.5 51.2-157.4l248-180.2c49.5-36 116-36 165.5 0L843 341c49.5 36 70.1 99.2 51.2 157.4L799.4 790c-19 58.2-72.8 97.3-134 97.3z m-189-661.8l-248 180.2a60.599 60.599 0 0 0-22.1 68L301 765.3c8.2 25.1 31.4 42 57.8 42h306.6c26.4 0 49.7-16.9 57.8-42L818 473.7c8.2-25.1-0.7-52.5-22.1-68l-248-180.2c-21.4-15.6-50.1-15.6-71.5 0z"
        fill={getIconColor(color, 1, '#04D8B7')}
      />
      <Path
        d="M610.1 808.4v-92c0-55.5-45-100.5-100.5-100.5s-100.5 45-100.5 100.5v92"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <Path
        d="M650.1 808.4h-80v-92c0-33.4-27.1-60.5-60.5-60.5s-60.5 27.1-60.5 60.5v92h-80v-92c0-77.5 63-140.5 140.5-140.5s140.5 63 140.5 140.5v92z"
        fill={getIconColor(color, 3, '#04D8B7')}
      />
    </Svg>
  );
};

IconWodeGuanyu.defaultProps = {
  size: 18,
};

export default IconWodeGuanyu;
