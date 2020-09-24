import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtButton } from 'taro-ui'

import './index.scss'

function StandardFloatLayout(props) {

  const { isOpened, onClose, title, content, contentAlign, buttons=[] } = props
  let BottomButtons
  if (buttons.length === 1) {
    BottomButtons = (<AtButton className={'standardFloatLayout-footer-btn standardFloatLayout-footer-btn_' + buttons[0].color} onClick={() => buttons[0].onClick()}>
      {buttons[0].value}
    </AtButton>)
  } else if (buttons.length === 2) {
    BottomButtons = (<View className='standardFloatLayout-footer-twoButtonBox'>
      <AtButton className={'standardFloatLayout-footer-btn standardFloatLayout-footer-btn_' + buttons[0].color} onClick={() => buttons[0].onClick()}>
        {buttons[0].value}
      </AtButton>
      <View  className='standardFloatLayout-footer-twoButtonBox_blank'></View>
      <AtButton className={'standardFloatLayout-footer-btn standardFloatLayout-footer-btn_' + buttons[1].color} onClick={() => buttons[1].onClick()}>
        {buttons[1].value}
      </AtButton>
    </View>)
  } else {
    BottomButtons = null
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

      <View className={`standardFloatLayout-footer standardFloatLayout-footer-${buttons.length === 0 ? 'noBtn' : ''}`}>
        {BottomButtons}
      </View>
    </AtFloatLayout>
  )
}

export default StandardFloatLayout

/*
button示例
buttons={[{
    value: '取消',
    type: 'cancel',
    onClick: () => setShowLoverBox(false)
  }, {
    value: '开始',
    color: 'call',
    onClick: handleLoverScheduleClick
  }]}
 */
