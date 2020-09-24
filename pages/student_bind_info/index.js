import {
  location_list,
  getGrade,
  school_list,
  bind_info,
} from '../../request/login'
const app = getApp()

Page({
  data: {
    name: '',
    gradeId: '',
    province: '',
    city: '',
    area: '',
    school: '',
    grade: '',
    Areacolumns: [],
    citycolumns: [],
    lastcolumns: [],
    gradecolumns: [],
    schoolcolumns: [],
    Arealist: [],
    citylist: [],
    lastlist: [],
    grade_list: [],
    school_list: [],
    isschool: false,
    isArea: false,
    isCity: false,
    isLast: false,
    isgrade: false,
    province_id: '',
    city_id: '',
    area_id: '',
    grade_id: '',
    Scholl_id: '',
    token: '',
  },
  onSchollClick() {
    this.setData({
      isschool: true,
    })
  },
  onschoolCancel() {
    this.setData({
      isschool: false,
    })
  },
  gradeClick() {
    this.setData({
      isgrade: true,
    })
  },
  ongradeCancel() {
    this.setData({
      isgrade: false,
    })
  },
  onbindInfo(e) {
    console.log(e)
    wx.getStorage({
      key: 'userInfo',
      success: async (data) => {
        const res = await bind_info({
          province_id: this.data.province_id,
          city_id: this.data.city_id,
          area_id: this.data.area_id,
          grade_ids: this.data.grade_id,
          school_id: this.data.Scholl_id,
          true_name: this.data.name,
          parent_mobile: null,
          email: null,
          token: this.data.token,
          user_id: data.data.user_id,
        })
        console.log('bind_info', res)
        if (res.code == 200) {
          wx.setStorage({
            key: 'userInfo',
            data: res.data,
            success: () => {
              console.log('跳转学生首页')
              wx.reLaunch({
                url: '/pages/home/index',
              })
            },
          })
        }
      },
    })
  },
  onschoolConfirm(e) {
    const { detail } = e
    console.log(detail)
    this.setData({
      school: detail.value,
    })
    this.data.school_list.forEach((item, index) => {
      if (index == detail.index) {
        this.setData({
          Scholl_id: item.id,
        })
      }
    })
    console.log(this.data.Scholl_id)
    this.onschoolCancel()
  },
  ongradeConfirm(e) {
    const { detail } = e
    console.log(detail)
    this.setData({
      grade: detail.value,
    })
    this.data.grade_list.forEach((item, index) => {
      if (index == detail.index) {
        this.setData({
          grade_id: item.grade_id,
        })
      }
    })
    console.log(this.data.grade_id)
    this.ongradeCancel()
  },
  async getlocation_list() {
    const { data } = await location_list({
      token: this.data.token,
    })
    let arr = []
    data[0].map((item) => {
      arr.push(Object.values(item)[1])
    })
    let arr1 = []
    data[1].map((item) => {
      arr1.push(Object.values(item)[1])
    })
    let arr2 = []
    data[2].map((item) => {
      arr2.push(Object.values(item)[1])
    })
    this.setData({
      Areacolumns: arr,
      citycolumns: arr1,
      lastcolumns: arr2,
      Arealist: data[0],
      citylist: data[1],
      lastlist: data[2],
    })
  },
  async getGradeList() {
    const { data } = await getGrade({
      token: this.data.token,
    })
    let arr = data.grade_list.map((item) => item.name)
    this.setData({
      gradecolumns: arr,
      grade_list: data.grade_list,
    })
  },
  onAreaClick(e) {
    console.log(e)
    this.setData({
      isArea: true,
    })
  },
  onLoad: function (options) {
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        console.log('token', data)
        this.setData({
          token: data,
        })
        this.getlocation_list()
        this.getGradeList()
      },
    })
  },
  onAreaCancel() {
    this.setData({
      isArea: false,
    })
  },
  onCityCancel() {
    this.setData({
      isCity: false,
    })
  },
  onAreaConfirm(e) {
    const { detail } = e
    console.log(detail)
    this.setData({
      province: detail.value,
    })
    this.data.Arealist.forEach((item, index) => {
      if (index == detail.index) {
        this.setData({
          province_id: item.value,
        })
      }
    })

    let arr = []
    let arrList = []
    this.data.citylist.map((item) => {
      if (item.parent_id == this.data.province_id) {
        arrList.push(item)
        arr.push(item.name)
      }
    })
    this.setData({
      citycolumns: arr,
      citylist: arrList,
    })
    this.onAreaCancel()
  },
  onCityClick(e) {
    console.log(e)
    this.setData({
      isCity: true,
    })
  },
  onLastClick(e) {
    console.log(e)
    this.setData({
      isLast: true,
    })
  },
  onCityConfirm(e) {
    const { detail } = e
    console.log(detail)
    this.setData({
      city: detail.value,
    })
    this.data.citylist.map((item, index) => {
      if (index == detail.index) {
        this.setData({
          city_id: item.value,
        })
      }
    })

    let arr = []
    let arrList = []
    this.data.lastlist.map((item) => {
      if (item.parent_id == this.data.city_id) {
        arrList.push(item)
        arr.push(item.name)
      }
    })
    this.setData({
      Lastcolumns: arr,
      lastlist: arrList,
    })
    this.onCityCancel()
  },
  onLastCancel() {
    this.setData({
      isLast: false,
    })
  },
  async onLastConfirm(e) {
    const { detail } = e
    console.log(detail)
    this.setData({
      area: detail.value,
    })

    this.data.lastlist.map((item, index) => {
      if (index == detail.index) {
        this.setData({
          area_id: item.value,
        })
      }
    })

    const { data } = await school_list({
      province_id: this.data.province_id,
      city_id: this.data.city_id,
      area_id: this.data.area_id,
      token: this.data.token,
    })
    console.log('school_list', data)
    let arr = data.map((item) => item.name)
    this.setData({
      schoolcolumns: arr,
      school_list: data,
    })
    this.onLastCancel()
  },
})
