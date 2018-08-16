<template>
  <div class="content container work-wrapper">
    <article>
      <p class="label">JavaScript</p>
      <a href="" class="imgA">
        <img src="picture/ro01.jpg"/>
        <img src="picture/ro01.jpg"/>
        <img src="picture/ro01.jpg"/>
        <img src="picture/ro01.jpg"/>
        <img src="picture/ro01.jpg"/>
      </a>
      <a href="" class="title">俄罗斯方块</a>
      <a href="" class="url">演示地址</a>
    </article>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  name: 'works',
  data () {
    return {
      preid: this.$routes.params.preid,
      secid: this.$routes.params.secid,
      worksData: []
    }
  },
  created () {
    axios.get('/works', {
      preid: this.preid,
      secid: this.secid
    }).then((res) => {
      if (res.data.isOk) {
        this.worksData = res.data.result
      } else {}
    })
  }
}
</script>
