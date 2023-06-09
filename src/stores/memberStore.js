import { defineStore } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

export default defineStore('memberStore', {
    state: () => (    
        {
            // email: '',
            // password: '',
            // name: '',
            // username: '',
            // birthday: '',
            // gender: '',
            // country: '',
            tokenToComponent:'',
        }
    )
    ,
    getters: {
    },
    actions: {
        // this
    login(email, password) {
      // 获取用户名和密码        
        // console.log(email)
        // console.log(password)

      
      // 在这里可以进行进一步的处理，例如登录验证
        fetch("https://tom-store-api.onrender.com/tom-store-api/member/login", {
          method: "POST",
          headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "email": email,
              "password": password,
          }),
        })
        .then(response => response.json())
        .then(data => {
        // console.log(data)

        let token = data.data.access_token
        localStorage.setItem('shopCartToken', token);
        
      }).finally(() => {
        alert('Success!')

        // const tokenNow = localStorage.getItem("shopCartToken");
        history.go(-1)
        });
      
      // 清空表单
      this.username = '';
      this.password = '';
        },
      createAccount() {
      // 获取用户名、密码和邮箱
      const name = this.name;
      const password = this.password;
      const email = this.email;
      const birthday = this.birthday;
      const gender = this.gender;
      const country = this.country;

      
      // 在这里可以进行进一步的处理，例如创建账号
      fetch("https://tom-store-api.onrender.com/tom-store-api/member/signUp", {
            method: "POST",
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
                "displayName":name,
                "password": password,
                "email": email,
                "birthday": birthday,
                "gender": gender,
                "country": country,
            }),
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
            alert('Success!')
            this.$router.push('/');
        })
      
        // 清空表单
        this.name = '';
        this.password = '';
        this.email = '';

         
        },
       
 

        
        
    }
})