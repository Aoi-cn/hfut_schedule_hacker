import React, { memo, useEffect, useCallback } from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect, useDispatch } from 'react-redux'
import { View } from '@tarojs/components'

import WhiteTable from '../../../../components/schedule-component/WhiteTable'
import DayLine from '../../../../components/schedule-component/DayLine'
import TimeLine from '../../../../components/schedule-component/TimeLine'
import CourseTable from './components/CourseTable'
import ScheduleTop from './components/ScheduleTop'
import ScheduleFooter from './components/ScheduleFooter'
import CourseDetailFloatLayout2 from '../../../../components/schedule-component/CourseDetailFloatLayout2'
import BackgroundImg from '../../../../components/schedule-component/BackgroundImg'
import { UPDATE_BIZDATA, UPDATE_UIDATA } from '../../../../constants/schedule/historySchedule'
import { GET } from '../../../../utils/request'
import { relogin } from '../../../../actions/login'
import dataToMatrix from '../../../../utils/scheduleDataTranslator'
import makeDayLineMatrix from '../../../../utils/dayLineMatrixMaker'

const MemoBackgroundImg = memo(BackgroundImg)
// key过期后，尝试重新登陆的次数
let reloginTime = 0


function HistorySchedule(props) {
  const { bizData, uiData } = props
  const { weekIndex, scheduleMatrix, dayLineMatrix, semester } = bizData
  const { courseDetailFLData } = uiData
  const dispatch = useDispatch()

  useDidShow(() => {
    Taro.hideHomeButton()
  })

  const getSchedule = useCallback(() => {
    if (!semester.id) {
      return
    }
    const userData = Taro.getStorageSync('me')
    const { userInfo } = userData
    const { key, campus } = userInfo
    Taro.showLoading({
      title: '加载中...',
    })
    GET('/schedule', { key, campus, semesterId: semester.id })
      .then(res => {
        reloginTime = 0
        if (res.success) {
          // 请求成功，生成scheduleMatrix和dayLineMatrix
          const scheduleData = res.body.lessons
          const lessonIds = res.body.lessonIds
          const timeTable = res.body.timeTable.courseUnitList
          // 转化为UI可识别的matrix
          const { scheduleMatrix: scheduleMatrix_ } = dataToMatrix(scheduleData, lessonIds, timeTable)
          const { dayLineMatrix: dayLineMatrix_ } = makeDayLineMatrix(semester.id)
          dispatch({
            type: UPDATE_BIZDATA,
            payload: { scheduleMatrix: scheduleMatrix_, dayLineMatrix: dayLineMatrix_ },
          })
        } else {
          // key过期了
          reloginTime++
          return dispatch(relogin({
            userType: 'me',
            reloginTime,
            callback: getSchedule,
          }))
        }
        setTimeout(() => {
          Taro.hideLoading()
        }, 200);
      })
      .catch(e => {
        console.log(e)
        Taro.hideLoading()
        Taro.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })
      })
  }, [dispatch, semester])

  useEffect(() => {
    Taro.setNavigationBarTitle({ title: semester.nameZh || '' })
    getSchedule()
  }, [getSchedule, semester])

  const changeWeekIndex = (weekIndex_) => {
    if (weekIndex_ < 0) {
      Taro.showToast({
        title: '当前已经是第一周',
        icon: 'none',
        duration: 500
      })
      return null
    } else if (weekIndex_ > 19) {
      Taro.showToast({
        title: '当前已经是最后一周',
        icon: 'none',
        duration: 500
      })
      return null
    }
    dispatch({
      type: UPDATE_BIZDATA,
      payload: { weekIndex: weekIndex_ },
    })
  }

  return (
    <View className='generalSchedule'>
      <View className='generalSchedule-header'>

        <ScheduleTop changeWeekIndex={changeWeekIndex} />
        <DayLine dayLineData={dayLineMatrix[weekIndex]} />

      </View>

      <View className='generalSchedule-content'>
        <TimeLine />
        <View className='generalSchedule-content-table'>
          <WhiteTable />
          {
            scheduleMatrix.length === 0 ? null :
              <CourseTable weekScheduleData={scheduleMatrix[weekIndex]} />
          }
        </View>
      </View>

      <ScheduleFooter changeWeekIndex={changeWeekIndex} />

      <CourseDetailFloatLayout2
        courseDetailFLData={courseDetailFLData}
        onClose={() => dispatch({
          type: UPDATE_UIDATA,
          payload: { courseDetailFLData: { isOpened: false } },
        })}
      />

      <MemoBackgroundImg />

    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.historySchedule,
  };
}

export default connect(mapStateToProps)(HistorySchedule);