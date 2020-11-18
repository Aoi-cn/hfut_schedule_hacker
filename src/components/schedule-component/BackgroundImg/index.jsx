import React, { useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Image } from '@tarojs/components'

import { updateBizData } from '../../../actions/schedule'

export default () => {
  const backgroundPath = useSelector(state => state.schedule.bizData.backgroundPath)
  const imgOpacity = useSelector(state => state.schedule.bizData.userConfig.imgOpacity)

  const dispatch = useDispatch()

  useEffect(() => {
    Taro.getSavedFileList({
      success: function (savedFileRes) {
        if (savedFileRes.fileList && savedFileRes.fileList.length > 0) {
          dispatch(updateBizData({ backgroundPath: savedFileRes.fileList[0].filePath }))
        } else {
          dispatch(updateBizData({ backgroundPath: 'empty' }))
        }
      }
    })
  }, [dispatch])

  return (
    <View
      className='scheduleBackground'
      style={`z-index: -10;
        top: 0;
        left: 0;
        position: absolute;
        width: 100%;
        height: 100%;`}
    >
      <Image style={`width: 100%; height: 100%; opacity: ${imgOpacity}`} mode='aspectFill' src={backgroundPath} />
    </View>
  )
}
