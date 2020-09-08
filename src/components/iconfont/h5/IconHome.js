/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconHome = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M838.427514 958.708971H185.572486c-37.901215 0-68.721151-30.829146-68.721151-68.721151V426.637844a68.798922 68.798922 0 0 1 22.88522-51.205219L466.716654 82.836637c26.173103-23.429619 65.60109-23.387663 91.740424 0.083911l325.873906 292.544822a68.812225 68.812225 0 0 1 22.817681 51.138704v463.383746c0 37.892005-30.820959 68.721151-68.721151 68.721151zM512.553609 134.042879L185.572486 426.637844v463.349976h652.855028v-463.383746L512.537236 134.051065l0.016373-0.008186z m-0.017397 0.008186z m-22.901592-25.611307h0.167822-0.167822z"
        fill={getIconColor(color, 0, '#444444')}
      />
      <path
        d="M554.951231 838.555427h-85.901439V598.030375c0-18.977213 15.383362-34.360576 34.360576-34.360575h17.180288c18.977213 0 34.360576 15.383362 34.360575 34.360575v240.525052z"
        fill={getIconColor(color, 1, '#ffffff')}
      />
    </svg>
  );
};

IconHome.defaultProps = {
  size: 18,
};

export default IconHome;
