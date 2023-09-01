<template>
    <div class="container ShoppingCart">
        <h2 class="text-primary">會員資料管理</h2>
        

    <form class="container row g-3">
        <div class="col-12">
            <label for="inputAvatar" class="form-label">大頭貼</label>
            <input type="image" class="form-control" id="inputAvatar" >
        </div>
        <div class="col-12">
            <label for="inputAccount" class="form-label">帳號</label>
            <input type="text" class="form-control" id="inputAccount" v-model="account">
        </div>
        <div class="col-12">
            <label for="inputGender" class="form-label">性別</label>
            <input type="text" class="form-control" id="inputGender"  v-model="gender">
        </div>
        <div class="col-12">
            <label for="inputName" class="form-label">姓名</label>
            <input type="text" class="form-control" id="inputName"  v-model="displayName">
        </div>
        <div class="col-12">
            <label for="inputPassword" class="form-label">密碼</label>
            <input type="password" class="form-control" id="inputPassword">
        </div>
    </form>




    </div>

</template>

<script>
import { mapState, mapActions } from 'pinia'
import memberStore from '../stores/memberStore'

export default {
    data() {
        return {
        }
    },
    created() {
    },
    computed: {
    ...mapState(memberStore, ['account', 'gender', 'displayName']),
    },
    methods: {
    ...mapActions(memberStore, ['getMember']),    
    }
};

</script>

<style scoped>

</style>