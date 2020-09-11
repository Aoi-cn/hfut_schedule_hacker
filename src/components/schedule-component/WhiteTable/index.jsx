import React from 'react'
import { View } from '@tarojs/components'

import WhiteBox from '../WhiteBox'
import './index.less'

export default () => {

  return (
    <View className='whiteTable'>
      {
        [0, 0, 0, 0, 0, 0, 0].map((_1, i1) => {
          return (
            <View className='whiteTable-column' key={i1}>
              {
                [0, 0, 0, 0, 0].map((_2, i2) => {
                  return <WhiteBox key={i2} number={i2} />
                })
              }
            </View>
          )

        })
      }
    </View>
  )
}
