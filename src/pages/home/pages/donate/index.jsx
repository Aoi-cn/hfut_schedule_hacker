import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtButton, AtMessage } from 'taro-ui'

import IconFont from '../../../../components/iconfont'
import themeC from '../../../../style/theme'
import './index.scss'


let videoAd = null

function Donate() {

  useDidShow(() => {
    videoAd = Taro.createRewardedVideoAd({
      adUnitId: 'adunit-1b75ce0e13ce786a'
    })

    videoAd.onLoad(() => {
      console.log('视频广告预加载成功')
    })
    videoAd.onError((err) => {
      console.log('视频广告预加载失败', err)
      Taro.hideLoading()
    })
    videoAd.onClose(res => {
      // 用户点击了【关闭广告】按钮
      if (res && res.isEnded) {
        // 正常播放结束，可以下发游戏奖励
        Taro.atMessage({
          'message': '打赏成功！谢谢支持~',
          'type': 'success',
          duration: 3000,
        })
      } else {
        // 播放中途退出，不下发游戏奖励
        Taro.atMessage({
          'message': '广告中途退出，打赏失败',
          'type': 'warning',
          duration: 2000,
        })
      }
    })
  })

  const handleClickAd = () => {
    Taro.showLoading({
      title: '加载中',
    })
    videoAd.load()
      .then(() => {
        videoAd.show()
          .then(() => {
            Taro.hideLoading()
            Taro.showToast({
              title: '时间结束后点击上方退出',
              icon: 'none',
              duration: 2000
            })
          })
          .catch(() => {
            // 失败重试
            videoAd.load()
              .then(() => videoAd.show())
              .catch(err => {
                console.log('激励视频 广告显示失败', err)
                Taro.atMessage({
                  'message': '广告加载失败',
                  'type': 'error',
                  duration: 2000,
                })
              })
          })
      })
  }

  const handleClickDonate = () => {
    Taro.previewImage({
      urls: ['https://oss.cavano.vip/data/donate.png'],
      current: 'https://oss.cavano.vip/data/donate.png',
    })
  }

  return (
    <View className='donate'>

      <View className='donate-header'>
        <View className='donate-header_title'>
          <IconFont name='dianzan' size={48} color={themeC['color-font-brand']} />
          <View style={{ marginLeft: 4 }}>打赏</View>
        </View>
        <View className='donate-header_comment'>{`
        从9月份的第一个版本发布到现在，合工大课程表无敌版已经进行了十余次版本更新、用户量突破1.4万，正在受到越来越多的同学们的欢迎。
        谢谢你们，让我们觉得这是一件有意义的事情，也给了我们一直做下去的理由。希望大家可以多多支持开发者，让我们有动力做得更好！`}
        </View>
      </View>

      <View className='donate-item'>
        <View className='donate-item-title'>
          {/* <IconFont name='mingxinghuodong' size={48} color={themeC['color-font-brand']} /> */}
          <View className='donate-item-title__value'>方式一：观看广告</View>
        </View>
        <View className='donate-item-content'>
          <View className='donate-item-content-text'>
            点击下方按钮观看一个6~30s的的广告（这里是小程序目前唯一有广告的地方，我们绝不会为了投放广告而影响同学们的日常使用体验）
          </View>
          {/* <View className='donate-item-content-comment'>
            最终被采纳的新名字的作者将在v3.0.0更新后于主页提示里鸣谢感激（经过本人同意后）
          </View> */}
          <AtButton className='donate-item-content_btn' onClick={handleClickAd}>观看广告</AtButton>
        </View>
      </View>

      <View className='donate-line'></View>

      <View className='donate-item'>
        <View className='donate-item-title'>
          {/* <IconFont name='mingxinghuodong' size={48} color={themeC['color-font-brand']} /> */}
          <View className='donate-item-title__value'>方式二：微信赞赏</View>
        </View>
        <View className='donate-item-content'>
          <View className='donate-item-content-text'>
            点击下方按钮，并长按识别弹出的赞赏码，即可对开发者进行打赏~
          </View>
          <AtButton className='donate-item-content_btn donate-item-content_btn_donate' onClick={handleClickDonate}>随意打赏</AtButton>
        </View>
      </View>

      <AtMessage />

    </View>
  )
}

export default Donate
