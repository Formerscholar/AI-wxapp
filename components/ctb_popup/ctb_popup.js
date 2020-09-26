Component({
  properties: {
    popupshow: {
      type: Boolean,
      value: false,
    },
    leftImg: {
      type: String,
      value: '',
    },
    leftText: {
      type: String,
      value: '',
    },
    rightImg: {
      type: String,
      value: '',
    },
    rightText: {
      type: String,
      value: '',
    },
  },
  methods: {
    onClose() {
      this.triggerEvent('onClose')
    },
    onRefsh() {
      this.triggerEvent('onRefsh')
    },
    onCancel() {
      this.triggerEvent('onCancel')
    },
    onConfirme() {
      this.triggerEvent('onConfirme')
    },
  },
})
