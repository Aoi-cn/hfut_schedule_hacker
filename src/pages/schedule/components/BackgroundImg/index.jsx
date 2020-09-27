import React from 'react'
import { useSelector } from 'react-redux'
import { View, Image } from '@tarojs/components'

export default () => {
  const { backgroundPath } = useSelector(state => state.schedule.bizData)
  const { imgOpacity } = useSelector(state => state.schedule.bizData.userConfig)


  return (
    <View className='schedule-background'>
      <Image style={`width: 100%; height: 100%; opacity: ${imgOpacity}`} mode='scaleToFill' src={backgroundPath} />
    </View>
  )
}
