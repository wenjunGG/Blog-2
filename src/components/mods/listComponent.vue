<template>
  <div class="main">
    <div>
      <article v-for="(item, index) in listData" :key="index">
        <h1>
          <span>{{getLabels(item.label_id).name}}</span>
          <router-link :to="`/article_${item.id}.html`">{{item.title}}</router-link>
        </h1>
        <section class="clearfix">
          <img :src="item.imgurl" alt="">
          <div class="info">
            <p>{{item.contentTxt.slice(0,130)}}...</p>
            <ul>
              <li>
                <i class="iconfont">&#xe663;</i>
                <span>{{item.author_nkname}}</span>
                <!--<router-link :to="`/user_${item.author_id}.html`">{{item.author_nkname}}</router-link>-->
              </li>
              <li><i class="iconfont">&#xe657;</i><span>{{getTime(item.regtime)}}</span>前</li>
              <li><i class="iconfont">&#xe61a;</i><span>{{item.readcount}}</span>浏览</li>
              <li><i class="iconfont">&#xe634;</i><span>{{getComCount(item.id)||0}}评论</span></li>
              <li><i class="iconfont">&#xe64a;</i><span>{{item.favorote||0}}喜欢</span></li>
            </ul>
          </div>
        </section>
      </article>
    </div>
    <div class="wait" ref="wait" v-show="waitShow">
      <p>加载中</p>
      <div>
        <span class="ico"></span>
        <span class="ico"></span>
        <span class="ico"></span>
        <span class="ico"></span>
        <span class="ico"></span>
      </div>
    </div>
    <div class="msg" v-show="msgShow">没有更多数据了</div>
  </div>
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'listComponent',
  props: ['type', 'para', 'cid'],
  data () {
    return {
      listData: [],
      msgShow: false,
      waitShow: false,
      start: 0,
      count: 10,
      isDone: false
    }
  },
  computed: {
    ...mapGetters([
      'getLabels'
    ]),
    waitDistance () {
      let wait = this.$refs.wait
      if (wait) {
        let topHeight = this.$refs.wait.offsetTop
        let currentHeight = (document.documentElement.scrollTop || document.body.scrollTop) + window.innerHeight
        return topHeight - currentHeight
      }
      return 100
    }
  },
  watch: {
    waitDistance (newval) {
      if (newval < 50) {
        this.waitShow = true
        this.getData()
      }
    }
  },
  methods: {
    getData () {
      if (this.isDone) {
        this.msgShow = true
        this.waitShow = false
        return
      }
      axios.get('api/article', {
        type: this.type,
        para: this.para,
        cid: this.cid,
        start: this.start,
        count: this.count
      }).then((res) => {
        if (res.data.isOk) {
          this.listData = this.listData.concat(res.data.result)
          if (res.data.result.length < this.count) this.isDone = true
        } else {
          this.msgShow = true
          this.isDone = true
        }
        this.waitShow = false
      }).catch((err) => {
        console.log(err)
      })
      this.start += this.count
    },
    getTime (time) {
      let newtime = new Date()
      time = new Date(time)
      let disTime = newtime - time
      let ss = disTime / 1000
      let mm = ss / 60
      let hh = mm / 60
      let day = hh / 24
      if (day >= 1) {
        return parseInt(day) + '天'
      } else if (hh >= 1) {
        return parseInt(hh) + '小时'
      } else if (mm >= 1) {
        return parseInt(mm) + '分钟'
      } else {
        return parseInt(ss) + '秒'
      }
    },
    getComCount (id) {
      axios.post('/api/comment', {
        type: 'count',
        id
      }).then((res) => {
        if (res.data.isOk) {
          return res.data.result
        } else {
          return 0
        }
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  created () {
    this.getData()
  }
}
</script>
