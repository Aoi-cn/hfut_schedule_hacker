import React from 'react'
import { View } from '@tarojs/components'

import './index.scss'

export default (props) => {

  const { number } = props

  return (
    <View className={`whiteBox whiteBox-${number}`}>

    </View>
  )
}
