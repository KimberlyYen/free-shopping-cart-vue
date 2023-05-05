import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ShoppingCart from './views/ShoppingCart.vue'
import ProductDetail from './views/ProductDetail.vue'
import Success from './views/Success.vue'

const router = createRouter ( {
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/product', name: 'ProductDetail', component: ProductDetail},
        { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },
        { path: '/success', name: 'success', component: Success },

        
        
    ]
})

createApp(App)
    .use(router)
    .mount('#app')


