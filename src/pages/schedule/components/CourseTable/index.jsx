import React from 'react'
import { View } from '@tarojs/components'

import CourseBox from '../CourseBox'
import './index.less'

export default ({ weekScheduleData }) => {

  const totleTimeIndexes = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]]

  return (
    <View className='courseTable'>
      {
        weekScheduleData.map((dayScheduleData, i1) => {
          return (
            <View className='courseTable-column' key={i1}>
              {
                totleTimeIndexes.map((totleTimeIndex, i2) => {
                  const courseBoxData = dayScheduleData.filter((courseBoxData_) => (totleTimeIndex[0] === courseBoxData_.timeIndexes[0]))[0]
                  return <CourseBox courseBoxData={courseBoxData ? courseBoxData : []} key={i2} />
                })
              }
            </View>
          )

        })
      }
    </View>
  )
}
