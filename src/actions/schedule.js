import Taro from '@tarojs/taro'
import _ from 'lodash'

import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule/schedule'
import { GET } from '../utils/request'
import dataToMatrix from '../utils/scheduleDataTranslator'
import * as loginActions from './login'
import * as eventActions from './event'
import makeDayLineMatrix from '../utils/dayLineMatrixMaker'
import scheduleDiffTool from '../utils/scheduleDiffTool'
import { config, updateState, currentSemester } from '../config/config.default'
import { relogin } from '../actions/login'

const { version } = config

// 判断尝试了多少次重新登陆。
// 需要的场景：key超时失效时需要重新获取，但重新获取的key也有可能是无效的。
// 实际测试中。relogin次数为5次可实现绝大多数的key成功验证
let reloginTime = 0


// 刚进入小程序时，判断是否有本地缓存，有的话就不用登录
// enterState = 0或unfinded => 刚进入小程序
// enterState = 1 => 切换情侣课表
export const enter = ({ userType, isEvent }) => async (dispatch) => {

  return Taro.getStorage({ key: userType })
    .then(async (userData) => {
      const { scheduleMatrix, scheduleData, lessonIds, timeTable = [], examData = [] } = userData.data  // 读取本地的课表数据
      const { moocData } = dataToMatrix(scheduleData, lessonIds, timeTable)
      // 二话不说先渲染
      dispatch(updateBizData({ scheduleMatrix, timeTable, moocData }))
      // 是自己，再渲染event，情侣与event页面无关
      if (userType === 'me') {
        dispatch(eventActions.updateBizData({ scheduleMatrix, timeTable, examData }))
      }

      //读取本地设置
      const localConfig = Taro.getStorageSync('config')
      let { userConfig } = localConfig
      if (!userConfig) {
        userConfig = config.userConfig
        Taro.setStorage({
          key: 'config',
          data: config
        })
      } else {
        for (const configKey in config.userConfig) {
          if (userConfig[configKey] === undefined) {
            userConfig[configKey] = config.userConfig[configKey]
            Taro.setStorage({
              key: 'config',
              data: {
                ...localConfig,
                userConfig,
              }
            })
          }
        }
      }
      // 判断版本更新：
      const isUpdateOk = await dispatch(handleCheckUpdate())
      if (!isUpdateOk && updateState === 1) {
        return {}
      }

      // 确保diff按钮是关闭的
      dispatch(updateUiData({ diff: false }))

      // 格式化timeTable
      for (let i = 0; i < 4; i++) {
        timeTable.push({ endTimeText: 'sleep' })
      }

      // 写入自定义事件
      let customSchedule = Taro.getStorageSync('custom')
      customSchedule = customSchedule ? customSchedule : {}
      const userCustomScheduleM = customSchedule[userType]
      if (!userCustomScheduleM) {
        // 本地还没有这个用户的自定义事件，那就新生成一个
        customSchedule[userType] = dataToMatrix().scheduleMatrix
        await Taro.setStorage({
          key: 'custom',
          data: customSchedule
        })
        // 不是第一次登入
      } else if (scheduleMatrix.length !== 0) {
        // 本地有，那就写入
        userCustomScheduleM.map((weekData, weekIndex) => {
          weekData.map((dayData, dayIndex) => {
            dayData.map((courseBoxList, timeIndex) => {
              const courseBoxData = courseBoxList[0]
              const { name } = courseBoxData
              if (name) {
                const rawData = scheduleMatrix[weekIndex][dayIndex][timeIndex][0]
                // 规则：只有没课的地方才可以添加自定义事件
                if (!rawData.name) {
                  scheduleMatrix[weekIndex][dayIndex][timeIndex][0] = courseBoxData
                }
              }
            })
          })
        })
      }


      // 版本正常，且本地缓存正常
      const { dayLineMatrix, currentWeekIndex } = makeDayLineMatrix()  // 生成一个时间线矩阵
      await dispatch(updateBizData({ scheduleMatrix, timeTable, dayLineMatrix, currentWeekIndex, weekIndex: currentWeekIndex, userConfig }))
      // 每次进入的自动更新
      try {
        dispatch(updateScheduleData({ userType, isEvent }))
      } catch (error) {
        console.error(error);
        Taro.hideNavigationBarLoading()
        Taro.showToast({
          title: '更新出错，请查看帮助',
          icon: 'none',
          duration: 1500
        })
      }
    })
    .catch((e) => {
      // 本地缓存获取失败，重新登录
      console.error(e);
      Taro.redirectTo({ url: '/pages/login/index' })
    })
}

