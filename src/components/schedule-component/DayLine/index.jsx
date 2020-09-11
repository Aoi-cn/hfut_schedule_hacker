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
          const { dayZh, dateZh, today } = dayData
          return (
            <View className='dayLine-box' key={dateZh}>
              <View className={today && 'dayLine-box-today'}>
                <View className={'dayLine-box-day ' + (today && 'dayLine-box-day-today')}>{dayZh}</View>
                <View className={'dayLine-box-date ' + (today && 'dayLine-box-date-today')}>{dateZh}</View>
              </View>
            </View>
          )
        })
      }
    </View>
  )
}
