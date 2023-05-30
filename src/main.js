import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './style.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ShoppingCart from './views/ShoppingCart.vue'
import ProductDetail from './views/ProductDetail.vue'
import Success from './views/Success.vue'
import Login from './views/Login.vue'
// import Vue from 'vue'

const router = createRouter ( {
    history: createWebHistory(),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/product', name: 'ProductDetail', component: ProductDetail},
        { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },
        { path: '/success', name: 'success', component: Success },
        { path: '/login', name: 'login', component: Login },

        
        
    ]
})

const pinia = createPinia()




createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')


