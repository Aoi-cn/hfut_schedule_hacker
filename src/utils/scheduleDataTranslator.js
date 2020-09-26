import _ from 'lodash'
import Taro from '@tarojs/taro'

export const themeColors = [
  // 默认
  [
    { name: '蓝', value: 'blue' },
    { name: '深蓝', value: 'darkBlue' },
    { name: '红', value: 'red' },
    { name: '黄', value: 'yellow' },
    { name: '绿', value: 'green' },
    { name: '灰', value: 'gray' },
    { name: '深灰', value: 'darkGray' },
    { name: '棕', value: 'brown' },
    { name: '橙', value: 'orange' },
    { name: '紫', value: 'purple' },
  ],
  // 活泼
  [
    { name: '亮蓝', value: 'blue' },
    { name: '蓝', value: 'darkBlue' },
    { name: '红', value: 'red' },
    { name: '亮黄', value: 'gold' },
    { name: '黄', value: 'yellow' },
    { name: '绿', value: 'green' },
    { name: '橙', value: 'orange' },
    { name: '紫', value: 'purple' },
  ],
  // 莫兰迪
  [
    { name: '灰蓝', value: 'blue' },
    { name: '雪青', value: 'purple' },
    { name: '粉红', value: 'red' },
    { name: '姜黄', value: 'yellow' },
    { name: '灰豆绿', value: 'green' },
    { name: '烟灰粉', value: 'pink' },
    { name: '黄栌', value: 'orange' },
    { name: '灰', value: 'grey' },
    { name: '驼色', value: 'brown' },
  ],
]

export default (scheduleData, lessonIds, timeTable) => {
  const lessonIdsColor = initLessonIdsColor(lessonIds)

  // 初始化scheduleMatrix
  let scheduleMatrix = []
  for (let i = 0; i < 20; i++) {
    scheduleMatrix.push([
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
      [[], [], [], [], []],
    ])
  }

  // 遍历scheduleData，填充scheduleMatrix
  scheduleData.map((lessonInfo) => {
    // course：(Object)课程数据
    // text：(String)该门课具体在星期几、教室信息、授课老师
    // lessonId:：课程id
    const {
      course: {
        nameZh: name,
        credits: credits,
      },
      scheduleText: { dateTimePlacePersonText: { text } },
      id: lessonId,
      nameZh: studentClazzes,
      code: lessonCode,
      stdCount: studentNumber,
      courseType: { nameZh: lessonType },
      scheduleWeeksInfo: weekIndexesZh,
      campus: { nameZh: campus },

    } = lessonInfo
    if (!text) { return } // 没有课程安排，跳过

    // 解析
    text.split('\n').map((splitdText) => {

      // 教室、老师
      let clazzRoom = ''
      let teacher = ''
      const splitdSpace = splitdText.split(' ')
      if (splitdSpace.length >= 6) {
        clazzRoom = splitdSpace[4]
        teacher = splitdSpace[5].split(';')[0]
      } else if (splitdSpace.length == 5) {
        teacher = splitdSpace[4].split(';')[0]
        if (!teacher) {
          teacher = splitdSpace[3].split(';')[0]
        }
      } else if (splitdSpace.length == 4) {
        teacher = splitdSpace[3].split(';')[0]
      }

      // 这门课在一周中的哪一天
      const dayIndex = dayZhToIndex(splitdText.split(' ')[1])

      // 获取这门课在哪几周有
      const weekIndexes = []
      splitdSpace[0].split(',').map((splitdComma) => {
        if (splitdComma.split('~').length === 1) {
          // 对应情境：1~14周,15周
          weekIndexes.push(parseInt(splitdComma.split('~')[0].split('周')[0]))
        } else {
          let startWeek = splitdComma.split('~')[0]
          let endWeekString = splitdComma.split('~')[1].split('周')[0]
          // 判断有没有分单双周
          if (endWeekString.indexOf('单') !== -1) {
            for (let weekIndex = parseInt(startWeek); weekIndex <= parseInt(endWeekString); weekIndex++) {
              if (weekIndex % 2 !== 0) {
                weekIndexes.push(weekIndex)
              }
            }
          } else if (endWeekString.indexOf('双') !== -1) {
            for (let weekIndex = parseInt(startWeek); weekIndex <= parseInt(endWeekString); weekIndex++) {
              if (weekIndex % 2 === 0) {
                weekIndexes.push(weekIndex)
              }
            }
          } else {
            // 没有单双周
            for (let weekIndex = parseInt(startWeek); weekIndex <= parseInt(endWeekString); weekIndex++) {
              weekIndexes.push(weekIndex)
            }
          }
        }
      })

      // 获取这门课的上课时间
      const timeIndexes = []
      let startTime = timeZhToIndex(splitdSpace[2].split('~')[0])
      let endTime = timeZhToIndex(splitdSpace[2].split('~')[1])
      for (let timeIndex = parseInt(startTime); timeIndex <= parseInt(endTime); timeIndex++) {
        timeIndexes.push(timeIndex)
      }

      // 分配一个颜色
      let color = lessonIdsColor[lessonId]

      // 填充scheduleMatrix
      const courseBoxData = {
        name,
        credits,
        lessonId,
        clazzRoom,
        teacher,
        weekIndexes,
        dayIndex,
        timeIndexes,
        studentClazzes: studentClazzes.split(','),
        lessonCode,
        lessonType,
        studentNumber,
        // timeRange: timeIndexToTime(startTime) + '~' + timeIndexToTime(endTime),
        timeRange: timeTable ? (timeTable[startTime - 1].startTimeText + '~' + timeTable[endTime - 1].endTimeText) : '',
        weekIndexesZh,
        campus,
        color,
      }

      weekIndexes.map((weekIndex_) => {
        const courseBoxList = scheduleMatrix[weekIndex_ - 1][dayIndex - 1][parseInt(parseInt(startTime / 2))]
        for (let cn = 0; cn < courseBoxList.length; cn++) {
          if (courseBoxList.length > cn) {
            const { lessonId: existCourseId } = courseBoxList[cn]
            if (existCourseId === lessonId) {
              // 同一堂课，两个老师
              courseBoxData.teacher = `${teacher}、${courseBoxList[cn].teacher}`
              courseBoxList[cn] = _.cloneDeep(courseBoxData)
              return null
            }
          }
        }
        // 确保同一时间的两门课的颜色不同
        if (courseBoxList.length > 0) {
          const existColor = courseBoxList[0].color
          while (color === existColor) {
            const randomI = Math.floor(Math.random() * lessonIds.length + 1) - 1
            color = lessonIdsColor[lessonIds[randomI]]
          }
          courseBoxData.color = color
        }
        courseBoxList.push(_.cloneDeep(courseBoxData))
      })
    })
  })

  // 给所有没课的添加{}
  scheduleMatrix.map((weekData) => {
    weekData.map((dayData) => {
      dayData.map((courseBoxList) => {
        if (courseBoxList.length === 0) {
          courseBoxList.push({})
        }
      })
    })
  })

  // console.log(scheduleMatrix)

  return scheduleMatrix
}


