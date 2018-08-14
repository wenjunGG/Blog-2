export default {
  addEvent () {
    if (document.addEventListener) {
      return function (obj, eventname, eventfn) { obj.addEventListener(eventname, eventfn) }
    }
    return function (obj, eventname, eventfn) { obj.attachEvent('on' + eventname, eventfn) }
  },
  turn (str, time) {
    setTimeout(() => {
      let a = document.createElement('a')
      a.href = str
      a.click()
    }, time)
  },
  getTime (time) {
    let newtime = new Date(time)
    return `${newtime.getFullYear()}-${newtime.getMonth() + 1}-${newtime.getDate()} ${newtime.getHours()}:${newtime.getMinutes()}:${newtime.getSeconds()}`
  }
}
