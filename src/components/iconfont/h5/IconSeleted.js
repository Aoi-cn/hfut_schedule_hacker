/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconSeleted = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M235.946667 472.938667l-45.226667 45.312 210.090667 209.514666 432.362666-427.690666-45.013333-45.482667-387.157333 382.976z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconSeleted.defaultProps = {
  size: 18,
};

export default IconSeleted;
