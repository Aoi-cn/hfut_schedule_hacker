import React from 'react'
import { View } from '@tarojs/components'

import './index.less'

export default (props) => {
  const { dayLineData } = props
  
  if (!dayLineData) {
    return null
  }

  return (
    <View className='dayLine'>
      {
        dayLineData.map((dayData) => {
          const { dayZh, dateZh } = dayData
          return (
            <View className='dayLine-box' key={dateZh}>
              <View className='dayLine-box-day'>{dayZh}</View>
              <View className='dayLine-box-date'>{dateZh}</View>
            </View>
          )
        })
      }
    </View>
  )
}
