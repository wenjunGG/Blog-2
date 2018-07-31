<template>
  <header>
    <div class="top">
      <div class="container">
        <div class="left">
          <span>lolo~ 欢迎光临！</span>
          <span v-if="userInfo.isLogin">
            <span class="loginout" @click="loginout">退出登录</span>
          </span>
          <span v-else>
            <router-link to="/login"><i class="iconfont">&#xe61b;</i>登录</router-link>
            <router-link to="/register"><i class="iconfont">&#xe60f;</i>注册</router-link>
          </span>
        </div>
        <div class="right" v-show="userInfo.isLogin">
          <img src="../assets/images/icon/female/6.jpg" />
          <a href="#">{{userInfo.user}}</a>
          <a href="#">消息(<span>12</span>)</a>
          <a href="/admin" v-show="userInfo.admin==1">后台管理</a>
        </div>
      </div>
    </div>
    <nav>
      <div class="container">
        <div class="left">
          <div class="logodiv">
            <img src="../assets/images/logo.png" />
            <ul class="logo">
              <li>L</li>
              <li>O</li>
              <li>L</li>
              <li>O</li>
              <li>W</li>
              <li>U</li>
            </ul>
          </div>
          <div class="info">
            <p>山不在高,有仙则名</p>
            <p>水不在深,有龙则灵</p>
          </div>
        </div>
        <div class="right">
          <ul>
            <li class="active">
              <a href="#">
                <span>首页</span>
                <span>首页</span>
              </a>
              <audio src="../assets/video/do.mp3"></audio>
              <p class="footP do">dsda</p>
            </li>
            <li>
              <a href="#">
                <span>知识总结</span>
                <span>知识总结</span>
              </a>
              <audio src="../assets/video/re.mp3"></audio>
              <p class="footP re"></p>
            </li>
            <li>
              <a href="#">
                <span>案例分享</span>
                <span>案例分享</span>
              </a>
              <audio src="../assets/video/mi.mp3"></audio>
              <p class="footP mi"></p>
            </li>
            <li>
              <a href="#">
                <span>作品展示</span>
                <span>作品展示</span>
              </a>
              <audio src="../assets/video/fa.mp3"></audio>
              <p class="footP fa"></p>
            </li>
            <li>
              <a href="#">
                <span>随笔</span>
                <span>随笔</span>
              </a>
              <audio src="../assets/video/sol.mp3"></audio>
              <p class="footP sol"></p>
            </li>
            <li>
              <a href="#">
                <span>留言板</span>
                <span>留言板</span>
              </a>
              <audio src="../assets/video/la.mp3"></audio>
              <p class="footP la"></p>
            </li>
            <li>
              <a href="#">
                <span>关于博客</span>
                <span>关于博客</span>
              </a>
              <audio src="../assets/video/si.mp3"></audio>
              <p class="footP si"></p>
            </li>
            <li class="music">
              <span class="note"></span><span class="note"></span>
              <span class="note"></span><span class="note"></span>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script>
import {mapState, mapMutations} from 'vuex'
import handleSession from './mods/handleSession'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    loginout () {
      this.clearUser()
      handleSession.removeSession('user')
    },
    ...mapMutations([
      'updateUser',
      'clearUser'
    ])
  },
  mounted () {
    let userInfo = handleSession.getSession('user')
    if (userInfo) {
      this.updateUser(userInfo.user, userInfo.admin)
    }
  }
}
</script>
<style>
  .loginout{
    cursor: pointer;
  }
  .loginout:hover{
    text-underline: #fff;
  }
</style>
