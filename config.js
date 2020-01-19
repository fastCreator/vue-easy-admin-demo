import vueElementUiExpand from '../vue-element-ui-expand'

export default {
  init ({ Vue, router, store, Element, nav, request }) {
    //修改菜单
    nav[0].icon = 'XXXXX'
    //添加组件库
    Vue.use(vueElementUiExpand)
  },
  iass: {
    language: {
      defalut: 'en',
      list: [
        {
          label: '中文',
          value: 'zh-CN'
        },
        {
          label: 'English',
          value: 'en'
        }
      ]
    },
    request: {
      format: {
        codeKey: 'code',
        successCode: 200,
        msgKey: 'message',
        dataKey: 'data'
      },
      error: {
        time: 5000,
        message: {
          en: 'Network exception, please try again later',
          'zh-CN': '网络异常，请稍候再试'
        }
      },
      baseURL: {
        dev: '/',
        build: '/'
      },
      config: {
        timeout: 1000
      }
    },
    store: {
      globData: {
        setting: {
          logo: true,
          fixedHeader: true,
          tagView: true,
          theme: '',
          show: true
        }
      }
    },
    router: {
      nProgress: { showSpinner: false },
      indexPage () {
        return '/pages/user-info'
      }
    }
  },
  sass: {
    nav: {},
    permission: {
      async getUserInfo () {
        // return request.get('/userInfo').then(d => d.data)
        return { name: '张三' }
      },
      async getPermission () {
        // return request.get('/permission').then(d => d.data)
        return []
      },
      whitePages: ['full/401'],
      loginUrl: '/full/login',
      headerKey: 'token',
      token: {
        refresh () {
          return Promise.resolve('XXXXXX')
          // return request.get('/resetToken').then(d => d.code)
        },
        get () {
          return localStorage.token
        },
        set (token) {
          return (localStorage.token = token)
        },
        remove () {
          localStorage.removeItem('token')
        },
        overCode: 4001,
        overMsg: {
          en:
            'You have signed out, you can cancel to stay on this page, or confirm to sign in again',
          'zh-CN': '您已注销，您可以取消以停留在此页，或确定重新登录'
        }
      }
    },
    loading: {}
  }
}
