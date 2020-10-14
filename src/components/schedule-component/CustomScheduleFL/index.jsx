import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Input, Text } from '@tarojs/components'
import { AtFloatLayout, AtInputNumber } from 'taro-ui'

import * as customScheduleActions from '../../../actions/customSchedule'
import IconFont from '../../../components/iconfont'
import CustomButton from '../../../components/CustomButton'
import ColorButton from '../../../components/ColorButton'
import validWeekChecker from '../../../utils/validWeekChecker'
import './index.scss'

export default (props) => {
  const { isOpened, source, onClose, customScheduleFLData, updateData, scheduleMatrix, timeTable, updateColorPicker, updateCourseDetailFL } = props
  const { type = 'add', name, clazzRoom, chosenWeeks = [], currentWeekIndex, courseType = 1, dayIndex = 0, startTime = 0, lessonId, memo, color = 'blue' } = customScheduleFLData
  const theme = useSelector(state => state.schedule.bizData.userConfig.theme)
  const [validWeeks, setValidWeeks] = useState(scheduleMatrix.map(() => 1))
  const [multChosen, setMultChosen] = useState('')
  const dispatch = useDispatch()

  const weekIndexes = []
  for (let i = 1; i <= 24; i++) {
    weekIndexes.push(i)
  }

  useEffect(() => {
    if (isOpened) {
      setValidWeeks(validWeekChecker({ scheduleMatrix, dayIndex, startTime, courseType, type, lessonId }))
    }
  }, [scheduleMatrix, courseType, isOpened, dayIndex, startTime, type, lessonId])

  // timeTable没有拿到，不渲染
  if (timeTable.length === 0) {
    return ''
  }

  const handleClickWeekBox = (weekIndex) => {
    const chosenIndex = chosenWeeks.indexOf(weekIndex)
    const newChosenWeeks = [...chosenWeeks]
    if (chosenIndex >= 0) {
      newChosenWeeks.splice(chosenIndex, 1)
    } else {
      newChosenWeeks.push(weekIndex)
    }
    updateData({ chosenWeeks: newChosenWeeks })
  }

  const handleMultChosen = (method) => {
    let newChosenWeeks = []

    if (method === multChosen) {
      setMultChosen('')
      switch (method) {
        case '单周':
          chosenWeeks.map(chosenWeek => {
            if (chosenWeek % 2 !== 1) {
              newChosenWeeks.push(chosenWeek)
            }
          })
          break;
        case '双周':
          chosenWeeks.map(chosenWeek => {
            if (chosenWeek % 2 !== 0) {
              newChosenWeeks.push(chosenWeek)
            }
          })
          break;
        case '全选':
          break;
        default:
          break;
      }
    } else {
      setMultChosen(method)
      switch (method) {
        case '单周':
          for (let i = 1; i < 21; i++) {
            if (i % 2 === 1) {
              newChosenWeeks.push(i)
            }
          }
          break;
        case '双周':
          for (let i = 1; i < 21; i++) {
            if (i % 2 === 0) {
              newChosenWeeks.push(i)
            }
          }
          break;
        case '全选':
          for (let i = 1; i < 21; i++) {
            newChosenWeeks.push(i)
          }
          break;
        default:
          break;
      }
    }

    updateData({ chosenWeeks: newChosenWeeks })
  }

  const handleClickSubmit = () => {
    const finalWeeks = chosenWeeks.filter(chosenWeek => validWeeks[chosenWeek - 1] === 0)
    if (!name) {
      Taro.showToast({
        title: '请填写事件名',
        icon: 'none',
        duration: 1000
      })
      return null
    }
    else if (finalWeeks.length === 0) {
      Taro.showToast({
        title: '请选择至少一个周目',
        icon: 'none',
        duration: 1000
      })
      return null
    }

    const endTime = startTime + courseType - 1
    const timeIndexes = []
    for (let timeIndex_ = parseInt(startTime); timeIndex_ <= parseInt(endTime); timeIndex_++) {
      timeIndexes.push(timeIndex_)
    }

    const timeRange = timeTable[startTime].startTimeText + '-' + timeTable[endTime].endTimeText
    const newData = {
      source,
      name,
      clazzRoom,
      lessonId,
      color,
      dayIndex,
      startTime,
      timeIndexes,
      timeRange,
      weekIndexes: finalWeeks,
      memo,
      scheduleMatrix
    }

    dispatch(customScheduleActions.addCustomSchedule(newData))

    if (type === 'change') {
      updateCourseDetailFL(newData)
    }

    Taro.showToast({
      title: '添加成功',
      duration: 1000
    })
    onClose()
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='customScheduleFL'
      onClose={onClose}
    >
      <View className='customScheduleFL-header'>
        新增事件
        <View className='customScheduleFL-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='customScheduleFL-content'>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-inputBox'>
            <Text>事件名</Text>
            <Input
              className='customScheduleFL-content-item-input'
              placeholder='必填'
              value={name}
              onInput={e => updateData({ name: e.detail.value })}
            />
          </View>
        </View>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-inputBox'>
            <Text>地点</Text>
            <Input
              className='customScheduleFL-content-item-input'
              placeholder='非必填'
              value={clazzRoom}
              onInput={e => updateData({ clazzRoom: e.detail.value })}
            />
          </View>
        </View>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-timeIndexBox'>
            <View className='customScheduleFL-content-item-timeIndexBox-jieshuBox'>
              <Text className='customScheduleFL-content-item-timeIndexBox-jieshuBox_title'>节数</Text>
              <Text className='customScheduleFL-content-item-timeIndexBox-jieshuBox_time'>{`${timeTable[startTime].startTimeText}-`}</Text>
              <Text className={`customScheduleFL-content-item-timeIndexBox-jieshuBox_time customScheduleFL-content-item-timeIndexBox-jieshuBox_time_${validWeeks[0] === 2 && 'danger'}`}>
                {timeTable[startTime + courseType - 1].endTimeText}</Text>
            </View>
            <AtInputNumber
              min={1}
              max={4}
              step={1}
              value={courseType}
              onChange={value => updateData({ courseType: value })}
            />
          </View>
        </View>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-weekIndexHeader'>
            <Text>选择周数</Text>
            <View className='customScheduleFL-content-item-weekIndexHeader-popGroup'>
              <View className='customScheduleFL-content-item-weekIndexHeader-popGroup-item'
                onClick={() => handleMultChosen('单周')}
              >
                <View className={`customScheduleFL-content-item-weekIndexHeader-pop customScheduleFL-content-item-weekIndexHeader-pop_${multChosen === '单周' && 'active'}`}></View>
                <Text>单周</Text>
              </View>
              <View className='customScheduleFL-content-item-weekIndexHeader-popGroup-item'
                onClick={() => handleMultChosen('双周')}
              >
                <View className={`customScheduleFL-content-item-weekIndexHeader-pop customScheduleFL-content-item-weekIndexHeader-pop_${multChosen === '双周' && 'active'}`}></View>
                <Text>双周</Text>
              </View>
              <View className='customScheduleFL-content-item-weekIndexHeader-popGroup-item'
                onClick={() => handleMultChosen('全选')}
              >
                <View className={`customScheduleFL-content-item-weekIndexHeader-pop customScheduleFL-content-item-weekIndexHeader-pop_${multChosen === '全选' && 'active'}`}></View>
                <Text>全选</Text>
              </View>
            </View>
          </View>
        </View>

        <View className='customScheduleFL-content-item'>
          <View className='customScheduleFL-content-item-weekIndexContent'>
            {
              weekIndexes.map((weekIndex, i) => {
                if (validWeeks[i] === 0) {
                  const isChosen = chosenWeeks.indexOf(weekIndex) !== -1
                  return (
                    <View key={`key${weekIndex}`}
                      className={`customScheduleFL-content-item-weekIndexContent-week customScheduleFL-content-item-weekIndexContent-week_${isChosen ? 'chosen' : ''}`}
                      style={`opacity: ${weekIndex > 20 ? 0 : 1}`}
                      onClick={() => handleClickWeekBox(weekIndex)}
                    >
                      {weekIndex === currentWeekIndex ? '本周' : weekIndex}
                    </View>
                  )
                } else if (validWeeks[i] === 1) {
                  return (
                    <View key={`key${weekIndex}`} className='customScheduleFL-content-item-weekIndexContent-week' style={`opacity: ${weekIndex > 20 ? 0 : 1}`}>
                      有课
                    </View>
                  )
                } else {
                  return (
                    <View key={`key${weekIndex}`} className='customScheduleFL-content-item-weekIndexContent-week' style={`opacity: ${weekIndex > 20 ? 0 : 1}`}>
                      超时
                    </View>
                  )
                }

              })
            }
          </View>
        </View>

      </View>

      <View className='customScheduleFL-footer'>
        <View className='customScheduleFL-footer-btnBox'>
          <ColorButton value='选择颜色' theme={theme} backgroundColor={color} onSubmit={() => updateColorPicker((c) => updateData({ color: c }), theme)} />
        </View>
        <View className='customScheduleFL-footer_blank'></View>

        <View className='customScheduleFL-footer-btnBox'>
          <CustomButton value={`确认${type === 'add' ? '添加' : '修改'}`} onSubmit={handleClickSubmit} />
        </View>

      </View>

    </AtFloatLayout>
  )
}
