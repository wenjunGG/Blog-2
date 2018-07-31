export default {
  updateUser (state, username, admin) {
    state.userInfo.username = username
    state.userInfo.admin = admin
    state.userInfo.isLogin = true
  },
  clearUser (state) {
    state.userInfo.username = ''
    state.userInfo.admin = 0
    state.userInfo.isLogin = false
  }
}
