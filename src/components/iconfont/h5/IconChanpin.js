/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconChanpin = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#0089FF')}
      />
      <path
        d="M285 644.7l208.9 118.6V526.1L285 407.6v237.1z m244.1-118.5v237.2L738 644.7V407.6L529.1 526.2zM510.4 260L302.8 380.5l209.7 116.7 207.6-120.5L510.4 260z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
    </svg>
  );
};

IconChanpin.defaultProps = {
  size: 18,
};

export default IconChanpin;
