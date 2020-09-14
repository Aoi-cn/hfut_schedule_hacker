import React from 'react'
import { View } from '@tarojs/components'

import CourseBox from '../CourseBox'
import './index.less'

export default ({ weekScheduleData }) => {

  return (
    <View className='courseTable'>
      {
        weekScheduleData.map((dayScheduleData, i1) => {
          return (
            <View className='courseTable-column' key={i1}>
              {
                dayScheduleData.map((courseBoxData, i2) => (
                  <CourseBox courseBoxData={courseBoxData} key={i2} number={i2} />
                ))
              }
            </View>
          )
        })
      }
    </View>
  )
}
