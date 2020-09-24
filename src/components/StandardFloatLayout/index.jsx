import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'
import CustomButton from '../CustomButton'

import './index.scss'

function StandardFloatLayout(props) {

  const { isOpened, onClose, title, content, contentAlign, buttons = [] } = props
  let BottomButtons
  if (buttons.length === 1) {
    BottomButtons = (
      <View className='standardFloatLayout-footer_btnBox'>
        <CustomButton
          value={buttons[0].value}
          onSubmit={buttons[0].onClick}
          type={buttons[0].type}
        />
      </View>)
  } else if (buttons.length === 2) {
    BottomButtons = (
      <>
        <View className='standardFloatLayout-footer_btnBox'>
          <CustomButton
            value={buttons[0].value}
            onSubmit={buttons[0].onClick}
            type={buttons[0].type}
          />
        </View>
        <View className='standardFloatLayout-footer_blank'></View>
        <View className='standardFloatLayout-footer_btnBox'>
          <CustomButton
            value={buttons[1].value}
            onSubmit={buttons[1].onClick}
            type={buttons[1].type}
          />
        </View>
      </>
    )
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
