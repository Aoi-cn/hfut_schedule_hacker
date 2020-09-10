/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconAixinFilled = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 919.194002l-64.352657-58.361199C219.085764 653.353378 68.191078 516.438079 68.191078 348.900342c0-136.915299 107.180068-244.094344 244.094344-244.094344 77.222779 0 151.3388 35.948747 199.713554 92.53451 48.374754-56.585763 122.490775-92.53451 199.713554-92.53451 136.915299 0 244.094344 107.180068 244.094344 244.094344 0 167.537737-150.894685 304.453037-379.456265 511.933485L512 919.194002z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconAixinFilled.defaultProps = {
  size: 18,
};

export default IconAixinFilled;
