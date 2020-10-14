import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtFloatLayout, AtCalendar } from 'taro-ui'

import CustomButton from '../../../../../../components/CustomButton'
import './index.scss'

export default (props) => {
  const { isOpened, onClose, onChange } = props
  const [date, setDate] = useState('')

  const weekIndexes = []
  for (let i = 0; i < 24; i++) {
    weekIndexes.push(i)
  }

  const handleChange = ({ value: { end } }) => {
    setDate(end)
  }

  const handleSubmit = () => {
    onClose()
    onChange(date)
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='datePickerFL'
      onClose={onClose}
    >

      <View className='datePickerFL-content'>
        <AtCalendar isSwiper={false} minDate='2020/9/7' maxDate='2021/1/24' onSelectDate={e => handleChange(e)} />
      </View>

      <View className='datePickerFL-footer'>
        <View className='datePickerFL-footer-btnBox'>
          <CustomButton value='取消' type='primary' onSubmit={onClose} />
        </View>
        <View className='datePickerFL-footer_blank'></View>
        <View className='datePickerFL-footer-btnBox'>
          <CustomButton value='确定' type='call' onSubmit={handleSubmit} />
        </View>
      </View>


    </AtFloatLayout >
  )
}
