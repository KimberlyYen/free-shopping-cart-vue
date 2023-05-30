<template>
    <Nav @value-update="getValFromChild" v-if="this.show"/>
    <router-view :inputName="inputContent"></router-view>
</template>

<script>
import Nav from '../src/views/Nav.vue'

export default {
    components: {
        Nav,
    },
    data() { 
        return {
            inputContent: [],
            show: true,
        }
    },
    methods: {
        getValFromChild(val) {
            this.inputContent = val;
            // console.log(val, 'APP')
        },

    },
    watch: {
        '$route'(to) {
            if (to.path === '/login') {
                this.show = false; // 当URL为"/login"时将参数更改为false
            } else {
                this.show = true; // 当URL为"/login"时将参数更改为false
            }
        }
 },
    
}
</script>






<style scoped>
</style>