// 检测到版本更新后的自动数据更新
const handleCheckUpdate = () => async (dispatch) => {
  const localConfig = Taro.getStorageSync('config')
  const { version: localVersion } = localConfig
  if (localVersion !== version) {
    console.log('线上版本：' + version)
    console.log('本地版本：' + localVersion)
    console.log('执行操作状态：' + updateState)
  }
  // 判断更新的类型
  if (localVersion !== version && updateState === 0) {
    // 更新selectInfo（可能全校课表有添加班级）
    const res = await GET('/schedule/select_info', {})
    Taro.setStorage({
      key: 'selectInfo',
      data: res
    })
    // 显示更新公告
    dispatch(eventActions.updateUiData({ showUpdateNotice: true }))
    // 更新本地config缓存
    Taro.setStorage({
      key: 'config',
      data: {
        autoConfig: {
          ...config.autoConfig,
          autoConfig: {
            ...localConfig.autoConfig,
            showRedPoint: true,
          }
        },
        userConfig: {
          ...config.userConfig,
          ...localConfig.userConfig,
        },
        version,
      }
    })
    return false
  } else if (localVersion !== version && updateState === 1) {
    Taro.showToast({
      title: '检测到重大版本更新，请重新登陆一下~',
      icon: "none",
      duration: 2500,
    })
    Taro.setStorage({
      key: 'config',
      data: {
        autoConfig: {
          ...config.autoConfig,
          ...localConfig.autoConfig,
        },
        userConfig: {
          ...config.userConfig,
          ...localConfig.userConfig,
        },
        version,
      }
    })
    setTimeout(() => {
      dispatch(loginActions.logout())
    }, 1000);
    return false
  }
  return true
}


