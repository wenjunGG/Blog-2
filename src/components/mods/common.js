export default {
  addEvent: function () {
    if (document.addEventListener) {
      return function (obj, eventname, eventfn) { obj.addEventListener(eventname, eventfn) }
    }
    return function (obj, eventname, eventfn) { obj.attachEvent('on' + eventname, eventfn) }
  }
}
