/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconIconSelectedFill = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 32C248 32 32 248 32 512s216 480 480 480 480-216 480-480S776 32 512 32z m225.6 366.4l-272 272c-12.8 12.8-32 12.8-44.8 0l-136-136c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l113.6 113.6 249.6-249.6c12.8-12.8 32-12.8 44.8 0 12.8 12.8 12.8 32 0 44.8z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconIconSelectedFill.defaultProps = {
  size: 18,
};

export default IconIconSelectedFill;
