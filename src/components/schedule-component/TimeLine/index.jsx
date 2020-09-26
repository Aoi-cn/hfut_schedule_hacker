import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'

export default () => {

  return (
    <View className='timeLine'>

      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((timeIndex) => {
          return (
            <View className={`timeLine-time timeLine-time-${timeIndex}`} key={timeIndex}>{timeIndex}</View>
          )
        })
      }

    </View>
  )
}
