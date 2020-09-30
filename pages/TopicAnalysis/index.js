import { getExerciseAnalysis } from '../../request/home'

Page({
  data: {
    iid: '',
    TitleDetails: {},
  },

  onLoad: function (options) {
    const { iid } = options
    this.setData({
      iid,
    })
    this.getExerciseAnaly()
  },
  async getExerciseAnaly() {
    const { data } = await getExerciseAnalysis({
      id: this.data.iid,
    })
    console.log('getExerciseAnalysis', data)
    this.setData({
      TitleDetails: data,
    })
  },
})
