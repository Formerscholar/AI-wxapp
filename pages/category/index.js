import { getsubject } from '../../request/Wrongtopicbook'
Page({
  
  properties: {},

  data: {
    TabCur: 0,
    topbarList: [],
    active: 0,
    checked: true,
  },
  onLoad: function (options) {
    console.log(options);
    this.getsubjectList()
  },
  onChange(event) {
    this.setData({
      checked: event.detail,
    });
  },
  async getsubjectList() {
    const { data } = await getsubject()
    console.log('getsubject', data)
    this.setData({
      topbarList: data,
      TabCur: data[0].id,
    })
  },
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
    })
  },
})
