<template>

    <div class="container ShoppingCart">
        <h2>ShoppingCart</h2>

        <!-- Loading -->
        <div  v-if="isLoading" class="d-flex justify-content-center align-items-center">
            <div class="spinner-border" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <div class="p-2">
                加載中...
            </div>
        </div>
        
        <div v-if="!cartList.length"> 購物車沒有任何品項 {{ this.hasToken  }}</div>
        <table v-else class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th></th>
                        <th scope="col">產品照片</th>
                        <th scope="col">產品名稱</th>
                        <th scope="col">數量</th>
                        <th scope="col">價格</th>
                        <th scope="col">小計</th>
                        <th scope="col">刪除</th>
                    </tr>
                </thead>
                
                <tbody v-for="(item, i) in cartList" :key="item.id">

                    <tr >
                        <th scope="row" > {{ i + 1 }}</th>
                        <td width="10%"> 
                            <input type="checkbox" @change="handleCheckboxChange($event, item)">
                        </td>
                        <td>
                            <img 

                            :src="item.productDto.mainProductImgDisplayUrl" alt="productIMG">
                        </td>

                        <td  class="col-3"> {{ item.productDto.productName }} <br/> <span class="productId-size">id:{{  item.productDto.id }}</span></td>
                       
                        <td >
                            <div class="d-flex flex-row gap-2">
                                <div class="number-button bg-danger text-white col-2 text-center rounded"  @click="removeHowMany(item)">-</div>

                                <label for="howManyProduct">
                                    <input class="howManyProductStyle text-center" id="howManyProduct" :value="item.selectProductAmount" type="text" min="0" />
                                </label>

                                <div  class="number-button bg-success text-white col-2 text-center rounded" @click="addHowMany(item)">+</div>

                            </div>
                        </td>
                        <td> NT.{{ item.productDto.price }}</td>
                        <td> NT.{{ item.productDto.price *  item.selectProductAmount }}</td>
                        <td 
                        class="delete text-danger"
                        @click="removeCartItem(item.productDto.id, this.tokenToComponent)"> X </td>
                    </tr>

                </tbody>
                <tfoot>
                    <div class="mt-3">
                        總金額 $ {{ sumCount }}
                    </div>
                    <div class="btn btn-success rounded-5 col-6 mt-3">
                        <!-- <router-link to="/checkoutPage" >
                        </router-link> -->
                            <div @click="goToCheckoutPage">
                                結帳
                            </div>
                    </div>
                </tfoot>
        </table>

    </div>

</template>

<script>
import { mapActions, mapState } from 'pinia'
import cartStore from '../stores/cartStore.js'
import memberStore from '../stores/memberStore'


export default {
    data() {
        return {
            checked: [],
            checkedIds: [],
            hasToken:''
        }
    },
    created() {
        console.log(this.cartList)
        if (this.cartList) {
            this.getCartItem(this.tokenToComponent)
        }
    },
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(cartStore, ['cartList', 'count', 'sumCount', 'isLoading']),
        ...mapState(memberStore,['tokenToComponent']),  
        
    },
    methods: {
        ...mapActions(cartStore, ['removeCartItem', 'addToCartAPI', 'getCartItem','getProductToCheckout']),
        addHowMany(item) {
            item.selectProductAmount += 1;
            this.addToCartAPI(item.productDto.id, item.selectProductAmount)
        },
        removeHowMany(item) {
            if (item.selectProductAmount <= 0) {
                item.selectProductAmount = 0
            } else {
                item.selectProductAmount -= 1;
                this.addToCartAPI(item.productDto.id, item.selectProductAmount)
            }
            if (item.selectProductAmount === 0) {
                this.removeCartItem(item.productDto.id, item.selectProductAmount)
            }
        },
        handleCheckboxChange(event, item) {
            const isChecked = event.target.checked;
            // 在这里处理 checkbox 的变化逻辑
            // 可以根据需要访问 item 对象，它是当前循环项的引用

            //第一個參數為被選到的事件
            if (isChecked) {
            // Checkbox 被选中
                console.log('Checkbox被選中');  

                // item 商品 push 組合陣列，
                this.checked.push(item) 
                // 需要結帳的，商品購物車 id 
                this.checkedIds.push(item.id) 

                // 組合陣列 和 組合商品id , 帶到結帳頁面
                this.getProductToCheckout(this.checked, this.checkedIds)
            } else {
                // Checkbox 被取消选中
                console.log('Checkbox被取消选中');

                // 已經存在於陣列中，不重複添加
                // 刪除陣列中某個被指定下標的元素
                this.checked.splice(item, 1)
                // 需要結帳的，商品購物車 id 
                this.checkedIds.splice(item.id, 1) 
            }
        },
        goToCheckoutPage() {
            if (this.checked.length === 0) {
                alert('您尚未勾選商品')
            } else {
                this.$router.push('/checkoutPage')
            }
        }
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
a {
    color: white;
    text-decoration:none;
}
</style>