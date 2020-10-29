/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const Iconsan = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M510.32 75.67c-9.85 0-17.87 8.01-17.87 17.88v71.56h35.77V93.55c0-9.88-7.99-17.88-17.9-17.88z"
        fill={getIconColor(color, 0, '#434A54')}
      />
      <path
        d="M510.32 147.22C273.23 147.22 81 339.44 81 576.57v3.88c30.66-38.99 78.24-64 131.67-64 64.8 0 85.22 36.8 113.07 90.68 27.83-53.87 119.8-90.68 184.58-90.68 64.83 0 156.78 36.8 184.63 90.68 27.83-53.87 48.24-90.68 113.04-90.68 53.43 0 101.01 25.01 131.67 64v-3.88c0.01-237.13-192.22-429.35-429.34-429.35z"
        fill={getIconColor(color, 1, '#DA4453')}
      />
      <path
        d="M653.45 826.97c-9.88 0-17.9 8.02-17.9 17.92 0 29.56-24.08 53.67-53.67 53.67-29.58 0-53.67-24.11-53.67-53.67V498.55h-35.77V844.9c0 49.37 40.04 89.41 89.43 89.41 49.39 0 89.43-40.04 89.46-89.41 0.02-9.91-8-17.93-17.88-17.93z"
        fill={getIconColor(color, 2, '#434A54')}
      />
      <path
        d="M510.32 516.44c64.83 0 156.78 36.8 184.63 90.62 0-272.3-112.65-405.5-155.91-458.89-9.49-0.63-19.08-0.96-28.72-0.96s-19.21 0.33-28.69 0.96c-43.26 53.39-155.89 186.6-155.89 458.95 27.83-53.87 119.81-90.68 184.58-90.68z"
        fill={getIconColor(color, 3, '#ED5564')}
      />
    </svg>
  );
};

Iconsan.defaultProps = {
  size: 18,
};

export default Iconsan;
