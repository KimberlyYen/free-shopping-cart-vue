<template>

    <nav class="navbar navbar-light bg-light r ">
    <div class="container-fluid">
      <div class="logo border rounded-circle d-flex align-items-center justify-content-center">
        <router-link to="/">
           <a class="navbar-brand mx-auto">LOGO</a>
        </router-link>
       
      </div>

        <div>
          <div>
            <button class="btn btn-success rounded-5" type="submit">登入</button>
            <button class="btn btn-success rounded-5" type="submit">註冊</button>
          </div>

          <form class="d-flex flex-row align-items-center mt-2">

            <input class="form-control w-100" type="text" aria-label="Search" v-model="text">

            <el-select v-model="value" class="m-2" placeholder="Select" size="large">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <button class="btn btn-outline-success w-50 mx-2" type="submit" @click.prevent="returnValue">搜索</button>
            <router-link  class=" w-75" to="/shoppingCart">
              <button class="btn btn-info " type="updateLocation">我的購物車</button>
            </router-link>
          </form>
  
        </div>
    </div>
    </nav>

</template>

<script >
import { inject } from "vue";


export default {
  data() {
    
    return {
      old:'',
      text:'',
      message:'',
      posts:[],
      }
  }, 
  methods: {
    returnValue() { 
  const {location, updateLocation} = inject('location')

      // console.log('search')
      // this.old = this.text

      // console.log(this.old)
      // console.log(this.text)

      // return this.old
          // 拿到值
            // let searchValue = this.searchVal
            // console.log(searchValue,'Nav')
        // console.log(typeof searchValue)
          // this.$emit('update',searchValue)
    },
    getSearchVal() {
      // console.log('setup')
      // console.log(this.text, 'setup')

      console.log('getSearchVal')
      // 取得 provide 的值
      const data = inject("data")
      console.log(data.id)

      // console.log(this.old ,'還沒給')
      // 把值給到全域變數 watch
      data.id = this.old
   

      // console.log(this.old, '給與global')
      // console.log(data.id)
      
      // data.id = this.searchVal

      // console.log(this.searchVal)
        // return data.id
    },
  },
  watch: {  
    // 'data.id'(newValue){ 
    //   newValue = this.text
    // }
  },
  mounted() {
    this.getSearchVal()
    this.created()
  }
}

</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
</style>
