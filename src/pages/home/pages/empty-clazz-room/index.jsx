// 看的出来吧，这是一个写的很水的页面
// 毫无优雅可言
// 单纯从实现业务出发

import React, { useState, useEffect } from 'react'
import Taro from '@tarojs/taro'
import { useSelector, useDispatch } from 'react-redux'
import { View, Text, Picker } from '@tarojs/components'
import _ from 'lodash'
import * as moment from 'moment';

import IconFont from '../../../../components/iconfont'
import { dayIndexToZh } from '../../../../utils/scheduleDataTranslator'
import DatePlckerFL from './components/DatePlckerFL'
import WeekPicker from '../../../../components/schedule-component/WeekPicker'
import { UPDATE_BIZDATA } from '../../../../constants/schedule/roomDetailSchedule'
import './index.scss'

const buildingRange_2 = [
  { buildingZh: '敬亭学堂', index: 0 },
  { buildingZh: '新安学堂', index: 1 },
]

const buildingRange_0 = [
  { buildingZh: '西二', index: 0 },
  { buildingZh: '主楼', index: 1 },
]

const campusRange = [
  { campusZh: '屯溪路校区', index: 0 },
  { campusZh: '翡翠湖校区', index: 1 },
  { campusZh: '宣城校区', index: 2 },
]

const dayRange = [
  { dayZh: '周一', index: 0 },
  { dayZh: '周二', index: 1 },
  { dayZh: '周三', index: 2 },
  { dayZh: '周四', index: 3 },
  { dayZh: '周五', index: 4 },
  { dayZh: '周六', index: 5 },
  { dayZh: '周日', index: 6 },
]

const timeIndexRange = [
  { timeZh: '第1节', index: 0 },
  { timeZh: '第2节', index: 1 },
  { timeZh: '第3节', index: 2 },
  { timeZh: '第4节', index: 3 },
  { timeZh: '第5节', index: 4 },
  { timeZh: '第6节', index: 5 },
  { timeZh: '第7节', index: 6 },
  { timeZh: '第8节', index: 7 },
  { timeZh: '第9节', index: 8 },
  { timeZh: '第10节', index: 9 },
  { timeZh: '第11节', index: 10 },
]


