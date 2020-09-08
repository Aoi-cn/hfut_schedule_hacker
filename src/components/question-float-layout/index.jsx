import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtButton, AtIcon } from 'taro-ui'

import './index.less'

export default class QuestionFloatLayout extends Component {

  render() {
    const { isOpened, onClose, question, answer, doHelpHandleClick, notHelpHandleClick } = this.props

    return (
      <AtFloatLayout
        isOpened={isOpened}
        className='questionFloatLayout'
        onClose={onClose}
      >
        <View className='questionFloatLayout-header'>问题解答</View>

        <View className='questionFloatLayout-content'>
          <View className='questionFloatLayout-content-item'>
            <Text className='questionFloatLayout-content-item-title'>问题</Text>
            <Text className='questionFloatLayout-content-item-content'>{question}</Text>
          </View>
          <View className='questionFloatLayout-content-item'>
            <Text className='questionFloatLayout-content-item-title'>解答</Text>
            <Text className='questionFloatLayout-content-item-content'>{answer}</Text>
          </View>
        </View>

        <View className='questionFloatLayout-footer'>
          <AtButton className='questionFloatLayout-footer-btn questionFloatLayout-footer-btn-red' onClick={notHelpHandleClick}>
            <AtIcon
              className='questionFloatLayout-footer-btn-icon'
              prefixClass='iconfont'
              value='unlike'
              size='20'
              color='#f33f3f'
            />
            没帮助
          </AtButton>
          <AtButton className='questionFloatLayout-footer-btn questionFloatLayout-footer-btn-blue' onClick={doHelpHandleClick}>
            <AtIcon
              className='questionFloatLayout-footer-btn-icon'
              prefixClass='iconfont'
              value='like'
              size='20'
              color='#0089ff'
            />
            有帮助
          </AtButton>

        </View>
      </AtFloatLayout>
    )
  }
}

QuestionFloatLayout.defaultProps = {
  isOpened: false,
  onClose: null,
  question: '',
  answer: '',
  doHelpHandleClick: null,
  notHelpHandleClick: null,
}
