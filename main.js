const app = Vue.createApp({
  data() {
      return {
        isLoading:0,
        dispSearch: false
      }
  },
  methods: {
    updateLoading(){
      this.isLoading = 1
    },
    updateDisplay(){
      this.dispSearch = true
    }
  }
})
  