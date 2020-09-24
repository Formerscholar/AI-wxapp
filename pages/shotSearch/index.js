import { getsubject, gettextbook } from '../../request/Wrongtopicbook'

Page({
  data: {
    TabCur: 0,
    token: '',
    topbarList: [],
    bookList: [],
    subject_id: '',
    radio: ['1', '2', '3'],
    radioClick:'1'
  },
  onLoad: function (options) {
    this.getsubjectList()
  },
  async getsubjectList() {
    const { data } = await getsubject()
    console.log('getsubject', data)
    this.setData({
      topbarList: data,
      TabCur: data[0].id,
    })
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        this.setData({
          token: data,
        })
        this.gettextbookList()
      },
    })
  },
  async gettextbookList() {
    const { data } = await gettextbook({
      token: this.data.token,
      type: 4,
      subject_id: this.data.TabCur,
      page: 1,
      page_size: 10,
    })
    console.log('gettextbook', data)
    this.setData({
      bookList: data,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
  onChange(event) {
    this.setData({
      radioClick: event.detail,
    });
  },
})
