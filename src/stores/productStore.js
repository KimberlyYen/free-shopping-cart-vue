import { defineStore } from 'pinia'



export default defineStore('productStore', {
    state: () => (    
        {
            posts: [],
            options: [],
            fuzzy: '',
            category:'',
        }
    )
    ,
    getters: {
        sortProduct: (state) => state.posts.sort((a,b) => a.price - b.price)
    },
    actions: {
        // this
        getProducts(searchVal, elSelected) {

        fetch("https://tom-store-api.onrender.com/tom-store-api/product/pagination", {
                method: "POST",
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "pageNum": 1,
                    "pageSize": 10,
                    "fuzzyProductName": searchVal,
                    "productCategoryId":elSelected,
                }),
            })
            .then(response => response.json())
            .then(data => {
                // console.log(data)
                
                this.posts = data.data.productPageInfo.list
            })

        },
        sendToParent(searchVal, elSelected) {


            // console.log(searchVal, elSelected, 'store')
            this.fuzzy = searchVal
            this.category = elSelected

            this.getProducts(searchVal, elSelected)

            // 我拿到了 類別的 id
            // 要轉成 Label

            // 將所有 類別 拿出來比對
            // 如果 id 相同，回傳類別
            // 用另一個變數記 Label
            
    

        },
        getProductCategory() {

        fetch("https://tom-store-api.onrender.com/tom-store-api/productCategory/ALL", {
            method: "GET",
            })
            .then(response => response.json())
            .then(data => {

                let list = data.data.productCategoryDtoList
            
                list.forEach((item) => { 
                let obj = {}
                obj.label = item.note
                obj.key = item.note
                obj.value = item.id

                this.options.push(obj)          
                })

            })
    },
        
        
    }
})