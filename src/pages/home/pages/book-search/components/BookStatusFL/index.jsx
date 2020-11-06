import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtFloatLayout, AtLoadMore } from 'taro-ui'

import IconFont from '../../../../../../components/iconfont'
import './index.scss'

export default (props) => {
  const { bookStatusFLData } = props
  const { isOpened, onClose, title, statusList } = bookStatusFLData

  const handleClickSelectNumber = (selectNumber) => {
    Taro.setClipboardData({
      data: selectNumber,
      success: function () {
        Taro.hideToast();
        Taro.showModal({
          title: '小提示',
          showCancel: false,
          content: '索书号' + selectNumber + '已复制到剪切板',
          confirmColor: '#0089ff',
        })
      }
    })
  }

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='bookStatusFL'
      onClose={onClose}
    >
      <View className='bookStatusFL-header'>
        {title}
      </View>

      <View className='bookStatusFL-content'>
        {
          (statusList.length === 0) ?
            <View className='bookStatusFL-content-loading'>
              <AtLoadMore
                status='loading'
              />
            </View>
            :
            <>
              <View className='bookStatusFL-content-item bookStatusFL-content-item_header'>
                <View className='bookStatusFL-content-item_box1'>位置</View>
                <View className='bookStatusFL-content-item_box2 bookStatusFL-content-item_boxHeader'>索书号</View>
                <View className='bookStatusFL-content-item_box3'>状态</View>
              </View>
              {
                statusList.map((statusData, index) => {
                  let statusColor
                  if (statusData.status.indexOf('可借') !== -1) {
                    statusColor = 'green'
                  } else if (statusData.status.indexOf('正在') !== -1) {
                    statusColor = 'yellow'
                  } else {
                    statusColor = 'red'
                  }
                  return (
                    <View className='bookStatusFL-content-item' key={index}>
                      <View className='bookStatusFL-content-item_box1'>{statusData.location}</View>
                      <View className='bookStatusFL-content-item_box2' onClick={() => handleClickSelectNumber(statusData.selectNumber)}>{statusData.selectNumber}</View>
                      <View className={`bookStatusFL-content-item_box3 bookStatusFL-content-item_box3_${statusColor}`}>{statusData.status}</View>
                    </View>
                  )
                })
              }
            </>
        }
      </View>

      <View className='bookStatusFL-footer'>
        <View className='bookStatusFL-footer-close' onClick={onClose}>
          <IconFont name='shibai' size={48} color='#60646b' />
        </View>
      </View>
    </AtFloatLayout>
  )
}
