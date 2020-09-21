Page({
  data: {
    choose_index: 0,
    tabbar: {
      color: '#999999',
      selectedColor: '#ff2d4a',
      borderStyle: '#dcdcdc',
      backgroundColor: '#ffffff',
      list: [
        {
          key: 'home',
          iconPath: '/assets/image/home.png',
          selectedIconPath: '/assets/image/home-o.png',
          text: '首页',
        },
        {
          key: 'tag',
          iconPath: '/assets/image/category.png',
          selectedIconPath: '/assets/image/category-o.png',
          text: '分类',
        },
        // {
        //   key: 'new',
        //   iconPath: '/assets/image/icon_plus_big.png',
        //   iconType: 'big overflow circle shadow',
        //   choose: 'disable',
        // },
        {
          key: 'notebook',
          iconPath: '/assets/image/cart.png',
          selectedIconPath: '/assets/image/cart-o.png',
          text: '购物车',
        },
        {
          key: 'me',
          iconPath: '/assets/image/my.png',
          selectedIconPath: '/assets/image/my-o.png',
          text: '我的',
        },
      ],
    },
  },
  tabChange: function (e) {
    var key = e.detail.key
    if (key == 'new') {
      wx.navigateTo({
        url: '/pages/pay/index',
      })
    } else {
      this.setData({
        choose_index: e.detail.index,
      })
    }
  },
})
