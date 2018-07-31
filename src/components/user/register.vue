<template>
  <div class="register-wrapper">
    <div class="register">
      <header>
        <h1>欢迎注册</h1>
        <div>已有账号，请 <router-link to="/login">登录</router-link>或
          <router-link to="/">返回首页</router-link>
        </div>
      </header>
      <div>
        <span><i class="iconfont">&#xe602;</i></span>
        <input ref="iptname" type="text" placeholder="输入您的用户名" @focus="focus('name')" @blur="blur('name')">
        <div ref="name"></div>
      </div>
      <div>
        <span><i class="iconfont">&#xe655;</i></span>
        <input ref="iptnickname" type="text" placeholder="输入您的昵称" @focus="focus('nickname')" @blur="blur('nickname')">
        <div ref="nickname"></div>
      </div>
      <div>
        <span><i class="iconfont">&#xe603;</i></span>
        <input ref="iptpass1" type="password" placeholder="输入您的密码" @focus="focus('pass1')" @blur="blur('pass1')">
        <div ref="pass1"></div>
      </div>
      <div>
        <span><i class="iconfont">&#xe603;</i></span>
        <input ref="iptpass2" type="password" placeholder="再次输入您的密码" @focus="focus('pass2')" @blur="blurP2()">
        <div ref="pass2"></div>
      </div>
      <p><input type="button" class="submit" value="注册" @click="submit()"></p>
      <div class="result" ref="result"></div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import common from '../mods/common'
