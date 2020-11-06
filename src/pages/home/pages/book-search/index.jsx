import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { View, Input, Image, Text } from '@tarojs/components'
import { AtPagination, AtDrawer, AtLoadMore } from 'taro-ui'

import bookSearchNone from '../../../../assets/img/book-search-none.svg'
import { GET } from '../../../../utils/request'
import BookStatusFL from './components/BookStatusFL'
import BookInfoFL from './components/BookInfoFL'
import CustomButton from '../../../../components/CustomButton'
import IconFont from '../../../../components/iconfont'
import './index.scss'

function CourseSearch() {
  const [ticket, setTicket] = useState('')
  const [searchText, setSearchText] = useState('')
  const [searchData, setSearchData] = useState({
    keyword: '',
    pageCount: 1,
  })
  const [totalBooks, setTotalBooks] = useState(1)
  const [listData, setListData] = useState([])
  const [bookStatusFLData, setBookStatusFLData] = useState({
    isOpened: false,
    onClose: () => setBookStatusFLData({ ...bookStatusFLData, isOpened: false }),
    title: '',
    statusList: [],
  })
  const [bookInfoFLData, setBookInfoFLData] = useState({
    isOpened: false,
    onClose: () => setBookInfoFLData({ ...bookInfoFLData, isOpened: false }),
    title: '',
    author: '',
    info: {},
  })
  const [bookRankingData, setBookRankingData] = useState({
    show: false,
    bookList: [],
  })

  useEffect(() => {
    Taro.showLoading({ title: '初始化...' })
    getNewTicket()
      .then(ticket_ => {
        if (ticket_) {
          console.log('ticket获取成功 - ' + ticket_)
          setTicket(ticket_)
        } else {
          console.log('ticket获取失败')
          Taro.showToast({
            title: '初始化失败！请尝试退出重进',
            icon: 'none',
            duration: 2000
          })
        }
        Taro.hideLoading()
      })
      .catch(e => {
        console.log(e);
        Taro.hideLoading()
      })
  }, [])

  // 搜索的effect
  useEffect(() => {
    if (!searchData.keyword) {
      return
    }
    Taro.showLoading({ title: '搜索中...' })
    GET('/book_search', {
      key: ticket,
      ...searchData
    })
      .then(res => {
        const { success, content, total } = res
        if (success) {
          setListData(content)
          setTotalBooks(total)
        }
        setTimeout(() => {
          Taro.hideLoading()
        }, 200);
      })
  }, [ticket, searchData])

  const handleClickSearch = () => {
    setSearchData({
      keyword: searchText,
      pageCount: 1,
    })
  }

  const handleChangePage = (e) => {
    const { current } = e
    setSearchData({
      ...searchData,
      pageCount: current
    })
  }

  const handleClickBookStatus = (info) => {
    setBookStatusFLData({ ...bookStatusFLData, isOpened: true, title: info.title })
    GET('/book_status', {
      key: ticket,
      bno: info.marcRecNo
    })
      .then(res => {
        setBookStatusFLData({ ...bookStatusFLData, isOpened: true, title: info.title, statusList: res.bookStatus })
      })
  }

  const handleClickBookInfo = (info) => {
    setBookInfoFLData({ ...bookInfoFLData, isOpened: true, title: info.title })
    GET('/book_info', {
      key: ticket,
      bno: info.marcRecNo
    })
      .then(res => {
        setBookInfoFLData({ ...bookInfoFLData, isOpened: true, title: info.title, author: info.author, info: res.bookInfo })
      })
  }

  const handleClickRanking = () => {
    setBookRankingData({ ...bookRankingData, show: true })
    if (bookRankingData.bookList.length === 0) {
      GET('/book_ranking', {
        key: ticket,
      })
        .then(res => {
          setBookRankingData({ show: true, bookList: res.bookList })
        })
    }
  }

  const handleClickRankingBook = (text) => {
    setSearchText(text.split('(')[0])
    setSearchData({
      keyword: text.split('(')[0],
      pageCount: 1,
    })
  }

  return (
    <View className='bookSearch'>
      <View className='bookSearch-header'>
        <View className='bookSearch-header-searchBox'>
          <Input
            value={searchText}
            border={false}
            placeholder='请输入关键字'
            placeholder-style='color:#ccc;'
            onInput={e => setSearchText(e.detail.value)}
            className='bookSearch-header-search'
          />
          <CustomButton
            value='搜索'
            onSubmit={handleClickSearch}
            type='call'
          />
        </View>
        <View className='bookSearch-header-rankingBox' onClick={handleClickRanking}>
          <IconFont name='taolunqu' color='#aaaaaa' size={46} />
          <Text className='bookSearch-header-rankingBox-text'>查看30天内的热门检索词</Text>
        </View>
      </View>

      <View className='bookSearch-content'>
        {
          (searchData.keyword && listData.length > 0) ?
            listData.map((data, index) => {
              const { title, author } = data
              return (
                <View className='bookSearch-content-item' key={index}>
                  <View className='bookSearch-content-item-numberBox'>
                    <View className='bookSearch-content-item-numberBox-number'>{(searchData.pageCount - 1) * 20 + index + 1}</View>
                  </View>
                  <View className='bookSearch-content-item-box' onClick={() => handleClickBookInfo(data)}>
                    <View className='bookSearch-content-item-title'>{title}</View>
                    <View className='bookSearch-content-item-author'>{author}</View>
                  </View>
                  <View className='bookSearch-content-item-more' onClick={() => handleClickBookStatus(data)}>
                    <IconFont name='moreandroid' color='#cccccc' size={46} />
                  </View>
                </View>
              )
            })
            :
            <Image src={bookSearchNone} />
        }
      </View>
      <View className='bookSearch-footer'>
        {
          listData.length > 0 &&
          <AtPagination
            icon
            total={totalBooks}
            pageSize={20}
            current={searchData.pageCount}
            onPageChange={e => handleChangePage(e)}
          >
          </AtPagination>
        }
      </View>

      <AtDrawer
        show={bookRankingData.show}
        onClose={() => setBookRankingData({ ...bookRankingData, show: false })}
        mask
        right
        width='188px'
      >
        <View className='bookSearch-bookRanking'>
          {
            bookRankingData.bookList.length === 0 ?
              <AtLoadMore
                status='loading'
              />
              :
              bookRankingData.bookList.map((bookName, bIndex) => (
                <View className='bookSearch-bookRanking-item' key={bIndex} onClick={() => handleClickRankingBook(bookName)}>{bookName}</View>
              ))
          }
        </View>
      </AtDrawer>

      <BookStatusFL
        bookStatusFLData={bookStatusFLData}
      />

      <BookInfoFL
        bookInfoFLData={bookInfoFLData}
      />

    </View>
  )
}

export default CourseSearch


const getNewTicket = async () => {
  let ticket = ''
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  for (let i = 0; i < 5; i++) {
    const res = await GET('/vpn_ticket')
    const { success, key } = res
    if (success) {
      ticket = key
      break
    }
    await delay(500)
  }
  return ticket
}
