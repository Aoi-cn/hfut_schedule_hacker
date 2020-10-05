import React from 'react'
import { View } from '@tarojs/components'

import CourseBox from '../CourseBox'
import './index.scss'

export default ({ weekScheduleData }) => {

  return (
    <View className='courseTable'>
      {
        weekScheduleData.map((dayScheduleData, dayIndex) => {
          const boxTypeList = []
          dayScheduleData.map((courseBoxList) => {
            const { timeIndexes = [] } = courseBoxList[0]
            const boxType = timeIndexes[timeIndexes.length - 1] - timeIndexes[0] + 1
            boxTypeList.push(boxType ? boxType : 1)
          })

          boxTypeList.map((boxType, boxi) => {
            if (boxType === 2) {
              boxTypeList[boxi + 1] = 0
            } else if (boxType === 3) {
              boxTypeList[boxi + 1] = 0
              boxTypeList[boxi + 2] = 0
            } else if (boxType === 4) {
              boxTypeList[boxi + 1] = 0
              boxTypeList[boxi + 2] = 0
              boxTypeList[boxi + 3] = 0
            }
          })

          return (
            <View className='courseTable-column' key={dayIndex}>
              {
                dayScheduleData.map((courseBoxList, timeIndex) => (
                  <CourseBox
                    boxType={boxTypeList[timeIndex]}
                    courseBoxList={courseBoxList}
                    key={timeIndex}
                    dayIndex={dayIndex}
                    timeIndex={timeIndex}
                  />
                ))
              }
            </View>
          )
        })
      }
    </View>
  )
}
