import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Text, Image } from '@tarojs/components'
import { useSelector } from 'react-redux'
import { AtBadge } from 'taro-ui'

import weatherConfig from '../../../../assets/img/weather/enter'
import './index.scss'

export default (props) => {
  const { statusBarHeight } = props
  const weatherRealTime = useSelector(state => state.event.bizData.weatherData.realtime)
  const [showWeatherRedPoint, setShowWeatherRedPoint] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      const localConfig = Taro.getStorageSync('config')
      const { autoConfig: { showWeatherRedPoint: showWeatherRedPoint_ } } = localConfig
      setShowWeatherRedPoint(showWeatherRedPoint_)
      if (showWeatherRedPoint_) {
        setTimeout(() => {
          setShowWeatherRedPoint(false)
          Taro.setStorage({
            key: 'config',
            data: {
              ...localConfig,
              autoConfig: {
                ...localConfig.autoConfig,
                showWeatherRedPoint: false,
              }
            }
          })
        }, 10000);
      }
    }, 2500);
  }, [])

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
      <Text className='weather-temp'>{weatherRealTime.temperature}°C</Text>
      {
        showWeatherRedPoint && <View className='weather-dot'><AtBadge dot></AtBadge></View>
      }
    </View>
  )
}
