import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text, OpenData } from '@tarojs/components'

import IconFont from '../../components/iconfont'
import StandardFloatLayout from '../../components/StandardFloatLayout'
import HelpNotice from '../../components/HelpNotice'
import UpdateNotice from '../../components/UpdateNotice'
import './index.scss'

function Home() {
  const [sno, setSno] = useState('')
  const [showAbout, setShowAbout] = useState(false)
  const [showUpdateNotice, setShowUpdateNotice] = useState(false)
  const [showHelpNotice, setShowHelpNotice] = useState(false)

  useEffect(() => {
    const localUserData = Taro.getStorageSync('me')
    const { userInfo } = localUserData
    const { username } = userInfo
    setSno(username)
  }, [])

  const cardData = [
    {
      name: '考试安排',
      icon: 'daibanshixiang',
      onClick: null,
    },
    {
      name: '成绩查询',
      icon: 'jixiaopinggu',
      onClick: null,
    },
    {
      name: '我的评教',
      icon: 'gongpai',
      onClick: null,
    },
  ]

  const toolsData = [
    {
      name: '全校课表',
      icon: 'rili',
      onClick: () => Taro.navigateTo({ url: '/pages/schedule/pages/all-schedule/index' }),
    },
    {
      name: '课程/教师检索',
      icon: 'sousuo',
      onClick: null,
    },
    {
      name: '空教室查询',
      icon: 'tishi',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/empty-clazz-room/index' }),
    },
  ]

  return (
    <View className='home'>
      <View className='home-header'>
        <View className='home-header-avatar'>
          <OpenData type='userAvatarUrl'></OpenData>
        </View>
        <View className='home-header-nickName'>
          <Text>{sno}</Text>
        </View>
      </View>

      <View className='home-content'>
        <View className='home-content-card'>
          {
            cardData.map(data => (
              <View key={data.name} className='home-content-card-box' onClick={data.onClick}>
                <IconFont name={data.icon} size={68} />
                <Text className='home-content-card-box_name'>{data.name}</Text>
              </View>
            ))
          }
        </View>

        <View className='home-content-group'>
          {
            toolsData.map(data => (
              <View key={data.name} className='home-content-group-item' onClick={data.onClick}>
                <View className='home-content-group-item_left'>
                  <IconFont name={data.icon} size={48} color='#60646b' />
                  <Text style={{ marginLeft: 10 }}>{data.name}</Text>
                </View>
                <IconFont name='arrow-right' size={48} color='#60646b' />
              </View>
            ))
          }
        </View>

        <View className='home-content-group home-content-group_2'>

          <View className='home-content-group-item' onClick={() => setShowAbout(true)}>
            <View className='home-content-group-item_left'>
              <IconFont name='tanhao' size={46} color='#60646b' />
              <Text style={{ marginLeft: 10 }}>用前必读</Text>
            </View>
            <IconFont name='' size={46} color='#60646b' />
          </View>

          <View className='home-content-group-item' onClick={() => Taro.navigateTo({ url: '/pages/home/pages/gift/index' })}>
            <View className='home-content-group-item_left'>
              <IconFont name='taolunqu' size={46} color='#60646b' />
              <Text style={{ marginLeft: 10 }}>活水计划</Text>
            </View>
            <IconFont name='arrow-right' size={46} color='#60646b' />
          </View>

        </View>
      </View>

      <StandardFloatLayout
        isOpened={showAbout}
        onClose={() => setShowAbout(false)}
        title='用前必读'
        content={`本小程序不代表任何组织或机构的利益，完全出于交流学习和方便工大学子的目的而开发。\n
        如在使用中遇到bug、或者有好的功能建议，请联系小程序的开发者（qq：254139147）\n
        本项目已在GitHub开源，仓库名称为：hfut_schedule_hacker。欢迎对前端感兴趣的同学与我一起交流和开发！\n
        情侣课表功能专为我的挚爱：唐小姐开发。祝天下有情人终成眷属~
        `}
        buttons={[{
          value: '查看帮助',
          onClick: () => {setShowAbout(false); setShowHelpNotice(true)}
        }, {
          value: '更新公告',
          onClick: () => {setShowAbout(false); setShowUpdateNotice(true)}
        }]}
      />

      { showUpdateNotice && <UpdateNotice onClose={() => setShowUpdateNotice(false)} />}
      { showHelpNotice && <HelpNotice onClose={() => setShowHelpNotice(false)} />}

    </View>
  )
}

function mapStateToProps(state) {
  return {
    username: state.login.bizData.username
  };
}

export default connect(mapStateToProps)(Home);
