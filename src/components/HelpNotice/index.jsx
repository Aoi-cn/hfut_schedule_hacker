import React from 'react'
import { View } from '@tarojs/components'

import { helpInfo } from '../../config/config.default'
import IconFont from '../../components/iconfont'
import './index.scss'

export default ({ onClose }) => {

  return (
    <View className='helpNotice'>

      <View className='helpNotice-content'>
        <View className='helpNotice-content-title'>想帮上忙</View>
        <View className='helpNotice-content-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
        {
          helpInfo.map((help, index) => (
            <View className='helpNotice-content-item' key={`thisis${index}`}>
              <View className='helpNotice-content-item-info'>{help.info}</View>
              {
                help.comment &&
                <View className='helpNotice-content-item-comment'>{help.comment}</View>
              }
            </View>
          ))
        }
      </View>

      <View className='helpNotice-mask' onClick={onClose}></View>
    </View>
  )
}
