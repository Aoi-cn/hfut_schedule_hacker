import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'

export default (props) => {
  let { dayLineData } = props

  if (!dayLineData) {
    dayLineData = [
      {dayZh: "周一", dateZh: "10/01", today: false},
      {dayZh: "周二", dateZh: "10/02", today: false},
      {dayZh: "周三", dateZh: "10/03", today: false},
      {dayZh: "周四", dateZh: "10/04", today: false},
      {dayZh: "周五", dateZh: "10/05", today: false},
      {dayZh: "周六", dateZh: "10/06", today: false},
      {dayZh: "周日", dateZh: "10/07", today: false},
    ]
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
