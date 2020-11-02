import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Button } from '@tarojs/components'

import { GET } from '../../../../utils/request'
import './index.scss'

function CourseSearch() {
  const [ticket, setTicket] = useState('')
  const [keyword, setKeyword] = useState('')
  const [pageCount, setPageCount] = useState(1)
  const [listData, setListData] = useState([])

  useEffect(() => {
    Taro.showLoading({ title: '准备中...' })
    getNewTicket()
      .then(ticket_ => {
        if (ticket_) {
          console.log('ticket获取成功 - ' + ticket_)
          setTicket(ticket_)
        } else {
          console.log('ticket获取失败')
        }
        Taro.hideLoading()
      })
      .catch(e => {
        console.log(e);
        Taro.hideLoading()
      })
  }, [])

  const handleSearch = async () => {
    Taro.showLoading({ title: '搜索中...' })
    const res = await GET('/book_search', {
      key: ticket,
      keyword,
      pageCount,
    })
    Taro.hideLoading()
    const { success, content } = res
    if (success) {
      setListData(content)
    }
  }

  return (
    <View className='bookSearch'>
      <View className='bookSearch-header'>
        <Input
          value={keyword}
          border={false}
          placeholder='请输入关键字'
          placeholder-style='color:#ccc;'
          onInput={e => setKeyword(e.detail.value)}
        />
        <Button onClick={handleSearch}>搜索</Button>
      </View>
      <View className='bookSearch-content'>
        {
          listData.map((data, index) => {
            const { title, author } = data
            return (
              <View key={index}>{title}</View>
            )
          })
        }
      </View>
    </View>
  )
}

export default CourseSearch


const getNewTicket = async () => {
  let ticket = ''
  for (let i = 0; i < 5; i++) {
    const res = await GET('/vpn_ticket')
    const { success, key } = res
    if (success) {
      ticket = key
      break
    }
  }
  return ticket
}
