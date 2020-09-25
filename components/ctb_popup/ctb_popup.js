Component({
  properties: {
    popupshow: {
      type: Boolean,
      value: false,
    },
    left_img: {
      type: String,
      value: '',
    },
    left_text: {
      type: String,
      value: '',
    },
    right_img: {
      type: String,
      value: '',
    },
    right_text: {
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
