import React from 'react'
import { View } from '@tarojs/components'
import { useDispatch } from 'react-redux'

import { updateUiData } from '../../actions/schedule'
import { helpInfo } from '../../config/config.default'
import IconFont from '../../components/iconfont'
import './index.scss'

export default () => {
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(updateUiData({ showHelpNotice: false }))
  }

  return (
    <View className='helpNotice'>

      <View className='helpNotice-content'>
        <View className='helpNotice-content-title'>想帮上忙</View>
        <View className='helpNotice-content-close' onClick={handleClose}>
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

      <View className='helpNotice-mask' onClick={handleClose}></View>
    </View>
  )
}
