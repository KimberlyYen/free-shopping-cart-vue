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
      value:'',
      }
  }, 
  mounted() { 
    this.getProductCategory()
  },  
  computed: {
        ...mapState(productStore, ['options']),
  },
  methods: {
    ...mapActions(productStore, ['sendToParent', 'getProductCategory']),      
  },
}

</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
</style>
