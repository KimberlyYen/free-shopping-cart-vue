<template>


    <div class="cards d-flex flex-column py-5">

        <div class="cardsInner w-50">


            <div class="card" v-for="p in productDetail">
                <div class="product-img">
                    <img :src="p.mainProductImgDisplayUrl" class="card-img-top w-full" alt="...">
                </div>
                <div class="card-body">
                    <p class="text-primary text-opacity-25 fs-6">id: {{ p.id }}</p>
                    <h5 class="card-title"> Title {{ p.productName }}</h5>
                    <p class="card-text"> {{ p.note }}</p>
                    <p>
                        NT. {{ p.price }}
                    </p>
                    <div>加總 {{ total }} </div>
                </div>
                <div>
                    <input type="number" class="m-2" @keyup.enter="sum" @click="sum($event)"> {{ p.remainingAmountUnit }}
                        <router-link to="/success">
                            <a href="#" class="btn btn-primary">加入購物車</a>
                        </router-link>
                </div>
            </div>
    

        </div>

    </div>



</template>

<script>
export default {
    data() { 
        id: ""
        return {
            total:0,
            productDetail:[],
    
        }
    },
    methods: {
        getUrlId() {
            // console.log(this.$route.query.id)
            // this.id = this.$route.query.id
            let productId = this.$route.query.id

            // console.log(productId)
            fetch(`https://tom-store-api.onrender.com/tom-store-api/product/${productId}`)
            .then(response => response.json())
            .then(data => { 
                // console.log(data.data.productDtoList, 'api productDtoList')
                this.productDetail = data.data.productDtoList
                }
            )
        },
        sum(event) {
            // console.log(event.currentTarget.value , 'value')
            // console.log(this.productDetail[0].price, 'price')
            this.total = event.currentTarget.value * this.productDetail[0].price
        }
    },
    created() {
    this.getUrlId()
  }
}
</script>

<style scoped>
.cards {
    display: flex;
    flex-wrap: wrap;
}
.cardsInner {
    margin-left: auto; 
    margin-right: auto; 
}
.product-img {
    display: block; /* ★★★★★ */
    max-width: 100%;
}
</style>
