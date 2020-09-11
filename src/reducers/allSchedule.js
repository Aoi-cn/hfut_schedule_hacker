import { UPDATE_BIZDATA, UPDATE_UIDATA, LOGOUT } from '../constants/allSchedule'

const INITIAL_STATE = {
  bizData: {
    weekIndex: 0, // 课表上展示的周数
    currentWeekIndex: 0, // 现实中的周数
    currentDayIndex: 0,
    scheduleMatrix: [],
    dayLineMatrix: [],
    selectInfo: {},
  },
  uiData: {
    courseDetailFLData: {
      isOpened: false,
      name: '',
      clazzRoom: '',
      teacher: '',
      timeRange: '',
      lessonCode: '',
      lessonType: '',
      weekIndexes: [],
      studentClazzes: [],
      studentNumber: '',
      color: '',
      lessonId: '',
    }
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
