import React from 'react'
import { View } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import './index.scss'

export default (props) => {
  const { isOpened, onClose, onChange, weekIndex: weekIndex_, currentWeekIndex } = props

  const weekIndexes = []
  for (let i = 0; i < 24; i++) {
    weekIndexes.push(i)
  }

  const handleClickWeekBox = (newWeekIndex) => {
    onChange(newWeekIndex)
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='weekPicker'
      onClose={onClose}
    >

      <View className='weekPicker-content'>
        <View className='weekPicker-content-weekIndexContent'>
          {
            weekIndexes.map((weekIndex) => {
              const isChosen  = weekIndex === weekIndex_
              return (
                <View key={`key${weekIndex}`}
                  className={`weekPicker-content-weekIndexContent-week weekPicker-content-weekIndexContent-week_${isChosen ? 'chosen' : ''}`}
                  style={`opacity: ${weekIndex >= 20 ? 0 : 1}`}
                  onClick={() => handleClickWeekBox(weekIndex)}
                >
                  {currentWeekIndex === weekIndex ? '本周' : weekIndex + 1}
                </View>
              )

            })
          }
        </View>
      </View>


    </AtFloatLayout >
  )
}