// 更新数据
export const updateScheduleData = ({ userType, isEvent }) => async (dispatch, getState) => {
  Taro.showNavigationBarLoading()
  // updatePage用来保证取消loading的页面是发起请求的页面
  const updatePage = Taro.getCurrentPages()[0].route
  const dayLineMatrix = getState().schedule.bizData.dayLineMatrix

  // 进行课表更新逻辑
  const userData = Taro.getStorageSync(userType)
  if (!userData) {
    console.log('用户数据不存在：' + userType)
    return null
  }
  const { userInfo } = userData
  const { key, campus } = userInfo
  const res = await GET('/schedule', { key, campus, semesterId: currentSemester.id })

  // 课表请求出错。执行key过期之后的逻辑
  // 注：这里也不一定是key过期导致的，有可能是因为教务爆炸
  if (!res || !res.body.currentWeek) {
    reloginTime++
    if (reloginTime === 6) {
      setTimeout(() => {
        reloginTime = 0
      }, 100);
    }
    if (isEvent) {
      return dispatch(relogin({
        userType: 'me',
        reloginTime,
        callback: () => dispatch(updateScheduleData({ userType }))
      }))
    } else {
      return dispatch(relogin({
        userType,
        reloginTime,
        callback: () => dispatch(updateScheduleData({ userType }))
      }))
    }
  }
  // 走到这里，说明key已经通过验证

  reloginTime = 0
  // 获取课表数据
  const scheduleData = res.body.lessons
  const lessonIds = res.body.lessonIds
  const timeTable = res.body.timeTable.courseUnitList
  // 转化为UI可识别的matrix
  let { scheduleMatrix, moocData } = dataToMatrix(scheduleData, lessonIds, timeTable)

  // 请求考试数据
  const examRes = await GET('/exam_arrange', { key })
  const examData = examRes.content
  if (userType === 'me') {
    dispatch(eventActions.updateBizData({ examData })) // 给event是因为event的数据是自己的，而schedule的数据可能是自己或者情侣的
  }

  // 写入考试数据
  examData.map(examInfo => {
    const { name, room, timeText } = examInfo
    const date = timeText.split(' ')[0].replace('-', '/').replace('-', '/')
    const timeRangeText = timeText.split(' ')[1]
    const startTime = examTimeText_to_timeIndex(timeRangeText.split('~')[0])
    if (startTime === 0) {
      return
    }
    const endTime = examTimeText_to_timeIndex(timeRangeText.split('~')[1])
    dayLineMatrix.map((weekInfo, weekIndex) => {
      weekInfo.map((dayInfo, dayIndex) => {
        if (dayInfo.dateZh === date) {
          const examEvent = {
            type: 'exam',
            name,
            lessonId: name + '考试',
            clazzRoom: room,
            timeIndexes: [startTime, endTime],
            startTime: startTime,
            dayIndex,
            weekIndexes: [weekIndex + 1],
            timeRange: timeRangeText,
            color: 'red',
            memo: '',
          }
          const existEvent = scheduleMatrix[weekIndex][dayIndex][startTime - 1][0]
          if (existEvent.name) {
            scheduleMatrix[weekIndex][dayIndex][startTime - 1].push(examEvent)
          } else {
            scheduleMatrix[weekIndex][dayIndex][startTime - 1][0] = examEvent
          }
        }
      })
    })
  })

  // 颜色、备忘录持久化
  try {
    scheduleMatrix = dataPersistence({ userType, scheduleMatrix, moocData })
  } catch (error) { console.log('持久化出错') }

  for (let i = 0; i < 4; i++) {
    timeTable.push({ endTimeText: 'sleep' })
  }

  // 写入自定义事件
  let userCustomScheduleM = Taro.getStorageSync('custom')[userType]
  userCustomScheduleM = userCustomScheduleM ? userCustomScheduleM : []
  userCustomScheduleM.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxList, timeIndex) => {
        const courseBoxData = courseBoxList[0]
        const { name } = courseBoxData
        if (name) {
          const rawData = scheduleMatrix[weekIndex][dayIndex][timeIndex][0]
          // 规则：只有没课的地方才可以添加自定义事件
          if (!rawData.name) {
            scheduleMatrix[weekIndex][dayIndex][timeIndex][0] = courseBoxData
          }
        }
      })
    })
  })

  // 至此，scheduleMatrix更新完毕等待渲染

  // 适应场景：刚打开课表就点情侣课表
  const { login: { bizData: { userType: userType_ } } } = getState()
  if (userType === userType_) {
    dispatch(updateBizData({ scheduleMatrix, timeTable }))
  }

  // 更新event
  if (userType === 'me') {
    dispatch(eventActions.updateBizData({ scheduleMatrix, timeTable }))
  }

  // 将数据存在本地
  Taro.setStorage({
    key: userType,
    data: {
      userInfo,
      scheduleData,
      scheduleMatrix,
      lessonIds,
      timeTable,
      examData,
    }
  })

  // 这里用到updatePage
  const intervalNumber = setInterval(() => {
    if (updatePage === Taro.getCurrentPages()[0].route) {
      Taro.hideNavigationBarLoading()
      clearInterval(intervalNumber)
    }
  }, 500);

}

// 颜色持久化
const dataPersistence = ({ userType, scheduleMatrix, type = 'all' }) => {
  const newScheduleMatrix = _.cloneDeep(scheduleMatrix)
  const { scheduleMatrix: localScheduleMatrix } = Taro.getStorageSync(userType)

  if (localScheduleMatrix.length === 0) {
    return scheduleMatrix
  }

  // 先生成一个本地颜色库
  const localColorLibrary = {}
  localScheduleMatrix.map((weekData) => {
    weekData.map((dayData) => {
      dayData.map((courseBoxList) => {
        courseBoxList.map((courseBoxData) => {
          const { lessonId, color, memo } = courseBoxData
          if (lessonId && color) {
            localColorLibrary[lessonId] = { color, memo }
          }
        })
      })
    })
  })

  newScheduleMatrix.map((weekData) => {
    weekData.map((dayData) => {
      dayData.map((courseBoxList) => {
        courseBoxList.map((courseBoxData) => {
          const { lessonId } = courseBoxData
          if (lessonId) {
            if (type === 'all') {
              courseBoxData.color = localColorLibrary[lessonId].color
              courseBoxData.memo = localColorLibrary[lessonId].memo
            }
            else if (type === 'memo') {
              courseBoxData.memo = localColorLibrary[lessonId].memo
            }
          }
        })
      })
    })
  })

  return newScheduleMatrix
}


