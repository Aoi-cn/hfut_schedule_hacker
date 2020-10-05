import { combineReducers } from 'redux'
import login from './login'
import schedule from './schedule'
import allSchedule from './allSchedule'
import event from './event'

export default combineReducers({
  login,
  schedule,
  allSchedule,
  event,
})
