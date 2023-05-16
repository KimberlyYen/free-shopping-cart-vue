<template>
    <Nav @value-update="getValFromChild" />
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
            // inputValFromChild: '',
            inputContent: ""
        }
    },
    methods: {
        getValFromChild(val) {
            // this.inputContent = val
            this.inputContent = val;
            val = this.inputContent
            console.log(val, 'APP VAL')
            // this.inputValFromChild = val;

            // this.$emit("value-updateFromApp", this.inputValFromChild)

            // console.log(this.inputValFromChild, 'APP')

        },
        // send(val) { 
        //     console.log(val, 'emit')
        //     this.inputContent = val

        // }
    },
    
}
</script>






<style scoped>
</style>
