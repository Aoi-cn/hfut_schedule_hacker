import { UPDATE_BIZDATA, UPDATE_UIDATA, LOGOUT } from '../constants/event'

const INITIAL_STATE = {
  bizData: {
    weekIndex: 0, // 选中的周目
    dayIndex: 0, // 选中的星期几
    currentWeekIndex: 0, // 现实中的周数
    currentDayIndex: 0, // 现实中的周数
    scheduleMatrix: [],
    dayLineMatrix: [],
    timeTable: [],
    chosenBlank: [],
  },
  uiData: {
    showCalendar: false,
    timeDistance: 30,
    chosenBlank: [],
    showCustomScheduleFL: false,
    showUpdateNotice: false,
    showHelpNotice: false,
    colorPickerData: {
      isOpened: false,
      handleColorChange: null,
      theme: 0,
      currentColor: 'blue',
    },
    courseDetailFLData: {
      isOpened: false,
      type: 'course',
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
      campus: '',
      weekIndexesZh: '',
      credits: '',
      memo: '',
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