export const refreshColor = ({ userType, render = true }) => async (dispatch, getState) => {
  Taro.showLoading({
    title: '正在刷新...',
    mask: true,
  })
  // 确保diff按钮是关闭的
  await dispatch(updateUiData({ diff: false }))
  const dayLineMatrix = getState().schedule.bizData.dayLineMatrix

  const userData = await Taro.getStorage({ key: userType })
  const { scheduleData, lessonIds, timeTable, examData } = userData.data

  let { scheduleMatrix } = dataToMatrix(scheduleData, lessonIds, timeTable)

  // 写入考试数据
  examData.map(examInfo => {
    const { name, room, timeText } = examInfo
    let date = timeText.split(' ')[0].slice(5, timeText.split(' ')[0].length)
    date = date.split('-')[0] + '/' + date.split('-')[1]
    const timeRangeText = timeText.split(' ')[1]
    const startTime = examTimeText_to_timeIndex(timeRangeText.split('~')[0])
    const endTime = examTimeText_to_timeIndex(timeRangeText.split('~')[1])
    dayLineMatrix.map((weekInfo, weekIndex) => {
      weekInfo.map((dayInfo, dayIndex) => {
        if (dayInfo.dateZh === date) {
          const examEvent = {
            type: 'exam',
            name,
            lessonId: name + '考试',
            clazzRoom: room,
            timeIndexes: [startTime, endTime],
            startTime: startTime,
            dayIndex,
            weekIndexes: [weekIndex + 1],
            timeRange: timeRangeText,
            color: 'red',
            memo: '',
          }
          const existEvent = scheduleMatrix[weekIndex][dayIndex][startTime - 1][0]
          if (existEvent.name) {
            scheduleMatrix[weekIndex][dayIndex][startTime - 1].push(examEvent)
          } else {
            scheduleMatrix[weekIndex][dayIndex][startTime - 1][0] = examEvent
          }
        }
      })
    })
  })

  // 颜色、备忘录持久化
  try {
    scheduleMatrix = dataPersistence({ userType, scheduleMatrix, type: 'memo' })
  } catch (error) { console.log('持久化出错') }

  // 写入自定义事件
  const customSchedule = Taro.getStorageSync('custom')
  const userCustomScheduleM = customSchedule[userType]
  userCustomScheduleM.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxList, timeIndex) => {
        const courseBoxData = courseBoxList[0]
        const { name } = courseBoxData
        if (name) {
          const rawData = scheduleMatrix[weekIndex][dayIndex][timeIndex][0]
          // 规则：只有没课的地方才可以添加自定义事件
          if (!rawData.name) {
            scheduleMatrix[weekIndex][dayIndex][timeIndex][0] = courseBoxData
          }
        }
      })
    })
  })
  if (render) {
    await dispatch(updateBizData({ scheduleMatrix }))
    // 更新event
    if (userType === 'me') {
      dispatch(eventActions.updateBizData({ scheduleMatrix }))
    }
  }
  await Taro.setStorage({
    key: userType,
    data: {
      ...userData.data,
      scheduleMatrix,
    }
  })
  Taro.hideLoading()
}

