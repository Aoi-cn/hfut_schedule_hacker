import React from 'react'
import Taro, { useDidShow } from '@tarojs/taro'
import { connect } from 'react-redux'
import { View, Text, Input } from '@tarojs/components'
import { AtMessage } from 'taro-ui'

import IconFont from '../../components/iconfont'
import * as actions from '../../actions/login'
import CustomButton from '../../components/CustomButtom'
import StandardFloatLayout from '../../components/StandardFloatLayout'
import './index.less'

function Login(props) {
  const { bizData, uiData } = props
  const { username, password, userType } = bizData
  const { isLoginDisabled, showPwd, showLoginHelp } = uiData

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
    props.login({ username, password, userType })
  }

  const handleBackClick = () => {
    props.back()
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
        // buttons={[{
        //   value: '知道了',
        //   color: 'blue',
        //   onClick: () => props.updateUiData({ showLoginHelp: false })
        // }]}
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