import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import IconFont from '../../../../components/iconfont'
import './index.less'

export default (props) => {
  const { isOpened, onClose, name, clazzRoom, teacher, timeRange, lessonType, weekIndexes, studentClazzes, studentNumber } = props

  let clazzString = ''
  if (studentClazzes) {
    studentClazzes.map((clazz) => {
      clazzString += clazz
      clazzString += (clazz === studentClazzes[studentClazzes.length - 1] ? '' : '、')
    })
  }

  let weekString = ''
  if (weekIndexes) {
    weekIndexes.map((weekIndex) => {
      weekString += weekIndex
      weekString += (weekIndex === weekIndexes[weekIndexes.length - 1] ? '' : ',')
    })
  }


  // icon先不要了啊
  const items = [
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>教室：</Text><Text>{clazzRoom}</Text></>,
      icon: '',
    },
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>老师：</Text><Text>{teacher}</Text></>,
      icon: '',
    },
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>时间：</Text><Text>{timeRange}</Text></>,
      icon: '',
    },
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>课堂人数：</Text><Text>{studentNumber}</Text></>,
      icon: '',
    },
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>开设周目：</Text><Text>{weekString}</Text></>,
      icon: '',
    },
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>课程类别：</Text><Text>{lessonType}</Text></>,
      icon: '',
    },
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>上课班级：</Text><Text>{clazzString}</Text></>,
      icon: '',
    },
  ]

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='courseDetailFloatLayout'
      onClose={onClose}
    >
      <View className='courseDetailFloatLayout-header'>{name}</View>

      <View className='courseDetailFloatLayout-content'>
        {
          items.map((item, index) => (
            <View className='courseDetailFloatLayout-content-item' key={`thisis${index}`}>
              <IconFont name={item.icon} />
              <Text>{item.value}</Text>
            </View>
          ))
        }
      </View>

      <View className='courseDetailFloatLayout-footer'>

      </View>
    </AtFloatLayout>
  )
}
