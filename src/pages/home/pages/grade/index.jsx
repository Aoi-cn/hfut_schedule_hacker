import React, { useState, useEffect, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Swiper, SwiperItem, Image, Text } from '@tarojs/components'

import ScoreDetailFL from './components/scoreDetailFL'
import { GET } from '../../../../utils/request'
import { relogin } from '../../../../actions/login'
import EmptyImg from '../../../../assets/img/empty.svg'
import './index.scss'

// key过期后，尝试重新登陆的次数
let reloginTime = 0


function Grade() {
  const [scorelist, setScorelist] = useState([])
  const [scoreDetailFLData, setScoreDetailFLData] = useState({
    isOpened: false,
    info: null,
  })
  const dispatch = useDispatch()

  // 通过本地key请求成绩
  const getScorelist = useCallback(() => {
    Taro.showLoading({
      title: '查询中',
    })
    const userData = Taro.getStorageSync('me')
    const { userInfo } = userData
    const { key } = userInfo
    GET('/scorelist', { key })
      .then(res => {
        if (res.success) {
          reloginTime = 0
          setScorelist(res.scorelist)
        } else {
          // key过期了
          reloginTime++
          if (reloginTime === 6) {
            setTimeout(() => {
              reloginTime = 0
            }, 100);
          }
          return dispatch(relogin({
            userType: 'me',
            reloginTime,
            callback: getScorelist,
          }))
        }
        setTimeout(() => {
          Taro.hideLoading()
        }, 500);
      })
      .catch(e => {
        reloginTime = 0
        console.error(e)
        Taro.hideLoading()
        Taro.showToast({
          title: '查询失败',
          icon: 'none',
          duration: 2000
        })
      })
  }, [dispatch])

  useEffect(() => {
    getScorelist()
  }, [getScorelist])

  if (scorelist.length === 0) {
    return (
      <View className='grade'>
        <View className='grade-none'>
          <Image
            src={EmptyImg}
            className='grade-none-noneImg'
          />
          <Text className='grade-none-noneText'>没有查询到成绩~</Text>
          <View className='grade-none-ad'>

          </View>
        </View>
      </View>
    )
  }

  return (
    <View className='grade'>
      <Swiper
        className='grade-swiper'
        indicatorColor='#dddddd'
        indicatorActiveColor='#999999'
        indicatorDots
        current={scorelist.length - 1}
      >
        {
          scorelist.map((scoreData, index) => (
            <SwiperItem className={`grade-swiper-item grade-swiper-item_${index}`} key={index}>
              <View className='grade-swiper-item-title'>{scoreData.semesterName}</View>
              <View className='grade-swiper-item-list'>
                {
                  scoreData.scorelist.map(elemData => {
                    let decoColor = 'green'
                    if (parseFloat(elemData.gpa) === 0) {
                      decoColor = 'red'
                    } else if (parseFloat(elemData.gpa) < 2) {
                      decoColor = 'yellow'
                    }
                    return (
                      <View className='grade-swiper-item-elem' key={elemData.lessonCode} onClick={() => setScoreDetailFLData({ isOpened: true, info: elemData })}>
                        <View className={`grade-swiper-item-elem-deco grade-swiper-item-elem-deco_${decoColor}`}></View>
                        <View className='grade-swiper-item-elem-left'>
                          <View className='grade-swiper-item-elem-left_title'>{elemData.lessonName.length <= 13 ? elemData.lessonName : (elemData.lessonName.slice(0, 12) + "...")}</View>
                          <View className='grade-swiper-item-elem-left_comment'>
                            {`学分:${elemData.credit}        绩点:${elemData.gpa}`}
                          </View>
                        </View>
                        <View className='grade-swiper-item-elem-right'>{elemData.grade}</View>
                      </View>
                    )
                  })
                }
              </View>
            </SwiperItem>
          ))
        }
      </Swiper>

      <ScoreDetailFL scoreDetailFLData={scoreDetailFLData} onClose={() => setScoreDetailFLData({ ...scoreDetailFLData, isOpened: false })} />
    </View>
  )
}

export default Grade
