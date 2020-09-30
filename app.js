import Store from 'wxministore'
import bus from 'iny-bus'
let store = new Store({
  state: {
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
