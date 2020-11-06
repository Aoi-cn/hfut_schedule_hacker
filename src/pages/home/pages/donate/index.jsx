import React from 'react'
import Taro from '@tarojs/taro'
import { View } from '@tarojs/components'

import thanksList from '../../../../assets/thanksList'
import './index.scss'

function Donate() {

  const handleClickDonate = () => {
    Taro.previewImage({
      urls: ['https://oss.cavano.vip/data/donate.png'],
      current: 'https://oss.cavano.vip/data/donate.png',
    })
  }

  return (
    <View className='donate'>

      <View className='donate-header'>
        <View className='donate-header_btn' onClick={handleClickDonate}>点击这里微信随意捐赠</View>
        <View className='donate-header_comment'>{`
        　谢谢同学们的支持，真的好感动，也有点受宠若惊，真的是非常感谢啦。有的小伙伴会在微信给我留言，有的是激励的话，有的是建议，
        如果是提建议可以直接在“用前必读”里通过qq联系到我哦。无聊跟我聊聊也行，一般都会回复的~`}
        </View>
        <View className='donate-header_comment'>{`
        　然后是捐赠的同学的名单，统计时间为11月6日晚9点。这里只能列出没有匿名的同学，同样感谢那些默默支持我们的同学！！
        带*号的应该是真实姓名，不带*号的是网名。顺序为时间顺序啦~`}
        </View>
      </View>

      <View className='donate-content'>
        {
          thanksList.map(name => (
            <View className='donate-content-name' key={name}>{name}</View>
          ))
        }
        <View className='donate-content-comment'>还有很多匿名捐赠的同学，真的很感谢你们的鼓励和支持！！</View>
      </View>

    </View>
  )
}

export default Donate
