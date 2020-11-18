import { combineReducers } from 'redux'
import login from './login'
import schedule from './schedule'
import allSchedule from './allSchedule'
import event from './event'
import roomDetailSchedule from './roomDetailSchedule'
import singleCourseSchedule from './singleCourseSchedule'

export default combineReducers({
  login,
  schedule,
  allSchedule,
  event,
  roomDetailSchedule,
  singleCourseSchedule,
})
