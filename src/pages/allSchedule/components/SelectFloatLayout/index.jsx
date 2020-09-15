import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { View, Picker } from '@tarojs/components'
import { AtFloatLayout, AtButton, AtList, AtListItem } from 'taro-ui'

import { updateScheduleData, updateBizData } from '../../../../actions/allSchedule'
import './index.less'

export default (props) => {
  const { isOpened, onClose } = props
  const { selectInfo } = useSelector(state => state.allSchedule.bizData)
  const dispatch = useDispatch()

  const [selectedAcademy, setSelectedAcademy] = useState('')
  const [majorList, setMajorList] = useState([])
  const [selectedMajor, setSelectedMajor] = useState('')
  const [levelList, setLevelList] = useState([])
  const [selectedLevel, setSelectedLevel] = useState('')
  const [clazzList, setClazzList] = useState([])
  const [selectedClazz, setSelectedClazz] = useState('')

  const handleAcademyChange = (e) => {
    const academy = Object.keys(selectInfo)[e.detail.value]
    setSelectedAcademy(academy)
    const majorObj = selectInfo[academy]
    setMajorList(Object.keys(majorObj))
    setClazzList([])
    setSelectedMajor('')
    setSelectedClazz('')
  }

  const handleMajorChange = (e) => {
    const major = Object.keys(selectInfo[selectedAcademy])[e.detail.value]
    setSelectedMajor(major)
    const levelObj = selectInfo[selectedAcademy][major]
    let levelList_ = []
    Object.keys(levelObj).map((level) => {
      if (levelObj[level].length > 0) {
        levelList_.push(level)
      }
    })
    setLevelList(levelList_.reverse())

    if (selectedLevel) {
      const clazzes = selectInfo[selectedAcademy][major][selectedLevel]
      setClazzList(clazzes)
    }
    setSelectedClazz('')
  }

  const handleLevelChange = (e) => {
    const level = levelList[e.detail.value]
    setSelectedLevel(level)
    const clazzes = selectInfo[selectedAcademy][selectedMajor][level]
    setClazzList(clazzes)
    setSelectedClazz('')
  }

  const handleClazzChange = (e) => {
    const clazz = clazzList[e.detail.value]
    setSelectedClazz(clazz)
  }

  const handleQuery = async () => {
    if (!selectedClazz) { return }
    await dispatch(updateBizData({ level: selectedLevel }))
    dispatch(updateScheduleData({ clazz: selectedClazz, level: selectedLevel }))
    onClose()
  }

  const selectsData = [
    {
      title: '选择学院',
      extraText: selectedAcademy,
      range: Object.keys(selectInfo),
      onChange: handleAcademyChange,
    },
    {
      title: '选择专业',
      extraText: selectedMajor,
      range: majorList,
      onChange: handleMajorChange,
    },
    {
      title: '选择年级',
      extraText: selectedLevel,
      range: levelList,
      onChange: handleLevelChange,
    },
    {
      title: '选择班级',
      extraText: selectedClazz,
      range: clazzList,
      onChange: handleClazzChange,
    },
  ]

  return (
    <AtFloatLayout
      isOpened={isOpened}
      className='selectFloatLayout'
      onClose={onClose}
    >
      <View className='selectFloatLayout-header'>选择班级</View>

      <View className='selectFloatLayout-content'>

        {
          selectsData.map((selectData) => {
            const { title, extraText, range, onChange } = selectData
            return (
              <View className='selectFloatLayout-content-item' key={title} >
              <Picker mode='selector' range={range} onChange={onChange}>
                <AtList className='selectFloatLayout-content-item' hasBorder={false}>
                  <AtListItem
                    title={title}
                    extraText={extraText}
                    hasBorder={false}
                  />
                </AtList>
              </Picker>
            </View>
            )
          })
        }

      </View>

      <View className='selectFloatLayout-footer'>
        <AtButton className='selectFloatLayout-footer-btn' onClick={handleQuery} >
          查询
        </AtButton>
      </View>
    </AtFloatLayout>
  )
}
