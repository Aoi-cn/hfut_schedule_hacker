import moment from 'moment'

export default () => {
  const daysZh = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  // 总共20周
  let weekIndexes = []
  for (let i = 0; i < 20; i++) {
    weekIndexes.push(i)
  }

  const travelMoment = moment('2020/09/06')
  const currentMoment = moment()

  let currentWeekIndex = 0

  const dayLineMatrix = weekIndexes.map((weekIndex) => {
    return daysZh.map((dayZh) => {
      travelMoment.add(1, 'd')
      const today = currentMoment.format('MM/DD') == travelMoment.format('MM/DD')
      if (today) {
        currentWeekIndex = weekIndex
      }
      return {
        dayZh,
        dateZh: travelMoment.format('YYYY/MM/DD'),
        today,
      }
    })
  })

  return {
    dayLineMatrix,
    currentWeekIndex,
  }

}