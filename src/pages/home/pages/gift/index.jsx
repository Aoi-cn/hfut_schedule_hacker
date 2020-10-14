import React, { useState } from 'react'
import Taro, { showLoading } from '@tarojs/taro'
import { View, Input, Textarea } from '@tarojs/components'
import { AtButton, AtMessage } from 'taro-ui'

import IconFont from '../../../../components/iconfont'
import { GET } from '../../../../utils/request'
import './index.scss'
import themeC from '../../../../style/theme'

function Gift() {
  const [brandname, setBrandname] = useState('')
  const [feedback, setFeedback] = useState('')

  const handleSubmitBrandname = async () => {
    if (!brandname) {
      Taro.atMessage({
        'message': '请先填写内容',
        'type': 'warning',
        duration: 1000,
      })
      return {}
    }
    Taro, showLoading({ title: '正在发送...', mask: true })
    const { userInfo: { username, campus } } = Taro.getStorageSync('me')
    await GET('/feedback/addBrandname', { user_code: username, campus, name: brandname })
      .then(res => {
        if (res.success) {
          Taro.hideLoading()
          Taro.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          Taro.hideLoading()
          Taro.showToast({
            title: '发送失败',
            duration: 2000
          })
        }
      })
  }

  const handleSubmitFeedback = async () => {
    if (!feedback) {
      Taro.atMessage({
        'message': '请先填写内容',
        'type': 'warning',
        duration: 1000,
      })
      return {}
    }
    Taro, showLoading({ title: '正在发送...', mask: true })
    const { userInfo: { username, campus } } = Taro.getStorageSync('me')
    await GET('/feedback/addFeedback', { user_code: username, campus, content: feedback })
      .then(res => {
        if (res.success) {
          Taro.hideLoading()
          Taro.showToast({
            title: '发送成功',
            icon: 'success',
            duration: 2000
          })
        } else {
          Taro.hideLoading()
          Taro.showToast({
            title: '发送失败',
            duration: 2000
          })
        }
      })
  }

  return (
    <View className='gift'>

      <View className='gift-header'>
        <View className='gift-header_title'>活水计划</View>
        <View className='gift-header_comment'>各位同学可以在这里发挥你们的想象力，参与到小程序炫酷功能的创作中来！</View>
      </View>

      {/* <View className='gift-line'></View> */}

      <View className='gift-item'>
        <View className='gift-item-title'>
          <IconFont name='caidan' size={48} color={themeC['color-font-brand']} />
          <View className='gift-item-title__value'>v3.0.0更新预告</View>
        </View>
        <View className='gift-item-content'>
          <View className='gift-item-content-list'>1. 成绩、绩点</View>
          <View className='gift-item-content-list'>2. 班级同学信息查询</View>
          <View className='gift-item-content-list'>3. 好用到爆炸的的日程管理</View>
          <View className='gift-item-content-list'>4. 全校教师、课程信息检索（待定）</View>
          <View className='gift-item-content-list'>未完待续~</View>
        </View>
      </View>

      <View className='gift-line'></View>

      <View className='gift-item'>
        <View className='gift-item-title'>
          <IconFont name='mingxinghuodong' size={48} color={themeC['color-font-brand']} />
          <View className='gift-item-title__value'>v3.0.0更名征集</View>
        </View>
        <View className='gift-item-content'>
          <View className='gift-item-content-text'>
            “合工大课程表无敌版”只是一个临时的名字，现向广大同学们征集新的名字！有任何奇思妙想都可以发给我们哦~
          </View>
          <View className='gift-item-content-comment'>
            最终被采纳的新名字的作者将在v3.0.0更新后于主页提示里鸣谢感激（经过本人同意后）
          </View>
          <View className='gift-item-content-bnOperate'>
            <View>
              <Input
                className='gift-item-content-bnOperate-input'
                border={false}
                placeholder='请输入小程序的新名字'
                placeholder-style='color:#ccc;'
                value={brandname}
                onInput={(e) => setBrandname(e.detail.value)}
              />
            </View>
            <View>
              <AtButton className='gift-item-content-bnOperate-input_btn' onClick={handleSubmitBrandname}>发送</AtButton>
            </View>
          </View>
        </View>
      </View>

      <View className='gift-line'></View>

      <View className='gift-item'>
        <View className='gift-item-title'>
          <IconFont name='wenjuan' size={48} color={themeC['color-font-brand']} />
          <View className='gift-item-title__value'>新功能征集与意见反馈</View>
        </View>
        <View className='gift-item-content'>
          <View className='gift-item-content-text'>
            这里向同学们征集未来版本的新功能！任何想到的新点子都有可能成为现实哦~ 有任何意见或bug反馈也可以一并告诉我们。
          </View>
          <View className='gift-item-content-comment'>
            最终被采纳的新功能的作者将在功能上线后于主页提示里鸣谢感激（经过本人同意后）
          </View>
          <View className='gift-item-content-fdOperate'>
            <View>
              <Textarea
                placeholder='请输入新功能；意见反馈'
                className='gift-item-content-fdOperate-input'
                value={feedback}
                maxlength={-1}
                placeholder-style='color:#ccc;'
                onInput={e => setFeedback(e.detail.value)}
              />
            </View>
            <AtButton className='gift-item-content-fdOperate-input_btn' onClick={handleSubmitFeedback}>发送</AtButton>
          </View>
        </View>
      </View>

      <AtMessage />

    </View>
  )
}

export default Gift
