import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, OpenData } from '@tarojs/components'
import { AtBadge } from 'taro-ui'
import * as moment from 'moment';

import IconFont from '../../components/iconfont'
import StandardFloatLayout from '../../components/StandardFloatLayout'
import HelpNotice from '../../components/HelpNotice'
import UpdateNotice from '../../components/UpdateNotice'
import { logout } from '../../actions/login'
import './index.scss'

function Home() {
  const examData = useSelector(state => state.event.bizData.examData)
  const [sno, setSno] = useState('')
  const [showAbout, setShowAbout] = useState(false)
  const [showUpdateNotice, setShowUpdateNotice] = useState(false)
  const [showHelpNotice, setShowHelpNotice] = useState(false)
  const [showHomeRedPoint, setShowHomeRedPoint] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const localUserData = Taro.getStorageSync('me')
    const { userInfo: { username } } = localUserData
    const localConfig = Taro.getStorageSync('config')
    const { autoConfig: { showHomeRedPoint: showHomeRedPoint_ } } = localConfig
    setShowHomeRedPoint(showHomeRedPoint_)
    if (showHomeRedPoint_) {
      setTimeout(() => {
        setShowHomeRedPoint(false)
        Taro.setStorage({
          key: 'config',
          data: {
            ...localConfig,
            autoConfig: {
              ...localConfig.autoConfig,
              showHomeRedPoint: false,
            }
          }
        })
      }, 20000);
    }
    setSno(username)
  }, [])

  let examCount = 0
  examData.map(exam => {
    const { timeText } = exam
    if (moment().isBefore(moment(timeText.split('~')[0]))) {
      examCount++
    }
  })

  const cardData = [
    {
      name: '考试安排',
      icon: 'daibanshixiang',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/exam-arrange/index' }),
      redPoint: (examCount !== 0) && (<AtBadge value={examCount}></AtBadge>),
    },
    {
      name: '成绩查询',
      icon: 'jixiaopinggu',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/grade/index' }),
      redPoint: showHomeRedPoint && <AtBadge dot></AtBadge>,
    },
    {
      name: '第二课堂',
      icon: 'gongpai',
      onClick: () => Taro.navigateToMiniProgram({
        appId: 'wx1e3feaf804330562',
        path: 'pages/my/my',
      }),
      redPoint: '',
    },
  ]

  const toolsData = [
    {
      name: '全校课表',
      icon: 'rili',
      onClick: () => Taro.navigateTo({ url: '/pages/schedule/pages/all-schedule/index' }),
      redPoint: '',
    },
    {
      name: '空教室查询',
      icon: 'tishi',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/empty-clazz-room/index' }),
      redPoint: '',
    },
    {
      name: '图书馆馆藏查询',
      icon: 'sousuo',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/book-search/index' }),
      redPoint: '',
    },
    {
      name: '课程/教师检索',
      icon: 'shuju',
      onClick: () => Taro.navigateTo({ url: '/pages/home/pages/course-search/index' }),
      redPoint: showHomeRedPoint && <AtBadge dot></AtBadge>,
    },
  ]

  const handleClickCoin = () => {
    Taro.navigateTo({ url: '/pages/home/pages/donate/index' })
  }

  const handleLogoutClick = () => {
    Taro.showModal({
      title: '确定要登出吗',
      confirmText: '登出',
      confirmColor: '#f33f3f',
      cancelColor: '#60646b',
      success: function (res) {
        if (res.confirm) {
          // 点击确定
          Taro.showModal({
            title: '是否要清空本地数据',
            content: '包括自定义事件/备忘录、个人设置、情侣信息等',
            confirmText: '不清空',
            confirmColor: '#60646b',
            cancelText: '清空',
            cancelColor: '#f33f3f',
            success: function (res2) {
              if (res2.confirm) {
                dispatch(logout({ localSave: true }))
              } else {
                dispatch(logout({ localSave: false }))
              }
            }
          })
        }
      }
    })
  }

  return (
    <View className='home'>
      <View className='home-header'>
        {/* <View className='home-header-donate'></View> */}

        <View className='home-header-avatar'>
          <View className='home-header-avatar-img'>
            <OpenData type='userAvatarUrl'></OpenData>
          </View>
          <View class='home-header-coin' onClick={handleClickCoin}>
            <View class='home-header-coin-front'></View>
            <View class='home-header-coin-front_b'></View>
            <View class='home-header-coin-back'></View>
            <View class='home-header-coin-back_b'></View>
          </View>
        </View>
        <View className='home-header-nickName'>
          <Text>{sno ? sno : '0000000000'}</Text>
        </View>
      </View>

      <View className='home-content'>
        <View className='home-content-card'>
          {
            cardData.map(data => (
              <View key={data.name} className='home-content-card-box' onClick={data.onClick}>
                <IconFont name={data.icon} size={68} />
                <View className='home-content-card-box-nameBox'>
                  <View className='home-content-card-box-nameBox_redPoint'>{data.redPoint}</View>
                  <Text className='home-content-card-box-nameBox_name'>{data.name}</Text>
                </View>
              </View>
            ))
          }
        </View>

        <View className='home-content-group'>
          {
            toolsData.map(data => (
              <View key={data.name} className='home-content-group-item' onClick={data.onClick}>
                <View className='home-content-group-item-left'>
                  <IconFont name={data.icon} size={48} color='#60646b' />
                  <View className='home-content-group-item-left-nameBox'>
                    <View className='home-content-group-item-left-nameBox_redPoint'>{data.redPoint}</View>
                    <Text style={{ marginLeft: 10 }}>{data.name}</Text>
                  </View>
                </View>
                <IconFont name='arrow-right' size={48} color='#60646b' />
              </View>
            ))
          }
        </View>

        <View className='home-content-group home-content-group_2'>

          <View className='home-content-group-item' onClick={() => setShowAbout(true)}>
            <View className='home-content-group-item-left'>
              <IconFont name='tanhao' size={46} color='#60646b' />
              <Text style={{ marginLeft: 10 }}>用前必读</Text>
            </View>
            <IconFont name='' size={46} color='#60646b' />
          </View>

          <View className='home-content-group-item' onClick={() => Taro.navigateTo({ url: '/pages/home/pages/feedback-update/index' })}>
            <View className='home-content-group-item-left'>
              <IconFont name='taolunqu' size={46} color='#60646b' />
              <View className='home-content-group-item-left-nameBox'>
                <View className='home-content-group-item-left-nameBox_redPoint'>{showHomeRedPoint && <AtBadge dot></AtBadge>}</View>
                <Text style={{ marginLeft: 10 }}>反馈与更新</Text>
              </View>
            </View>
            <IconFont name='arrow-right' size={46} color='#60646b' />
          </View>

        </View>

        <View className='home-content-group home-content-group_2'>

          <View className='home-content-group-item home-content-group-item_logout' onClick={handleLogoutClick}>
            <Text>退出登录</Text>
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
        情侣课表为我的挚爱 - 唐小姐开发。我真的很喜欢你呢~
        `}
        buttons={[{
          value: '查看帮助',
          onClick: () => { setShowAbout(false); setShowHelpNotice(true) }
        }, {
          value: '更新公告',
          onClick: () => { setShowAbout(false); setShowUpdateNotice(true) }
        }]}
      />

      { showUpdateNotice && <UpdateNotice onClose={() => setShowUpdateNotice(false)} />}
      { showHelpNotice && <HelpNotice onClose={() => setShowHelpNotice(false)} />}

    </View>
  )
}

export default Home;