import crypto from 'crypto'
import handleSession from '../mods/handleSession'
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      regx: {
        name: /^\w{6,16}$/,
        pass1: /^\w{8,16}$/,
        nickname: /^[a-zA-Z0-9\u4e00-\u9fa5]{1,6}$/
      },
      tips: {
        name: '6-16位由字母、数字或下划线组成的字符串',
        pass1: '8-16位由字母、数字或下划线组成的字符串',
        pass2: '两次输入的密码需要一致',
        nickname: '1-6个汉字、数字、字母组成'
      },
      error: {
        name: '用户名格式不正确',
        pass1: '密码格式不正确',
        pass2: '两次输入的密码不一致',
        nickname: '昵称格式不对'
      },
      emptyErr: {
        name: '用户名不能为空',
        pass1: '密码不能为空',
        pass2: '请再次输入密码',
        nickname: '昵称不能为空'
      },
      right: '<i class="iconfont">&#xe652;</i>',
      isRight: {
        name: false,
        pass1: false,
        pass2: false,
        nickname: false
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateUser'
    ]),
    focus (str) {
      this.$refs[str].className = 'tips'
      this.$refs[str].innerHTML = this.tips[str]
    },
    blur (str) {
      this.isRight[str] = false
      this.$refs[str].className = ''
      this.$refs[str].innerHTML = ''
      let val = this.$refs['ipt' + str].value
      if (val) {
        if (this.regx[str].test(val)) {
          if (str === 'name') {
            this.$refs[str].className = 'error'
            this.$refs[str].innerHTML = '验证中...'
            axios.get('/user/username', {
              params: {
                user: val
              }
            })
              .then((response) => {
                if (response.data) {
                  this.$refs[str].className = 'right'
                  this.$refs[str].innerHTML = this.right
                  this.isRight[str] = true
                } else {
                  this.$refs[str].className = 'error'
                  this.$refs[str].innerHTML = '该用户名已被使用'
                  this.isRight[str] = false
                }
              })
              .catch((error) => {
                console.log(error)
              })
            return
          }
          this.$refs[str].className = 'right'
          this.$refs[str].innerHTML = this.right
          this.isRight[str] = true
        } else {
          this.$refs[str].className = 'error'
          this.$refs[str].innerHTML = this.error[str]
        }
        if (str === 'pass1') {
          let val2 = this.$refs.iptpass2
          if (val2) {
            this.blurP2()
          }
        }
      }
    },
    blurP2 () {
      this.isRight.pass2 = false
      this.$refs.pass2.className = ''
      this.$refs.pass2.innerHTML = ''
      let val1 = this.$refs.iptpass1.value
      let val2 = this.$refs.iptpass2.value
      if (val1 && val2) {
        if (val1 === val2) {
          this.$refs.pass2.className = 'right'
          this.$refs.pass2.innerHTML = this.right
          this.isRight.pass2 = true
        } else {
          this.$refs.pass2.className = 'error'
          this.$refs.pass2.innerHTML = this.error.pass2
        }
      }
    },
    submit () {
      this.$refs.result.innerHTML = '请稍后...'
      let flag = true
      for (let item in this.isRight) {
        if (this.isRight.hasOwnProperty(item)) {
          if (!this.isRight[item]) {
            flag = false
            break
          }
        }
      }
      if (flag) {
        let md5 = crypto.createHash('md5')
        let newpass = md5.update(this.$refs.iptpass1.value).digest('hex')
        let user = this.$refs.iptname.value
        axios.post('/user/register', {
          name: user,
          nickname: this.$refs.iptnickname.value,
          password: newpass
        })
          .then((response) => {
            if (response.data.isOk) {
              this.$refs.result.classList.remove('red')
              this.$refs.result.innerHTML = '注册成功，1秒后跳转首页。'
              handleSession.setSession('user', {user, admin: 0})
              this.updateUser(user, 0)
              common.turn('#/', 1000)
            } else {
              this.$refs.result.classList.add('red')
              this.$refs.result.innerHTML = response.data.msg
            }
          })
          .catch((error) => {
            console.log(error)
          })
      } else {
        this.$refs.result.classList.add('red')
        this.$refs.result.innerHTML = '请检查输入'
      }
    }
  },
  mounted () {
    let userInfo = handleSession.getSession('user')
    if (userInfo) {
      this.updateUser(userInfo.user, userInfo.admin)
      alert('您已经登录,不用再注册!')
      window.history.go(-1)
    }
  }
}
</script>
<style>
.register-wrapper{
  position: fixed;
  top: 0;
  left: 0;
  padding-top: .5rem;
  width: 100%;
  height: 100%;
  font-size: .14rem;
  background-color: #F5F5F6;
  z-index: 99;
}
.register-wrapper .register{
  position: relative;
  margin: auto;
  width: 10rem;
  height: 5.3rem;
  background-color: #fff;
}
.register-wrapper .register header{
  position: relative;
  padding: .25rem 0;
  height: .5rem;
}
.register-wrapper .register header h1{
  margin: auto;
  height: .5rem;
  line-height: .5rem;
  width: 3rem;
  text-align: center;
  line-height: .5rem;
  color: #00B7D3;
  font-size: .22rem;
  font-weight: 400;
}
.register-wrapper .register header div{
  position: absolute;
  top: .5rem;
  right: .2rem;
}
.register-wrapper .register header div a{
  margin: .05rem;
  color:#00B7D3;
}
.register-wrapper .register > div{
  position: relative;
  margin: .25rem  auto;
  height: .4rem;
  width: 3.2rem;
  text-align: center;
  font-size: 0;
}
.register-wrapper .register > div span,.register-wrapper .register > div input{
  display: inline-block;
  height: .4rem;
  line-height: .4rem;
  border: 1px solid #00B7D3;
  vertical-align: middle;
}
.register-wrapper .register > div span{
  width: .4rem;
  font-size: .18rem;
  color:#fff;
  background-color:#00B7D3;
}
.register-wrapper .register > div input {
  padding-left: .1rem;
  width: 2.5rem;
  font-size: .14rem;
  outline: none;
}
.register-wrapper .register > div div{
  position: absolute;
  top: 0;
}
.register-wrapper .register > div .tips {
  right: -1.75rem;
  padding: .1rem;
  width: 1.5rem;
  font-size: .12rem;
  border: 1px solid #4DBC60;
  border-radius:.05rem ;
  box-shadow:0 0 .01rem 0.01rem #eee ;
}
.register-wrapper .register > div .tips:before{
  content:'';
  position: absolute;
  top: .05rem;
  left: -.1rem;
  border-top:.1rem solid transparent;
  border-bottom:.1rem solid transparent;
  border-right:.1rem solid #4DBC60;
}
.register-wrapper .register > div .right {
  right: -.15rem;
  color:green;
  font-size: .28rem;
}
.register-wrapper .register > div .error {
  right: -1.55rem;
  width: 1.5rem;
  height: .35rem;
  line-height: .35rem;
  font-size: .14rem;
  text-align: left;
  color:red;
}
.register-wrapper .register > P {
  text-align: center;
}
.register-wrapper .register > P input{
  width: 2rem;
  height: .4rem;
  line-height: .4rem;
  background-color: #00B7D3;
  font-size: .2rem;
  color: #fff;
  border: none;
  outline: none;
  cursor: pointer;
  border-radius:.05rem;
}
.register-wrapper .register .result {
  width: 9rem;
  font-size: .16rem;
  color: green;
}
.register-wrapper .register .red{
  color: red;
}
</style>
