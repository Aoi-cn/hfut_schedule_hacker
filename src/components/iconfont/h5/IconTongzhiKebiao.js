/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconTongzhiKebiao = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#FEAA0C')}
      />
      <path
        d="M711.5 353.8h-43.8v22c0 24.2-19.6 43.8-43.8 43.8-24.2 0-43.8-19.6-43.8-43.8v-22H448.6v22c0 24.2-19.6 43.8-43.8 43.8-24.2 0-43.8-19.6-43.8-43.8v-22h-43.8c-24.2 0-43.8 19.6-43.8 43.8v263c0 24.2 19.6 43.8 43.8 43.8h394.5c24.2 0 43.8-19.6 43.8-43.8v-263c-0.2-24.2-19.8-43.8-44-43.8z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M403.4 310c-12.1 0-22 9.9-22 22v43.8c0 12.1 9.9 22 22 22s22-9.9 22-22V332c0-12.1-9.9-22-22-22z m219.2 0c-12.1 0-22 9.9-22 22v43.8c0 12.1 9.9 22 22 22s22-9.9 22-22V332c-0.1-12.1-9.9-22-22-22z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <path
        d="M613 511.1l-113.4 95.1c-6.7 5.7-16.9 4.8-22.5-2-5.7-6.7-4.8-16.9 2-22.5l113.4-95.1c6.7-5.7 16.9-4.8 22.5 2 5.7 6.7 4.8 16.9-2 22.5z"
        fill={getIconColor(color, 3, '#FEAA0C')}
      />
      <path
        d="M478.1 604.9L430 556.8c-6.2-6.2-6.2-16.4 0-22.6 6.2-6.2 16.4-6.2 22.6 0l48.1 48.1c6.2 6.2 6.2 16.4 0 22.6-6.2 6.2-16.3 6.2-22.6 0z"
        fill={getIconColor(color, 4, '#FEAA0C')}
      />
    </svg>
  );
};

IconTongzhiKebiao.defaultProps = {
  size: 18,
};

export default IconTongzhiKebiao;
