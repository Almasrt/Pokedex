const app = Vue.createApp({
  data() {
      return {
        isLoading:0
      }
  },
  methods: {
    updateLoading(){
      this.isLoading = 1
    }
  }
})
  