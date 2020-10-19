import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Image, Text, Ad } from '@tarojs/components'
import { AtAccordion } from 'taro-ui'

import IconFont from '../../../../components/iconfont'
import EmptyImg from '../../../../assets/img/empty.svg'
import themeC from '../../../../style/theme'
import './index.scss'

function Mooc(props) {
  const { moocData, showAd } = props
  const [showLessonCode, setShowLessonCode] = useState('')

  // useEffect(() => {
  //   if (showAd) {
  //     const interstitialAd = Taro.createInterstitialAd({
  //       adUnitId: 'adunit-e8c3c88c149f8a07'
  //     })
  //     interstitialAd.show().catch((err) => {
  //       console.error(err)
  //     })
  //   }
  // }, [showAd])

  const copy = (data) => {
    Taro.setClipboardData({
      data,
      success: function () {
        Taro.hideToast();
        Taro.showModal({
          title: '小提示',
          showCancel: false,
          content: '网址已复制',
        })
      }
    })
  }

  if (moocData.length === 0) {
    return (
      <View className='mooc'>
        <View className='mooc-none'>
          <Image
            src={EmptyImg}
            className='mooc-none-noneImg'
          />
          <Text className='mooc-none-noneText'>没有查询到慕课~</Text>
          <View className='mooc-none-ad'>
            {/* {
              showAd &&
              <Ad unit-id='adunit-209201f9afd060be' ad-type='video' ad-theme='white'></Ad>
            } */}
          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='mooc'>

      <View className='mooc-subTitle'>
        <IconFont name='tanhao' size={36} color={themeC['color-font-brand']} />
        <Text className='mooc-subTitle_text'>慕课通知</Text>
      </View>

      <View className='mooc-notice'>
        <View className='mooc-notice-item'>
          <Text className='mooc-notice-title'>开放时间：</Text>
          <Text className='mooc-notice-comment'>10月15日8:00——11月11日18:00</Text>
        </View>
        <View className='mooc-notice-item'>
          <Text className='mooc-notice-title'>考核时间：</Text>
          <Text className='mooc-notice-comment'>11月13日8:00——11月20日18:00</Text>
        </View>
      </View>

      <View className='mooc-subTitle'>
        <IconFont name='tanhao' size={36} color={themeC['color-font-brand']} />
        <Text className='mooc-subTitle_text'>平台网址</Text>
      </View>

      <View className='mooc-notice'>
        <View className='mooc-notice-item' onClick={() => copy('hfgydx.fy.chaoxing.com')}>
          <Text className='mooc-notice-title'>超星尔雅：</Text>
          <Text className='mooc-notice-url'>hfgydx.fy.chaoxing.com</Text>
        </View>
        <View className='mooc-notice-item' onClick={() => copy('hfut.amoocs.com.cn')}>
          <Text className='mooc-notice-title'>中博财商慕课：</Text>
          <Text className='mooc-notice-url'>hfut.amoocs.com.cn</Text>
        </View>
      </View>

      <View className='mooc-subTitle'>
        <IconFont name='tanhao' size={36} color={themeC['color-font-brand']} />
        <Text className='mooc-subTitle_text'>我的慕课</Text>
      </View>

      {
        moocData.map(data => {
          const { name, lessonCode, credits, info, lessonType, openDepartment } = data
          return (
            <View key={lessonCode} className='mooc-item'>
              <AtAccordion
                open={showLessonCode === lessonCode}
                onClick={() => setShowLessonCode(showLessonCode === lessonCode ? '' : lessonCode)}
                title={name}
                style={{ color: '#000000' }}
                note={'平台：' + info.split('开课平台')[1].split('）')[0]}
                hasBorder={false}
              >
                <View className='mooc-item-content'>
                  <View className='mooc-item-content-line'></View>
                  <View className='mooc-item-content-list'>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>学分</Text>
                      <Text className='mooc-item-content-list-item_info'>{credits}</Text>
                    </View>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>开设学院</Text>
                      <Text className='mooc-item-content-list-item_info'>{openDepartment}</Text>
                    </View>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>课程类型</Text>
                      <Text className='mooc-item-content-list-item_info'>{lessonType}</Text>
                    </View>

                    <View className='mooc-item-content-list-item'>
                      <Text className='mooc-item-content-list-item_title'>课程编号</Text>
                      <Text className='mooc-item-content-list-item_info'>{lessonCode}</Text>
                    </View>

                  </View>
                </View>
              </AtAccordion>
            </View>
          )
        })
      }
    </View>
  )
}

function mapStateToProps(state) {
  return {
    moocData: state.schedule.bizData.moocData,
    showAd: state.schedule.bizData.userConfig.showAd,
  };
}

export default connect(mapStateToProps)(Mooc);