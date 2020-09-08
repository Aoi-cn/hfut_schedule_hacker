/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Icon1 = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M511.3 511.6m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#FE543E')}
      />
      <path
        d="M284.8 298s104-2.7 150.6 13.2C481.9 327.1 538.3 374 572.1 419l101.1-4.3 65.9 142.4s-88.8 18-118 27.5c0 0-35.1 15.3-51.9 52.8 0 0-5.4 16.2-11.5 48s-13.1 67-13.1 67l-142.9-66.2L406 585s-106.2-83.3-116.2-165.1-5-121.9-5-121.9z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M639.8 602.5c-8.5 4.4-34.1 19.7-48.2 49.5-0.6 1.3-1.1 2.7-1.6 4.1-1.1 3.5-3.2 11.1-5.9 22.7-3.4 14.7 4 29.8 17.8 36 17.3 7.7 46 17.7 91.6 25.9 22.3 4.1 41.5-16 36.4-38.1-6.5-28.7-16-65-26.6-89.9-6.1-14.3-21.7-22-36.7-18.3-8.4 2.1-15.8 4.1-21.5 5.9-1.9 0.6-3.6 1.3-5.3 2.2z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
    </svg>
  );
};

Icon1.defaultProps = {
  size: 18,
};

export default Icon1;
