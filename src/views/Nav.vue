<template>

    <nav class="navbar navbar-light bg-light r ">
    <div class="container-fluid">
      <div class="logo border rounded-circle d-flex align-items-center justify-content-center">
        <router-link to="/">
           <a class="navbar-brand mx-auto">LOGO</a>
        </router-link>
       
      </div>

        <div>
          <div class="d-flex flex-row ">

            <div class="col my-auto" v-if="displayName"> Hi ! 歡迎  <span class="text-primary">{{  displayName  }}</span>  </div>

            <router-link to="/login"  class="btn btn-success rounded-5 col-2">
              <div type="submit">登入</div>
            </router-link>

            <div class="btn btn-dark rounded-5 mx-2 col-2" type="submit" @click="removeToken">登出</div>

          </div>

          <form class="d-flex flex-row align-items-center mt-2">

            <input class="form-control w-100" type="text" aria-label="Search" 
            v-model="inputFromChild"
            >
           
            <el-select v-model="value" class="m-2 w-100" placeholder="商品類別" size="large"
            >
              <el-option value="請選擇" disabled/>
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
              @click.prevent="sendToParent(this.inputFromChild, this.value)"
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
import { mapState, mapActions } from 'pinia'
import productStore from '../stores/productStore'



export default {
  data() {
    return {
      selected: '',
      inputFromChild: '',
      value: '',
      displayName:''
      }
  }, 
  created() {
  },
  mounted() { 
    this.getProductCategory()
    this.getMember()  
  },  
  computed: {
    ...mapState(productStore, ['options']),
  },
  methods: {
    ...mapActions(productStore, ['sendToParent', 'getProductCategory']),    
    removeToken() {
      alert('您已成功登出')
      localStorage.removeItem("shopCartToken");
      this.$router.push('/')
      location.reload()
    },
     getMember() {
         
      const tokenNow = localStorage.getItem("shopCartToken");

      fetch("https://tom-store-api.onrender.com/tom-store-api/member", {
          method: "GET",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'authorization': "Bearer" + " " + tokenNow 
          },
      })
      .then(response => response.json())
      .then(data => {
        this.displayName = data.data.displayName
      })

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
