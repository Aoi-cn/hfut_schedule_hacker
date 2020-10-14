import React from 'react'
import { View } from '@tarojs/components'


export default ({ boxType, courseBoxList, number }) => {
  const courseBoxData = courseBoxList[0] ? courseBoxList[0] : {}
  const { name = "", clazzRoom, color } = courseBoxData

  if (!boxType && boxType !== 0) { return <View className='courseBox-null'></View> }

  if (boxType === 0) {
    return null
  }

  return (
    <View className={`courseBox courseBox-${number} courseBox-boxType_${boxType}`}>
      <View className={`courseBox-course courseBox-course-boxType_${boxType} courseBox-boxColor-${color}`}>
        <View className={`courseBox-course-name courseBox-fontColor-${color}`}>{name.length <= 8 ? name : (name.slice(0, 7) + "...")}</View>
        <View className={`courseBox-course-clazzRoom courseBox-fontColor-${color}`}>{clazzRoom}</View>
      </View>
    </View>
  )
}
