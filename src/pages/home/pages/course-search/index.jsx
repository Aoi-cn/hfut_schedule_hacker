import React from 'react'
import { useSelector } from 'react-redux'
import { View, Image, Text, Ad } from '@tarojs/components'

import img from '../../../../assets/img/courseSearch.svg'
import './index.scss'

function CourseSearch() {
  const showAd = useSelector(state => state.schedule.bizData.userConfig.showAd)

  return (
    <View className='courseSearch'>
      <View className='courseSearch-none'>
        <Image
          src={img}
          className='courseSearch-none-noneImg'
        />
        <Text className='courseSearch-none-noneText'>这也是个牛逼的功能</Text>
        <View className='courseSearch-none-ad'>
          {/* {
            showAd &&
            <Ad unit-id='adunit-209201f9afd060be' ad-type='video' ad-theme='white'></Ad>
          } */}
        </View>
      </View>
    </View>
  )
}

export default CourseSearch
