import React from 'react'
import { View } from '@tarojs/components'

import './index.less'

export default ({ courseBoxData }) => {
  const { name="", clazzRoom, color } = courseBoxData

  return (
    <View className='courseBox'>
      <View className={`courseBox-course ` + `courseBox-course-${color}`}>
        <View className='courseBox-course-name'>{name.length <= 10 ? name : (name.slice(0, 8) + "...")}</View>
        <View className='courseBox-course-clazzRoom'>{clazzRoom}</View>
      </View>
    </View>
  )
}
