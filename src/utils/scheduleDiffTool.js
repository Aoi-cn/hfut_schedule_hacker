export default (targetScheduleM, mineScheduleM) => {
  
  targetScheduleM.map((weekDataT, weekIndex) => {
    weekDataT.map((dayDataT, dayIndex) => {
      dayDataT.map((courseBoxDataT, courseIndex) => {
        const courseBoxDataM = mineScheduleM[weekIndex][dayIndex][courseIndex]
        // console.log(courseBoxDataM)
        if (courseBoxDataT.name && courseBoxDataM.name) {
          // 两个人都有
          targetScheduleM[weekIndex][dayIndex][courseIndex].color = 'red'
        } else if (courseBoxDataM.name && !courseBoxDataT.name) {
          // 我有ta没有
          targetScheduleM[weekIndex][dayIndex][courseIndex].color = 'yellow'
        } else if (courseBoxDataT.name && !courseBoxDataM.name) {
          // ta有我没有
          targetScheduleM[weekIndex][dayIndex][courseIndex].color = 'blue'
        } else {
          // 都没有
          targetScheduleM[weekIndex][dayIndex][courseIndex].color = 'green'
        }
      })
    })
  })
  return targetScheduleM
}