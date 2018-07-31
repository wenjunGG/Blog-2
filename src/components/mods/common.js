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
  }
}
