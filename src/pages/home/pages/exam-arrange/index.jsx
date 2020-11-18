import React from 'react'
import { useSelector } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'
import * as moment from 'moment';

import IconFont from '../../../../components/iconfont'
import img from '../../../../assets/img/examArrange.svg'
import './index.scss'

function ExamArrange() {
  const examData = useSelector(state => state.event.bizData.examData)

  if (examData.length === 0) {
    return (
      <View className='examArrange'>
        <View className='examArrange-none'>
          <Image
            src={img}
            className='examArrange-none-noneImg'
          />
          <Text className='examArrange-none-noneText'>没有查询到考试安排~</Text>
          <View className='examArrange-none-ad'></View>
        </View>
      </View>
    )
  }

  return (
    <View className='examArrange'>
      <View className='examArrange-content'>
        {
          examData.map(exam => {
            const { name, timeText, room } = exam
            const isPassed = moment().isAfter(moment(timeText.split('~')[0]))
            return (
              <View className={`examArrange-content-item examArrange-content-item_${isPassed && 'passed'}`} key={name}>
                {isPassed && <View className='examArrange-content-item-finished'>已考完</View>}
                <View className='examArrange-content-item-title'>{name}</View>
                <View className='examArrange-content-item-value'>
                  <IconFont name='lishi' size='36' />
                  <Text style={{ marginLeft: '12rpx' }}>{timeText}</Text>
                </View>
                <View className='examArrange-content-item-value'>
                  <View className='examArrange-content-item-value_icon'>
                    <IconFont name='dizhi' size='36' />
                  </View>
                  <Text style={{ marginLeft: '12rpx' }}>{room}</Text>
                </View>
              </View>
            )
          })
        }
      </View>
    </View>
  )

}

export default ExamArrange
