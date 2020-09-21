import Store from 'wxministore'
import bus from 'iny-bus'
// 全局状态+方法
let store = new Store({
  state: {
    msg: '这是一个全局状态',
    user: {
      name: '李四',
    },
  },
  methods: {
    sayHello() {
      console.log('hello')
    },
  },
})

App({
  store,
  bus,
  onLaunch: function (options) {},
  onShow: function (options) {},
  onHide: function () {},
  onError: function (msg) {},
  onPageNotFound: function (options) {},
})
