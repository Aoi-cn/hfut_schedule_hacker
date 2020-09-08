import { UPDATE_BIZDATA, UPDATE_UIDATA, LOGOUT } from '../constants/login'

const INITIAL_STATE = {
  bizData: {
    username: '',
    password: '',
  },
  uiData: {
    isLoginDisabled: false,
    isLoginLoading: false,
    showLoginHelp: false,
    showPwd: false,
  }
}

export default function counter(state = INITIAL_STATE, action) {
  const { payload } = action

  switch (action.type) {
    // 更新业务数据
    case UPDATE_BIZDATA:
      return { 
        ...state,
        bizData: {
          ...state.bizData,
          ...payload,
        }
       }

    // 更新UI数据
    case UPDATE_UIDATA:
      return {
        ...state,
        uiData: {
          ...state.uiData,
          ...payload,
        }
      }

    // 登出
    case LOGOUT:
      return INITIAL_STATE

    // 

    default:
      return state
  }
}
