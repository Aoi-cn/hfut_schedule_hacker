/* eslint-disable */

import React from 'react';
import { getIconColor } from './helper';

const DEFAULT_STYLE = {
  display: 'block',
};

const IconfileText = ({ size, color, style: _style, ...rest }) => {
  const style = _style ? { ...DEFAULT_STYLE, ..._style } : DEFAULT_STYLE;

  return (
    <svg viewBox="0 0 1024 1024" width={size + 'rem'} height={size + 'rem'} style={style} {...rest}>
      <path
        d="M821.333333 256a32 32 0 0 1 64 0v565.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334h597.333333a32 32 0 0 1 0 64H256a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V256zM341.333333 437.333333a32 32 0 0 1 0-64h341.333334a32 32 0 0 1 0 64H341.333333z m0 170.666667a32 32 0 0 1 0-64h213.333334a32 32 0 0 1 0 64H341.333333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </svg>
  );
};

IconfileText.defaultProps = {
  size: 18,
};

export default IconfileText;
