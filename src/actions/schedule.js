import Taro from '@tarojs/taro'
import _ from 'lodash'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/schedule'
import { GET } from '../utils/request'
import dataToMatrix from '../utils/scheduleDataTranslator'
import * as loginActions from './login'
import makeDayLineMatrix from '../utils/dayLineMatrixMaker'
import scheduleDiffTool from '../utils/scheduleDiffTool'
import { config, updateState } from '../config/config.default'

const { version } = config

// 刚进入小程序时，判断是否有本地缓存，有的话就不用登录
// enterState = 0或unfinded => 刚进入小程序
// enterState = 1 => 切换情侣课表
export const enter = ({ userType }) => async (dispatch) => {

  Taro.getStorage({ key: userType })
    .then(async (userData) => {
      const { scheduleMatrix, timeTable } = userData.data  // 读取本地的课表数据

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
          if (!userConfig[configKey]) {
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

      // 不是第一次登录
      if (scheduleMatrix.length !== 0) {
        // 写入自定义事件
        let customSchedule = Taro.getStorageSync('custom')
        customSchedule = customSchedule ? customSchedule : {}
        const userCustomScheduleM = customSchedule[userType]
        if (!userCustomScheduleM) {
          // 本地还没有这个用户的自定义事件，那就新生成一个
          customSchedule[userType] = dataToMatrix()
          await Taro.setStorage({
            key: 'custom',
            data: customSchedule
          })
        } else {
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
      }

      // 版本正常，且本地缓存正常
      const { dayLineMatrix, currentWeekIndex } = makeDayLineMatrix()  // 生成一个时间线矩阵
      dispatch(updateBizData({ scheduleMatrix, timeTable, dayLineMatrix, currentWeekIndex, weekIndex: currentWeekIndex, userConfig }))
      // 每次进入的自动更新
      dispatch(updateScheduleData({ userType }))
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
    dispatch(updateUiData({ showUpdateNotice: true }))
    // 更新本地config缓存
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
export const updateScheduleData = ({ userType }) => async (dispatch, getState) => {
  Taro.showNavigationBarLoading()
  Taro.setNavigationBarTitle({ title: '正在更新...' })

  // 进行课表更新逻辑
  const userData = Taro.getStorageSync(userType)
  if (!userData) {
    console.log('用户数据不存在：' + userType)
    return null
  }
  const { userInfo } = userData
  const { key, campus } = userInfo
  const res = await GET('/schedule', { key, campus, semesterId: 114 })
  if (!res) {  // 请求失败
    Taro.hideNavigationBarLoading()
    Taro.setNavigationBarTitle({ title: `${userType === 'me' ? '我的' : 'ta的'}课表` })
  }
  // 课表请求出错。执行key过期之后的逻辑
  if (!res.body.currentWeek) {
    return dispatch(reLogin({ userType }))
  }
  reLoginTime = 0
  // 获取课表数据
  const scheduleData = res.body.lessons
  const lessonIds = res.body.lessonIds
  const timeTable = res.body.timeTable.courseUnitList
  // 转化为UI可识别的matrix
  let scheduleMatrix = dataToMatrix(scheduleData, lessonIds, timeTable)
  // 颜色持久化
  try {
    scheduleMatrix = dataPersistence({ userType, scheduleMatrix })
  } catch (error) { console.log('颜色持久化出错') }

  for (let i = 0; i < 4; i++) {
    timeTable.push({ endTimeText: 'sleep' })
  }

  // 写入自定义事件
  const userCustomScheduleM = Taro.getStorageSync('custom')[userType]
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

  // 适应场景：刚打开课表就点情侣课表
  const { login: { bizData: { userType: userType_ } } } = getState()
  if (userType === userType_) {
    dispatch(updateBizData({ scheduleMatrix, timeTable }))
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
    }
  })
  Taro.hideNavigationBarLoading()
  Taro.setNavigationBarTitle({ title: `${userType === 'me' ? '我的' : 'ta的'}课表` })
}

// 颜色持久化
const dataPersistence = ({ userType, scheduleMatrix }) => {
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
            courseBoxData.color = localColorLibrary[lessonId].color
            courseBoxData.memo = localColorLibrary[lessonId].memo
          }
        })
      })
    })
  })

  return newScheduleMatrix
}

// 判断尝试了多少次重新登陆。啊万恶的全局变量。
let reLoginTime = 0

// key失效，自动登录更新key
export const reLogin = ({ userType }) => async (dispatch) => {
  const localUserData = Taro.getStorageSync(userType)
  const { userInfo } = localUserData
  const { username, password, campus } = userInfo
  const res = await GET('/login', { username, password })
  const { success, key } = res
  if (success && reLoginTime < 4) {
    reLoginTime++
    await Taro.setStorage({
      key: userType,
      data: {
        ...localUserData,
        userInfo: {
          username,
          password,
          key,
          campus,
        },
      }
    })
    dispatch(updateScheduleData({ userType }))
  } else {
    reLoginTime = 0
    Taro.hideNavigationBarLoading()
    Taro.setNavigationBarTitle({ title: `${userType === 'me' ? '我的' : 'ta的'}课表` })
    Taro.showToast({
      title: '课表更新出错。请点击右上角加号-用前必读-查看帮助解决~',
      icon: 'none',
      duration: 8000
    })
  }
}

export const refreshColor = ({ userType, render = true }) => async (dispatch) => {
  Taro.showLoading({
    title: '正在刷新...',
    mask: true,
  })
  // 确保diff按钮是关闭的
  await dispatch(updateUiData({ diff: false }))

  const userData = await Taro.getStorage({ key: userType })
  const { userInfo, scheduleData, lessonIds, timeTable } = userData.data

  const scheduleMatrix = dataToMatrix(scheduleData, lessonIds, timeTable)
  if (render) {
    await dispatch(updateBizData({ scheduleMatrix }))
  }
  await Taro.setStorage({
    key: userType,
    data: {
      userInfo,
      scheduleData,
      scheduleMatrix,
      lessonIds
    }
  })
  Taro.hideLoading()
}

export const updateSingleCourseColor = (payload) => async (dispatch) => {
  const { userType, newColor, courseDetailFLData: { courseDetailFLData } } = payload
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
  dispatch(updateBizData({ scheduleMatrix }))
  // 更新底部弹出框
  courseDetailFLData.color = newColor
  // courseDetailFLData.isOpened = false
  dispatch(updateUiData({ courseDetailFLData }))
  Taro.showToast({
    title: '颜色更新成功',
    icon: 'none',
    duration: 500
  })
}

export const changeUserType = ({ userType }) => async (dispatch) => {
  const newUserType = userType === 'me' ? 'her' : 'me'
  dispatch(loginActions.updateBizData({
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
