/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconYunying = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#04D8B7')}
      />
      <path
        d="M700.8 653.8H595.6l-63.4 68c-10.3 11.1-30.1 11-40.3-0.2l-62-67.8H323.2c-28.2 0-51.2-19.6-51.2-43.5V357.5c0-23.9 23-43.5 51.2-43.5h377.6c28.2 0 51.2 19.6 51.2 43.5v252.8c0 23.9-23 43.5-51.2 43.5z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M384.8 479.9m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z"
        fill={getIconColor(color, 2, '#04D9B0')}
      />
      <path
        d="M512.8 479.9m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z"
        fill={getIconColor(color, 3, '#04D9B0')}
      />
      <path
        d="M640.8 479.9m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z"
        fill={getIconColor(color, 4, '#04D9B0')}
      />
    </svg>
  );
};

IconYunying.defaultProps = {
  size: 18,
};

export default IconYunying;
