import { UPDATE_BIZDATA, LOGOUT } from '../../constants/schedule/classlist'

const INITIAL_STATE = {
  bizData: {
    clazzName: '',
    semestercode: '037',
    lessonCode: '',
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

    // 登出
    case LOGOUT:
      return INITIAL_STATE

    default:
      return state
  }
}
