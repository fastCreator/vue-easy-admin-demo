import vueElementUiExpand from '../../vue-element-ui-expand'
export default async ({ Vue, router, store, nav, api }) => {
  //请求用户信息
  let user = api.get('/userInfo').then(d => d.result)
  store.setUser(user)
  //修改菜单
  nav[0].title = '修改菜单'
  //添加组件库
  Vue.use(vueElementUiExpand)
}
