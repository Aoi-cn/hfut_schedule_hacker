import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { AtTag, AtIcon } from 'taro-ui'

import './index.less'

export default class NavBar extends Component {

  handleClick(value) {
    console.log(value)
  }
  
  render() {
    const { 
      tabList = [], 
      menuList = [], 
      onSetCurrent, 
      onShowMenuHandle, 
      currentTag = 0, 
      showMenu,
      showRight = true
    } = this.props;

    return (
      <View className='nav-bar'>
        <View className='nav-bar-left'>
          {tabList.map((item, Index) =>
            <AtTag
              key={item}
              name={`${Index}`}
              active={currentTag == Index}
              onClick={() => onSetCurrent(item, Index)}
            >
              {item}
            </AtTag>
          )}
        </View>

        {showRight && <View className={`nav-bar-right ${showMenu && 'nav-bar-right_open'}`}>
          <View
            onClick={() => onShowMenuHandle(!showMenu)}
          >
            <AtIcon className='nav-bar-right-icon' prefixClass='iconfont' value='plus' size='24' color='#fff'></AtIcon>
          </View>
        </View>}

        {
          showMenu &&
          <View className='nav-bar-menu'>
            {
              menuList.map((item) =>
                <View
                  key={item}
                  className='nav-bar-menu-item'
                  onClick={() => onSetCurrent(item.handle.type, item.handle.value)}
                >
                  <AtIcon prefixClass='iconfont' value={item.icon} size='20' color='#202124' style='margin-top: 8rpx;'></AtIcon>
                  <View className='nav-bar-menu-item-text'>{item.value}</View>
                </View>
              )
            }
          </View>
        }
      </View>
    )
  }
}
