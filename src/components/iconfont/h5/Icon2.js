/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Icon2 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 511.6m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#0089FF')}
      />
      <path
        d="M773.8 469.6L682 307.5c-4.2-7.4-12.4-12-21.4-12H363.5c-9 0-17.3 4.6-21.4 12l-91.8 162.1c-4.6 8.2-3.3 18.1 3.3 25.1L494 747.2c8.8 9.3 24.1 10.2 34.1 2 0.8-0.6 1.5-1.3 2.2-2l240.4-252.5c6.4-7 7.7-17 3.1-25.1z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M586 409.6H438c-8.8 0-16-7.2-16-16s7.2-16 16-16h148c8.8 0 16 7.2 16 16s-7.2 16-16 16z"
        fill={getIconColor(color, 2, '#0089FF')}
      />
    </svg>
  );
};

Icon2.defaultProps = {
  size: 18,
};

export default Icon2;
