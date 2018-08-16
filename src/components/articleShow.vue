<template>
  <section class="content container mt110 mb20">
    <div class="main artshow mb20">
      <h1 class="title">{{artData.title}}</h1>
      <section class="content-txt" v-html="artData.content" id="contentTxt"></section>
      <section class="foot clearfix">
        <div class="favorite" @click="collet">
          <i :class="{on:isOn}"></i>
          <span>{{colletMsg}}</span>
        </div>
        <div class="info">
          <span>{{getTime(artData.regtime)}}</span> 阅读( <span>{{artData.readcount}}</span>) 评论( <span>{{commentCount}}</span>)
        </div>
        <div class="enter">
          <h2>评论</h2>
          <textarea name="" id="" cols="80" rows="8" v-model="comTxt"></textarea>
          <input type="button" value="发表评论" @click="commentFn">
        </div>
      </section>
      <comment type="art" :id="id" ref="comment"></comment>
    </div>
    <column></column>
  </section>
</template>
<script>
import axios from 'axios'
import {mapState} from 'vuex'
import column from './mods/column'
import common from './mods/common'
export default {
  name: 'articleShow',
  data () {
    return {
      id: this.$route.params.artid,
      artData: {},
      isOn: false,
      colletMsg: '点击收藏',
      comTxt: '',
      commentCount: 0
    }
  },
  components: {
    column
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    collet () {
      if (!this.userInfo.isLogin) {
        alert('请先登录')
        return
      }
      this.isOn = !this.isOn
      let data = {
        userId: this.userInfo.id,
        artId: this.artData.id
      }
      if (this.isOn) {
        axios.post('/api/collet', {
          type: 'insert',
          data
        }).then((res) => {
          if (res.data.isOk) {
            this.colletMsg = '已收藏'
          } else {
            this.colletMsg = '收藏失败'
            this.isOn = false
          }
        }).catch((err) => {
          console.log(err)
        })
      } else {
        axios.post('/api/collet', {
          type: 'delete',
          data
        }).then((res) => {
          if (res.data.isOk) {
            this.colletMsg = '点击收藏'
          } else {
            this.colletMsg = '取消失败'
            this.isOn = true
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    commentFn () {
      let comData = {
        content: this.comTxt,
        artId: this.id,
        authorId: this.userInfo.id,
        authorName: this.userInfo.nickname,
        comId: 0,
        preComId: 0
      }
      axios.post('/api/comment', {
        type: 'insert',
        data: comData
      }).then((res) => {
        if (res.data.isOk) {
          this.$refs.comment.getData()
        } else {
          alert('你的回复被外星人劫走了，请稍后再试。')
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    getTime (time) {
      return common.getTime(time)
    },
    initData () {
      axios.get('/api/article', {
        params: {
          type: 'id',
          id: this.id
        }
      }).then((res) => {
        if (res.data.isOk) {
          this.artData = res.data.result[0]
          setTimeout(this.uparse, 200)
        }
      }).catch((err) => {
        console.log(err)
      })
      axios.get('/api/comment', {
        type: 'count',
        id: this.id
      }).then((res) => {
        if (res.data.isOk) {
          this.commentCount = res.data.result
        }
      }).catch((err) => {
        console.log(err)
      })
      if (this.userInfo.isLogin) {
        axios.post('/api/collet', {
          type: 'select',
          data: {
            userId: this.userInfo.id,
            artId: this.artData.id
          }
        }).then((res) => {
          if (res.data.isOk) {
            this.colletMsg = '取消收藏'
            this.isOn = true
          }
        })
      }
    },
    uparse () {
      window.uParse('#contentTxt', {
        rootPath: '../../static/ueditor'
      })
    }
  },
  watch: {
    '$route' (to, from) {
      if (to.name === 'articleShow') {
        this.id = to.params.artid
        this.initData()
      }
    }
  },
  created () {
    this.initData()
  }
}
</script>
