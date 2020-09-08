/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const IconIconTest = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 685.248l-278.624-278.624 45.248-45.248L512 594.752l233.376-233.376 45.248 45.248z"
        fill={getIconColor(color, 0, '#181818')}
      />
    </Svg>
  );
};

IconIconTest.defaultProps = {
  size: 18,
};

export default IconIconTest;
