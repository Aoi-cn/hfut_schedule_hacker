import React from 'react'
import { useSelector } from 'react-redux'
import { View, Image, Text, Ad } from '@tarojs/components'

import img from '../../../../assets/img/grade.svg'
import './index.scss'

function Grade() {
  const showAd = useSelector(state => state.schedule.bizData.userConfig.showAd)

  return (
    <View className='grade'>
      <View className='grade-none'>
        <Image
          src={img}
          className='grade-none-noneImg'
        />
        <Text className='grade-none-noneText'>在写了，有生之年推出~</Text>
        <View className='grade-none-ad'>
          {/* {
            showAd &&
            <Ad unit-id='adunit-209201f9afd060be' ad-type='video' ad-theme='white'></Ad>
          } */}
        </View>
      </View>
    </View>
  )
}

export default Grade
