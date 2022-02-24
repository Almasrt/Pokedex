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
    updateDisplayToSearch(){
      this.dispSearch = true
    },
    updateDisplayToDefault(){
      this.dispSearch = false
    }
  }
})
  