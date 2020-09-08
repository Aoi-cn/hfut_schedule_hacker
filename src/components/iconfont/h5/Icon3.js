/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Icon3 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M514.8 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#04D8B7')}
      />
      <path
        d="M655 743.1L454.8 542.9c-24.2-24.2-24.2-63.8 0-88.1l2.5-2.5c24.2-24.2 63.8-24.2 88.1 0l200.2 200.2c24.2 24.2 24.2 63.8 0 88.1l-2.5 2.5c-24.3 24.2-63.9 24.2-88.1 0z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M427.9 262c-25.7 0-50 6-71.6 16.7l69.1 69.1c20.7 20.7 20.7 54.6 0 75.2-20.7 20.7-54.6 20.7-75.2 0l-68.6-68.6c-10 21.1-15.6 44.6-15.6 69.5 0 89.4 72.5 162 162 162 89.4 0 162-72.5 162-162S517.3 262 427.9 262z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  );
};

Icon3.defaultProps = {
  size: 18,
};

export default Icon3;
