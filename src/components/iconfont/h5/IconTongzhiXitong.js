/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconTongzhiXitong = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M514.8 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#04D8B7')}
      />
      <path
        d="M707.9 690.6H321.6c-25.8 0-46.7-19.2-46.7-42.9V373.5c0-23.7 20.9-42.9 46.7-42.9h386.5c25.8 0 46.7 19.2 46.7 42.9v274.3c-0.1 23.7-21 42.8-46.9 42.8z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M692.6 432.9l-170.4 79.5c-8 3.7-17.5 0.2-21.3-7.7-3.7-8-0.2-17.5 7.7-21.3L679 403.9c8-3.7 17.5-0.2 21.3 7.7 3.8 8 0.3 17.6-7.7 21.3z"
        fill={getIconColor(color, 2, '#04D8B7')}
      />
      <path
        d="M507.3 512.3L337 432.9c-8-3.7-11.5-13.3-7.7-21.3 3.7-8 13.3-11.5 21.3-7.7L521 483.4c8 3.7 11.5 13.3 7.7 21.3-3.8 7.9-13.4 11.4-21.4 7.6z"
        fill={getIconColor(color, 3, '#04D8B7')}
      />
    </svg>
  );
};

IconTongzhiXitong.defaultProps = {
  size: 18,
};

export default IconTongzhiXitong;
