import React from 'react'
import { View, Button, Text } from '@tarojs/components'

import updateHistory from '../../../../assets/data/updateHistory'
import IconFont from '../../../../components/iconfont'
import themeC from '../../../../style/theme'
import './index.scss'


function Gift() {

  return (
    <View className='feedbackUpdate'>

      <View className='feedbackUpdate-header'>
        <View className='feedbackUpdate-header_comment'>同学们现在可以通过新的方式进行意见反馈啦，支持上传图片。 另外也可以通过“联系客服”直接进行提问和反馈，我看到就会尽快回复的~</View>
      </View>

      <View className='feedbackUpdate-card'>
        <View className='feedbackUpdate-card-item'>
          <Button className='feedbackUpdate-card-item-btn' openType='feedback'>意见反馈</Button>
        </View>
        <View className='feedbackUpdate-card-item'>
          <Button className='feedbackUpdate-card-item-btn' openType='contact'>联系客服</Button>
        </View>
      </View>

      <View className='feedbackUpdate-history'>
        <Text>以下是历史更新：</Text>
      </View>

      <View className='feedbackUpdate-list'>
        {
          updateHistory.reverse().map((updateData, ui) => (
            <View key={updateData.version} className='feedbackUpdate-list-item'>
              <View className='feedbackUpdate-list-item-title'>
                {/* <View style={{ position: 'relative', top: 2 }}> */}
                  <IconFont name='huatifuhao' size={44} color={themeC["color-font-brand"]} />
                <Text style={{ marginLeft: 8 }}>{updateData.version}</Text>
              </View>
              <View className='feedbackUpdate-list-item-comment'>
                <Text>更新时间：{updateData.time}</Text>
              </View>
              <View className='feedbackUpdate-list-item-content'>
                {
                  updateData.features.map((feature, fi) => (
                    <View key={fi} className='feedbackUpdate-list-item-content-item'>· {feature}</View>
                  ))
                }
              </View>

              {
                (ui + 1) !== updateHistory.length && <View className='feedbackUpdate-list-line'></View>
              }
            </View>
          ))
        }
      </View>

    </View>
  )
}

export default Gift
