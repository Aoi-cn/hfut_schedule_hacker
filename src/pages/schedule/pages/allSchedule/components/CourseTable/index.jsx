import React from 'react'
import { View } from '@tarojs/components'

import CourseBox from '../CourseBox'
import './index.scss'

export default ({ weekScheduleData }) => {

  return (
    <View className='courseTable'>
      {
        weekScheduleData.map((dayScheduleData, i1) => {
          return (
            <View className='courseTable-column' key={i1}>
              {
                dayScheduleData.map((courseBoxList, i2) => (
                  <CourseBox courseBoxList={courseBoxList} key={i2} number={i2} />
                ))
              }
            </View>
          )
        })
      }
    </View>
  )
}
