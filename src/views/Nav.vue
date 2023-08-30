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

            <div class="dropdown">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-gear-fill " style="font-size: 1rem; color: rgb(255, 255, 255);"> 設定 </i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li>
                
                  <router-link v-if="!displayName" to="/login" class="dropdown-item">
                    <div type="submit">登入</div>
                  </router-link>
                
                </li>
                <li><a class="dropdown-item" @click="removeToken">登出</a></li>
                <li><a class="dropdown-item" href="#">Something else here</a></li>
              </ul>
            </div>

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
              class="btn btn-outline-success w-75 mx-2" 
              type="submit" 
              @click.prevent="sendToParent(this.inputFromChild, this.value)"
              >
              搜索
            </button>

            <router-link  class=" w-100" to="/shoppingCart">
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

    const tokenNow = localStorage.getItem("shopCartToken");
    if (tokenNow) {
      this.getMember()  
    }
  },  
  computed: {
    ...mapState(productStore, ['options']),
  },
  methods: {
    ...mapActions(productStore, ['sendToParent', 'getProductCategory']),    
    removeToken() {
      alert('您已成功登出')
      // localStorage.removeItem("shopCartToken");
      localStorage.clear();
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
