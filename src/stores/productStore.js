import { defineStore } from 'pinia'



export default defineStore('productStore', {
    state: () => (
        {
            posts: [],
            options: [],
            fuzzy: '',
            category: '',
            currentPage: 1,
            totalPage: 100,
            checked: [],
        }
    )
    ,
    getters: {
        sortProduct: (state) => state.posts.sort((a, b) => a.price - b.price)
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
                    "pageNum": this.currentPage,
                    "pageSize": 10,
                    "fuzzyProductName": searchVal,
                    "productCategoryId": elSelected,
                }),
            })
                .then(response => response.json())
                .then(data => {
                    // console.log(data.data.productPageInfo.total)
                    this.posts = data.data.productPageInfo.list
                    this.totalPage = data.data.productPageInfo.total
                })

        },
        handleCurrentPage(val) {
            this.currentPage = val
            this.getProducts()
        },
        sendToParent(searchVal, elSelected) {
            this.fuzzy = searchVal
            this.category = elSelected

            this.getProducts(searchVal, elSelected)
        },
        getProductCategory() {
            this.options = []; // 清空选项数组

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