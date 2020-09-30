import { joinErrorExercises, sameTypeExercises } from '../../request/home'

Page({
  data: {
    token: '',
    title_category: '',
    title_name: '',
    contentList: [],
    textbook_id: '',
    page: '',
    pic: '',
    popupshow: false,
    exercises_list: '',
    show_know_point: '',
    show_subject_id: '',
    show_exercises_id: '',
    show_page: '',
  },
  onLoad: function (options) {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('info', (data) => {
      console.log(data)
      const { category, bookname, textbook_id, page, pic } = data.title
      this.setData({
        title_category: category,
        title_name: bookname,
        contentList: data.data,
        textbook_id,
        page,
        pic,
      })
    })
    wx.getStorage({
      key: 'token',
      success: ({ data }) => {
        console.log('token', data)
        this.setData({
          token: data,
        })
      },
    })
  },
  async joinExercises(e) {
    console.log(e)
    const { iid, index } = e.currentTarget.dataset
    const { data } = await joinErrorExercises({
      token: this.data.token,
      exercises_id: iid,
    })
    console.log('joinErrorExercises', data.error_exercises_id)
    let isShow = 0
    if (data.error_exercises_id == undefined) {
      isShow = 0
    } else {
      isShow = 1
    }
    let arr = this.data.contentList
    arr[index].is_error = isShow
    this.setData({
      contentList: arr,
    })
  },
  async joinExercise(e) {
    console.log(e)
    const { iid, index } = e.currentTarget.dataset
    const { data } = await joinErrorExercises({
      token: this.data.token,
      exercises_id: iid,
      is_type: 1,
    })
    console.log('joinErrorExercises', data)
    let isShow = 0
    if (data.error_exercises_id == undefined) {
      isShow = 0
    } else {
      isShow = 1
    }
    let arr = this.data.exercises_list
    arr[index].is_error = isShow
    this.setData({
      exercises_list: arr,
    })
  },
  async showPopup(e) {
    console.log(e.currentTarget.dataset.item)
    const {
      know_point,
      subject_id,
      exercises_id,
      page,
    } = e.currentTarget.dataset.item
    sameTypeExercises
    const { data } = await sameTypeExercises({
      token: this.data.token,
      know_point,
      type: 4,
      subject_id,
      exercises_id,
      page,
      size: 5,
    })
    console.log('sameTypeExercises', data)
    const { exercises_list } = data
    this.setData({
      popupshow: true,
      exercises_list,
      show_know_point: know_point,
      show_subject_id: subject_id,
      show_exercises_id: exercises_id,
      show_page: page,
    })
  },
  onClose() {
    this.setData({ popupshow: false })
  },
  async refshList() {
    let page = this.data.show_page
    page++
    this.setData({
      show_page: page,
    })
    const { data } = await sameTypeExercises({
      token: this.data.token,
      know_point: this.data.show_know_point,
      type: 4,
      subject_id: this.data.show_subject_id,
      exercises_id: this.data.show_exercises_id,
      page,
      size: 5,
    })

    const { exercises_list } = data
    this.setData({
      exercises_list,
    })
  },
  onAnalysis(e) {
    const { iid } = e.currentTarget.dataset
    console.log(iid)
    wx.navigateTo({
      url: `/pages/TopicAnalysis/index?iid=${iid}`,
    })
  },
})
