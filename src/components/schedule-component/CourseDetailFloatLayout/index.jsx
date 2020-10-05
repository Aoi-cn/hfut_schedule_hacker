import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Picker, Textarea } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import { updateSingleCourseColor } from '../../../actions/schedule'
import { updateSingleCustomColor, deleteSingleCustom, updateSingleCustomMemo } from '../../../actions/customSchedule'
import IconFont from '../../../components/iconfont'
import ColorButton from '../../../components/ColorButton'
import CustomButton from '../../../components/CustomButton'
import { themeColors } from '../../../utils/scheduleDataTranslator'
import './index.scss'

export default (props) => {
  const { courseDetailFLData, source, onClose } = props
  const { isOpened, type, name, credits, clazzRoom, teacher, timeRange, lessonType, studentClazzes, studentNumber, weekIndexes = [], weekIndexesZh, color, memo: memo_ } = courseDetailFLData
  const userType = useSelector(state => state.login.bizData.userType)
  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const [memo, setMemo] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    if (isOpened) {
      setMemo(memo_)
    }
  }, [isOpened, memo_])

  const CDFLOnClose = () => {
    if (memo !== memo_ && memo_ !== undefined) {
      dispatch(updateSingleCustomMemo({ userType, source, type, memo, courseDetailFLData: props }))
    } else {
      onClose()
    }
  }

  // icon先不要了啊
  let items = []
  if (type === 'course') {
    let clazzString = ''
    if (studentClazzes) {
      studentClazzes.map((clazz) => {
        clazzString += clazz
        clazzString += (clazz === studentClazzes[studentClazzes.length - 1] ? '' : '、')
      })
    }
    items = [
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>教室：</Text><Text>{clazzRoom}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>老师：</Text><Text>{teacher}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>学分：</Text><Text>{credits}</Text></>,
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
        value: <><Text className='courseDetailFloatLayout-itemTitle'>开设周目：</Text><Text>{weekIndexesZh}</Text></>,
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
  } else if (type === 'custom') {
    let customWeeksZh = weekIndexes.map(weekIndex => (weekIndex !== weekIndexes[weekIndexes.length - 1]) ? weekIndex + ', ' : weekIndex)
    if (customWeeksZh.length === 20) {
      customWeeksZh = '整个学期'
    }
    items = [
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>地点：</Text><Text>{clazzRoom}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>时间：</Text><Text>{timeRange}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>周目：</Text><Text>{customWeeksZh}</Text></>,
        icon: '',
      },
    ]
  }

  const colorPickerRange = themeColors[theme]

  let selectedColorIndex = 0
  colorPickerRange.map((colorInfo, index) => {
    if (colorInfo.value === color) {
      selectedColorIndex = index
    }
  })

  const handlePickerChange = (e) => {
    const colorIndex = parseInt(e.detail.value)
    const newColor = colorPickerRange[colorIndex].value
    if (type === 'course') {
      dispatch(updateSingleCourseColor({ userType, newColor, courseDetailFLData: props }))
    } else if (type === 'custom') {
      dispatch(updateSingleCustomColor({ userType, source, newColor, courseDetailFLData: props }))
    }
  }

  const handleDeleteCustom = () => {
    Taro.showModal({
      title: '确定删除该事件吗',
      content: '此操作将无法恢复',
      success: function (res) {
        if (res.confirm) {
          dispatch(deleteSingleCustom({ userType, source, courseDetailFLData: props }))
        }
      }
    })
  }

  const handleClickClazzMates = () => {
    Taro.showToast({
      title: '即将推出',
      icon: 'none',
      duration: 1000
    })
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='courseDetailFloatLayout'
      onClose={CDFLOnClose}
    >
      <View className='courseDetailFloatLayout-header'>
        {name}
        <View className='courseDetailFloatLayout-header-close' onClick={CDFLOnClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='courseDetailFloatLayout-content'>
        {
          items.map((item, index) => (
            <View className='courseDetailFloatLayout-content-item' key={`thisis${index}`}>
              <IconFont name={item.icon} />
              <Text>{item.value}</Text>
            </View>
          ))
        }
        <View className='courseDetailFloatLayout-content-memo'>
          <View className='courseDetailFloatLayout-content-memo-title'>
            <Text>备忘录</Text>
            {/* <Text className='courseDetailFloatLayout-content-memo-title_comment'>（关闭弹窗自动保存）</Text> */}
          </View>
          <Textarea
            placeholder={type === 'course' ? '记录作业、课堂测试、考试要求等' : '记录该事件的其他信息'}
            className='courseDetailFloatLayout-content-memo-input'
            value={memo}
            maxlength={-1}
            placeholder-style='color:#ccc;'
            onInput={e => setMemo(e.detail.value)}
          />
        </View>

      </View>

      <View className='courseDetailFloatLayout-footer'>
        <View className='courseDetailFloatLayout-footer-btnBox'>
          <Picker mode='selector'
            range={colorPickerRange}
            rangeKey='name'
            value={selectedColorIndex}
            onChange={e => handlePickerChange(e)}
          >
            <ColorButton value='选择颜色' theme={theme} backgroundColor={color} />
          </Picker>
        </View>
        <View className='courseDetailFloatLayout-footer_blank'></View>
        <View className='courseDetailFloatLayout-footer-btnBox'>
          {
            type === 'custom' ?
              <CustomButton value='删除事件' type='danger' onSubmit={handleDeleteCustom} />
              :
              <CustomButton value='班级同学' onSubmit={handleClickClazzMates} />
          }
        </View>



      </View>
    </AtFloatLayout>
  )
}
