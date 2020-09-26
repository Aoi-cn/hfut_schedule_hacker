import React from 'react'
import { View, Text } from '@tarojs/components'
import { useDispatch } from 'react-redux'

import { updateUiData } from '../../actions/schedule'
import { config, updateInfo } from '../../config/config.default'
import IconFont from '../../components/iconfont'
import './index.scss'

export default () => {
  const { version } = config
  const { features, bugs } = updateInfo
  const dispatch = useDispatch()

  const handleClose = () => {
    dispatch(updateUiData({ showUpdateNotice: false }))
  }

  return (
    <View className='updateNotice'>

      <View className='updateNotice-content'>
        <View className='updateNotice-content-title'>{`${version}更新公告`}</View>
        <View className='updateNotice-content-close' onClick={handleClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
        <View className='updateNotice-content-subTitle'>
          <IconFont name='ceshi' size={36} color='#0089ff' />
          <Text className='updateNotice-content-subTitle_text'>内容升级</Text>
        </View>
        {
          features.map((feature, index) => (
            <View className='updateNotice-content-item' key={`thisis${index}`}>
              <View className='updateNotice-content-item-info'>{feature.info}</View>
              {
                feature.comment &&
                <View className='updateNotice-content-item-comment'>{feature.comment}</View>
              }
            </View>
          ))
        }
        <View className='updateNotice-content-line'></View>
        <View className='updateNotice-content-subTitle'>
          <IconFont name='tanhao' size={36} color='#0089ff' />
          <Text className='updateNotice-content-subTitle_text'>问题修复</Text>
        </View>
        {
          bugs.map((bug, index) => (
            <View className='updateNotice-content-item' key={`thisis${index}`}>
              <View className='updateNotice-content-item-info'>{bug.info}</View>
              {
                bug.comment &&
                <View className='updateNotice-content-item-comment'>{bug.comment}</View>
              }
            </View>
          ))
        }
      </View>

      <View className='updateNotice-mask' onClick={handleClose}></View>
    </View>
  )
}
