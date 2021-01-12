const setTimer = (timer, type = false, format = '') => {
  let d = new Date(timer)
  let ConvertedYear = d.getFullYear().toString()
  let ConvertedMonth = (d.getMonth() + 1).toString()
  let ConvertedDate = d.getDate().toString()
  let ConvertedHour = d.getHours().toString()
  let ConvertedMinut = d.getMinutes().toString()
  let ConvertedSecond = d.getSeconds().toString()
  ConvertedMonth =
    ConvertedMonth.length < 2 ? '0' + ConvertedMonth : ConvertedMonth
  ConvertedDate = ConvertedDate.length < 2 ? '0' + ConvertedDate : ConvertedDate
  ConvertedHour = ConvertedHour.length < 2 ? '0' + ConvertedHour : ConvertedHour
  ConvertedMinut =
    ConvertedMinut.length < 2 ? '0' + ConvertedMinut : ConvertedMinut
  ConvertedSecond =
    ConvertedSecond.length < 2 ? '0' + ConvertedSecond : ConvertedSecond
  if (format === 1) {
    return `${ConvertedYear}年${ConvertedMonth}月${ConvertedDate}日`
  }
  return type ?
    `${ConvertedYear}-${ConvertedMonth}-${ConvertedDate} ${ConvertedHour}:${ConvertedMinut}:${ConvertedSecond}` :
    `${ConvertedYear}-${ConvertedMonth}-${ConvertedDate}`
}

export{
  setTimer
}