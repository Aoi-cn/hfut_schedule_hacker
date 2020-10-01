
export default (scheduleMatrix, chosenBlank, courseType) => {
  const [dayIndex, startTime] = chosenBlank

  if (startTime < 4 && (startTime + courseType) > 4 ||
    startTime < 8 && startTime > 3 && (startTime + courseType) > 8 ||
    startTime < 11 && startTime > 7 && (startTime + courseType) > 11) {
    return scheduleMatrix.map(() => 2)
  }


  let validWeeks = scheduleMatrix.map(() => 0)
  scheduleMatrix.map((weekData, weekIndex) => {
    let validType = 0
    const dayData = weekData[dayIndex]
    for (let i = 0; i < courseType; i++) {
      const courseBoxData = dayData[startTime + i][0]
      if (courseBoxData.name) {
        validType = 1
      }
    }
    validWeeks[weekIndex] = validType
  })

  return validWeeks
}
