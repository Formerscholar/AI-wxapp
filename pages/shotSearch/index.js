import { getsubject, gettextbook } from '../../request/Wrongtopicbook'
import { besaUrl } from '../../request/url'

Page({
  data: {
    TabCur: 0,
    token: '',
    topbarList: [],
    bookList: [],
    subject_id: '',
    radio: '',
    columns: [],
    ispicker: false,
    nowPage: '1',
    token: '',
    bookname: '',
    subject_name: '',
    textbook_id: '',
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        console.log('token', data)
        this.setData({
          token: data,
        })
        this.getsubjectList()
      },
    })
  },
  async getsubjectList() {
    const { data } = await getsubject()
    console.log('getsubject', data)
    this.setData({
      topbarList: data,
      TabCur: data[0].id,
      subject_name: data[0].title,
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
    let arr = []
    for (let index = 0; index < data[0].tpage * 1; index++) {
      arr.push(`第${index + 1}页`)
    }
    console.log('gettextbook', data)
    this.setData({
      bookList: data,
      radio: data[0].id,
      columns: arr,
      bookname: data[0].textbook_name,
      textbook_id: data[0].textbook_id,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      subject_name: e.currentTarget.dataset.title,
      nowPage: '1',
    })
    this.gettextbookList()
  },
  onClick(event) {
    const { name, page, bookname, textbook } = event.currentTarget.dataset
    console.log(name, page, bookname, textbook)
    let arr = []
    for (let index = 0; index < page * 1; index++) {
      arr.push(`第${index + 1}页`)
    }
    this.setData({
      radio: name,
      columns: arr,
      textbook_id: textbook,
      bookname,
    })
  },
  pickerOnChange(event) {
    const { value, index } = event.detail
    console.log(`当前值：${value}, 当前索引：${index}`)
    this.setData({
      nowPage: index + 1,
    })
    this.pickercancel()
  },
  pickercancel() {
    this.setData({
      ispicker: false,
    })
  },
  showPicker(e) {
    this.setData({
      ispicker: true,
    })
  },
  uploadImg(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success: ({ tempFiles }) => {
        wx.uploadFile({
          url: besaUrl + '/main/upload_pic',
          filePath: tempFiles[0].path,
          name: 'file',
          formData: {
            token: this.data.token,
            path: 'search',
          },
          success: ({ data }) => {
            wx.navigateTo({
              url: `/pages/search_pic/index?pic=${data}&textbook_id=${this.data.textbook_id}&choosePage=${this.data.nowPage}&title=${this.data.bookname}&subject_name=${this.data.subject_name}`,
            })
          },
        })
      },
    })
  },
})
