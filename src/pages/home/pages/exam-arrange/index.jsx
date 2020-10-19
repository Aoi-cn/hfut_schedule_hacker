import React from 'react'
import { useSelector } from 'react-redux'
import { View, Image, Text, Ad } from '@tarojs/components'

import img from '../../../../assets/img/examArrange.svg'
import './index.scss'

function ExamArrange() {
  const showAd = useSelector(state => state.schedule.bizData.userConfig.showAd)

  return (
    <View className='examArrange'>
      <View className='examArrange-none'>
        <Image
          src={img}
          className='examArrange-none-noneImg'
        />
        <Text className='examArrange-none-noneText'>即将推出（最近也没有考试安排）</Text>
        <View className='examArrange-none-ad'>
          {/* {
            showAd &&
            <Ad unit-id='adunit-209201f9afd060be' ad-type='video' ad-theme='white'></Ad>
          } */}
        </View>
      </View>
    </View>
  )
}

export default ExamArrange
