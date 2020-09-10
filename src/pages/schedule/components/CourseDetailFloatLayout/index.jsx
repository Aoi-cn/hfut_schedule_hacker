import React from 'react'
import { useDispatch } from 'react-redux'
import { View, Text, Picker } from '@tarojs/components'
import { AtFloatLayout, AtButton } from 'taro-ui'

import { updateSingleCourseColor } from '../../../../actions/schedule'
import IconFont from '../../../../components/iconfont'
import './index.less'

export default (props) => {
  const { isOpened, onClose, name, clazzRoom, teacher, timeRange, lessonCode, studentClazzes, studentNumber, color } = props
  const dispatch = useDispatch()

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
      value: <><Text className='courseDetailFloatLayout-itemTitle'>课程ID：</Text><Text>{lessonCode}</Text></>,
      icon: '',
    },
    {
      value: <><Text className='courseDetailFloatLayout-itemTitle'>上课班级：</Text><Text>{studentClazzes}</Text></>,
      icon: '',
    },
  ]

  const colorPickerRange = [
    { name: '靛青', value: 'blue' },
    { name: '黛蓝', value: 'darkBlue' },
    { name: '胭脂', value: 'red' },
    { name: '秋香', value: 'yellow' },
    { name: '竹青', value: 'green' },
    { name: '牙白', value: 'gray' },
    { name: '鸦青', value: 'darkGray' },
    { name: '驼色', value: 'brown' },
    { name: '炎', value: 'orange' },
    { name: '黛', value: 'purple' },
  ]

  let selectedColorIndex = 0
  colorPickerRange.map((colorInfo, index) => {
    if (colorInfo.value === color) {
      selectedColorIndex = index
    }
  })

  const handlePickerChange = (e) => {
    const colorIndex = parseInt(e.detail.value)
    const newColor = colorPickerRange[colorIndex].value
    dispatch(updateSingleCourseColor({ newColor, courseDetailFLData: props }))
  }

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
        <Picker mode='selector'
          range={colorPickerRange}
          rangeKey='name'
          value={selectedColorIndex}
          onChange={e => handlePickerChange(e)}
        >
          <AtButton className='courseDetailFloatLayout-footer-btn' >
            更改课程颜色
        </AtButton>
        </Picker>
      </View>
    </AtFloatLayout>
  )
}