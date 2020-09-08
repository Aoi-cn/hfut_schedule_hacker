import { combineReducers } from 'redux'
import login from './login'
import schedule from './schedule'

export default combineReducers({
  login,
  schedule,
})
