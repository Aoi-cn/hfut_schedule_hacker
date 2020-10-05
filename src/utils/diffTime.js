export default (startTime, endTime) => {
  const startDate = new Date('2000/05/21 ' + startTime).getTime()
  const endDate = new Date('2000/05/21 ' + endTime).getTime()

  return (endDate - startDate) / 60000
}