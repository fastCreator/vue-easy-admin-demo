import vueElementUiExpand from '../../vue-element-ui-expand'

export const userManage = {
  headerKey: 'token',
  get () {
    return localStorage.token
  },
  set (token) {
    return (localStorage.token = token)
  },
  removeToken () {
    localStorage.removeItem('token')
  },
  resetToken (request) {
    return request.get('/resetToken').then(d => d.code)
  },
  loginUrl: '/full/login',
  getUserInfo (request) {
    // return request.get('/userInfo').then(d => d.data)
    return Promise.resolve({ name: '张三' })
  },
  whitePermission: ['1XXXXXXX'],
  getPermission (request) {
    // return request.get('/permission').then(d => d.data)
    return Promise.resolve([])
  },
  goHome () {
    return '/pages/user-info'
  }
}

export const init = async ({ Vue, router, store, nav, request }) => {
  //修改菜单
  nav[0].title = '修改菜单'
  //添加组件库
  Vue.use(vueElementUiExpand)
}
