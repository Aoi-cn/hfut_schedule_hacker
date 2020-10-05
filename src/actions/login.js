import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/login'
import { GET } from '../utils/request'
import { enter, logout as scheduleLogout } from './schedule'
import { logout as allScheduleLogout } from './allSchedule'
import { config } from '../config/config.default'

export const login = ({ username, password, userType, campus }) => async () => {
  Taro.showLoading({
    title: '正在加载...',
    mask: true,
  })
  const res = await GET('/login', { username, password })
  Taro.hideLoading()
  const { success, msg, key } = res

  // 验证失败
  if (!success) {
    Taro.atMessage({
      'message': msg,
      'type': 'error',
      duration: 2000,
    })
    return null
  }

  // 验证成功
  await Taro.setStorage({
    key: userType,
    data: {
      userInfo: {
        username,
        password,
        campus,
        key,
      },
      scheduleMatrix: [],
      timeTable: [],
      scheduleData: [],
      lessonIds: [],
    }
  })

  // 写入当前版本信息
  if (userType === 'me') {
    Taro.setStorage({
      key: 'config',
      data: config,
    })
  }

  await Taro.switchTab({ url: '/pages/schedule/index' })

  // // 更新课表数据
  // dispatch(updateScheduleData({ userType }))
  return null
}


// 在情侣课表绑定页面 点击了返回
export const back = () => async (dispatch) => {
  dispatch(updateBizData({ userType: 'me' }))
   Taro.switchTab({ url: '/pages/schedule/index' })
}

export const unBindHer = () => async (dispatch) => {
  dispatch(updateBizData({ userType: 'me' }))
  await Taro.removeStorage({ key: 'her' })
  const customSchedule = Taro.getStorageSync('custom')
  delete customSchedule.her
  Taro.setStorage({
    key: 'custom',
    data: customSchedule
  })
  dispatch(enter({ userType: 'me' }))
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

export const logout = () => async (dispatch) => {
  // 执行登出逻辑
  dispatch(scheduleLogout())
  dispatch(allScheduleLogout())
  const localConfig = Taro.getStorageSync('config')
  // const localCustom = Taro.getStorageSync('custom')
  await Taro.clearStorage()
  Taro.setStorage({
    key: 'config',
    data: localConfig
  })
  // Taro.setStorage({
  //   key: 'custom',
  //   data: localCustom
  // })
  await dispatch({ type: LOGOUT })
  Taro.redirectTo({ url: '/pages/login/index' })
}
