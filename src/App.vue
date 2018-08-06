<template>
  <div id="app">
    <vhead></vhead>
    <router-view/>
  </div>
</template>

<script>
import vhead from './components/head'
import common from './components/mods/common.js'
import {mapMutations} from 'vuex'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    vhead
  },
  methods: {
    ...mapMutations([
      'setClassify',
      'setStatus',
      'setLabels'
    ])
  },
  created () {
    this.setClassify()
    this.setStatus()
    this.setLabels()
  },
  mounted () {
    let ev = 'orientationchange' in window ? 'orientationchange' : 'resize'
    let windowW = 0
    let addEvent = common.addEvent()
    let fn = function () {
      var w = document.documentElement.clientWidth
      windowW = Math.max(w, 320)
      windowW = Math.min(w, 1200)
      document.documentElement.style.fontSize = windowW > 840 ? ((windowW / 1200) * 100 + 'px') : ((windowW / 840) * 100 + 'px')
    }
    addEvent(window, ev, fn)
    addEvent(document, 'DOMContentLoaded', fn)
  }
}
</script>
