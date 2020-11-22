import React from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useSelector } from 'react-redux'

import weatherConfig from '../../../../assets/img/weather/enter'
import './index.scss'

export default (props) => {
  const { statusBarHeight } = props
  const weatherRealTime = useSelector(state => state.event.bizData.weatherData.realtime)

  if (!weatherRealTime || !weatherRealTime.skycon) {
    return (
      <View className='weather' style={{ top: statusBarHeight + 8 }}>
        <Text className='weather-loading'>正在获取天气...</Text>
      </View>
    )
  }
  else if (weatherRealTime.skycon === 'failed') {
    return (
      <View className='weather' style={{ top: statusBarHeight + 8 }}>
        <Text className='weather-loading'></Text>
      </View>
    )
  }
  const imgSrc = weatherConfig[weatherRealTime.skycon].img

  return (
    <View className='weather' style={{ top: statusBarHeight + 8 }} onClick={() => Taro.navigateTo({ url: '/pages/event/pages/weather-detail/index' })}>
      <Image className='weather-img' src={imgSrc} />
      <Text className='weather-temp'>{parseInt(weatherRealTime.temperature)}°C</Text>
    </View>
  )
}
