import React from 'react'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import { themeColors } from '../../../utils/scheduleDataTranslator'
import ColorButton from '../../ColorButton'
import './index.scss'

export default (props) => {
  const { isOpened, onClose, handleColorChange, theme } = props

  const colorList = themeColors[theme] ? themeColors[theme] : []

  const handleClick = (color) => {
    onClose()
    handleColorChange(color)
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='colorPicker'
      onClose={onClose}
    >

      <View className='colorPicker-content'>
        {
          colorList.map(colorData => (
            <View className='colorPicker-content-box' key={colorData.value}>
              <ColorButton 
                value={colorData.name} 
                theme={theme} 
                backgroundColor={colorData.value} 
                onSubmit={() => handleClick(colorData.value)}
              />
            </View>
          ))
        }
      </View>


    </AtFloatLayout >
  )
}
