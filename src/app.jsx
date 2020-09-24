import React from 'react'
import { Provider } from 'react-redux'
import 'taro-ui/dist/style/index.scss'

import configStore from './store'

import './style/app.scss'

const store = configStore()

export default (props) => {

  return (
    <Provider store={store}>
      {props.children}
    </Provider>
  )
}
