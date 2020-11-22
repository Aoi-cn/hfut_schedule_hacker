import React, { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import Taro from '@tarojs/taro'
import { View, Input, Button, Picker, Image } from '@tarojs/components'
import { AtPagination, AtDrawer } from 'taro-ui'

import bookSearchNone from '../../../../assets/img/book-search-none.svg'
import { GET } from '../../../../utils/request'
import { relogin } from '../../../../actions/login'
import IconFont from '../../../../components/iconfont'
import CourseSearchDetailFL from './components/courseSearchDetailFL'
import semesterData from '../../../../assets/data/semesterData'
import './index.scss'

// key过期后，尝试重新登陆的次数
let reloginTime = 0


function CourseSearch() {
  const dispatch = useDispatch()
  const [showDrawer, setShowDrawer] = useState(false)
  const [searchData, setSearchData] = useState({
    pageCount: 1,
    courseNameZhLike: '',
    teacherNameLike: '',
    courseTypeAssoc: 0,
    nameZhLike: '',
    courseCodeLike: '',
    selectedSemester: semesterData[0],
  })
  const [submitData, setSubmitData] = useState({
    pageCount: 0,
    courseNameZhLike: '',
    teacherNameLike: '',
    courseTypeAssoc: 0,
    nameZhLike: '',
    courseCodeLike: '',
    selectedSemester: semesterData[0],
  })
  const [showData, setShowData] = useState({
    courseList: [],
    totalCourses: 0,
  })
  const [courseSearchDetailFLData, setCourseSearchDetailFLData] = useState({
    isOpened: false,
    courseData: null,
    nameZh: '',
    teachers: '',
  })

  const typeRange = [
    { typeZh: '全部类型', typeId: 0, index: 0 },
    { typeZh: '通识必修课', typeId: 1, index: 2 },
    { typeZh: '学科基础和专业必修课', typeId: 2, index: 3 },
    { typeZh: '各专业选修课', typeId: 5, index: 4 },
    { typeZh: '实践环节', typeId: 3, index: 5 },
    { typeZh: '创新创业教育', typeId: 4, index: 6 },

    { typeZh: '公选-哲学、历史与心理学', typeId: 6, index: 7 },
    { typeZh: '公选-文化、语言与文学', typeId: 7, index: 8 },
    { typeZh: '公选-经济、管理与法律', typeId: 8, index: 9 },
    { typeZh: '公选-自然、环境与科学', typeId: 9, index: 10 },
    { typeZh: '公选-信息、技术与工程', typeId: 10, index: 11 },
    { typeZh: '公选-艺术、体育与健康', typeId: 11, index: 12 },
    { typeZh: '公选-就业、创新与创业', typeId: 12, index: 13 },
    { typeZh: '公选-社会、交往与礼仪', typeId: 13, index: 14 },
    { typeZh: '公选-人生规划、品德与修养', typeId: 14, index: 15 },

    { typeZh: '慕课-哲学、历史与心理学', typeId: 36, index: 16 },
    { typeZh: '慕课-文化、语言与文学', typeId: 37, index: 17 },
    { typeZh: '慕课-经济、管理与法律', typeId: 38, index: 18 },
    { typeZh: '慕课-自然、环境与科学', typeId: 39, index: 19 },
    { typeZh: '慕课-信息、技术与工程', typeId: 40, index: 20 },
    { typeZh: '慕课-艺术、体育与健康', typeId: 41, index: 21 },
    { typeZh: '慕课-就业、创新与创业', typeId: 42, index: 22 },
    { typeZh: '慕课-社会、交往与礼仪', typeId: 43, index: 23 },
    { typeZh: '慕课-人生规划、品德与修养', typeId: 44, index: 24 },
  ]

  const handleSearch = useCallback(() => {
    // 首次进入的时候
    if (submitData.pageCount === 0) {
      return
    }

    Taro.showLoading({ title: '查询中', mask: true })
    const userData = Taro.getStorageSync('me')
    const { userInfo } = userData
    const { key } = userInfo
    GET('/course_search', {
      key,
      pageCount: submitData.pageCount,
      courseNameZhLike: submitData.courseNameZhLike,
      teacherNameLike: submitData.teacherNameLike,
      courseTypeAssoc: submitData.courseTypeAssoc ? submitData.courseTypeAssoc : '',
      nameZhLike: submitData.nameZhLike,
      courseCodeLike: submitData.courseCodeLike,
      semesterId: submitData.selectedSemester.id,
    })
      .then(res => {

        if (res.success) {
          // 检索成功
          reloginTime = 0
          const { data: { data: courseList, _page_: { totalRows: totalCourses } } } = res
          setShowData({ courseList, totalCourses })
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
            callback: handleSearch,
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
  }, [dispatch, submitData])

  // 搜索条件发生变化并触发搜索的effect
  useEffect(() => {
    handleSearch()
  }, [handleSearch, submitData])


  const handleTypeChange = (e) => {
    setSearchData({
      ...searchData,
      courseTypeAssoc: e.detail.value
    })
  }

  const handleSemesterChange = (e) => {
    console.log(e)
    setSearchData({
      ...searchData,
      selectedSemester: semesterData[e.detail.value]
    })
  }

  const handleChangePage = (e) => {
    const { current } = e
    setSubmitData({
      ...submitData,
      pageCount: current
    })
  }


  return (
    <View className='courseSearch'>

      <View className='courseSearch-content'>
        {
          (showData.courseList.length > 0) ?
            showData.courseList.map((courseData, index) => {
              const { lesson: { course: { nameZh }, teacherAssignmentList: teacherList } } = courseData
              let teachers = ''
              teacherList.map((teacherData, ti) => teachers += (teacherData.person.nameZh + (ti + 1 === teacherList.length ? '' : '、')))
              return (
                <View className='courseSearch-content-item' key={index} onClick={() => setCourseSearchDetailFLData({ isOpened: true, courseData: courseData.lesson, nameZh, teachers })}>
                  <View className='courseSearch-content-item-numberBox'>
                    <View className='courseSearch-content-item-numberBox-number'>{(submitData.pageCount - 1) * 20 + index + 1}</View>
                  </View>
                  <View className='courseSearch-content-item-box'>
                    <View className='courseSearch-content-item-title'>{nameZh}</View>
                    <View className='courseSearch-content-item-author'>{teachers}</View>
                  </View>
                  <View className='courseSearch-content-item-more'>
                    <IconFont name='moreandroid' color='#cccccc' size={46} />
                  </View>
                </View>
              )
            })
            :
            <Image src={bookSearchNone} />
        }
      </View>

      <View className='courseSearch-footer'>
        {
          showData.courseList.length > 0 &&
          <AtPagination
            icon
            total={showData.totalCourses}
            pageSize={20}
            current={submitData.pageCount}
            onPageChange={e => handleChangePage(e)}
          >
          </AtPagination>
        }
      </View>

      <View className='courseSearch-btn' onClick={() => setShowDrawer(true)}>
        <IconFont name='sousuo' size={60} color='#ffffff' />
      </View>

      <AtDrawer
        show={showDrawer}
        onClose={() => setShowDrawer(false)}
        mask
        right
        width='246px'
      >
        <View className='courseSearch-drawer'>
          <View className='courseSearch-drawer-title'>课程名称</View>
          <Input
            value={searchData.courseNameZhLike}
            border={false}
            placeholder='非必填'
            placeholder-style='color:#ccc;'
            onInput={e => setSearchData({ ...searchData, courseNameZhLike: e.detail.value })}
            className='courseSearch-drawer-input'
          />
          <View className='courseSearch-drawer-title'>教师名称</View>
          <Input
            value={searchData.teacherNameLike}
            border={false}
            placeholder='非必填'
            placeholder-style='color:#ccc;'
            onInput={e => setSearchData({ ...searchData, teacherNameLike: e.detail.value })}
            className='courseSearch-drawer-input'
          />
          <View className='courseSearch-drawer-title'>课程代码</View>
          <Input
            value={searchData.courseCodeLike}
            border={false}
            placeholder='非必填'
            placeholder-style='color:#ccc;'
            onInput={e => setSearchData({ ...searchData, courseCodeLike: e.detail.value })}
            className='courseSearch-drawer-input'
          />
          <View className='courseSearch-drawer-title'>教学班名称</View>
          <Input
            value={searchData.nameZhLike}
            border={false}
            placeholder='例：信息管18-1'
            placeholder-style='color:#ccc;'
            onInput={e => setSearchData({ ...searchData, nameZhLike: e.detail.value })}
            className='courseSearch-drawer-input'
          />
          <View className='courseSearch-drawer-title'>课程类型</View>
          <Picker
            mode='selector'
            range={typeRange}
            value={searchData.courseTypeAssoc}
            rangeKey='typeZh'
            onChange={handleTypeChange}
            className='courseSearch-drawer-type'
          >
            <View className='courseSearch-drawer-input courseSearch-drawer-input_type'>
              {
                typeRange[searchData.courseTypeAssoc].typeZh.length < 12 ? typeRange[searchData.courseTypeAssoc].typeZh : typeRange[searchData.courseTypeAssoc].typeZh.slice(0, 10) + '...'
              }
            </View>
          </Picker>

          <View className='courseSearch-drawer-title'>开课学期</View>
          <Picker
            mode='selector'
            range={semesterData}
            value={semesterData.indexOf(searchData.selectedSemester)}
            rangeKey='nameZh'
            onChange={handleSemesterChange}
            className='courseSearch-drawer-type'
          >
            <View className='courseSearch-drawer-input courseSearch-drawer-input_type'>
              {
                searchData.selectedSemester.nameZh
              }
            </View>
          </Picker>
          <Button className='courseSearch-drawer-btn' onClick={() => setSubmitData({ ...searchData, pageCount: 1 })}>检索</Button>
        </View>

      </AtDrawer>

      <CourseSearchDetailFL courseSearchDetailFLData={courseSearchDetailFLData} onClose={() => setCourseSearchDetailFLData({ ...courseSearchDetailFLData, isOpened: false })} />

    </View>
  )
}

export default CourseSearch
