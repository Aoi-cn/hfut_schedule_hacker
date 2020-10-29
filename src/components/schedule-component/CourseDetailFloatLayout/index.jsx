import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useDispatch, useSelector } from 'react-redux'
import { View, Text, Textarea } from '@tarojs/components'
import { AtFloatLayout, AtAccordion } from 'taro-ui'

import { updateSingleCourseColor } from '../../../actions/schedule'
import { updateSingleCustomColor, deleteSingleCustom, updateSingleCustomMemo } from '../../../actions/customSchedule'
import IconFont from '../../../components/iconfont'
import ColorButton from '../../../components/ColorButton'
import CustomButton from '../../../components/CustomButton'

import './index.scss'

export default (props) => {
  const { courseDetailFLData, source, onClose, updateColorPicker, openCustomScheduleFL } = props
  const { isOpened, showMemo, type, name, credits, clazzRoom, teacher, timeRange, lessonCode, lessonType, timeIndexes, dayIndex, studentClazzes, studentNumber, weekIndexes = [], weekIndexesZh, color, memo: memo_ } = courseDetailFLData
  const userType = useSelector(state => state.login.bizData.userType)
  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const [memo, setMemo] = useState('')
  const [showDetail, setShowDetail] = useState(false)
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
  let detailItems = []
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
        value: <><Text className='courseDetailFloatLayout-itemTitle'>时间：</Text><Text>{timeRange}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>开设周目：</Text><Text>{weekIndexesZh}</Text></>,
        icon: '',
      },

    ]
    detailItems = [
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>学分：</Text><Text>{credits}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>课堂人数：</Text><Text>{studentNumber}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>课程类型：</Text><Text>{lessonType}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>课程编号：</Text><Text>{lessonCode}</Text></>,
        icon: '',
      },
      {
        value: <><Text className='courseDetailFloatLayout-itemTitle'>上课班级：</Text><Text>{clazzString}</Text></>,
        icon: '',
      },
    ]
  } else if (type === 'custom' || type === 'exam') {
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

  const handleColorChange = (newColor) => {
    if (type === 'course') {
      dispatch(updateSingleCourseColor({ userType, newColor, courseDetailFLData: props }))
    } else if (type === 'custom' || type === 'exam') {
      dispatch(updateSingleCustomColor({ userType, source, newColor, courseDetailFLData: props }))
    }
  }

  const handleDeleteCustom = () => {
    Taro.showModal({
      title: '确定删除该事件吗',
      content: '此操作将无法恢复',
      confirmColor: '#f33f3f',
      cancelColor: '#60646b',
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

  let RightBtn = null
  switch (type) {
    case 'course':
      RightBtn = <CustomButton value='班级同学' onSubmit={handleClickClazzMates} />
      break;
    case 'custom':
      RightBtn = <CustomButton value='删除事件' type='danger' onSubmit={handleDeleteCustom} />
      break;
    case 'exam':
      RightBtn = <CustomButton value='自习教室' type='call' onSubmit={() => Taro.navigateTo({ url: '/pages/home/pages/empty-clazz-room/index' })} />
      break;
    default:
      break;
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='courseDetailFloatLayout'
      onClose={CDFLOnClose}
    >
      <View className='courseDetailFloatLayout-header'>
        {(type === 'exam' ? '考试：' : '') + name}
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

        {
          (type === 'course') &&
          <View className='courseDetailFloatLayout-detail'>
            <AtAccordion
              open={showDetail}
              onClick={() => setShowDetail(!showDetail)}
              title='详细信息'
              hasBorder={false}
            >
              <View className='courseDetailFloatLayout-detail-content'>
                {
                  detailItems.map((item, index) => (
                    <View className='courseDetailFloatLayout-content-item courseDetailFloatLayout-content-item_detail' key={`thisis${index}`}>
                      <IconFont name={item.icon} />
                      <Text>{item.value}</Text>
                    </View>
                  ))
                }
              </View>
            </AtAccordion>
          </View>
        }

        <View className='courseDetailFloatLayout-content-memo'>
          <View className='courseDetailFloatLayout-content-memo-title'>
            <Text>备忘录</Text>
            <Text className='courseDetailFloatLayout-content-memo-title_comment'>（提示：关闭弹窗自动保存）</Text>
          </View>
          {
            showMemo ?
              <Textarea
                placeholder={type === 'course' ? '记录作业、课堂测试、考试要求等' : '记录该事件的其他信息'}
                className='courseDetailFloatLayout-content-memo-input'
                value={memo}
                maxlength={-1}
                placeholder-style='color:#ccc;'
                onInput={e => setMemo(e.detail.value)}
              />
              :
              <View style={{ height: '160rpx' }}></View>
          }
        </View>

      </View>

      <View className='courseDetailFloatLayout-footer'>
        <View className='courseDetailFloatLayout-footer-btnBox'>
          {
            type === 'custom' ?
              <CustomButton value='修改事件' onSubmit={() => openCustomScheduleFL({ dayIndex, startTime: timeIndexes[0], courseType: timeIndexes.length, chosenWeeks: weekIndexes })} />
              :
              <ColorButton value='选择颜色' theme={theme} backgroundColor={color} onSubmit={() => updateColorPicker(handleColorChange, theme, color)} />
          }

        </View>
        <View className='courseDetailFloatLayout-footer_blank'></View>

        <View className='courseDetailFloatLayout-footer-btnBox'>
          {RightBtn}
        </View>

      </View>
    </AtFloatLayout>
  )
}
