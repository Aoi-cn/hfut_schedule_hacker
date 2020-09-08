
export default (scheduleData, lessonIds) => {
  const lessonIdsColor = initLessonIdsColor(lessonIds)

  // 初始化scheduleMatrix
  let scheduleMatrix = []
  for (let i = 0; i < 20; i++) {
    scheduleMatrix.push([[], [], [], [], [], [], [],])
  }

  // 遍历scheduleData，填充scheduleMatrix
  scheduleData.map((lessonInfo) => {
    // course：(Object)课程数据
    // text：(String)该门课具体在星期几、教室信息、授课老师
    // lessonId:：课程id
    const { course, scheduleText: { dateTimePlacePersonText: { text } }, id: lessonId } = lessonInfo
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
      } else if (splitdSpace.length == 4) {
        teacher = splitdSpace[3].split(';')[0]
      }

      // 这门课在一周中的哪一天
      const dayIndex = dayZhToIndex(splitdText.split(' ')[1])

      // 获取这门课在哪几周有
      const weekIndexes = []
      splitdSpace[0].split(',').map((splitdComma) => {
        if (splitdComma.split('~').length === 1) {
          weekIndexes.push(parseInt(splitdComma.split('~')[0].split('周')[0]))
        } else {
          let startWeek = splitdComma.split('~')[0]
          let endWeek = splitdComma.split('~')[1].split('周')[0]
          for (let weekIndex = parseInt(startWeek); weekIndex <= parseInt(endWeek); weekIndex++) {
            weekIndexes.push(weekIndex)
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

      // 填充scheduleMatrix
      const courseBoxData = {
        name: course.nameZh,
        lessonId,
        clazzRoom,
        teacher,
        weekIndexes,
        dayIndex,
        timeIndexes,
        color: lessonIdsColor[lessonId],
      }

      weekIndexes.map((weekIndex_) => {
        scheduleMatrix[weekIndex_ - 1][dayIndex - 1].push(courseBoxData)
      })
    })
  })

  return scheduleMatrix
}

const initLessonIdsColor = (lessonIds) => {
  // 十个颜色随机
  const colors = ['blue', 'darkBlue', 'red', 'yellow', 'green', 'gray', 'darkGray', 'brown', 'orange', 'purple']
  const lessonIdsColor = {}
  lessonIds.map((lessonId) => {
    lessonIdsColor[lessonId] = colors[Math.floor((Math.random()*colors.length))]
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
