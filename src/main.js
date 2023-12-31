import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import './style.css'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import { createRouter, createWebHistory } from 'vue-router'
import Home from './views/Home.vue'
import ShoppingCart from './views/ShoppingCart.vue'
import CheckoutPage from './views/Checkoutpage.vue'
import ProductDetail from './views/ProductDetail.vue'
import Success from './views/Success.vue'
import Login from './views/Login.vue'
import MemberInfoPage from './views/MemberInfoPage.vue'
import ProductManage from './views/ProductManage.vue'



const router = createRouter({
    history: createWebHistory('/free-shopping-cart/'),
    routes: [
        { path: '/', name: 'Home', component: Home },
        { path: '/product', name: 'ProductDetail', component: ProductDetail },
        { path: '/shoppingCart', name: 'ShoppingCart', component: ShoppingCart },
        { path: '/checkoutPage', name: 'CheckoutPage', component: CheckoutPage },
        { path: '/success', name: 'success', component: Success },
        { path: '/login', name: 'login', component: Login },
        { path: '/memberInfo', name: 'memberInfo', component: MemberInfoPage },
        { path: '/productManage', name: 'productManage', component: ProductManage },
    ]
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// 關閉瀏覽器的時候，清除localstorage怎麼做
// window.addEventListener('unload', function() {
//   localStorage.clear();
// });


createApp(App)
    .use(pinia)
    .use(router)
    .mount('#app')


