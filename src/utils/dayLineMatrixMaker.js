import moment from 'moment'

export default () => {
  const daysZh = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']

  // 总共20周
  let weekIndexes = []
  for (let i = 0; i < 20; i++) {
    weekIndexes.push(i)
  }

  const beginMoment = moment('2020/09/06')

  const dayLineMatrix = weekIndexes.map(() => {
    return daysZh.map((dayZh) => {
      beginMoment.add(1, 'd')
      return {
        dayZh,
        dateZh: beginMoment.format('MM/DD')
      }
    })
  })

  return dayLineMatrix

}