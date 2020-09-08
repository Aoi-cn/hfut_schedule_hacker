/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconBangongshi = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 0, '#FFFFFF')}
      />
      <path
        d="M704 712H316c-26.4 0-48-21.6-48-48V426c0-26.4 21.6-48 48-48h388c26.4 0 48 21.6 48 48v238c0 26.4-21.6 48-48 48z"
        fill={getIconColor(color, 1, '#FFFFFF')}
      />
      <path
        d="M445 506.5c-0.1 1.8-0.2 3.7-0.2 5.5 0 37.2 30.1 67.4 67.2 67.4s67.2-30.2 67.2-67.4c0-1.9-0.2-5.7-0.2-5.7"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <path
        d="M546.1 505.6c0.4 22.9-16.1 39-34.6 38.8-18.6-0.1-33.5-17.5-33.3-38.8h67.9M433 378v-33.1c0-5.8 4.7-10.5 10.5-10.5h137c5.8 0 10.5 4.7 10.5 10.5V378h34v-41c0-17.6-14.4-32-32-32H430c-17.6 0-32 14.4-32 32v41h35z"
        fill={getIconColor(color, 3, '#FFFFFF')}
      />
      <path
        d="M268 473h484v33H268z"
        fill={getIconColor(color, 4, '#FFFFFF')}
      />
      <path
        d="M512 512m-448 0a448 448 0 1 0 896 0 448 448 0 1 0-896 0Z"
        fill={getIconColor(color, 5, '#FE543E')}
      />
      <path
        d="M704 712H316c-26.4 0-48-21.6-48-48V426c0-26.4 21.6-48 48-48h388c26.4 0 48 21.6 48 48v238c0 26.4-21.6 48-48 48z"
        fill={getIconColor(color, 6, '#FFFFFF')}
      />
      <path
        d="M445 506.5c-0.1 1.8-0.2 3.7-0.2 5.5 0 37.2 30.1 67.4 67.2 67.4s67.2-30.2 67.2-67.4c0-1.9-0.2-5.7-0.2-5.7"
        fill={getIconColor(color, 7, '#FE543E')}
      />
      <path
        d="M546.1 505.6c0.4 22.9-16.1 39-34.6 38.8-18.6-0.1-33.5-17.5-33.3-38.8h67.9M433 378v-33.1c0-5.8 4.7-10.5 10.5-10.5h137c5.8 0 10.5 4.7 10.5 10.5V378h34v-41c0-17.6-14.4-32-32-32H430c-17.6 0-32 14.4-32 32v41h35z"
        fill={getIconColor(color, 8, '#FFFFFF')}
      />
      <path
        d="M268 473h484v33H268z"
        fill={getIconColor(color, 9, '#FE543E')}
      />
    </svg>
  );
};

IconBangongshi.defaultProps = {
  size: 18,
};

export default IconBangongshi;
