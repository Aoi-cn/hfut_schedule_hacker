import Taro from '@tarojs/taro'

import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/event'
import * as scheduleActions from './schedule'

// event的enter直接走schedule的enter
export const enter = () => async (dispatch, getState) => {

  // 1.渲染日程数据
  await dispatch(scheduleActions.enter({ userType: 'me', isEvent: true }))
  const { schedule: { bizData: { scheduleMatrix, dayLineMatrix, currentWeekIndex, timeTable } } } = getState()
  let dayIndex = 0
  dayLineMatrix.map((weekData) => {
    weekData.map((dayData, dayIndex_) => {
      const { today } = dayData
      if (today) {
        dayIndex = dayIndex_
      }
    })
  })

  dispatch(updateBizData({
    scheduleMatrix,
    dayLineMatrix,
    currentWeekIndex,
    weekIndex: currentWeekIndex,
    timeTable,
    dayIndex,
    currentDayIndex: dayIndex,
  }))

  // 2.先获取天气信息
  const exactWeather = getState().schedule.bizData.userConfig.exactWeather
  if (exactWeather) {
    dispatch(updateExactWeather())
  } else {
    // 循环，半小时更新一次
    dispatch(updateWeatherByLocation({ exact: false }))
    setInterval(() => {
      dispatch(updateWeatherByLocation({ exact: false }))
    }, 1800000);
  }
}

export const updateExactWeather = () => async (dispatch) => {
  Taro.getSetting({})
    .then(res => {
      if (!res.authSetting['scope.userLocation']) {
        Taro.authorize({ scope: 'scope.userLocation' })
          .then(() => dispatch(updateWeatherByLocation({ exact: true })))
          .catch(() => {
            Taro.showModal({
              title: '提示',
              content: '请前往设置，打开位置信息权限（开启后重启小程序生效）',
              confirmText: '打开设置',
              cancelText: '不再提示',
              confirmColor: '#0089ff',
              cancelColor: '#60646b',
              success(modalRes) {
                if (modalRes.confirm) {
                  console.log('用户点击确定')
                  Taro.openSetting({
                    success(res1) {
                      console.log(res1.authSetting)
                    }
                  })
                } else if (modalRes.cancel) {
                  // 点击了不再提示
                  dispatch(updateWeatherByLocation({ exact: false }))
                  const config = Taro.getStorageSync('config')
                  const userConfig = {
                    ...config.userConfig,
                    exactWeather: false,
                  }
                  dispatch(scheduleActions.updateBizData({
                    userConfig,
                  }))
                  return Taro.setStorage({
                    key: 'config',
                    data: {
                      ...config,
                      userConfig,
                    }
                  })
                }
              }
            })
          })
      } else {
        // 循环，半小时更新一次
        dispatch(updateWeatherByLocation({ exact: true }))
        setInterval(() => {
          dispatch(updateWeatherByLocation({ exact: true }))
        }, 1800000);
      }
    })
}

const updateWeatherByLocation = ({ exact }) => async (dispatch) => {
  console.log('开始获取天气')
  let location = {}
  if (exact) {
    await Taro.getLocation({ type: 'wgs84' })
      .then(res => location = res)
  } else {
    // 模糊定位，写死的
    const { userInfo: { campus } } = Taro.getStorageSync('me')
    if (campus == 2) {
      location.latitude = 31.95
      location.longitude = 118.73
    } else {
      location.latitude = 31.82057
      location.longitude = 117.22901
    }
  }

  // 当前时间天气api
  Taro.request({ url: `https://api.caiyunapp.com/v2.5/Y2FpeXVuIGFuZHJpb2QgYXBp/${location.longitude},${location.latitude}/realtime.json` })
    .then(weatherRes => {
      const { status } = weatherRes.data
      if (status === 'ok') {
        // 天气信息获取成功，渲染event页面吧
        console.log('当前天气获取成功')
        const { result: { realtime: weatherRealTime } } = weatherRes.data
        dispatch(updateBizData({ weatherRealTime }))
      } else {
        console.log('当前天气获取失败')
        dispatch(updateBizData({ weatherRealTime: { skycon: 'failed' } }))
      }
    })

  // 小时天气的api
  Taro.request({ url: `https://api.caiyunapp.com/v2.5/Y2FpeXVuIGFuZHJpb2QgYXBp/${location.longitude},${location.latitude}/hourly.json` })
    .then(weatherRes => {
      const { status } = weatherRes.data
      if (status === 'ok') {
        // 天气信息获取成功，渲染event页面吧
        console.log('小时天气获取成功')
        const { result: { hourly: weatherHourly } } = weatherRes.data
        dispatch(updateBizData({ weatherHourly }))
      } else {
        console.log('小时天气获取失败')
      }
    })

}


export const updateDayByCalendar = (payload) => async (dispatch, getState) => {
  let { date } = payload
  date = date.split('-')[1] + '/' + date.split('-')[2]
  const { schedule: { bizData: { dayLineMatrix } } } = getState()
  dayLineMatrix.map((weekInfo, weekIndex) => {
    weekInfo.map((dayInfo, dayIndex) => {
      if (dayInfo.dateZh === date) {
        dispatch(updateBizData({ weekIndex }))
        dispatch(updateBizData({ dayIndex }))
      }
    })
  })
}

export const updateBizData = (payload) => {
  return {
    type: UPDATE_BIZDATA,
    payload,
  }
}

export const updateUiData = (payload) => {
  return {
    type: UPDATE_UIDATA,
    payload,
  }
}

export const logout = () => {
  // 执行登出逻辑
  return {
    type: LOGOUT,
  }
}
