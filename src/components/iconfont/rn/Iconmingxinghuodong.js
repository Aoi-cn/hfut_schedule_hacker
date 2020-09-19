/* eslint-disable */

import React from 'react';
import { Svg, Path } from 'react-native-svg';
import { getIconColor } from './helper';

const Iconmingxinghuodong = ({ size, color, ...rest }) => {
  return (
    <Svg viewBox="0 0 1024 1024" width={size} height={size} {...rest}>
      <Path
        d="M512 85.333333c235.637333 0 426.666667 191.029333 426.666667 426.666667S747.637333 938.666667 512 938.666667 85.333333 747.637333 85.333333 512 276.362667 85.333333 512 85.333333z m0 64c-200.298667 0-362.666667 162.368-362.666667 362.666667s162.368 362.666667 362.666667 362.666667 362.666667-162.368 362.666667-362.666667-162.368-362.666667-362.666667-362.666667z m21.141333 132.298667a54.762667 54.762667 0 0 1 29.312 29.749333l37.365334 91.456 96.693333 7.893334c30.122667 2.453333 52.352 29.013333 49.984 59.125333a55.104 55.104 0 0 1-18.677333 37.205333l-74.08 64.597334 22.666666 96.746666c6.88 29.333333-11.008 58.944-40.309333 66.058667a54.218667 54.218667 0 0 1-41.44-6.656L512 676.416l-82.666667 51.392a54.325333 54.325333 0 0 1-75.338666-18.346667 55.317333 55.317333 0 0 1-6.4-41.056l22.666666-96.746666-74.08-64.597334a55.253333 55.253333 0 0 1-5.909333-77.098666 54.421333 54.421333 0 0 1 37.216-19.242667l96.693333-7.893333 37.365334-91.445334c11.498667-28.128 43.584-41.6 71.594666-29.749333zM512 357.109333l-30.72 75.178667a54.592 54.592 0 0 1-46.037333 33.856l-81.024 6.613333 62.165333 54.197334a55.210667 55.210667 0 0 1 17.386667 54.186666l-18.805334 80.234667 68.373334-42.506667a54.218667 54.218667 0 0 1 57.312 0l68.373333 42.506667-18.794667-80.234667a55.210667 55.210667 0 0 1 17.386667-54.186666l62.165333-54.197334-81.024-6.613333a54.592 54.592 0 0 1-46.048-33.856L512 357.109333z"
        fill={getIconColor(color, 0, '#333333')}
      />
    </Svg>
  );
};

Iconmingxinghuodong.defaultProps = {
  size: 18,
};

export default Iconmingxinghuodong;
