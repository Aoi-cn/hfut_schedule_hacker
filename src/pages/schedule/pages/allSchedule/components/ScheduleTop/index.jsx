import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import moment from 'moment'

import StandardFloatLayout from '../../../../../../components/StandardFloatLayout'
import SelectFloatLayout from '../SelectFloatLayout'
import IconFont from '../../../../../../components/iconfont'
import './index.scss'

export default (props) => {
  const { weekIndex, currentWeekIndex, changeWeekIndex } = props
  const [showAbout, setShowAbout] = useState(false)
  const [showSelect, setShowSelect] = useState(false)
  const [supportNum, setSupportNum] = useState({ academyNum: 0, majorNum: 0, clazzNum: 0 })

  useEffect(() => {
    setTimeout(() => {
      const selectInfo = Taro.getStorageSync('selectInfo')
      let academyNum = 0
      let majorNum = 0
      let clazzNum = 0

      for (const academy in selectInfo) {
        academyNum++
        for (const major in selectInfo[academy]) {
          majorNum++
          for (const level in selectInfo[academy][major]) {
            selectInfo[academy][major][level].map(() => {
              clazzNum++
            })
          }
        }
      }
      setSupportNum({
        academyNum,
        majorNum,
        clazzNum,
      })
    }, 1500);
  }, [])

  const daysZh = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']

  const weekIndexes = [
    { name: '第1周', index: 1 },
    { name: '第2周', index: 2 },
    { name: '第3周', index: 3 },
    { name: '第4周', index: 4 },
    { name: '第5周', index: 5 },
    { name: '第6周', index: 6 },
    { name: '第7周', index: 7 },
    { name: '第8周', index: 8 },
    { name: '第9周', index: 9 },
    { name: '第10周', index: 10 },
    { name: '第11周', index: 11 },
    { name: '第12周', index: 12 },
    { name: '第13周', index: 13 },
    { name: '第14周', index: 14 },
    { name: '第15周', index: 15 },
    { name: '第16周', index: 16 },
    { name: '第17周', index: 17 },
    { name: '第18周', index: 18 },
    { name: '第19周', index: 19 },
    { name: '第20周', index: 20 },
  ]

  const handlePickerChange = (e) => {
    const weekIndex_ = parseInt(e.detail.value)
    changeWeekIndex(weekIndex_)
  }

  return (
    <View className='scheduleTop'>

      <View className='scheduleTop-aixin' onClick={() => setShowAbout(true)}>
        <IconFont name='info-circle-fill' size={42} color='#ffffff' />
      </View>

      <Picker mode='selector'
        range={weekIndexes}
        rangeKey='name'
        value={weekIndex}
        onChange={e => handlePickerChange(e)}
      >
        <View className='scheduleTop-title'>
          {`第${weekIndex + 1}周 ` + (currentWeekIndex === weekIndex ? `（当前${daysZh[moment().day()]}）` : `（当前第${currentWeekIndex + 1}周）`)}
          <View className='scheduleTop-title-icon'>
            <IconFont name='icon-test' size={46} color='#ffffff' />
          </View>
        </View>
      </Picker>

      <View className='scheduleTop-operation' onClick={() => setShowSelect(true)}>
        <IconFont name='search' size={46} color='#ffffff' />
      </View>

      <StandardFloatLayout
        isOpened={showAbout}
        onClose={() => setShowAbout(false)}
        title='注意事项'
        content={`目前已支持${supportNum.academyNum}个学院${supportNum.majorNum}个专业，合计${supportNum.clazzNum}个班级。其中对20级班级和宣城校区的支持正在完善中~\n
        数据可靠性不做保证，仅供参考！点击右上角的搜索按钮开始。
        `}
      />

      <SelectFloatLayout
        isOpened={showSelect}
        onClose={() => setShowSelect(false)}
      />

    </View>

  )
}