export const updateSingleCourseColor = (payload) => async (dispatch, getState) => {
  const { userType, newColor, courseDetailFLData: { courseDetailFLData } } = payload
  const {
    schedule: { uiData: { courseDetailFLData: { isOpened: isScheduleOpened } } },
    event: { uiData: { courseDetailFLData: { isOpened: isEventOpened } } },
  } = getState()
  const { lessonId } = courseDetailFLData

  const userData = Taro.getStorageSync(userType)
  const { scheduleMatrix } = userData

  // 确保diff按钮是关闭的
  dispatch(updateUiData({ diff: false }))

  scheduleMatrix.map((weekData, weekIndex) => {
    weekData.map((dayData, dayIndex) => {
      dayData.map((courseBoxList, courseIndex) => {
        courseBoxList.map((courseBoxData, timeIndex) => {
          if (courseBoxData.lessonId === lessonId) {
            scheduleMatrix[weekIndex][dayIndex][courseIndex][timeIndex].color = newColor
          }
        })
      })
    })
  })
  // 存新的课表数据矩阵
  Taro.setStorage({
    key: userType,
    data: {
      ...userData,
      scheduleMatrix,
    }
  })

  // 更新state
  dispatch(updateBizData({ scheduleMatrix }))
  // 更新event
  if (userType === 'me') {
    dispatch(eventActions.updateBizData({ scheduleMatrix }))
  }

  // 更新底部弹出框，这里要分情况
  courseDetailFLData.color = newColor
  if (isScheduleOpened) {
    dispatch(updateUiData({ courseDetailFLData }))
  } else if (isEventOpened) {
    dispatch(eventActions.updateUiData({ courseDetailFLData }))
  }

  Taro.showToast({
    title: '颜色更新成功',
    icon: 'none',
    duration: 500
  })
}

export const changeUserType = ({ userType }) => async (dispatch) => {
  const newUserType = userType === 'me' ? 'her' : 'me'
  await dispatch(loginActions.updateBizData({
    username: '',
    password: '',
    userType: newUserType,
  }))
  Taro.showToast({
    title: '切换成功',
    icon: 'none',
    duration: 800
  })
}

export const diffSchedule = ({ targetScheduleM }) => async (dispatch) => {
  // 先判断是不是第一次点击，是的话就显示help
  const localConfig = Taro.getStorageSync('config')
  if (localConfig.autoConfig.showDiffHelp) {
    Taro.showModal({
      title: '提示',
      content: `这是将另一张课表与自己的进行对比：绿色代表两方都没课；红色代表两方都有课；黄色代表只有自己有课；蓝色代表只有对方有课。`,
      showCancel: false,
      confirmText: '我知道了',
      confirmColor: '#0089ff',
    })
    Taro.setStorage({
      key: 'config',
      data: {
        ...localConfig,
        autoConfig: {
          ...localConfig.autoConfig,
          showDiffHelp: false,
        }
      }
    })
  }

  Taro.showLoading({
    title: '正在对比...',
    mask: true,
  })
  await dispatch(updateUiData({ diff: true }))
  const { scheduleMatrix: mineScheduleM } = Taro.getStorageSync('me')
  const diffScheduleM = scheduleDiffTool(targetScheduleM, mineScheduleM)
  await dispatch(updateBizData({ scheduleMatrix: diffScheduleM }))
  Taro.hideLoading()
}


export const cancelDiff = () => async (dispatch) => {
  Taro.showLoading({
    title: '正在关闭...',
    mask: true,
  })
  await dispatch(updateUiData({ diff: false }))
  const { scheduleMatrix } = Taro.getStorageSync('her')
  await dispatch(updateBizData({ scheduleMatrix }))
  Taro.hideLoading()
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

const examTimeText_to_timeIndex = (timeText) => {
  let timeIndex = 0
  switch (timeText) {
    case '8:00':
      timeIndex = 1
      break;
    case '10:00':
      timeIndex = 2
      break;
    case '10:20':
      timeIndex = 3
      break;
    case '12:20':
      timeIndex = 4
      break;
    case '14:00':
      timeIndex = 5
      break;
    case '16:00':
      timeIndex = 6
      break;
    case '16:20':
      timeIndex = 7
      break;
    case '18:20':
      timeIndex = 8
      break;
    case '18:30':
      timeIndex = 9
      break;
    case '19:00':
      timeIndex = 9
      break;
    case '20:30':
      timeIndex = 10
      break;
    case '21:00':
      timeIndex = 10
      break;

    default:
      break;
  }

  return timeIndex
}
