import React from 'react'
import { View } from '@tarojs/components'

import CourseBox from '../CourseBox'

export default ({ weekScheduleData }) => {

  return (
    <View className='courseTable'>
      {
        weekScheduleData.map((dayScheduleData, i1) => {
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
