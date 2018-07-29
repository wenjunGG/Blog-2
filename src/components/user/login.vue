<template>
  <div class="login-wrapper">
    <bgCanvas></bgCanvas>
    <div class="login">
      <h1>Welcome</h1>
      <p> <span>账户</span><input class="username" type="text"></p>
      <p> <span>密码</span><input class="password" type="password"></p>
      <p><input type="button" class="submit" value="登录"></p>
      <p class="result">请稍后</p>
    </div>
  </div>
</template>
<script>
import bgCanvas from '../mods/bgCanvas'
export default {
  name: 'login',
  components: {
    bgCanvas
  }
}
</script>
<style>
.login-wrapper{
  display:flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;
  background-color: #15A085;
  z-index: 999;
}
.login-wrapper .login{
  position: relative;
  margin:auto;
  width: 4rem;
  height:3rem;
  background-color: #B6DEF7;
  border-radius:.1rem;
  font-size: .14rem;
  z-index: 3;
  overflow: hidden;
}
.login-wrapper .login h1{
  height: .45rem;
  line-height: .45rem;
  text-align: center;
  font-size: .22rem;
  color:#fff;
  background-color: #61B3E6 ;
}
.login-wrapper .login p{
  margin: .25rem;
  height: .35rem;
  line-height: .35rem;
  text-align: center;
}
.login-wrapper .login p *{
  display: inline-block;
  padding: 0 .1rem;
  height: .3rem;
  line-height: .3rem;
  background-color: #F4F7F9;
  vertical-align: middle;
}
.login-wrapper .login p input{
  width: 1.5rem;
  border: none;
  outline:none;
  border-radius:0 .05rem 0.05rem 0 ;
}
.login-wrapper .login p span {
  width: .5rem;
  border-right: 1px solid #eee;
  border-radius:.05rem 0 0 0.05rem;
}
.login-wrapper .login p .submit {
  width: 2.4rem;
  border-radius:0.05rem ;
  cursor: pointer;
  letter-spacing: .15rem;
}
.login-wrapper .login p .submit:hover{
  background-color: #8BD4FA;
}
</style>
