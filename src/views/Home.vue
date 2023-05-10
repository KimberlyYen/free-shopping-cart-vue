<template>

    <Nav @value-update="getValFromChild"/>

    <div class="carousel d-flex justify-content-center bg-black">
        <div id="carouselExampleIndicators" class="carousel slide " data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                <img src="https://picsum.photos/1200/300/?random=1" class="" alt="...">
                </div>
                <div class="carousel-item">
                <img src="https://picsum.photos/1200/300/?random=2" class="" alt="...">
                </div>
                <div class="carousel-item">
                <img src="https://picsum.photos/1200/300/?random=3" class="" alt="...">
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Next</span>
            </button>
        </div>
    </div>

    <div class="container cards grid py-5">
        <div class="w-full">


            <div class="row justify-content-center">
                <div class="card col-12 col-md-3 col-lg-2 m-1" v-for="(p, key) in posts" :key="p.id" style="width: 18rem;"
                @click="selectedProduct(p)">
                    <div>
                        熱門商品    
                    </div>
                    <div class="w-full">
                        <router-link :to="{path: '/product', query: {id:`${p.id}` }}">
                            <img  :src="p.mainProductImgDisplayUrl" class="card-img-top" alt="...">
                        </router-link>
                    </div>
        
                    <div class="card-body " >
                        <h5 class="card-title"> {{ key + 1 }} - {{p.productName}}</h5>
                        <p class="text-primary text-opacity-25 fs-6">id:{{ p.id }}</p>
                        <p class="card-text">NT. {{ p.price }}</p>
                        <p class="card-note">{{ p.note }}</p>
                        <router-link :to="{path: '/product', query: {id:`${p.id}` }}">
                            <a href="#" class="btn btn-primary">前往產品詳細</a>
                        </router-link>
                    </div>
        
                </div>  
            </div>

        </div>

        
            
    </div>

    <el-pagination class="justify-content-center py-5" background layout="prev, pager, next" :total="1000" />


</template>

<script>
import { ElButton } from 'element-plus'
import Nav from '../views/Nav.vue'

export default {
data(){
        return {
        inputValFromChild: "",
        posts: [],
    }
  },
    components: {
        ElButton,
        Nav,
    },
    methods: {
        getPosts() {     
            let fuzzy = this.inputValFromChild
            fetch("https://tom-store-api.onrender.com/tom-store-api/product/pagination", {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "pageNum": 1,
                    "pageSize": 10,
                    "fuzzyProductName": fuzzy,
                }),
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data.data)
                this.posts = data.data.productPageInfo.list
            })
        },
        getProductCategory() {
        fetch("https://tom-store-api.onrender.com/tom-store-api/productCategory/ALL", {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data.data)

            let list = data.data.productCategoryDtoList
        
            list.forEach((item, i) => { 
            let obj = {}
            obj.label = item.note
            obj.key = item.id
            obj.value = i

            this.options.push(obj)            
            })

        })
        },
        selectedProduct(product) {
            console.log(product)
        },
        getValFromChild(val) {
            this.inputValFromChild = val;
            console.log(this.inputValFromChild)
            this.getPosts()
        }
        // searchProduct(text) {
        //     // 把拿到的值
        //     // 給到 API
        //     // 重新用這筆資料，查詢
        //     console.log(text)
        //     this.fuzzy = text
        //     this.getPosts()
        //     // getPosts(this.text)
        // },
    },
  mounted() {
      this.getPosts()
  }
}

  
</script>

<style scoped>
/* .cards {
    display: flex;
    flex-wrap: wrap;
}
.cardsInner {
    margin-left: auto; 
    margin-right: auto; 
} */
</style>
