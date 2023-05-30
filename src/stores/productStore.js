import { defineStore } from 'pinia'



export default defineStore('productStore', {
    state: () => (    
        {
            posts: [],
        }
    )
    ,
    getters: {
        sortProduct: (state) => state.posts.sort((a,b) => a.price - b.price)
    },
    actions: {
        // this
        getProducts() {
   
          fetch("https://tom-store-api.onrender.com/tom-store-api/product/pagination", {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "pageNum": 1,
                    "pageSize": 10,
                    "fuzzyProductName": this.fuzzy,
                    "productCategoryId":this.category,
                }),
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                // status.isLoading = true
                // console.log('message', 'store')  
                this.posts = data.data.productPageInfo.list
            })

        },
        
        
    }
})