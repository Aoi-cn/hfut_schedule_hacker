import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout } from 'taro-ui'

import IconFont from '../../../../../../components/iconfont'
import './index.scss'

export default (props) => {
  const { scoreDetailFLData, onClose } = props
  const { isOpened, info } = scoreDetailFLData

  let items = []
  if (info) {
    info.gradeDetail.split(';').map(ele => {
      items.push({
        value: <><Text className='scoreDetailFL-itemTitle'>{ele.split(':')[0]}：</Text><Text>{ele.split(':')[1]}</Text></>,
        icon: '',
        text: ele.split(':')[1],
      })
    })
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='scoreDetailFL'
      onClose={onClose}
    >
      <View className='scoreDetailFL-header'>
        {info && (info.lessonName + `（${info.lessonCode}）`)}
        <View className='scoreDetailFL-header-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>

      <View className='scoreDetailFL-content'>
        {
          items.map((item, index) => (
            item.text &&
            <View className='scoreDetailFL-content-item' key={`thisis${index}`}>
              <IconFont name={item.icon} />
              <Text>{item.value}</Text>
            </View>
          ))
        }
      </View>

    </AtFloatLayout>
  )
}
