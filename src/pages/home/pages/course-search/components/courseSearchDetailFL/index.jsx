import React from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import IconFont from '../../../../../../components/iconfont'
import CustomButton from '../../../../../../components/CustomButton'
import { UPDATE_BIZDATA } from '../../../../../../constants/schedule/singleCourseSchedule'
import dataToMatrix from '../../../../../../utils/scheduleDataTranslator'
import './index.scss'

export default (props) => {
  const { courseSearchDetailFLData, onClose } = props
  const { isOpened, courseData, nameZh, teachers } = courseSearchDetailFLData
  const timeTable = useSelector(state => state.event.bizData.timeTable)
  const dispatch = useDispatch()

  let items = []
  let lessonId = ''

  if (courseData) {
    console.log(courseData)
    const { 
      course: { credits, code },
      campus: { nameZh: campus },
      courseType: { nameZh: type },
      nameZh: clazzes,
      id: lessonId_,
      scheduleWeeksInfo,
      stdCount,
    } = courseData

    lessonId = lessonId_
    items = [
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>老师：</Text><Text>{teachers}</Text></>,
        icon: '',
        text: teachers,
      },
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>学分：</Text><Text>{credits}</Text></>,
        icon: '',
        text: credits,
      },
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>校区：</Text><Text>{campus}</Text></>,
        icon: '',
        text: campus,
      },
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>课堂人数：</Text><Text>{stdCount}</Text></>,
        icon: '',
        text: stdCount,
      },
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>开课周目：</Text><Text>{scheduleWeeksInfo}</Text></>,
        icon: '',
        text: scheduleWeeksInfo,
      },
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>课程类型：</Text><Text>{type}</Text></>,
        icon: '',
        text: type,
      },
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>课程代码：</Text><Text>{code}</Text></>,
        icon: '',
        text: code,
      },
      {
        value: <><Text className='courseSearchDetailFL-itemTitle'>上课班级：</Text><Text>{clazzes}</Text></>,
        icon: '',
        text: clazzes,
      },
    ]
  }

  // 点击一个教室
  const handleClickSchedule = () => {

    const scheduleMatrix = dataToMatrix([courseData], [lessonId], timeTable).scheduleMatrix
    
    dispatch({
      type: UPDATE_BIZDATA,
      payload: {
        scheduleMatrix,
      },
    })
    Taro.navigateTo({ url: '/pages/home/pages/course-search/pages/single-course-schedule/index' })
  }
  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='courseSearchDetailFL'
      onClose={onClose}
    >
      <View className='courseSearchDetailFL-header'>
        {nameZh}
        <View className='courseSearchDetailFL-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='courseSearchDetailFL-content'>
        {
          items.map((item, index) => (
            item.text &&
            <View className='courseSearchDetailFL-content-item' key={`thisis${index}`}>
              <IconFont name={item.icon} />
              <Text>{item.value}</Text>
            </View>
          ))
        }
      </View>

      <View className='courseSearchDetailFL-footer'>
        <CustomButton value='查看时间安排' onSubmit={handleClickSchedule} />
      </View>

    </AtFloatLayout>
  )
}
