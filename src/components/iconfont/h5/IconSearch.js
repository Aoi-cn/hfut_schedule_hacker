/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconsearch = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M192 448c0-141.152 114.848-256 256-256s256 114.848 256 256-114.848 256-256 256-256-114.848-256-256z m710.624 409.376l-206.88-206.88A318.784 318.784 0 0 0 768 448c0-176.736-143.264-320-320-320S128 271.264 128 448s143.264 320 320 320a318.784 318.784 0 0 0 202.496-72.256l206.88 206.88 45.248-45.248z"
        fill={getIconColor(color, 0, '#181818')}
      />
    </svg>
  );
};

Iconsearch.defaultProps = {
  size: 18,
};

export default Iconsearch;
