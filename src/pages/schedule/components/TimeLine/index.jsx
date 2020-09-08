import React from 'react'
import { View } from '@tarojs/components'

import './index.less'

export default () => {

  return (
    <View className='timeLine'>

      {
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((timeIndex) => {
          return (
            <View className='timeLine-time' key={timeIndex}>{timeIndex}</View>
          )
        })
      }

    </View>
  )
}
