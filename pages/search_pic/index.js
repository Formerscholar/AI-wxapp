import { getSearchExercises } from '../../request/home'

Page({
  data: {
    token: '',
    pic_data: '',
    textbook_id: '',
    choosePage: '',
    subject_name: '',
    title: '',
  },
  onLoad: function (options) {
    console.log(options)
    const { pic, textbook_id, choosePage, subject_name, title } = options
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        this.setData({
          token: data,
          pic_data: pic,
          textbook_id,
          choosePage,
          subject_name,
          title,
        })
        this.getSearchExerciseData()
      },
    })
  },
  async getSearchExerciseData() {
    const { data } = await getSearchExercises({
      textbook_id: this.data.textbook_id,
      page: `第${this.data.choosePage}页`,
      pic: this.data.pic_data,
      token: this.data.token,
    })
    console.log('getSearchExerciseData', data)
    wx.navigateTo({
      url: '/pages/TeachDetails/index',
      success: (res) => {
        res.eventChannel.emit('info', {
          title: {
            category: this.data.subject_name,
            bookname: this.data.title,
            textbook_id: this.data.textbook_id,
            page: `第${this.data.choosePage}页`,
            pic: this.data.pic_data,
          },
          data,
        })
      },
    })
  },
  closeClick(e) {
    wx.redirectTo({
      url: '/pages/shotSearch/index',
    })
  },
})
