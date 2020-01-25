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
      globData: {}
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
        return ['user-info']
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
    loading: {
      timeout: 4000 // 最长loading时长
    },
    theme: {
      defalut: 'blue',
      list: [
        {
          label: '蓝色主题',
          value: 'blue'
        },
        {
          label: '黄色主题',
          value: 'yellow'
        }
      ]
    },
    layout: {
      sidebar: {
        logo: {
          title: {
            en: 'VUE ADMIN',
            'zh-CN': '基础产品后台'
          },
          logo:
            'https://wpimg.wallstcn.com/69a1c46c-eb1c-4b46-8bd4-e9e686ef5251.png',
          link: '/',
          collapse: false,
          showLogo: true
        },
        menu: {}
      }
    }
  }
}
