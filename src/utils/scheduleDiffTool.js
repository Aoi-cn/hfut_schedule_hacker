import _ from 'lodash'

export default (targetScheduleM, mineScheduleM) => {

  const diffScheduleM = _.cloneDeep(targetScheduleM)

  diffScheduleM.map((weekDataT, weekIndex) => {
    weekDataT.map((dayDataT, dayIndex) => {
      dayDataT.map((courseBoxDataT, courseIndex) => {
        const courseBoxDataM = mineScheduleM[weekIndex][dayIndex][courseIndex]

        if (courseBoxDataT.name && courseBoxDataM.name) {
          // 两个人都有
          courseBoxDataT.color = 'red'
        } else if (courseBoxDataM.name && !courseBoxDataT.name) {
          // 我有ta没有
          courseBoxDataT.color = 'yellow'
        } else if (courseBoxDataT.name && !courseBoxDataM.name) {
          // ta有我没有
          courseBoxDataT.color = 'blue'
          // if (courseBoxDataT.name === '工程力学B') {
          //   console.log('----------我有ta没有-----------')
          //   console.log('他的：' + courseBoxDataT.name + ' --- weekIndex=' + weekIndex + ' --- dayIndex=' + dayIndex + ' --- ' + 'courseIndex=' + courseIndex)
          //   console.log('我的：' + courseBoxDataM.name + ' --- weekIndex=' + weekIndex + ' --- dayIndex=' + dayIndex + ' --- ' + 'courseIndex=' + courseIndex)
          // }
        } else {
          // 都没有
          courseBoxDataT.color = 'green'
        }
      })
    })
  })

  return diffScheduleM
}