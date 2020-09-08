/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconIconSelectedFill = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 32C248 32 32 248 32 512s216 480 480 480 480-216 480-480S776 32 512 32z m225.6 366.4l-272 272c-12.8 12.8-32 12.8-44.8 0l-136-136c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l113.6 113.6 249.6-249.6c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

IconIconSelectedFill.defaultProps = {
  size: 18,
};

export default IconIconSelectedFill;
