import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text, Input, Picker } from '@tarojs/components'
import { AtMessage, AtList, AtListItem } from 'taro-ui'

import IconFont from '../../components/iconfont'
import * as actions from '../../actions/login'
import StandardFloatLayout from '../../components/StandardFloatLayout'
import CustomButton from '../../components/CustomButton'
import './index.scss'

function Login(props) {
  const { bizData, uiData } = props
  const { username, password, userType, campus, campusZh } = bizData
  const { isLoginDisabled, showPwd, showLoginHelp, showPwdHelp } = uiData

  const campusRange = [
    { campusZh: '合肥校区', campus: 1 },
    { campusZh: '宣城校区', campus: 2 },
  ]

  useDidShow(() => {
    Taro.hideHomeButton()
  })

  const submitHandleClick = () => {
    if (!username || !password) {
      Taro.atMessage({
        'message': `请填写${!username ? '学号' : '密码'}`,
        'type': 'warning',
        duration: 2000,
      })
      return null
    }
    props.login({ username, password, userType, campus })
  }

  const handleBackClick = () => {
    props.back()
  }

  const handleCampusChange = (e) => {
    props.updateBizData(campusRange[e.detail.value])
  }

  return (
    <View className='login'>
      {
        userType === 'her' &&
        <View className='login-back' onClick={handleBackClick}>
          <IconFont name='arrow-lift' size={52} color='#202124' />
        </View>
      }

      <View className='login-header'>
        <View className='login-header-title'>
          登录
          {
            userType === 'her' && <IconFont name='aixin-filled' size={60} color='#fcacc7' />
          }
        </View>
        <Text className='login-header-secondary'>请绑定{userType === 'her' && 'ta的'}教务系统账号</Text>
      </View>

      <View className='login-content'>

        <View className='login-content-item'>
          <Picker mode='selector' range={campusRange} value={campus - 1} rangeKey='campusZh' onChange={handleCampusChange}>
            <AtList className='login-content-item-select' hasBorder={false}>
              <AtListItem
                title='选择校区'
                extraText={campusZh}
                hasBorder={false}
              />
            </AtList>
          </Picker>
        </View>

        <View className='login-content-item'>
          <Input
            className='login-content-item-input'
            type='number'
            border={false}
            placeholder='请输入学号'
            placeholder-style='color:#ccc;'
            value={username}
            onInput={(e) => props.updateBizData({ username: e.detail.value })}
          />
        </View>

        <View className='login-content-item'>
          <Input
            className='login-content-item-input'
            password={!showPwd}
            border={false}
            placeholder='请输入教务系统密码'
            placeholder-style='color:#ccc;'
            value={password}
            onInput={(e) => props.updateBizData({ password: e.detail.value })}
          />
          <View
            className='login-content-item-icon'
            onClick={() => props.updateUiData({ showPwd: !showPwd })}
          >
            {
              showPwd ?
                <IconFont name='eye-close' size={46} color='#60646b' />
                :
                <IconFont name='eye' size={46} color='#60646b' />
            }
          </View>

        </View>

        <View className='login-content-pwdHelp' onClick={() => props.updateUiData({ showPwdHelp: true })}>
          忘记密码
        </View>

        <CustomButton
          value='登录'
          type='call'
          disabled={isLoginDisabled}
          onSubmit={submitHandleClick}
        />

      </View>

      {
        userType === 'me' &&
        <View className='login-footer footer' onClick={() => props.updateUiData({ showLoginHelp: true })}>
          关于这个
        </View>
      }
      <AtMessage />
      <StandardFloatLayout
        isOpened={showLoginHelp}
        onClose={() => props.updateUiData({ showLoginHelp: false })}
        title='合工大课程表无敌版'
        content={`在学校封网时也可以看课表，造福工大学子。\n 另有查看全校课表、自定义课程颜色、情侣课表等特色功能~`}
      />
      <StandardFloatLayout
        isOpened={showPwdHelp}
        onClose={() => props.updateUiData({ showPwdHelp: false })}
        title='忘记密码'
        content='这是你的教务系统密码，默认为身份证后六位。如果你自己修改了密码且忘记了该密码，请前往PC端教务（信息门户-本科教务）修改新密码。'
      />
    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.login
  };
}

export default connect(mapStateToProps, actions)(Login);