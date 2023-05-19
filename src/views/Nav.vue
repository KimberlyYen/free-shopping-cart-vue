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
            <router-link to="/login">
              <button class="btn btn-success rounded-5" type="submit">登入</button>
            </router-link>
            <button class="btn btn-success rounded-5" type="submit">註冊</button>
          </div>

          <form class="d-flex flex-row align-items-center mt-2">

            <input class="form-control w-100" type="text" aria-label="Search" 
            v-model="inputFromChild"
            >
           
            <el-select v-model="value" class="m-2 w-100" placeholder="商品類別" size="large"
            >
              <el-option value="請選擇"/>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

            <button 
              class="btn btn-outline-success w-50 mx-2" 
              type="submit" 
              @click.prevent="sendToParent"
              >
              搜索
            </button>

            <router-link  class=" w-75" to="/shoppingCart">
              <button class="btn btn-info " type="updateLocation">我的購物車</button>
            </router-link>
          </form>
  
        </div>
    </div>
    </nav>

</template>
<script >

export default {
  data() {
    return {
      options: [],
      selected: '',
      inputFromChild: '',
      value:'',
      }
  }, 
  mounted() { 
    this.getProductCategory()
  },  
  methods: {
    getProductCategory() {

      fetch("https://tom-store-api.onrender.com/tom-store-api/productCategory/ALL", {
          method: "GET",
      })
      .then(response => response.json())
      .then(data => {

        let list = data.data.productCategoryDtoList
      
        list.forEach((item) => { 
          let obj = {}
          obj.label = item.note
          obj.key = item.note
          obj.value = item.id

          this.options.push(obj)          
        })

      })
    },
    sendToParent() {
      // NAV 拿到值
      // 點擊搜尋按鈕傳值
      let Array = []
      let searchVal = this.inputFromChild
      let elSelected = this.value

      Array.push({ searchKey: searchVal }, { elSelected:elSelected })
      console.log(Array)
      this.$emit('value-update', Array)

    },

  },
}

</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
</style>
