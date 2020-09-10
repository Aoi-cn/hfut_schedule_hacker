import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtButton } from 'taro-ui'

import './index.less'

export default class StandardFloatLayout extends Component {

  render() {
    const { isOpened, onClose, title, content, contentAlign, buttons } = this.props
    let BottomButtons
    if (buttons.length === 1) {
      BottomButtons = (<AtButton className={'standardFloatLayout-footer-btn standardFloatLayout-footer-btn__' + buttons[0].color} onClick={() => buttons[0].onClick()}>
          {buttons[0].value}
        </AtButton>)
    } else {
      BottomButtons = (<View className='standardFloatLayout-footer-twoButtonBox'>
        <AtButton className={'standardFloatLayout-footer-btn standardFloatLayout-footer-btn__' + buttons[0].color} onClick={() => buttons[0].onClick()}>
          {buttons[0].value}
        </AtButton>
        <AtButton className={'standardFloatLayout-footer-btn standardFloatLayout-footer-btn__' + buttons[1].color} onClick={() => buttons[1].onClick()}>
          {buttons[1].value}
        </AtButton>
      </View>)
    }

    return (
      <AtFloatLayout
        isOpened={isOpened}
        className='standardFloatLayout'
        onClose={onClose}
      >
        <View className='standardFloatLayout-header'>{title}</View>

        <View className={`standardFloatLayout-content standardFloatLayout-content-${contentAlign}`}>
          <Text className='standardFloatLayout-content-content'>{content}</Text>
        </View>

        <View className='standardFloatLayout-footer'>
          {BottomButtons}
        </View>
      </AtFloatLayout>
    )
  }
}

StandardFloatLayout.defaultProps = {
  isOpened: false,
  onClose: null,
  title: '',
  content: '',
  buttons: [{
    value: '',
    color: '',
    onClick: null,
  }]
}
