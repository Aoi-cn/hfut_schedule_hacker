import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/login'
import { GET } from '../utils/request'
import { updateScheduleData } from './schedule'

export const login = ({ username, password }) => async (dispatch) => {
  Taro.showLoading({
    title: '正在加载...',
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
    key: 'userInfo',
    data: {
      username,
      password,
      key
    }
  })
  await Taro.setStorage({ key: 'scheduleMatrix', data: [] })
  await Taro.setStorage({ key: 'dayLineMatrix', data: [] })
  Taro.redirectTo({ url: '/pages/schedule/index' })

  // 更新课表数据
  dispatch(updateScheduleData())

  return null
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
  Taro.clearStorage()
  Taro.redirectTo({ url: '/pages/login/index' })
  return {
    type: LOGOUT
  }
}
