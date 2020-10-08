/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconmoreandroid = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M417.696 224c0-52.928 43.072-96 96-96s96 43.072 96 96-43.072 96-96 96S417.696 276.928 417.696 224z"
        fill={getIconColor(color, 0, '#333333')}
      />
      <path
        d="M417.696 512c0-52.928 43.072-96 96-96s96 43.072 96 96-43.072 96-96 96S417.696 564.928 417.696 512z"
        fill={getIconColor(color, 1, '#333333')}
      />
      <path
        d="M417.696 800c0-52.928 43.072-96 96-96s96 43.072 96 96-43.072 96-96 96S417.696 852.928 417.696 800z"
        fill={getIconColor(color, 2, '#333333')}
      />
    </svg>
  );
};

Iconmoreandroid.defaultProps = {
  size: 18,
};

export default Iconmoreandroid;