const initLessonIdsColor = (lessonIds) => {
  // 十个颜色随机
  let theme = 0
  try {
    theme = Taro.getStorageSync('config').userConfig.theme
  } catch (error) { }

  const colors = themeColors[theme].map(themeColor => themeColor.value)
  const lessonIdsColor = {}
  lessonIds.map((lessonId) => {
    lessonIdsColor[lessonId] = colors[Math.floor((Math.random() * colors.length))]
  })
  return lessonIdsColor
}

// 将中文的周目转化为index
const dayZhToIndex = (dayZh) => {
  let dayIndex = 0
  switch (dayZh) {
    case '周一':
      dayIndex = 1
      break;
    case '周二':
      dayIndex = 2
      break;
    case '周三':
      dayIndex = 3
      break;
    case '周四':
      dayIndex = 4
      break;
    case '周五':
      dayIndex = 5
      break;
    case '周六':
      dayIndex = 6
      break;
    default:
      dayIndex = 7
      break;
  }
  return dayIndex
}

// 将上课时间转化为index
const timeZhToIndex = (timeZh) => {
  let timeIndex = 1
  switch (timeZh) {
    case '第一节':
      timeIndex = 1
      break;
    case '第二节':
      timeIndex = 2
      break;
    case '第三节':
      timeIndex = 3
      break;
    case '第四节':
      timeIndex = 4
      break;
    case '第五节':
      timeIndex = 5
      break;
    case '第六节':
      timeIndex = 6
      break;
    case '第七节':
      timeIndex = 7
      break;
    case '第八节':
      timeIndex = 8
      break;
    case '第九节':
      timeIndex = 9
      break;
    case '第十节':
      timeIndex = 10
      break;
    case '第十一节':
      timeIndex = 11
      break;

    default:
      break;
  }
  return timeIndex
}
