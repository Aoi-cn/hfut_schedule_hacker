import React, { useState, useEffect, useCallback } from 'react'
import Taro from '@tarojs/taro'
import { connect, useDispatch } from 'react-redux'
import { View, Image, Text } from '@tarojs/components'

import EmptyImg from '../../../../assets/img/empty.svg'
import { GET } from '../../../../utils/request'
import { relogin } from '../../../../actions/login'
import './index.scss'

// key过期后，尝试重新登陆的次数
// classlist只有在走webvpn时才需要key
let reloginTime = 0


function Classlist(props) {
  const { clazzName, semestercode, lessonCode } = props
  const [matelist, setMatelist] = useState([])
  const dispatch = useDispatch()

  // 核心业务逻辑
  const getClasslist = useCallback(async () => {
    Taro.setNavigationBarTitle({ title: clazzName })
    Taro.showLoading({
      title: '查询中',
    })
    const userData = Taro.getStorageSync('me')
    const { userInfo } = userData
    const { key } = userInfo
    let { appKey } = userInfo

    // 本地没有appKey，说明是第一次请求classlist
    // 先获取一个appkey并存在本地
    if (!appKey) {
      const { username, password } = userInfo
      const loginRes = await GET('/login', { username, password, vpnTicket: key, target: 'app' })
      const { success, key: appKey_ } = loginRes
      if (!success) {
        reloginTime++
        if (reloginTime === 6) {
          setTimeout(() => {
            reloginTime = 0
          }, 100);
        }
        return dispatch(relogin({
          userType: 'me',
          reloginTime,
          callback: getClasslist,
        }))
      }
      // 请求正常，将appKey存在本地
      appKey = appKey_
      Taro.setStorage({
        key: 'me',
        data: {
          ...userData,
          userInfo: {
            ...userInfo,
            appKey,
          },
        }
      })
    }

    const classlistRes = await GET('/classlist', { key: appKey, semestercode, lessonCode, vpnTicket: key, target: 'app' })
    // 请求失败，可能是key过期了
    if (!classlistRes.success) {
      reloginTime++
      if (reloginTime === 6) {
        setTimeout(() => {
          reloginTime = 0
        }, 100);
      }
      return dispatch(relogin({
        userType: 'me',
        reloginTime,
        callback: getClasslist,
      }))
    }

    // 走到这里，说明一切正常
    setMatelist(classlistRes.classlist)
    setTimeout(() => {
      Taro.hideLoading()
    }, 800);

  }, [clazzName, semestercode, lessonCode, dispatch])

  // 请求
  useEffect(() => {
    getClasslist()
  }, [getClasslist])

  if (matelist.length === 0) {
    return (
      <View className='classlist'>
        <View className='classlist-none'>
          <Image
            src={EmptyImg}
            className='classlist-none-noneImg'
          />
          <Text className='classlist-none-noneText'>没有查询到同学~</Text>
          <View className='classlist-none-ad'>

          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='classlist'>
      {
        matelist.map((mateData, mi) => (
          <View key={mateData.code} className='classlist-item'>
            <View className='classlist-item-number'>{mi + 1}</View>
            <View className='classlist-item-name'>{mateData.name}</View>
            <View className='classlist-item-gender'>{mateData.gender}</View>
            <View className='classlist-item-clazz'>{mateData.adminclass_name}</View>
          </View>
        ))
      }
    </View>
  )
}

function mapStateToProps(state) {
  return {
    ...state.classlist.bizData
  };
}

export default connect(mapStateToProps)(Classlist);