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
    examData: [],
    weatherData: {},
  },
  uiData: {
    showCalendar: false,
    timeDistance: 30,
    chosenBlank: [],
    showUpdateNotice: false,
    customScheduleFLData: {
      isOpened: false,
      name: '',
      clazzRoom: '',
      chosenWeeks: [],
      currentWeekIndex: 0,
      courseType: 1,
      dayIndex: 0,
      startTime: 0,
      lessonId: '',
      memo: '',
      color: 'blue',
    },
    colorPickerData: {
      isOpened: false,
      handleColorChange: null,
      theme: 0,
      currentColor: 'blue',
    },
    courseDetailFLData: {
      isOpened: false,
      showMemo: true,
      type: 'course',
      name: '',
      clazzRoom: '',
      teacher: '',
      timeRange: '',
      timeIndexes: [],
      dayIndex: 0,
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
