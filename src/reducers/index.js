import { combineReducers } from 'redux'
import login from './login'
import event from './event'

import schedule from './schedule/schedule'
import allSchedule from './schedule/allSchedule'
import roomDetailSchedule from './schedule/roomDetailSchedule'
import singleCourseSchedule from './schedule/singleCourseSchedule'

export default combineReducers({
  login,
  schedule,
  allSchedule,
  event,
  roomDetailSchedule,
  singleCourseSchedule,
})