function EmptyClazzRoom() {
  const dayLineMatrix = useSelector(state => state.event.bizData.dayLineMatrix)
  const timeTable = useSelector(state => state.event.bizData.timeTable)
  const currentWeekIndex = useSelector(state => state.event.bizData.currentWeekIndex)
  const currentDayIndex = useSelector(state => state.event.bizData.currentDayIndex)
  const [allData, setAllData] = useState({})
  const [campus, setCampus] = useState(0)
  const [date, setDate] = useState('2020-10-10')
  const [weekIndex, setWeekIndex] = useState(10)
  const [dayIndex, setDayIndex] = useState(0)
  const [building, setBuilding] = useState(0)
  const [startTime, setStartTime] = useState(1)
  const [endTime, setEndTime] = useState(1)

  const [buildingRange, setBuildingRange] = useState([{ buildingZh: '' }])
  const [showDatePicker, setShowDatePicker] = useState(false)
  const [showWeekPicker, setShowWeekPicker] = useState(false)
  const [uiData, setUiData] = useState([])
  const dispatch = useDispatch()

  // 刚进入页面时的初始化effect
  useEffect(() => {
    if (JSON.stringify(allData) === '{}') {
      Taro.showLoading({
        title: '获取数据...'
      })
      Taro.request({
        url: 'https://oss.cavano.vip/data/empty-clazz-room.json',
        method: 'GET',
      })
        .then(res => {
          setAllData(res.data)
          // 根据用户所在校区自动选择
          const { userInfo: { campus: userCampus } } = Taro.getStorageSync('me')
          if (userCampus === 2) {
            setCampus(2)
            setBuildingRange(buildingRange_2)
          } else {
            setCampus(0)
            setBuildingRange(buildingRange_0)
          }
        })

      // 初始化数据
      setWeekIndex(currentWeekIndex)
      setDayIndex(currentDayIndex)
      setDate(moment().format('YYYY-MM-DD'))
      let currentTime = parseInt(moment().format("Hmm"))
      currentTime = currentTime > 800 ? currentTime : 801
      timeTable.map((timeData, tableIndex) => {
        const { startTime: startTime_, endTime: endTime_, indexNo } = timeData
        if (currentTime >= startTime_ && currentTime < endTime_) {
          setStartTime(indexNo)
        }
        else if (((tableIndex + 1) < timeTable.length) && currentTime >= endTime_ && currentTime < timeTable[tableIndex + 1].startTime) {
          setStartTime(indexNo + 1)
        }
      })
      timeIndexRange.map(timeIndexData => {
        if (timeIndexData.timeZh.indexOf('-') === -1) {
          timeIndexData.timeZh += ' ' + timeTable[timeIndexData.index].startTimeText + '-' + timeTable[timeIndexData.index].endTimeText
        }
      })
    }
  }, [allData, currentDayIndex, currentWeekIndex, timeTable])


  // 基础条件发生改变时的effect，改变uiData
  useEffect(() => {
    if (startTime > endTime) {
      setEndTime(startTime)
      return
    }
    if (JSON.stringify(allData) === '{}') {
      return
    }
    console.log('------------')
    console.log('执行ui更新')
    const buildingZh = buildingRange[building].buildingZh
    const existedFloor = []
    let maxNumber = 1
    const buildingData = allData[buildingZh]
    _.forIn(buildingData, function (value, key) {
      const floor = key.split(buildingZh)[1].slice(0, 1)
      const number = parseInt(key.split(buildingZh)[1]) - floor * (10 ** (key.split(buildingZh)[1].length - 1))
      if (number > maxNumber) {
        maxNumber = number
      }
      if (existedFloor.indexOf(floor) === -1) {
        existedFloor.push(floor)
      }
    })

    // flag类别：
    // 0-空闲
    // 1-有课
    // 2-部分有课
    // 3-未知
    // 初始化uiData
    existedFloor.sort()
    const uiData_ = []
    existedFloor.map(floor => {
      const roomList = []
      for (let i = 1; i <= maxNumber; i++) {
        // 判断这个时段的教室状态
        let flag = 0
        const matrix = allData[buildingZh][buildingZh + floor + (i < 10 ? '0' + i : i)]
        if (!matrix) {
          flag = 3
        } else {
          const timeIndexes = matrix[weekIndex][dayIndex]
          let timeIndexesConcat = []
          timeIndexes.map(range => {
            timeIndexesConcat = timeIndexesConcat.concat(range)
          })
          timeIndexes.map(range => {
            const range2 = [range[0], range[range.length - 1]]
            if ((range.indexOf(startTime) !== -1 && range2[1] >= endTime) ||
              (range2[1] === startTime && range2[1] === endTime)) {
              flag = 1
            }
            else if ((range[0] >= startTime && range[1] < endTime) ||
              (range[1] >= startTime && range[1] < endTime)) {
              flag = 1
              for (let j = startTime; j <= endTime; j++) {
                if (timeIndexesConcat.indexOf(j) === -1) {
                  flag = 2
                }
              }
            }
            else if (timeIndexesConcat.indexOf(startTime) === -1) {
              timeIndexesConcat.map(allTimeIndex => {
                if (allTimeIndex <= endTime && allTimeIndex > startTime) {
                  flag = 2
                }
              })
            }
          })
        }
        roomList.push({
          room: floor + (i < 10 ? '0' + i : i),
          flag
        })
      }
      uiData_.push({
        floor,
        roomList
      })
    })
    // console.log(uiData_)
    setUiData(uiData_)

  }, [weekIndex, dayIndex, building, startTime, endTime, allData, buildingRange])

  // 校区改变的effect
  useEffect(() => {
    if (JSON.stringify(allData) === '{}') {
      return
    }
    console.log('校区改变')
    setBuilding(0)
    if (campus === '1') {
      console.log('翡翠湖')
      let buildingRange_1 = []
      let existedBuilding_1 = []
      _.forIn(allData, function (value, key) {
        if (key !== '主楼' && key !== '西二' && key !== '敬亭学堂' && key !== '新安学堂' && key !== '计算中心'
          && existedBuilding_1.indexOf(key) === -1
          && key.indexOf('负') === -1) {
          buildingRange_1.push({
            buildingZh: key,
            index: existedBuilding_1.length + 1
          })
          existedBuilding_1.push(key)
        }
      })
      setBuildingRange(buildingRange_1)
    } else if (campus === '2') {
      console.log('宣城')
      setBuildingRange(buildingRange_2)
    } else {
      console.log('屯溪路')
      setBuildingRange(buildingRange_0)
    }
    Taro.hideLoading()
  }, [allData, campus])

  // 日期发生改变，计算教学周、星期几并更新state
  const handleDateChange = (date_) => {
    console.log(date_)
    date_ = date_.split('-')[0] + '/' + date_.split('-')[1] + '/' + date_.split('-')[2]
    dayLineMatrix.map((weekInfo, weekIndex_) => {
      weekInfo.map((dayInfo, dayIndex_) => {
        if (dayInfo.dateZh === date_) {
          const year = date_.split('/')[0]
          const month = date_.split('/')[1]
          const day = date_.split('/')[2]
          setDate(`${year}-${month}-${day}`)
          setWeekIndex(weekIndex_)
          setDayIndex(dayIndex_)
        }
      })
    })
  }

  // 教学周、星期几发生改变，计算出日期并更新state
  const weekAndDayToDate = (weekIndex_, dayIndex_) => {
    const d = dayLineMatrix[weekIndex_][dayIndex_].dateZh
    const year = d.split('/')[0]
    const month = d.split('/')[1]
    const day = d.split('/')[2]
    setDate(`${year}-${month}-${day}`)
    setWeekIndex(weekIndex_)
    setDayIndex(dayIndex_)
  }

  const showWeiZhiHelp = () => {
    Taro.showModal({
      title: '什么是“未知”？',
      content: '该教室一般为非正常上课教室，比如晚自习教室、毕设教室等等。',
      showCancel: false,
      confirmColor: '#0089ff',
    })
  }

  // 点击一个教室
  const roomHandleClick = (room) => {
    const buildingZh = buildingRange[building].buildingZh
    const scheduleMatrix = _.cloneDeep(allData[buildingZh][buildingZh + room])
    scheduleMatrix.map((weekData_, weekIndex_) => {
      weekData_.map((dayData_, dayIndex_) => {
        const dayData = [[{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}], [{}]]
        dayData_.map(timeRange => {
          dayData[timeRange[0] - 1][0] = {
            color: 'red',
            timeIndexes: timeRange,
          }
        })
        dayData.map(courseBoxList => {
          if (!courseBoxList[0].color) {
            courseBoxList[0] = { color: 'green' }
          }
        })
        scheduleMatrix[weekIndex_][dayIndex_] = dayData
      })
    })
    dispatch({
      type: UPDATE_BIZDATA,
      payload: {
        scheduleMatrix,
        roomZh: buildingZh + room
      },
    })
    Taro.navigateTo({ url: '/pages/home/pages/empty-clazz-room/pages/room-detail-schedule/index' })
  }

  // 定位到当天、当前时间
  const locateAll = () => {
    let currentTime = parseInt(moment().format("Hmm"))
    currentTime = currentTime > 800 ? currentTime : 801
    timeTable.map((timeData, tableIndex) => {
      const { startTime: startTime_, endTime: endTime_, indexNo } = timeData
      if (currentTime >= startTime_ && currentTime < endTime_) {
        setStartTime(indexNo)
        setEndTime(indexNo)
      }
      else if (((tableIndex + 1) < timeTable.length) && currentTime >= endTime_ && currentTime < timeTable[tableIndex + 1].startTime) {
        setStartTime(indexNo + 1)
        setEndTime(indexNo + 1)
      }
    })
    weekAndDayToDate(currentWeekIndex, currentDayIndex)
  }

  // 定位按钮是否可见
  const isLocateBtnShow = () => {
    let isShow = false
    let currentTime = parseInt(moment().format("Hmm"))
    currentTime = currentTime > 800 ? currentTime : 801
    timeTable.map((timeData, tableIndex) => {
      const { startTime: startTime_, endTime: endTime_, indexNo } = timeData
      if (currentTime >= startTime_ && currentTime < endTime_ && (startTime !== indexNo || endTime !== indexNo)) {
        isShow = true
      }
      else if (((tableIndex + 1) < timeTable.length) && currentTime >= endTime_ && currentTime < timeTable[tableIndex + 1].startTime
        && (startTime !== (indexNo + 1) || endTime !== (indexNo + 1))) {
        isShow = true
      }
    })
    if (weekIndex !== currentWeekIndex || dayIndex !== currentDayIndex) {
      isShow = true
    }
    return isShow
  }

  return (
    <View className='emptyClazzRoom'>
      <View className='emptyClazzRoom-header'>

        <View className='emptyClazzRoom-header-item'>
          <Picker mode='selector' range={campusRange} value={campus} rangeKey='campusZh' onChange={e => setCampus(e.detail.value)}>
            <View className='emptyClazzRoom-header-item-box'>
              <View style={{ position: 'relative', top: '2rpx', left: '-8rpx', marginRight: '5rpx' }}>
                <IconFont name='map-filling' size={30} color='#ffffff' />
              </View>
              <Text>{campusToZh(campus)}</Text>
            </View>
          </Picker>

          <View className='emptyClazzRoom-header-item-box' onClick={() => setShowDatePicker(true)}>
            <IconFont />
            <Text>{date}</Text>
          </View>

          <View className='emptyClazzRoom-header-item-box' onClick={() => setShowWeekPicker(true)}>
            <IconFont />
            <Text>{`第${weekIndex + 1}周`}</Text>
          </View>

          <Picker mode='selector' range={dayRange} value={dayIndex} rangeKey='dayZh' onChange={e => weekAndDayToDate(weekIndex, parseInt(e.detail.value))}>
            <View className='emptyClazzRoom-header-item-box'>
              <IconFont />
              <Text>{`${dayIndexToZh(dayIndex)}`}</Text>
            </View>
          </Picker>

        </View>

        <View className='emptyClazzRoom-header-item'>
          <Picker mode='selector' range={buildingRange} value={building} rangeKey='buildingZh' onChange={e => setBuilding(e.detail.value)}>
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_white'>
              <View style={{ position: 'relative', top: '2rpx', left: '-8rpx', marginRight: '5rpx' }}>
                <IconFont name='task-filling' size={30} color='#0089ff' />
              </View>
              <Text>{buildingRange[building].buildingZh}</Text>
            </View>
          </Picker>

          <Picker mode='selector' range={timeIndexRange} value={startTime - 1} rangeKey='timeZh' onChange={e => setStartTime(parseInt(e.detail.value) + 1)}>
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_white'>
              <IconFont />
              <Text>{`第${startTime}节`}</Text>
            </View>
          </Picker>

          <View style={{ marginRight: '16rpx' }}>
            至
          </View>

          <Picker mode='selector' range={timeIndexRange} value={endTime - 1} rangeKey='timeZh' onChange={e => setEndTime(parseInt(e.detail.value) + 1)}>
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_white'>
              <IconFont />
              <Text>{`第${endTime}节`}</Text>
            </View>
          </Picker>

          {
            isLocateBtnShow() &&
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_locate' onClick={locateAll}>
              <View style={{ position: 'relative', top: '2rpx', left: '-8rpx', marginRight: '5rpx' }}>
                <IconFont name='map-filling' size={30} color='#0089ff' />
              </View>
            </View>
          }
        </View>

        <View className='emptyClazzRoom-header-line'></View>

        <View className='emptyClazzRoom-header-bottom'>
          {
            (timeTable && timeTable.length > 0) &&
            <Text className='emptyClazzRoom-header-bottom-title'>{timeTable ? (timeTable[startTime - 1].startTimeText + ' - ' + timeTable[endTime - 1].endTimeText) : ''}</Text>
          }

          <View className='emptyClazzRoom-header-bottom-colorBox'>
            {/* <Text style={{ marginRight: '24rpx' }}>颜色说明</Text> */}
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_green'>
              空闲
            </View>
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_red'>
              有课
            </View>
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_yellow'>
              部分有课
            </View>
            <View className='emptyClazzRoom-header-item-box emptyClazzRoom-header-item-box_grey' onClick={showWeiZhiHelp}>
              未知
              <View style={{ position: 'relative', top: '2rpx', marginLeft: '5rpx' }}>
                <IconFont name='help' size={28} color='#999999' />
              </View>
            </View>
          </View>
        </View>

      </View>


      <View className='emptyClazzRoom-content'>
        {
          uiData.map(floorData => (
            <View className='emptyClazzRoom-content-item' key={floorData.floor}>
              <View className='emptyClazzRoom-content-item-floor'>{floorToZh(floorData.floor)}</View>
              <View className='emptyClazzRoom-content-item-rooms'>
                {
                  floorData.roomList.map(roomData => (
                    <View
                      className={`emptyClazzRoom-content-item-rooms-box emptyClazzRoom-content-item-rooms-box_t${roomData.flag}`}
                      key={roomData.room}
                      onClick={roomData.flag === 3 ? null : () => roomHandleClick(roomData.room)}
                    >
                      {roomData.room}
                    </View>
                  ))
                }
              </View>
            </View>
          ))
        }
      </View>

      <DatePlckerFL
        isOpened={showDatePicker}
        onClose={() => setShowDatePicker(false)}
        onChange={handleDateChange}
      />

      <WeekPicker
        isOpened={showWeekPicker}
        onClose={() => setShowWeekPicker(false)}
        onChange={(weekIndex_) => weekAndDayToDate(weekIndex_, dayIndex)}
        weekIndex={weekIndex}
        currentWeekIndex={currentWeekIndex}
      />

    </View>
  )
}

export default EmptyClazzRoom

const campusToZh = (campus) => {
  let campusZh = ''
  switch (parseInt(campus)) {
    case 0:
      campusZh = '屯溪路'
      break;
    case 1:
      campusZh = '翡翠湖'
      break;
    default:
      campusZh = '宣城'
      break;
  }
  return campusZh
}

const floorToZh = (floor) => {
  let floorZh = ''
  switch (parseInt(floor)) {
    case 1:
      floorZh = '一层'
      break;
    case 2:
      floorZh = '二层'
      break;
    case 3:
      floorZh = '三层'
      break;
    case 4:
      floorZh = '四层'
      break;
    case 5:
      floorZh = '五层'
      break;
    case 6:
      floorZh = '六层'
      break;
    case 7:
      floorZh = '七层'
      break;
    case 8:
      floorZh = '八层'
      break;

    default:
      break;
  }
  return floorZh
}
