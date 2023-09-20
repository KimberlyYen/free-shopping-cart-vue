<template>


    <div class="container card mt-5">
        <div class="row p-5" >
            
            <div class="col ">
                <div >
                    <img :src="productDetail.mainProductImgDisplayUrl" alt="productIMG" class="picture">
                </div>
            </div>

            <div class="col">
                <div class="card-body">
                    <p class="text-primary text-opacity-25 fs-6">id: {{ productDetail.id }}</p>
                    <h5 class="card-title"> Title {{ productDetail.productName }}</h5>
                    <p class="card-text"> {{ productDetail.note }}</p>
                    <p>
                        NT. {{ productDetail.price }}
                    </p>
                    <div>加總 {{ total }} </div>
                </div>
                <div>
                    <input type="number" min="1" class="m-2" @keyup.enter="sum" @click="sum($event)" v-model.number="howMany"> {{ productDetail.remainingAmountUnit }}
                    <br>

                        <!-- <router-link to="/shoppingCart">
                        </router-link> -->
                        <div>
                            <a href="#" class="btn btn-primary" 
                            @click="addToCart(tokenToComponent,productDetail.id,this.howMany),checkToken(this)">加入購物車</a>
                        </div>

                </div>
            </div>

        </div>
    </div>


</template>

<script>
import { mapState, mapActions } from 'pinia'
import cartStore from '../stores/cartStore'
import memberStore from '../stores/memberStore'



export default {
    data() { 
        id: ""
        return {
            productDetail: {},
            hasToken: false,
            howMany:1,
            total: 0,
        }
    },
    created() {
        this.getUrlId()
    },
    mounted() {
    },
    computed: {
        // 1. Store
        // 2. 要帶入的 state, Getter
        ...mapState(cartStore, ['cart', 'totalProduct']),
        ...mapState(memberStore,['tokenToComponent']),  
        
    },
    methods: {
        ...mapActions(cartStore, ['addToCart', 'addToCartAPI']),  
        ...mapActions(memberStore,['checkToken']),  
        getUrlId() {
            let productId = this.$route.query.id

            fetch(`https://tom-store-api.onrender.com/tom-store-api/product/${productId}`)
            .then(response => response.json())
            .then(data => { 
                // console.log(data.data.productAmountDto.productDto)
                this.productDetail = data.data.productAmountDto.productDto
                }
            )
        },
        sum(event) {
            this.total = event.currentTarget.value * this.productDetail.price
        },
  
    },

}
</script>

<style scoped>
.picture {
    max-width: 50%;
}
</style>
