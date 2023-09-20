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

            <div class="col my-auto" v-if="displayName"> Hi ! 歡迎  <span class="text-primary">  {{  displayName  }}</span>  
            
            {{ memberTypes }}
            </div>
            <div  class="col my-auto" v-else>  <span class="text-primary">您尚未登入 </span></div>

            <!-- 設定按鈕/下拉選單 -->
            <div class="dropdown dropstart">
              <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="bi bi-gear-fill " style="font-size: 1rem; color: rgb(255, 255, 255);"> 設定 </i>
              </button>
              <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">

                <li>
                  <router-link v-if="!displayName" to="/login" class="dropdown-item">
                    <div type="submit">登入</div>
                  </router-link>
                </li>

                <li >
                  <a v-if="displayName" class="dropdown-item" @click="removeToken">登出</a>
                </li>


                <li
                v-if="memberTypes === 'SELLER' || memberTypes === 'ADMIN' || memberTypes === 'ADMIN,SELLER' || memberTypes === 'ADMIN,SELLER,CUSTOMER' "
                ><a class="dropdown-item" href="#" @click="checkWhoYouAre" data-bs-target="#exampleModal" data-bs-toggle="modal">切換身分</a>
              </li>

                <!-- <li>{{ memberTypes }}</li> -->

                <!-- <li><a class="dropdown-item" href="#">會員資料管理</a></li> -->
                <li>
                  <router-link v-if="memberTypes === 'SELLER' || memberTypes === 'ADMIN' || memberTypes === 'SELLER,ADMIN' || memberTypes === 'ADMIN,SELLER,CUSTOMER' " to="/memberInfo" class="dropdown-item">
                    <div type="submit">會員資料管理</div>
                  </router-link>
                </li>

                <li>

                  <!-- <a class="dropdown-item" href="#">產品管理</a> -->
                  <div v-if="memberTypes === 'SELLER'" class="dropdown-item" @click="goToProductManage">
                    <div>產品管理</div>
                  </div>

                </li>
              </ul>
            </div>

          </div>



          <div class="d-flex flex-row align-items-center w-full">

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
  
              
            </form>
  
            <div class="btn btn-info w-25 mt-2">
              <router-link to="/shoppingCart" class="text-white">
                  我的購物車
              </router-link>
            </div>

          </div>

  
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">切換身份</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            目前為 {{ memberTypes }}
            <br>
            請確認，是否切換身分？
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">確定切換身份</button>
          </div>
        </div>
      </div>
    </div>

    </nav>

</template>
<script >
import { mapState, mapActions } from 'pinia'
import productStore from '../stores/productStore'
import memberStore from '../stores/memberStore'

export default {
  data() {
    return {
      selected: '',
      inputFromChild: '',
      value: '',
      }
  }, 
  created() {
  },
  mounted() { 
    this.getProductCategory()
    // this.getMember()  
    // const tokenNow = localStorage.getItem("shopCartToken");

    const tokenNow = this.tokenToComponent
    if (tokenNow) {
      this.getMember()  
    }
  },  
  computed: {
    ...mapState(productStore, ['options']),
    ...mapState(memberStore, ['displayName','memberTypes','tokenToComponent']),
  },
  methods: {
    ...mapActions(productStore, ['sendToParent', 'getProductCategory']),  
    ...mapActions(memberStore, ['getMember','goToProductManage']),    
    removeToken() {
      alert('您已成功登出')
      // localStorage.removeItem("shopCartToken");
      localStorage.clear();
      this.$router.push('/')
      location.reload()
    },
    goToProductManage() {
      console.log(tokenToComponent)
      console.log(this.memberTypes)
      this.$router.push('./productManage')
    },
    checkWhoYouAre() {
      if (memberTypes === "") {
        this.$router.push('/')
      } 
    }


  },
}

</script>

<style scoped>
.logo {
  width: 100px;
  height: 100px;
}
</style>
