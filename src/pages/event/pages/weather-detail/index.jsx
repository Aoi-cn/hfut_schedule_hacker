import React, { useEffect, useCallback } from 'react'
import Taro, { usePullDownRefresh } from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Canvas, ScrollView } from '@tarojs/components'
import * as moment from 'moment'

import { refreshWeather } from '../../../../actions/event'
import { dayIndexToZh } from '../../../../utils/scheduleDataTranslator'
import themeC from '../../../../style/theme'
import weatherConfig from '../../../../assets/img/weather/enter'
import './index.scss'

function WeatherDetail() {
  const weatherData = useSelector(state => state.event.bizData.weatherData)
  const { hourly, realtime, daily } = weatherData
  const dispatch = useDispatch()

  const { windowWidth } = Taro.getSystemInfoSync()
  const beginX_growth = windowWidth * 0.198
  const board_width = windowWidth * 0.898

  // 下拉刷新
  usePullDownRefresh(async () => {
    await dispatch(refreshWeather())
    setTimeout(() => {
      Taro.stopPullDownRefresh();
      setTimeout(() => {
        Taro.showToast({
          title: '更新成功',
          icon: 'success',
          duration: 1000
        })
      }, 500);
    }, 500);
  })

  // 绘制近5日概览
  const drawDaily = useCallback(
    () => {
      const cvsDaily = Taro.createCanvasContext('daily')
      cvsDaily.beginPath();
      cvsDaily.strokeStyle = "#00a6da";
      cvsDaily.lineWidth = 4;
      cvsDaily.lineCap = "round";
      cvsDaily.fillStyle = themeC['color-semi']
      cvsDaily.font = '12px sans-serif'
      let beginX = windowWidth * 0.036
      // 获取最高温度
      let maxMaxTmp = -40
      let maxMinTmp = -40
      for (const tmpData of daily.temperature) {
        if (tmpData.max > maxMaxTmp) {
          maxMaxTmp = tmpData.max
        }
        if (tmpData.min > maxMinTmp) {
          maxMinTmp = tmpData.min
        }
      }
      maxMaxTmp = maxMaxTmp.toFixed()
      maxMinTmp = maxMinTmp.toFixed()

      // 绘制上半部分
      for (let d = 0; d < 5; d++) {
        let { max } = daily.temperature[d]
        let { date, value: iconName } = daily['skycon_08h_20h'][d]
        max = max.toFixed()
        const maxHeight = (-(max - 50) * 3) - (-(maxMaxTmp - 50) * 3) + 130
        cvsDaily.lineTo(beginX, maxHeight);
        cvsDaily.fillText(max + '°', beginX - 8, maxHeight - 8)
        cvsDaily.drawImage(weatherConfig[iconName].img, beginX - 16, maxHeight - 60, 32, 32)

        // 画顶部的日期
        const dayMoment = moment(date)
        cvsDaily.font = '14px sans-serif'
        if (d === 0) {
          cvsDaily.fillText('今日', beginX - 13, 24)
        } else {
          cvsDaily.fillText(dayIndexToZh(dayMoment.day() - 1), beginX - 13, 24)
        }

        cvsDaily.font = '12px sans-serif'
        cvsDaily.fillStyle = themeC['color-light']
        cvsDaily.fillText(dayMoment.month() + 1 + '-' + dayMoment.date(), beginX - 13, 50)
        cvsDaily.fillStyle = themeC['color-semi']

        beginX += beginX_growth
      }
      cvsDaily.stroke();

      beginX = windowWidth * 0.036
      // 绘制下半部分
      cvsDaily.beginPath();
      cvsDaily.strokeStyle = "#79cae5";
      cvsDaily.lineWidth = 4;
      cvsDaily.lineCap = "round";
      beginX = 14
      for (let d = 0; d < 5; d++) {
        let { min } = daily.temperature[d]
        let { value: iconName } = daily['skycon_20h_32h'][d]
        min = min.toFixed()
        const minHeight = (-(min - 50) * 3) - (-(maxMinTmp - 50) * 3) + 160
        cvsDaily.lineTo(beginX, minHeight);
        cvsDaily.fillText(min + '°', beginX - 8, minHeight + 16)
        cvsDaily.drawImage(weatherConfig[iconName].img, beginX - 16, minHeight + 28, 32, 32)
        beginX += beginX_growth
      }
      cvsDaily.stroke();

      cvsDaily.draw()
    },
    [beginX_growth, daily, windowWidth]
  )

  // 绘制48小时概览
  const drawHourly = useCallback(
    () => {
      const cvsHourly = Taro.createCanvasContext('hourly')
      cvsHourly.beginPath();
      cvsHourly.strokeStyle = "#00a6da";
      cvsHourly.lineWidth = 4;
      cvsHourly.lineCap = "round";
      cvsHourly.fillStyle = themeC['color-semi']
      cvsHourly.font = '12px sans-serif'
      let beginX = windowWidth * 0.036
      // 获取最高温度
      let maxTmp = -40
      for (const tmpData of hourly.temperature) {
        if (tmpData.value > maxTmp) {
          maxTmp = tmpData.value
        }
      }
      maxTmp = maxTmp.toFixed()
      for (let h = 0; h < hourly.temperature.length; h++) {
        let { datetime, value: tmp } = hourly.temperature[h]
        tmp = tmp.toFixed()
        const height = (-(tmp - 50) * 3) - (-(maxTmp - 50) * 3) + 128
        let { value: iconName } = hourly['skycon'][h]
        cvsHourly.fillText(tmp + '°', beginX - 8, height - 8)
        cvsHourly.drawImage(weatherConfig[iconName].img, beginX - 16, height - 60, 32, 32)
        cvsHourly.lineTo(beginX, height);
        // 绘制顶部的小时
        const hourMoment = moment(datetime)
        cvsHourly.font = '14px sans-serif'
        cvsHourly.fillText(hourMoment.hour() + '时', beginX - 13, 24)
        cvsHourly.font = '12px sans-serif'
        cvsHourly.fillStyle = themeC['color-light']
        cvsHourly.fillText(hourMoment.month() + 1 + '-' + hourMoment.date(), beginX - 13, 50)
        cvsHourly.fillStyle = themeC['color-semi']
        beginX += beginX_growth
      }
      cvsHourly.stroke();

      cvsHourly.draw()

    },
    [windowWidth, hourly, beginX_growth],
  )



  useEffect(() => {
    drawDaily()
    drawHourly()
  }, [drawDaily, drawHourly])

  return (
    <View className='weatherDetail'>

      <View className='weatherDetail-header'>
        <View className='weatherDetail-header-title'>{realtime.temperature}°</View>
        <View className='weatherDetail-header-comment1'>{weatherConfig[realtime.skycon].desc + '，体感 ' + realtime.apparent_temperature.toFixed()}°</View>
        <View className='weatherDetail-header-comment2'>空气质量 - {realtime.air_quality.description.chn}</View>
      </View>

      <View className='weatherDetail-content'>

        <View className='weatherDetail-content-item'>
          <View className='weatherDetail-content-item-titleBox'>
            <View className='weatherDetail-content-item-titleBox_title'>48小时概况</View>
            <View className='weatherDetail-content-item-titleBox_comment'>{hourly.description}</View>
          </View>
          <ScrollView scrollX enableFlex className='weatherDetail-content-item-board'>
            <View style={{ width: board_width, height: 210 }} >
              <Canvas style={{ width: beginX_growth * 48, height: 210 }} canvasId='hourly' />
            </View>
          </ScrollView>
        </View>

        <View className='weatherDetail-content-item'>
          <View className='weatherDetail-content-item-titleBox'>
            <View className='weatherDetail-content-item-titleBox_title'>近5日概况</View>
          </View>
          <View className='weatherDetail-content-item-board'>
            <Canvas style={{ width: board_width, height: 254 }} canvasId='daily' />
          </View>
        </View>



      </View>

    </View>
  )
}

export default WeatherDetail
