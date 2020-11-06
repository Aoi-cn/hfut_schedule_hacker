import React from 'react'
import { View, Text } from '@tarojs/components'
import { AtFloatLayout, AtLoadMore } from 'taro-ui'

import IconFont from '../../../../../../components/iconfont'
import './index.scss'

export default (props) => {
  const { bookInfoFLData } = props
  const { isOpened, onClose, title, author, info } = bookInfoFLData
  const { edition, publish, subject, physics, price, digest } = info

  const items = [
    {
      value: <><Text className='bookInfoFL-itemTitle'>作者：</Text><Text>{author}</Text></>,
      icon: '',
      text: author,
    },
    {
      value: <><Text className='bookInfoFL-itemTitle'>版本说明：</Text><Text>{edition}</Text></>,
      icon: '',
      text: edition,
    },
    {
      value: <><Text className='bookInfoFL-itemTitle'>学科主题：</Text><Text>{subject}</Text></>,
      icon: '',
      text: subject,
    },
    {
      value: <><Text className='bookInfoFL-itemTitle'>出版发行项：</Text><Text>{publish}</Text></>,
      icon: '',
      text: publish,
    },
    {
      value: <><Text className='bookInfoFL-itemTitle'>载体形态项：</Text><Text>{physics}</Text></>,
      icon: '',
      text: physics,
    },
    {
      value: <><Text className='bookInfoFL-itemTitle'>市场参考价：</Text><Text>{price}</Text></>,
      icon: '',
      text: price,
    },
    {
      value: <><Text className='bookInfoFL-itemTitle'>摘要：</Text><Text>{digest}</Text></>,
      icon: '',
      text: digest,
    },
  ]

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='bookInfoFL'
      onClose={onClose}
    >
      <View className='bookInfoFL-header'>
        {title}
      </View>

      <View className='bookInfoFL-content'>
        {
          author ?
            items.map((item, index) => (
              item.text &&
              <View className='bookInfoFL-content-item' key={`thisis${index}`}>
                <IconFont name={item.icon} />
                <Text>{item.value}</Text>
              </View>
            ))
            :
            <View className='bookInfoFL-content-loading'>
              <AtLoadMore
                status='loading'
              />
            </View>
        }
      </View>

      <View className='bookInfoFL-footer'>
        <View className='bookInfoFL-footer-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>
    </AtFloatLayout>
  )
}
