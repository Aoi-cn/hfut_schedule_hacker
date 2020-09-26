import React from 'react'
import { View } from '@tarojs/components'

import CourseBox from '../CourseBox'
import './index.scss'

export default ({ weekScheduleData }) => {

  return (
    <View className='courseTable'>
      {
        weekScheduleData.map((dayScheduleData, i1) => {
          const boxTypeList = []
          dayScheduleData.map((courseBoxList, boxi) => {
            const { timeIndexes = [] } = courseBoxList[0]
            const boxType = timeIndexes[timeIndexes.length - 1] - timeIndexes[0]
            if (boxType) {
              boxTypeList.push(boxType)
            } else {
              // 控制空课程的长度
              if (boxi === 0) {
                boxTypeList.push(1)
              } else if (boxi === 1 && boxTypeList[0] === 1) {
                boxTypeList.push(1)
              } else if (boxi === 1 && boxTypeList[0] === 2) {
                boxTypeList.push(0)
              } else if (boxi === 1 && boxTypeList[0] === 3) {
                boxTypeList.push(null)

              } else if (boxi === 2) {
                boxTypeList.push(1)
              }
              
              else if (boxi === 3 && boxTypeList[2] === 1) {
                boxTypeList.push(1)
              } else if (boxi === 3 && boxTypeList[2] === 2) {
                boxTypeList.push(0)
              } else if (boxi === 3 && boxTypeList[2] === 3) {
                boxTypeList.push(null)
              } else {
                boxTypeList.push(null)
              }
            }
          })

          return (
            <View className='courseTable-column' key={i1}>
              {
                dayScheduleData.map((courseBoxList, i2) => (
                  <CourseBox boxType={boxTypeList[i2]} courseBoxList={courseBoxList} key={i2} number={i2} />
                ))
              }
            </View>
          )
        })
      }
    </View>
  )
}
