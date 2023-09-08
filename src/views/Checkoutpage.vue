<template>

    <div class="container ShoppingCart">
        <h2 class="text-primary">明細確認</h2>
        

        <!-- Loading -->
        <div  v-if="isLoading" class="d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="p-2">
                加載中...
            </div>
        </div>
        
        <div v-if="!checkoutList.length"> 購物車沒有任何品項 </div>
        <table v-else class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <!-- <th></th> -->
                    <th scope="col">產品照片</th>
                    <th scope="col">產品名稱</th>
                    <th scope="col">數量</th>
                    <th scope="col">價格</th>
                    <th scope="col">小計</th>
                </tr>
            </thead>
                
            <tbody v-for="(item, i) in checkoutList" :key="item.id">

                <tr >
                    <th scope="row" > {{ i + 1 }}</th>
                    <td>
                        <img 

                        :src="item.productDto.mainProductImgDisplayUrl" alt="productIMG">
                    </td>
                    <td  class="col-3"> {{ item.productDto.productName }} <br/> 
                        <span class="productId-size">{{  item.productDto.id }}</span>
                    </td>
                    
                    <td >
                        <div class="d-flex flex-row gap-2">
                            <label for="howManyProduct">
                                <input disabled class="howManyProductStyle text-center" id="howManyProduct" :value="item.selectProductAmount" type="text" min="0" />
                            </label>
                        </div>
                    </td>
                    <td> NT.{{ item.productDto.price }}</td>
                    <td> NT.{{ item.productDto.price *  item.selectProductAmount }}</td>
                </tr>

            </tbody>
                
      

            <div class="footer justify-content-center gap-4">
                <div class="mt-3 col-2">
                    總金額 $ {{ sumCount }}
                </div>

                <router-link to="/shoppingCart" class="btn btn-danger rounded-5 col-2 mt-3">
                    <div type="button" class="p-0">上一頁</div>
                </router-link>

                <!-- <router-link to="/success" class="btn btn-success rounded-5 col-2 mt-3">
                </router-link> -->
                <div class="btn btn-success rounded-5 col-2 mt-3" @click="goToCheckOutResult(addressee,phone,address,howToPay,useCard,mail)">
                    確認結帳
                </div>
            </div>


        </table>

    <form class="container row g-3">
        <div class="col-md-6">
            <label for="inputEmail4" class="form-label">收件人</label>
            <input type="text" class="form-control" id="inputEmail4" v-model="addressee">
        </div>

        <div class="col-md-6">
            <label for="inputPassword4" class="form-label">連絡電話</label>
            <input type="tel" class="form-control" id="inputPassword4" v-model="phone">
        </div>

        <div class="col-12">
            <label for="inputAddress" class="form-label">收件地址</label>
            <input type="text" class="form-control" id="inputAddress" placeholder="縣市/區域/路/號/樓層" v-model="address">
        </div>

        <div class="col-md-6">
            <label for="inputCity" class="form-label">付款方式</label>
            <input type="text" placeholder="1=信用卡 2=貨到付款" class="form-control" id="inputCity" v-model="howToPay">
        </div>

        <div class="col-md-6">
            <label for="inputState" class="form-label">信用/金融卡</label>
            <select id="inputState" class="form-select" v-model="useCard">
                <option selected>Choose...</option>
                <option>信用卡</option>
                <option>金融卡</option>
            </select>
        </div>

        <div class="col-12">
            <label for="inputAddress2" class="form-label">郵件信箱</label>
            <input type="text" class="form-control" id="inputAddress2" placeholder="Sample@sample.com" 
            v-model="mail">
        </div>
    </form>

                


    </div>

</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../stores/cartStore.js'



export default {
    data() {
        return {
            addressee: '',
            phone: '',
            address: '',
            howToPay: '',
            useCard: '',
            mail:''
        }
    },
    created() {
    },
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(cartStore, ['checkoutList','sumCount','isLoading']),
    },
    methods: {
        ...mapActions(cartStore, [ 'goToCheckOutResult']),
        // checkoutPageDetail(ids) {
        //     console.log(ids)
        //     // console.log(checkoutList)
        //     // let checkOutPersonInfoDto = {
        //     //     checkOutPersonInfoDto: {
        //     //         receivedPersonName: this.addressee,
        //     //         receivedPhone: this.phone,
        //     //         receivedAddress: this.address,
        //     //         // payType: this.howToPay,
        //     //         // creditCardNumber: this.useCard,
        //     //         receivedEmail:this.mail,
        //     //     },
        //     //     shoppingCartIdList:[]
        //     // }

        //     // const tokenNow = localStorage.getItem("shopCartToken");

        //     // axios.post("https://tom-store-api.onrender.com/tom-store-api/orderSettlement", checkOutPersonInfoDto, {
        //     //     headers: {
        //     //     'Accept': 'application/json',
        //     //     'Content-Type': 'application/json',
        //     //     'authorization': "Bearer " + tokenNow
        //     //     }
        //     // })
        //     // .then(response => {
        //     //     // const data = response.data;
        //     //     console.log(response);
        //     //     // this.memberData = data.data
        //     //     // // 在这里设置您的变量，如下所示
        //     //     // this.birthday = data.data.birthday
        //     //     // this.country = data.data.country
        //     //     // this.displayName = data.data.displayName;
        //     //     // this.gender = data.data.gender;
        //     //     // this.memberTypes = data.data.memberTypes;
        //     //     // this.note = data.data.note;
        //     //     // this.account = data.data.email;
        //     //     })
        //     //     .catch(error => {
        //     //     console.error("请求出错：", error);
        //     //     alert(error.response.data.rm)
        //     // });
        // }
    }
};

</script>

<style scoped>

img{
    width: 100px;
    height: 100px;
}
.delete, .number-button{
    cursor: pointer;
}
.howManyProductStyle{
    width: 3vw;
}
.productId-size{
    font-size: 5px;
}
.footer {
  position: fixed;
  bottom: 0;
  right: 0;
  padding: 2em;
  width: 100%;
  background-color: rgb(223, 223, 223);
  margin-left: auto;
  display: flex;
}

form {
    margin-bottom: 200px;
}
</style>