/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconWodeShezhi = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M831 641.4v-255c0-35.7-19.1-68.7-50-86.6L560.2 172.4c-30.9-17.9-69.1-17.9-100 0L239.4 299.8c-30.9 17.9-50 50.9-50 86.6v254.9c0 35.7 19.1 68.7 50 86.6l220.8 127.5c30.9 17.9 69.1 17.9 100 0L781 728c31-17.9 50-50.9 50-86.6z"
        fill={getIconColor(color, 0, '#FFE9C3')}
      />
      <path
        d="M510.2 908.8c-24.2 0-48.4-6.2-70-18.7L219.4 762.6c-43.2-24.9-70-71.4-70-121.2v-255c0-49.9 26.8-96.3 70-121.2l220.8-127.5c43.2-24.9 96.8-24.9 140 0L801 265.2c43.2 24.9 70 71.4 70 121.2v254.9c0 49.9-26.8 96.3-70 121.2L580.2 890.1c-21.6 12.4-45.8 18.7-70 18.7z m0-709.8c-10.4 0-20.7 2.7-30 8L259.4 334.5c-18.5 10.7-30 30.6-30 52v254.9c0 21.4 11.5 41.3 30 52l220.8 127.5c18.5 10.7 41.5 10.7 60 0L761 693.3c18.5-10.7 30-30.6 30-52V386.4c0-21.4-11.5-41.3-30-52L540.2 207c-9.2-5.3-19.6-8-30-8z"
        fill={getIconColor(color, 1, '#FEAA0C')}
      />
      <path
        d="M510.2 513.9m-111.2 0a111.2 111.2 0 1 0 222.4 0 111.2 111.2 0 1 0-222.4 0Z"
        fill={getIconColor(color, 2, '#FFFFFF')}
      />
      <path
        d="M510.2 665.1c-83.4 0-151.2-67.8-151.2-151.2s67.8-151.2 151.2-151.2 151.2 67.8 151.2 151.2-67.8 151.2-151.2 151.2z m0-222.4c-39.3 0-71.2 31.9-71.2 71.2s31.9 71.2 71.2 71.2 71.2-31.9 71.2-71.2-31.9-71.2-71.2-71.2z"
        fill={getIconColor(color, 3, '#FEAA0C')}
      />
    </svg>
  );
};

IconWodeShezhi.defaultProps = {
  size: 18,
};

export default IconWodeShezhi;
