// 放弃了的页面。
// 但这里的阿里云OSS上传实践是可以之后继续用的，因此保留下拉。

import React, { useState } from 'react'
import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtButton, AtMessage } from 'taro-ui'

import './index.scss'

function Advise() {
  const [tempImgSrc, setTempImgSrc] = useState('')

  const handleImageBtnClick = () => {
    Taro.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有，在H5浏览器端支持使用 `user` 和 `environment`分别指定为前后摄像头
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        const tempFilePath = res.tempFilePaths[0]
        setTempImgSrc(tempFilePath)
        const type = tempFilePath.split('.')[tempFilePath.split('.').length - 1]
        const { userInfo: { username } } = Taro.getStorageSync('me')

        Taro.uploadFile({
          url: 'https://oss.cavano.vip',
          filePath: tempFilePath,
          name: 'file',
          formData: {
            name: tempFilePath,
            key: `advise/${username}-${(new Date()).valueOf()}.${type}`,
            policy: "eyJleHBpcmF0aW9uIjoiMjAyMC0xMi0wMVQxMjowMDowMC4wMDBaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF1dfQ==",
            OSSAccessKeyId: "LTAI4GBfJcvNtskmbaNkyGoU",
            success_action_status: "200",
            signature: "Rc4ftUk/sn75q36BVOijwJSDG9g=",
          },
          success: function () {
            console.log('chooseImage success, temp path is: ', tempFilePath)
            Taro.showToast({
              title: "上传成功",
              icon: 'success',
              duration: 1000
            })
          },
          fail: function ({ errMsg }) {
            console.log('upladImage fail, errMsg is: ', errMsg)
            Taro.showToast({
              title: "上传失败",
              duration: 1000
            })
          },
        })

      }
    })
  }

  return (
    <View className='gift'>

      <View className='gift-header'>
        <View className='gift-header_title'>上书</View>
        {/* <View className='gift-header_comment'>各位同学可以在这里发挥你们的想象力，参与到小程序炫酷功能的创作中来！</View> */}
      </View>

      {/* <View className='gift-line'></View> */}
      <AtButton onClick={handleImageBtnClick}>
        上书
      </AtButton>

      <Image
        style='width: 300px;height: 100px;background: #000;'
        src={tempImgSrc}
      />

      <AtMessage />

    </View>
  )
}

export default Advise
