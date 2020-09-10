import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/login'
import { GET } from '../utils/request'
import { updateScheduleData, enter } from './schedule'
import makeDayLineMatrix from '../utils/dayLineMatrixMaker'

export const login = ({ username, password, userType }) => async (dispatch) => {
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
        key
      },
      scheduleMatrix: [],
      scheduleData: [],
      lessonIds: [],
    }
  })
  await Taro.setStorage({
    key: 'userType',
    data: userType
  })
  await Taro.setStorage({ key: 'dayLineMatrix', data: makeDayLineMatrix() })
  Taro.redirectTo({ url: '/pages/schedule/index' })

  // 更新课表数据
  dispatch(updateScheduleData({ userType }))
  return null
}


// 在情侣课表绑定页面 点击了返回
export const back = () => async () => {
  await Taro.setStorage({ 
    key: 'userType',
    data: 'me'
   })
   Taro.redirectTo({ url: '/pages/schedule/index' })
}

export const unBindHer = () => async (dispatch) => {
  await Taro.setStorage({
    key: 'userType',
    data: 'me'
  })
  await Taro.removeStorage({ key: 'her' })
  dispatch(enter())
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
