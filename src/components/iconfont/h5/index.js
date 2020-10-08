/* eslint-disable */

import React from 'react';
import Icondingwei from './Icondingwei';
import Iconmoreandroid from './Iconmoreandroid';
import Iconanquan from './Iconanquan';
import Iconbulletin from './Iconbulletin';
import IconarrowUpFilling from './IconarrowUpFilling';
import IconarrowDownFilling from './IconarrowDownFilling';
import Iconshibai from './Iconshibai';
import Iconceshi from './Iconceshi';
import Icontanhao from './Icontanhao';
import IconfileText from './IconfileText';
import Iconpaihangbang from './Iconpaihangbang';
import Iconshezhi from './Iconshezhi';
import Iconswap from './Iconswap';
import Iconcaidan from './Iconcaidan';
import Iconmingxinghuodong from './Iconmingxinghuodong';
import Iconwenjuan from './Iconwenjuan';
import Iconaixin from './Iconaixin';
import IconaixinFilled from './IconaixinFilled';
import Iconeye from './Iconeye';
import IconinfoCircleFill from './IconinfoCircleFill';
import Iconplus from './Iconplus';
import IconeyeClose from './IconeyeClose';
import Iconsearch from './Iconsearch';
import IconarrowRight from './IconarrowRight';
import IconarrowLift from './IconarrowLift';
import IconarrowDown from './IconarrowDown';
import Iconpersonal from './Iconpersonal';
import Iconcalendar from './Iconcalendar';
import Icongift from './Icongift';

const IconFont = ({ name, ...rest }) => {
  switch (name) {
    case 'dingwei':
      return <Icondingwei {...rest} />;
    case 'moreandroid':
      return <Iconmoreandroid {...rest} />;
    case 'anquan':
      return <Iconanquan {...rest} />;
    case 'bulletin':
      return <Iconbulletin {...rest} />;
    case 'arrow-up-filling':
      return <IconarrowUpFilling {...rest} />;
    case 'arrow-down-filling':
      return <IconarrowDownFilling {...rest} />;
    case 'shibai':
      return <Iconshibai {...rest} />;
    case 'ceshi':
      return <Iconceshi {...rest} />;
    case 'tanhao':
      return <Icontanhao {...rest} />;
    case 'file-text':
      return <IconfileText {...rest} />;
    case 'paihangbang':
      return <Iconpaihangbang {...rest} />;
    case 'shezhi':
      return <Iconshezhi {...rest} />;
    case 'swap':
      return <Iconswap {...rest} />;
    case 'caidan':
      return <Iconcaidan {...rest} />;
    case 'mingxinghuodong':
      return <Iconmingxinghuodong {...rest} />;
    case 'wenjuan':
      return <Iconwenjuan {...rest} />;
    case 'aixin':
      return <Iconaixin {...rest} />;
    case 'aixin-filled':
      return <IconaixinFilled {...rest} />;
    case 'eye':
      return <Iconeye {...rest} />;
    case 'info-circle-fill':
      return <IconinfoCircleFill {...rest} />;
    case 'plus':
      return <Iconplus {...rest} />;
    case 'eye-close':
      return <IconeyeClose {...rest} />;
    case 'search':
      return <Iconsearch {...rest} />;
    case 'arrow-right':
      return <IconarrowRight {...rest} />;
    case 'arrow-lift':
      return <IconarrowLift {...rest} />;
    case 'arrow-down':
      return <IconarrowDown {...rest} />;
    case 'personal':
      return <Iconpersonal {...rest} />;
    case 'calendar':
      return <Iconcalendar {...rest} />;
    case 'gift':
      return <Icongift {...rest} />;

  }

  return null;
};

export default IconFont;
