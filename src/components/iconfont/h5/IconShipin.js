/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconShipin = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#FEAA0C')}
      />
      <path
        d="M625.8 696.2H329.4c-28.2 0-51.2-23-51.2-51.2V379c0-28.3 22.9-51.2 51.2-51.2h296.4c28.2 0 51.2 23 51.2 51.2v266c0 28.2-23 51.2-51.2 51.2z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M359.2 412.2m-38.4 0a38.4 38.4 0 1 0 76.8 0 38.4 38.4 0 1 0-76.8 0Z"
        fill={getIconColor(color, 2, '#FF9900')}
      />
      <path
        d="M696 576.3l80.3 29.8c10.1 1.7 19.3-6 19.3-16V433.3c0-10.1-9.2-17.7-19.3-16L696 447v129.3z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
    </svg>
  );
};

IconShipin.defaultProps = {
  size: 18,
};

export default IconShipin;
