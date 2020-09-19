/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconcalendar = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M375.466667 64c4.693333 0 8.533333 3.84 8.533333 8.533333V128h256V72.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334c4.693333 0 8.533333 3.84 8.533333 8.533333V128h106.666667a128 128 0 0 1 128 128v554.666667a128 128 0 0 1-128 128H213.333333a128 128 0 0 1-128-128V256a128 128 0 0 1 128-128h106.666667V72.533333c0-4.693333 3.84-8.533333 8.533333-8.533333h46.933334zM874.666667 405.333333H149.333333v405.333334a64 64 0 0 0 60.245334 63.893333L213.333333 874.666667h597.333334a64 64 0 0 0 63.893333-60.245334L874.666667 810.666667V405.333333zM810.666667 192H213.333333a64 64 0 0 0-63.893333 60.245333L149.333333 256v85.333333h725.333334v-85.333333a64 64 0 0 0-60.245334-63.893333L810.666667 192z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

Iconcalendar.defaultProps = {
  size: 18,
};

export default Iconcalendar;
