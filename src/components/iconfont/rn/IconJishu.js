/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconJishu = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#0089FF')}
      />
      <Path
        d="M719.8 659.4H315.5c-21.6 0-39.2-17.6-39.2-39.2V374.3c0-21.6 17.6-39.2 39.2-39.2h404.3c21.6 0 39.2 17.6 39.2 39.2v245.9c0 21.5-17.7 39.2-39.2 39.2zM453.2 676.9L423.4 723c-1.7 5.8 6 11.1 16 11.1h156.8c10.1 0 17.7-5.3 16-11.1l-29.8-46.1H453.2z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </Svg>
  );
};

IconJishu.defaultProps = {
  size: 18,
};

export default IconJishu;
