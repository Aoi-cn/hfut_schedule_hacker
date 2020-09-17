import Taro from '@tarojs/taro'
import {
  UPDATE_BIZDATA,
  UPDATE_UIDATA,
  LOGOUT,
} from '../constants/login'
import { GET } from '../utils/request'
import { updateScheduleData, enter, logout as scheduleLogout } from './schedule'
import { logout as allScheduleLogout } from './allSchedule'
import { version } from '../config/config.default'

export const login = ({ username, password, userType, campus }) => async (dispatch) => {
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
      scheduleData: [],
      lessonIds: [],
    }
  })

  // 写入当前版本信息
  if (userType === 'me') {
    Taro.setStorage({
      key: 'config',
      data: {
        version,
        showDiffHelp: true,
        showAllSHelp: true,
      },
    })
  }

  await Taro.switchTab({ url: '/pages/schedule/index' })

  // 更新课表数据
  dispatch(updateScheduleData({ userType }))
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
  Taro.clearStorage()
  Taro.redirectTo({ url: '/pages/login/index' })
  return {
    type: LOGOUT
  }
}
