/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconshuju = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 938.666667C276.362667 938.666667 85.333333 747.637333 85.333333 512S276.362667 85.333333 512 85.333333s426.666667 191.029333 426.666667 426.666667-191.029333 426.666667-426.666667 426.666667z m0-64c200.298667 0 362.666667-162.368 362.666667-362.666667S712.298667 149.333333 512 149.333333 149.333333 311.701333 149.333333 512s162.368 362.666667 362.666667 362.666667z m8.213333-265.674667l-81.429333-88.704-95.754667 99.264a32 32 0 1 1-46.058666-44.437333l119.36-123.733334a32 32 0 0 1 46.613333 0.576l81.792 89.109334 136.608-136.992a32 32 0 1 1 45.312 45.184l-160.213333 160.682666a32 32 0 0 1-46.24-0.96z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Iconshuju.defaultProps = {
  size: 18,
};

export default Iconshuju;
